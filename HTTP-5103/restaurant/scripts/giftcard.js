// Kyle Cheung
// get all the DOM elements
let form = document.forms.card;
let showName = document.getElementById('showName');
let showAmount = document.getElementById('showAmount');
let showMessage = document.getElementById('showMessage');

// change values on submit
form.onsubmit = function() {
    showName.innerText = form.name.value;
    showAmount.innerText = form.amount.value;
    showMessage.innerText = form.message.value;
    return false;
}