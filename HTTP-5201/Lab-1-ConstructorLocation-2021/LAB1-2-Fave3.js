/*LAB 1-2: CONSTRUCTOR FUNCTIONS*/
//FAVE FRIEND CONSTRUCTOR FUNCTION
class Person {
	constructor(name, phone) {
		this.name = name;
		this.phone = phone;
	}
	contactDetails() {
		return `${this.name} ${this.phone}`;
	}
}
window.onload = function(){
	
	var faveThree = [];//FAVE 3 ARRAY
	let form = document.querySelectorAll('form')[0];
	let favelist = document.getElementById('faveList');
	let faveblock = document.getElementById('faveBlock');
	let fragment = new DocumentFragment;

	// build favethree array 
	form.onsubmit = function () {

		// grab form elements
		for (let i = 1; i <= 3; i++ ) {
			let name = form.elements[`name${i}`].value;
			let phone = form.elements[`phone${i}`].value;
			let person = new Person(name, phone);
			faveThree.push(person);
		}

		faveThree.forEach (person => {
			let li = document.createElement('li');
			li.textContent = person.contactDetails();
			fragment.appendChild(li);
		});

		favelist.appendChild(fragment);

		form.style.display = 'none';
		faveblock.style.display = 'block';
		// prevent default submit action
		return false;
	}

}//END OF onload FUNCTION