//LAB 10-DATA STORAGE: INDEX PAGE
//https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
window.onload = function () {

    if (document.cookie.split(';').some((item) => item.trim().startsWith('color='))) {
        document.body.style.background = getCookie('color');
    }

    if (document.cookie.split(';').some((item) => item.trim().startsWith('name='))) {
        let welcome = document.getElementById('newMsgBox');
        welcome.innerText = `Welcome ${getCookie('name')}!`;
    }
    document.getElementById('btnDel').addEventListener("click", deleteCookie);

};

function deleteCookie() {
    document.cookie = "name=;max-age=0";
    document.cookie = "color=;max-age=0";
    document.body.style.background = '#c0c0c0';
    let welcome = document.getElementById('newMsgBox');
    welcome.innerText = `Welcome!`;
}

function handleForm() {
    let form = document.forms.infoForm;
    let name = form.f_name.value;
    let color = form.f_color.value;
    makeCookie('name', name);
    makeCookie('color', color);
    document.body.style.background = getCookie('color');
    let welcome = document.getElementById('newMsgBox');
    welcome.innerText = `Welcome ${getCookie('name')}!`;
    return false;
}
function makeCookie(name, value) {
    document.cookie = `${name}=${value};max-age=${60 * 60 * 24}`;
}

function getCookie(name) {
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        .split('=')[1];
    return cookieValue;
}