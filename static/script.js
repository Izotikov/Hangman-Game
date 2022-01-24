let guessed_words = [];
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
 "U", "V", "W", "X", "Y", "Z"];

function get_word(array) {
    let index = Math.floor(Math.random() * array.length);
    let word = array[index];
    if (guessed_words.includes(word)) {
        array.splice(index, 1);
        return get_word(array)
    }
    return word;
}

let hangman = '_______________________________________\n' +
    '___$$$$$$$$$$______Я-ВИСЕЛИЦА!_________\n' +
    '___$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$___\n' +
    '______Z___________________$$$$$$$______\n' +
    '______Z___________________$$$$$$$______\n' +
    '______Z___________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '____ZZZZZ_________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '__________________________$$$$$$$______\n' +
    '_______________________$$$$$$$$$$$$$___\n' +
    '$___________$$$$$$$$$$$$$$$$$$$$$$$$$$$\n' +
    '_\\_________/_______$$$$$$$$$$$$$$$$$$$$$\n' +
    '__\\_______/________$$$$$$$$$$$$$$$$$$$$$\n' +
    '__________________$$$$$$$$$$$$$$$$$$$$$\n' +
    '__________________$$$$$$$$$$$$$$$$$$$$$'

function display_hangman(tries, hangman) {
    if (tries === 6) {
        return hangman;
    }
    else if (tries === 5) {
        hangman = hangman.slice(0, 325) + '$$$' + hangman.slice(328);
        hangman = hangman.slice(0, 284) + '$$$$$' + hangman.slice(289);
        hangman = hangman.slice(0, 245) + '$$$' + hangman.slice(248);
        return hangman;
    }
    else if (tries === 4) {
        hangman = hangman.slice(0, 524) + '$$$$$' + hangman.slice(529);
        hangman = hangman.slice(0, 484) + '$$$$$' + hangman.slice(489);
        hangman = hangman.slice(0, 444) + '$$$$$' + hangman.slice(449);
        hangman = hangman.slice(0, 404) + '$$$$$' + hangman.slice(409);
        return hangman;
    }
    else if (tries === 3) {
        hangman = hangman.slice(0, 522) + '$' + hangman.slice(523);
        hangman = hangman.slice(0, 482) + '$' + hangman.slice(483);
        hangman = hangman.slice(0, 442) + '$' + hangman.slice(443);
        hangman = hangman.slice(0, 402) + '$$' + hangman.slice(404);
        hangman = hangman.slice(0, 363) + '$' + hangman.slice(364);
        return hangman;
    }
    else if (tries === 2) {
        hangman = hangman.slice(0, 530) + '$' + hangman.slice(531);
        hangman = hangman.slice(0, 490) + '$' + hangman.slice(491);
        hangman = hangman.slice(0, 450) + '$' + hangman.slice(451);
        hangman = hangman.slice(0, 409) + '$$' + hangman.slice(411);
        hangman = hangman.slice(0, 369) + '$' + hangman.slice(370);
        return hangman;
    }
    else if (tries === 1) {
        hangman = hangman.slice(0, 564) + '$$' + hangman.slice(566);
        hangman = hangman.slice(0, 603) + '$$' + hangman.slice(605);
        hangman = hangman.slice(0, 643) + '$$' + hangman.slice(645);
        hangman = hangman.slice(0, 683) + '$$' + hangman.slice(685);
        hangman = hangman.slice(0, 723) + '$$' + hangman.slice(725);
        return hangman;
    }
    else if (tries === 0) {
        hangman = hangman.slice(0, 567) + '$$' + hangman.slice(569);
        hangman = hangman.slice(0, 608) + '$$' + hangman.slice(610);
        hangman = hangman.slice(0, 648) + '$$' + hangman.slice(650);
        hangman = hangman.slice(0, 688) + '$$' + hangman.slice(690);
        hangman = hangman.slice(0, 728) + '$$' + hangman.slice(730);
        return hangman;
    }
}


function updateButton(hangman) {
    let tries = 6;
    document.querySelector("input").style.visibility = "hidden";
    let alph = '';
    let counter = 0;
    for (let vr of alphabet) {
        alph += '<input class="letters" type="button" id=' + vr + ' value=' + vr + '>' + ' ';
        counter += 1;
        if (counter === 10) {
            alph += "<br>";
        }
        else if (counter === 20) {
            alph += "<br>";
        }
    }
    document.getElementById('alphabet').innerHTML = alph;
    let word = get_word(word_list).toUpperCase();
    let message_to_user = document.getElementById('message_to_user');
    let word_compl = document.getElementById('word_compl');
    let word_completion = '';  // строка, содержащая символы _ на каждую букву задуманного слова
    for (let i=0; i < word.length; i++) {
        word_completion += '_';
    }
    message_to_user.innerHTML = "You have " + tries + " attempts!";
    word_compl.innerHTML = word_completion;
    document.getElementById("hangman_main").innerHTML = hangman;
    let a = Array.from(document.querySelectorAll('.letters'));
    for (let i=0; i < a.length; i++) {
        a[i].addEventListener('click', function () {
            if (a[i].className !== "letters") {}

            else if (word.includes(a[i].value) !== true) {
                tries -= 1;
                message_to_user.innerHTML = "Wrong! You have " + tries + " attempts!";
                hangman = display_hangman(tries, hangman);
                document.getElementById("hangman_main").innerHTML = hangman;
                document.getElementById(a[i].value).className = "clicked";
            }
            else {
                for (let j=0; j < word.length; j++) {
                    if (word[j].toUpperCase() === a[i].value) {
                        word_completion = word_completion.slice(0, j) + a[i].value + word_completion.slice(j + 1);
                        word_compl.innerHTML = word_completion;
                    }
                }
                document.getElementById(a[i].value).className = "clicked_right";
            }
            if (tries === 0) {
                message_to_user.innerHTML = "Sorry, you're dead! The word was: " + word + ". Wanna try again?";
                let b = document.querySelectorAll('input[type=button]');
                for (let i=0; i < b.length; i++) {
                    b[i].style.visibility = "hidden";
                }
                document.querySelector("input").style.visibility = "visible";
                let myName = {
                    word_compl: word_compl.textContent,
                    word: word,
                    tries: tries,
                    date: new Date()
                };
                fetch('/', {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(myName)
                })
                    .then(function (response) {
                        return response.json();
                    }).then((data) => {
                        console.log(data);
                });
            }
            if (word_completion.indexOf('_') === -1) {
                message_to_user.innerHTML = "Congrats, you won! Wanna try again?";
                let b = document.querySelectorAll('input[type=button]');
                for (let i=0; i < b.length; i++) {
                    b[i].style.visibility = "hidden";
                }
                document.querySelector("input").style.visibility = "visible";
                guessed_words.push(word);
                let myName = {
                    word_compl: word_compl.textContent,
                    word: word,
                    tries: tries,
                    date: new Date()
                };
                fetch('/', {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(myName)
                })
                    .then(function (response) {
                        return response.json();
                    }).then((data) => {
                        console.log(data);
                });
            }
        })
    }
}