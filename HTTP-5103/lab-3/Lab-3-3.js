//######## LAB 3-3 EMAIL SIGNUP ########
//alert("hey 3-3");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE
//==== VARIABLES =========
let userChoice;
let email;
let outMessage;
let success = "Thank you, our next newsletter will be sent to"
let invalid = "Thank you, but your email was not valid"
let fail = "Thank you, we will not bother you again"


//==== LOGIC =============

userChoice = confirm("Would youy like to join the mailing list?");

if (userChoice === true) {
    email = prompt("Please enter email", "me@example.com");
    if (email === "" || email === null || email === "me@example.com") {
        alert(invalid);
    } else {
        alert(`${success} ${email}`);
    }
} else {
    alert(fail);
}
