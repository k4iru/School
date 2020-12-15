// Kyle Cheung
// Get DOM elements
let btn1 = document.getElementById('btn1');
let img1 = document.getElementById('img1');
let btn2 = document.getElementById('btn2');
let img2 = document.getElementById('img2');

// hover event listener 
btn1.onmouseenter = function() {
    img1.classList.add("blur");
}

btn1.onmouseleave = function() {
    img1.classList.remove("blur");
}

btn2.onmouseenter = function() {
    img2.classList.add("blur");
}

btn2.onmouseleave = function() {
    img2.classList.remove("blur");
}