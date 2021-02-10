//LAB 4 - JS ENCRYPTION
let form = document.forms.sha1form;
let output = document.getElementById('output');

function hash(password) {
    "use strict";
    let hash = CryptoJS.MD5(password);
    return hash;
}

form.onsubmit = function () {
    "use strict";

    let input = form.sha1form__input.value;

    if (input === "") {
        output.innerText = "Empty Password";
        return false;
    }
    else {
        let hashed = hash(input);
        output.innerText = `MD5 Hash: ${hashed}`;
    }

    return false;
}

