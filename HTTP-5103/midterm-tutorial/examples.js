
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);



for (let i = 1; i <= 10; i++) {
    console.log(i);
}


//for ( [start]; [end]; [step]) {
    //iterate
//}


let i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}

//while([condition]) {
///    // iterate
//}

let input;
while (isNaN(input)) {
    input = parseInt(prompt("input a number"))
}

let fruitArray = ['Banana', 'Cherry', 'Orange'];

for (let i = 0; i < fruitArray.length; i++) {
    console.log(fruitArray[i]);
}


let i = 1;
while (i <= 10) {
    console.log(i);
}

for (let i = 1; i > 0; i++) {
    console.log(i);
}



let i = 1;
while (i <= 10) {
    i++;
    if (i == 4) {
        break;
    }
    console.log(i);
}

let i = 1;
while (i <= 10) {
    i++;
    if (i == 4) {
        continue;
    }
    console.log(i);
}