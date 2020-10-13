//#### LAB 6 - DOM MANIPULATION ####
//PART 2: MYSTERY BOX
//alert("test");//COMMENT OUT AS SOON AS YOU KNOW YOU ARE CONNECTED!!!!

//LISTEN FOR load EVENT
window.onload = init;

//'WRAPPER' FUNCTION FOR DOM LOGIC
function init() {
	//GET DOM ELEMENTS WE'LL NEED
	let mysteryBox = document.getElementById("mysteryBox");
	let buttonBox = document.getElementById("buttonBox");
	//====CREATE THE FUNCTIONS WE'LL NEED====
	//FUNCTION TO ASK USER
	function mysteryBoxFunc() {
		let userChoice = confirm("Do you want to see somehing?");

		if (userChoice) {
			mysteryBox.style.display = "none";
			buttonBox.style.display = "block";

		}
	}

	//FUNCTION TO CHANGE buttonBox
	function buttonBoxFunc() {
		buttonBox.style.width = 600 + "px";
		buttonBox.innerHTML = "<h2>SURPRISE</h2>";
		buttonBox.style.background = "orange";
	}

	//SETUP LISTENERS
	mysteryBox.onmouseover = mysteryBoxFunc;
	buttonBox.onclick = buttonBoxFunc;


	//END onload FUNCTION
}