//######## LAB 3-1 LOGIN ########
//alert("hey");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE
//====VARIABLES===============

let userName = "monkey";
let password = "banana";

//====LOGIC===================

//3. CREATE POPUP BOX FOR USERNAME
let login = prompt("username");

//4. OUTPUT PROVIDED USERNAME TO JS CONSOLE
console.log(`user entered ${login} for login name`);

//5. CREATE POPUP BOX FOR PASSWORD
let pass = prompt("password");

//6. OUTPUT PROVIDED PASSWORD TO JS CONSOLE
console.log(`user entered ${pass} for their password`);

//7. CHECK IF PROVIDED USERNAME AND PROVIDED PASSWORD MATCH THE STORED USERNAME/PASSWORD
if (userName === login && pass === password) {

//8. IF THEY MATCH, POPUP SUCCESS MESSAGE AND OUTPUT TO CONSOLE
alert(`Welcome back ${userName}`);
console.log("Login successful");

//9. IF THEY DON'T MATCH, POPUP INVALID MESSAGE & OUTPUT TO CONSOLE} 
} else {
    alert("Invalid username/password");
    console.log("Login Fail");
}