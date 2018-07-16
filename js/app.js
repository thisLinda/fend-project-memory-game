//Create a list that holds all of your cards. Moved from HTML.
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
//code with Iip 1:1 7/8/18
//could I have used map or filter?
let cards = document.querySelectorAll(".card");
let openCard = [];

//function validMove...add a previousTarget variable???
cards.forEach(function(el, idx) {
	cards[idx].addEventListener('click', function(){
		cards[idx].className = "card open show";
        openCard.push(cards[idx]);

// filter out the card if it matches itself
//code from dannygsmith, midwest cohort meeting
/*
if ( !openCard[ idx ].classList.contains( 'card' ) &&
!openCard[ idx ].classList.contains( 'open' ) &&
!openCard[ idx ].classList.contains( 'show' ) ) {
console.log( "danny" );
*/
/*
 // prevent more than two cards at a time
 console.log( openCard.length );
 if ( openCard.length < 2 ) {
    openCard.push( idx );
    cards[ idx ].classList.add( 'open' );
    cards[ idx ].classList.add( 'show' );
*/
        setTimeout(function() {
            if(openCard.length == 2) {
                if(openCard[0].firstElementChild.className == openCard[1].firstElementChild.className) {
                    openCard[0].className = "card match";
                    openCard[1].className = "card match";
                }
                else {
                    openCard[0].className = "card";
                    openCard[1].className = "card";
                }
                openCard = [];
            }
        },800);
	});
});

function disable(){
    if(openCard.length == 2) && (openCard[].firstElementChild.className === openCard[].firstElementChild.className) {
        openCard[].className = "card disabled";
    }
}
//shuffle the list of cards using the provided "shuffle" method below
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//code from 1:1 with Iip 7/8/18
initGame();

function initGame() {
    let newCards = shuffle(cardArray);
    cards.forEach(function(element, idx){
        cards[idx].className = "card";
        cards[idx].firstElementChild.className = newCards[idx];
    });
}



//function to indicate game over



//function to start the timer



//function to stop the timer



//increment the move counter and display it on the page
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
