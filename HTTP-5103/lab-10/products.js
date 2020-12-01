//LAB 10-DATA STORAGE: PRODUCTS PAGE
window.onload = function() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('color='))) {
        document.body.style.background = getCookie('color');
    }

    if (document.cookie.split(';').some((item) => item.trim().startsWith('name='))) {
        let welcome = document.getElementById('newMsgBox');
        welcome.innerText = `Welcome ${getCookie('name')}!`;
    }
}

function getCookie(name) {
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        .split('=')[1];
    return cookieValue;
}