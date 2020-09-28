//######## LAB 3-2 FILE DELETE CONFIRMATION ########
//alert("hey 3.2");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE
//==== VARIABLES ========
var userChoice;
var yesMessage = "been successfully deleted.";
var noMessage = "not been altered.";
var messageOut = "Thank you, your file has ";

//==== LOGIC ========

//1. CREATE POPUP TO ASK FOR PERMISSION TO PROCEED WITH DELETION OF FILE
userChoice = confirm("are you sure you want to delete the file?");

//2. IF USER CLICKS OKAY SET MESSAGE TO YES
if (userChoice === true) {
    messageOut = yesMessage;
} else {

//3. IF USER CLICKS ANYTHING BUT OKAY, SET MESSAGE TO NO
    messageOut = noMessage;
}

//4. SEND FINAL MESSAGE TO USER
alert(`Thank you, your file has ${messageOut}`);