let form = document.forms[0];
let loginForm = document.getElementById("login-form");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");

// output div
let output = document.getElementById("output");

form.onsubmit = function () {
    "use strict";
    let username = form.elements.username.value;
    let password = form.elements.password.value;

    let res = checkLogin(username, password);
    let outMessage = "";

    // reset error highlight
    usernameInput.classList.remove("form__label_invalid");
    passwordInput.classList.remove("form__label_invalid");

    // correct username and password
    if (res === true) {
        outMessage = "Welcome back!";
    }
    // no username
    else if (res === "No username entered.") {
        usernameInput.classList.add("form__label_invalid");
        outMessage = res;
    }
    // no password
    else if (res === "No password entered.") {
        passwordInput.classList.add("form__label_invalid");
        outMessage = res;
    } else {
        // incorrect username/password
        outMessage = res;
    }

    output.classList.remove("output_hidden");
    output.innerHTML = outMessage;

    return false;
};
