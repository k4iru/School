// https://www.w3schools.com/howto/howto_js_active_element.asp
// https://stackoverflow.com/questions/52025615/vanilla-js-change-active-state-of-links-when-scrolling-refactoring
window.onload = function() {
    let navContainer = document.getElementById('main-nav');
    let navLinks = navContainer.getElementsByClassName('nav-item');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            let current = document.getElementsByClassName('active');

            if (current.length > 0) {
                current[0].className = current[0].className.replace('active', '');
            }
            this.className += ' active';
            
        });
    }
}

// prevent form submission
function submitHandler() {
    return false;
}