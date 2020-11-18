/* LAB 8 - SHIPPING FORM */
//Order Shipping object (for extra EXTRA challenge)
var shipInfo = {
	cid: 0,
	name: "",
	pc: "",
	speed: "",
	cost: 0
};

window.onload = function () {

	// regex'
	let pcRegex = /^\w\d\w\s?\d\w\d$/;
	let idRegex = /\d{6}/;

	// listen for onsubmit
	let formHandle = document.forms.form_ship;
	formHandle.onsubmit = processForm;

	function processForm() {

		// reset backgrounds
		formHandle.f_Name.style.backgroundColor = "";
		formHandle.f_pc.style.backgroundColor = "";
		formHandle.f_Id.style.backgroundColor = "";
		formHandle.f_speed.style.backgroundColor = "";


		// validation
		let name = formHandle.f_Name.value;
		if (name === '' || name === null) {
			formHandle.f_Name.style.backgroundColor = "red";
			formHandle.f_Name.focus();
			formHandle.f_Name.select();
			return false;
		}

		let postal = formHandle.f_pc.value;
		if (!pcRegex.test(postal)) {
			formHandle.f_pc.style.backgroundColor = "red";
			formHandle.f_pc.focus();
			formHandle.f_pc.select();
			return false;
		}

		let customerId = formHandle.f_Id.value;
		if (!idRegex.test(customerId)) {
			formHandle.f_Id.style.backgroundColor = "red";
			formHandle.f_Id.focus();
			formHandle.f_Id.select();
			return false;
		}

		let cost = formHandle.f_speed.value;
		if (parseInt(cost) === 0) {
			
			formHandle.f_speed.style.backgroundColor = "red";
			formHandle.f_speed.focus();
			return false;
		}

		// grab DOM elements
		let thankYou = document.getElementById("thanks_msg");
		let thanksCustomer = document.getElementById("thanksCustomer");
		let thanksSpeed = document.getElementById("thanksSpeed");
		let thanksPC = document.getElementById("thanksPC");
		let thanksCost = document.getElementById("thanksCost");
		let speed = document.getElementById("in_Speed").selectedOptions[0].text;

		// set object
		shipInfo.cid = customerId;
		shipInfo.name = name;
		shipInfo.pc = postal;
		shipInfo.speed = speed;
		shipInfo.cost = cost;

		// set values in thank you
		thanksCustomer.innerHTML = `${shipInfo.name} (Customer # ${shipInfo.cid})`;
		thanksSpeed.innerHTML = shipInfo.speed;
		thanksPC.innerHTML = shipInfo.pc;
		thanksCost.innerHTML = shipInfo.cost;

		// show
		formHandle.style.display = "none";
		thankYou.style.display = "block";
		return false;
	}

}
