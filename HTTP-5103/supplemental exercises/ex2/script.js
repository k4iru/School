console.log('test');

var l = [190, 155, 186, 145, 170];
var average = 0;

for (var i = 0; i < l.length; i++) {
    average += l[i];
}

average = average / l.length;

var targetAverage = 185 - average;

alert("your average for " + l.length + " games is " + average);