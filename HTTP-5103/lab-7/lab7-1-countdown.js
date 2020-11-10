/* LAB 7-1 - FINAL COUNTDOWN!! */
//alert("Lab 7 - 1");//Please delete once you have confirmed your page is connected...seriously, if I see this popup when I check out your work, I will go coo-coo bananas.

//create page load listener
window.onload = init;

//create page load function
function init() {

	//create variables for required HTML elements
	let todayData = document.getElementById('todayData');
	let finalData = document.getElementById('finalData');
	let dueData = document.getElementById('dueData');

	//create variables for now date and due date
	let today = new Date();
	let dueDate = new Date('December 15, 2019 23:59');

	//CONVERT TO UTC AND SUBTRACT TO GET TIME DIFFERENCE
	let days = dueDate.getTime() - today.getTime();
	
	//CONVERT TIME DIFFERENCE TO WHOLE NUMBER OF DAYS
	let one_day = 1000 * 60 * 60 * 24;
	let whole_days = Math.floor(days / one_day);
	console.log(whole_days);
	//OUTPUT NOW DATE & DUE DATE TO HTML PAGE
	todayData.innerText = today.toDateString();
	finalData.innerText = dueDate.toDateString();
	
	//LOGIC TO CHECK IF DUE DATE HAS PASSED, AND OUPUT APPROPRIATE MESSAGE TO HTML PAGE
	if (days < 0) {
		dueData.innerHTML = "The Deadline for the Final Assignment has passed!";
	}
	else {
		dueData.innerText = whole_days;
	}
}