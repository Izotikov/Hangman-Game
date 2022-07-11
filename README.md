# HANGMAN GAME
#### Video Demo:  <https://youtu.be/VjIXbchKuoA>
#### Description:
This is simple Hangman game, written with JS, Python+Flask, SQL, CSS and HTML. You as a player need to guess a word, that was randomly chosen from dictionary with all possible words for game. I choosed this game because it's pretty popular project for begginers, that also include many mechanics, that need to work together for good project. You need to press buttons, A-Z, to "guess". If letter in the word, button will become green and show in the word placeholder. If not, it's became red and you can't press it again. If you right, you guess message "Congrats, you Win! Wanna try again?", if you lost: "Sorry, you lost. Wanna try again?" and you can press button "Start" to play again. After the game, info about that game saved in SQL database automaticly, using fetch request, and every player have it own history, because history connected with user_id. You also can contact me, and all you write will be send to me in another SQL table. You also can login and logout.
My first file - script.js, contains all JavaScript, that I am using in this project. First he generate the word from dictionary of words (dictionary automaticly uploads from python), then he starts the logic of the game. With EventListener code can control the moment userr press the letter and make actions after it. Then class of the button changes and you can't press them again. After the game, JS send fetch request to the Flask, where he gave to them dictionary with variables, generated in game. This variables after it saves in special SQL database table, games. If you press the "History" page on the site, you will upload info from SQL table to this page, with all your (connected to your user_id) games.
Second file - Styles.css, just make a little design to my code. I don't spent much time making awesome design, because I wanted to focus on backend, working of this project firstly. In this project, my first task was to understand and make the logic of the code, and the last task was make it beautiful.
Third file - application.py, here contains all backend, that let this code to work properly. Most of this was written using "Finance" code as example, but adapt it to new project. index let you to start tne game, login, register, logout let you do, what they named, login, registration or logout. History rendering history.html, where code dynamically upload files from SQL database.
After its word.txt, it's just contain all the words you can guess.
And last one is html files, it's just webpages to play in my game.

![image](https://user-images.githubusercontent.com/91781655/178341738-3a6e9c20-aed4-4d7d-a6fb-1392625bea31.png)
