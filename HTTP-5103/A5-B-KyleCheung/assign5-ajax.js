//#### ASSIGNMENT 5 - STORE HOURS ####


window.onload = function () {


    // get radio elements
    let ocd = document.getElementById('routeRb1');
    let ys = document.getElementById('routeRb2');
    let us = document.getElementById('routeRb3');


    // put in list to more easily add event listeners
    let radioButtons = [ocd,ys,us];


    // check on page load if any radio buttons are checked
    if (ocd.checked) {
        // get text file for this radio value
        getTextFile(ocd.value);
    } else if (ys.checked) {
        getTextFile(ys.value);
    } else if (us.checked) {
        getTextFile(us.value);
    }

    // add on change event listeners for each radio button
    for (var i=0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function() {
            if (ocd.checked) {
                getTextFile(ocd.value);
            } else if (ys.checked) {
                getTextFile(ys.value);
            } else if (us.checked) {
                getTextFile(us.value);
            }
        });
    }

}


function getTextFile(value) {

    // new xhr object
    let xhr = new XMLHttpRequest();
    
    // element to show table data
    var showData = document.getElementById('schedTbl');


    // if xhr returns a valid response change inner html to opened file
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                showData.innerHTML = xhr.responseText;

            } else {
                alert('Connection was unsuccessful');
            }
        }
    }

    // use Get method to get specficied schedule
    xhr.open("GET", "sched" + value + ".txt", true);
    xhr.send(null);
}