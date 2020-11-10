/* LAB 7.2 - STOP TIME */
//alert("Lab 2 is connected");//delete once confirming your page is connected. 

//create page load listener
window.onload = init;
//create page load function
function init() {
	//create variables for required HTML elements
	let hoursOut = document.getElementById('hoursOut');
	let minsOut = document.getElementById('minsOut');
	let secsOut = document.getElementById('secsOut');
	let btnStart = document.getElementById('btnStart');
	let btnStop = document.getElementById('btnStop');

	//create time variable so all functions have access to it
	let time;
	let hours;
	let minutes;
	let seconds;
	

	//CREATE FUNCTION THAT DISPLAYS THE TIME
	function displayTime() {
		let date = new Date();

		hours = date.getHours();
		minutes = date.getMinutes();
		seconds = date.getSeconds();
	
		hoursOut.innerText = format(hours % 12) +":";
		minsOut.innerText = format(minutes) +":";
		secsOut.innerText = format(seconds);
	}
	
	//CREATE FUNCTION TO START THE CLOCK.
	function startClock() {
		time = setInterval(displayTime, 100);
	
	}
	
	//CREATE FUNCTION TO STOP THE CLOCK
	function stopClock() {
		clearInterval(time);
	}
	
	function format (n) {
		let fn = ("0" + n).slice(-2);
		return fn
	  }
	
	// SET EVENT LISTENERS
	btnStart.onclick = function() { startClock()};
	btnStop.onclick = function() { stopClock()};
}