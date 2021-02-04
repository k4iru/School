//LAB 3 - UNIT TESTING
//======== THIS FILE IS FOR THE UNIT TEST ==========

let results = document.getElementById("data");

let pass = "<span style='color:green'>==PASS==</span>";
let fail = "<span style='color:red'>==FAIL==</span>";

function test__checkHumbrId(input, expected)  {
    "use strict";
    let result = checkHumbrId(input);
    let test;

    if (result === expected) {
        test = pass;
    }
    else {
        test = fail;
    }

    let str = `Input: ${input}\t Result: ${result}\t Expected: ${expected}\t ${test}`;
    data.innerHTML += `${str} <br>`;
}

test__checkHumbrId('n12345678', true);
test__checkHumbrId('N12345678', true);
test__checkHumbrId('n123', false);
test__checkHumbrId('c12345678', false);
test__checkHumbrId('test N12345678', false);
test__checkHumbrId('N12345678 test', false);
test__checkHumbrId('N1234567123', false);
test__checkHumbrId('awew', true);