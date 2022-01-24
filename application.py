from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from functools import wraps
from tempfile import mkdtemp
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


with open("words.txt", "r") as file:
    word_list = file.read().splitlines()

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///db.sqlite")


@app.route('/', methods=["GET", "POST"])
@login_required
def index():
    if request.method == 'POST':
        user_id = session['user_id']
        word_compl = request.get_json()
        db.execute('INSERT INTO games (user_id, word, word_completion, tries, date) VALUES (?, ?, ?, ?, ?)',
                   user_id, word_compl['word'], word_compl['word_compl'], word_compl['tries'], word_compl['date'])
        return {'a':'b'}
    else:
        return render_template('index.html', word_list=word_list)


@app.route('/history')
@login_required
def history():

    info = db.execute("SELECT * FROM games WHERE user_id = ?", session['user_id'])
    return render_template('history.html', info=info)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact', methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get('firstname')
        surname = request.form.get('surname')
        mail = request.form.get('mbox')
        message = request.form.get('subject')
        db.execute("INSERT INTO feedback (name, surname, mail, message) VALUES (?, ?, ?, ?)", name, surname, mail,
                   message)
        return render_template('contact.html')
    else:
        return render_template('contact.html')


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template('register.html')
    else:
        if not request.form.get("username"):
            return "Must provide username"

        elif not request.form.get("password"):
            return "Must provide password"

        elif not request.form.get("confirmation"):
            return "Must provide confirmation"

        elif request.form.get("password") != request.form.get("confirmation"):
            return "Your password doesn't match"

        username = request.form.get("username")
        hashpass = generate_password_hash(request.form.get("password"))

        usr = db.execute("SELECT username FROM users WHERE username = ?", request.form.get("username"))
        if len(usr) >= 1:
            return "Your username already taken"
        db.execute("INSERT INTO users (username, hash) VALUES(?, ?)", username, hashpass)
        return redirect('/login')


@app.route('/login', methods=["GET", "POST"])
def login():
    session.clear()

    if request.method == "GET":
        return render_template('login.html')
    else:
        if request.form.get('redirect') == "Register":
            return redirect('/register')
        else:
            if not request.form.get("username"):
                return "Must provide username"

            elif not request.form.get("password"):
                return "Must provide password"

            rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))
            if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
                return "Invalid username and/or password"
            session["user_id"] = rows[0]["user_id"]
            return redirect('/')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


if __name__ == '__main__':
    app.run()
