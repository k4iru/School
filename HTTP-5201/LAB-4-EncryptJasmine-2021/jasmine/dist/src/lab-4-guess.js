//Lab 4 Testing With Jasmine
function guessNum(guess) {
    "use strict";
    var secretGuess = 4;//set value of correct number

//Output messages
    var returnMessage = "";
    var noNumber = "A number was not input.";
    var noInput = "A value was not entered.";
    var outOfRange = "Way off! Pick between 1 and 10.";
    var correct = "You guessed it!";
    var validIncorrect = "Guess again.";

//Validate input and assign a return message
    if (isNaN(guess) === true) {
        returnMessage = noNumber;
        
    } else if (guess === "") {
        returnMessage = noInput;
        
    } else if (guess <= 1 || guess >= 10) {
        returnMessage = outOfRange;
        
    } else {
        if (parseInt(guess) === secretGuess) {
            returnMessage = correct;
        } else {
            returnMessage = validIncorrect;
        }
    }

    return returnMessage;
}