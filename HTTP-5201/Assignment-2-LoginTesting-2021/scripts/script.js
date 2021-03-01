let form = document.forms[0];
let loginForm = document.getElementById("login-form");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let output = document.getElementById("output");
let uOut = document.getElementById("uOut");
let pOut = document.getElementById("pOut");

form.onsubmit = function () {
    "use strict";
    let username = form.elements.username.value;
    let password = form.elements.password.value;


    // username validation
    if (username === "") {
        usernameInput.classList.add("form__label_invalid");
    } else {
        usernameInput.classList.remove("form__label_invalid");
    }

    // password validation
    if (password === "") {
        passwordInput.classList.add("form__label_invalid");
    } else {
        passwordInput.classList.remove("form__label_invalid");
    }

    // hide / show output
    if (username === "" || password === "") {
        output.classList.add("output_hidden");
        loginForm.classList.remove("login-form_border");
    } else {
        output.classList.remove("output_hidden");
        loginForm.classList.add("login-form_border");
    }

    uOut.innerText = username;
    pOut.innerText = password;

    return false;
};