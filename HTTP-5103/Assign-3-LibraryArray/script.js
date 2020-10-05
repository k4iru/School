// books
let book1 = "How to Make Friends and Influence People";
let book2 = "The Alchemist";
let book3 = "Replay";
let book4 = "How to Read a Book";
let book5 = "Thinking Fast and Slow";
let book6 = "Python for Dummies";
let book7 = "The Subtle Art of not Giving a Fxck";
let book8 = "Integral Calculus 7th Edition";
let book9 = "Rocket Surgery";
let book10 = "Don't Make Me Think";

// array
let bookArray = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10];
let bookChoice;


// while bookChoice is not valid input
while (isNaN(bookChoice) || bookChoice > 10 || bookChoice < 1) {
    bookChoice = prompt("Which top 10 book would you like?", "Pick a number: 1-10");
    if (isNaN(bookChoice) || bookChoice > 10 || bookChoice < 1) alert("please enter a number between 1 and 10!");
}


bookChoice = parseInt(bookChoice);
alert(`Number ${bookChoice} on the list is ${bookArray[bookChoice-1]}`);
console.log(bookArray);