let userGroup = prompt("What Group are you in?");

if (userGroup === "3B" || userGroup === "3b") {
    let firstName = prompt("whats your first name?");

    switch (firstName) {
        case "kyle":
        case "Kyle":
            alert("Welcome Back Kyle Cheung");
            break;
        case "muhammad":
        case "Muhammad":
            alert("Welcome Back Muhammad Effendi");
            break;
        case "ikumi":
        case "Ikumi":
            alert("Welcome Back Ikumi Mine");
            break;
        case "anetor":
        case "Anetor":
            alert("Welcome Back Anetor Irenen");
            break;
        case "simranjeet":
        case "Simranjeet":
            alert("Welcome Back Simranjeet Singh");
            break;
        default:
            alert("Invalid Input: Access Denied");
    }
} else {
    alert("Access Denied");
}