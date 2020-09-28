var groupList = {
    "kyle": "cheung",
    "muhammad": "effendi",
    "ikumi": "mine",
    "anetor": "irenen",
    "simranjeet": "singh"
};

let userGroup = prompt("What Group are you in?");

if (userGroup === "3B" || userGroup === "3b") {
    let firstName = prompt("whats your first name?");

    if (firstName.toLowerCase() in groupList) {
        console.log(firstName);
        alert(`Welcome back ${firstName} ${groupList[firstName]}`);
    } else {
        alert("Invalid Name: Access Denied");
    }
} else {
    alert("Access Denied");
}