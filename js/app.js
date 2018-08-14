//Create a list that holds all of your cards. 
let cardArray = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb",
];

let cards = document.querySelectorAll(".card");
let display = document.querySelector("#time");
let finalTime = document.querySelector("#finalTime");
let twoMinutes = 120;
let openCard = [];
let moves = 0;

const stars = document.querySelectorAll(".fa-star");
let modal = document.getElementById("#winModal");
let starsList = document.querySelectorAll(".stars li");
let closeIcon = document.querySelector(".close");

let timer = 0;
let clockNotRunning = true;
let timerId;
let minutes, seconds;

document.getElementById("win-modal").style.display = "none";

//function countMoves instructed by https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/
function countMoves() {
    moves++;
    const displayMoves = document.querySelector("#moves");
    displayMoves.innerHTML = moves + " Moves";
}

//function stopClock instructed by Danny G. Smith
function stopClock() {
    // must match variable for setInterval
    clockNotRunning = true;
    clearInterval(timerId);
}

//displayTimer() and resetTimer() instructed by Danny G. Smith 7/29/18
function displayTimer(timer) {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
        timer = duration;
    }

    return (timer);
}

function resetTimer(duration) {
    let timer = duration;

    timer = displayTimer(timer);

    return (timer);
}

// https://questionfocus.com/the-simplest-possible-javascript-countdown-timer-closed.html, instructed by Danny G. Smith

function startTimer(duration, display) {
    let timer = duration;

    // must use whatever is on the left side of the assignment
    // statement for setInterval for clearInterval argument
    timerId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (!clockNotRunning) {
            display.textContent = minutes + ':' + seconds;
        }

        if (--timer < 0) {
            timer = duration;
        }

        let diffTime, diffMinutes, diffSeconds;
        let currentTime = minutes * 60 + seconds;
        diffTime = 120 - currentTime;

    }, 1000);
}

//for loop event listener code instructed by Danny G. Smith, midwest cohort meeting
//additional clock stop code instruction from Carlos Fins 7/28/2018 Slack Study Jam
for (let index = 0; index < cards.length; index++) {

    cards[index].addEventListener("click", function () {

        let twoMinutes = 60 * 2,
            display = document.querySelector("#time");

        if (clockNotRunning) {
            startTimer(twoMinutes, display);
            clockNotRunning = false;
        }

        // filter out the card if it matches itself
        if (!cards[index].classList.contains("open") &&
            !cards[index].classList.contains("show")) {

            // prevent more than two cards at a time
            if (openCard.length < 2) {
                openCard.push(index);

                cards[index].classList.add("open");
                cards[index].classList.add("show");

                if (openCard.length === 2) {
                    countMoves();

                    // todo write function to update moves
                    // updateMoves();
                    if (cards[openCard[0]].children[0].classList[1] ===
                        cards[openCard[1]].children[0].classList[1]) {

                        cards[openCard[0]].classList.remove("open", "show");
                        cards[openCard[0]].classList.add("match");
                        cards[openCard[1]].classList.remove("open", "show");
                        cards[openCard[1]].classList.add("match");

                        // verify it is time to stop clock
                        if (document.querySelectorAll(".match").length === 16) {
                            stopClock();
                            awardStars();
                            gameOver();
                        }

                        openCard = [];
                    } else {
                        setTimeout(function () {

                            cards[openCard[0]].classList.remove("open", "show");
                            // updateScore();
                            cards[openCard[1]].classList.remove("open", "show");

                            openCard = [];

                        }, 600);
                    }
                }
            }
        }
    });
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//initGame code from 1:1 with Iip 7/8/18
initGame();

function initGame() {
    let newCards = shuffle(cardArray);
    cards.forEach(function (element, index) {
        cards[index].className = "card";
        cards[index].firstElementChild.className = newCards[index];
    });
}

//awardStars code created/instructed by Sandra Israel https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#comments-section
function awardStars() {
    if (moves > 8 && moves < 14) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 15) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//reset moves/stars/game adapted from Matt Cranford and Sandra Israel
function resetMoves() {
    moves = 0;
    document.querySelector("#moves").innerHTML = moves;
}

function resetStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "FFD700";
        stars[i].style.visibility = "visible";
    }
}

document.querySelector("#restart").addEventListener("click", resetGame);

document.querySelector("#win-modal button").addEventListener("click", resetGame);

document.querySelector(".close-button").addEventListener("click", resetGame);

function resetGame() {
    document.getElementById("win-modal").style.display = "none";
    resetMoves();
    resetStars();
    stopClock();
    resetTimer(twoMinutes);
    initGame();
}

/*console.log instruction from Carlos Fins Slack 8/12/18, alert instruction from Vasudeva Ram Pavan KumarPitta Slack 8/12/18
{
    alert("it's working")
});
//document.querySelector("#play-again").addEventListener("click", function () {
//console.log("play-again was clicked");
resetGame();
//});
*/

//function displayDiffOnModal created/instructed by Danny G. Smith, midwest cohort
function displayDiffOnModal(timer) {
    let currentTime = minutes * 60 + seconds;
    let diffTime, diffMinutes, diffSeconds;
    diffTime = twoMinutes - currentTime;

    //console.log(currentTime, diffTime);

    diffMinutes = parseInt(diffTime / 60, 10);
    diffSeconds = parseInt(diffTime % 60, 10);

    diffMinutes = diffMinutes < 10 ? '0' + diffMinutes : diffMinutes;
    diffSeconds = diffSeconds < 10 ? '0' + diffSeconds : diffSeconds;

    finalTime.textContent = "Elapsed Time:" + diffMinutes + ':' + diffSeconds;

    return finalTime;
}

//gameOver() adapted from Sandra Israel congratulations(), https://codepen.io/YOURsammich/pen/RyeOoz/, and Danny G. Smith/*
function gameOver() {
    document.getElementById("win-modal").style.display = "flex";

    let finalStars = document.querySelector(".stars").innerHTML;

    document.getElementById("numMoves").innerHTML = moves + " Moves";
    document.getElementById("finalStars").innerHTML = finalStars;
    displayDiffOnModal(timer);
};