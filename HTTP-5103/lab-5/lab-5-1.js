//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 1:  AN AVERAGE FUNCTION
//alert("Connected");//COMMENT OUT AS SOON AS YOU KNOW YOU ARE CONNECTED!!!!

//################## CREATE YOUR AVERAGE FUNCTION
function average(num1, num2, num3, num4, num5) {
    let total = num1 + num2 + num3 + num4 + num5;
    let average = total / 5.0;
    return average.toFixed(1);
}

function needReview(average) {
    if (gpa >= 70) {
        alert("Success!");
    } else {
        alert("You need review");
    }
}
console.log(average(5, 10, 15, 20, 25));


//################## LOGIC THAT OUTPUTS MESSAGES BASED ON FUNCTION RESULTS

let http5101 = 0;
let http5102 = 100;
let http5103 = 0;
let http5104 = 0;
let http5105 = 100;

let gpa = average(http5101, http5102, http5103, http5104, http5105)
needReview(gpa);
console.log(gpa);

http5101 = 100;
http5102 = 100;
http5103 = 100;
http5104 = 100;
http5105 = 100;

gpa = average(http5101, http5102, http5103, http5104, http5105)
needReview(gpa);
console.log(gpa);