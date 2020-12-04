function addTeacher() {

	let URL = "http://localhost:56978/api/TeacherData/AddTeacher/";
	let rq = new XMLHttpRequest();

	let fname = document.getElementById('fname').value;
	let lname = document.getElementById('lname').value;
	let salary = document.getElementById('salary').value;

	let teacherData = {
		"teacherFname": fname,
		"teacherLname": lname,
		"salary": salary
	};

	console.log('made object');

	// async
	rq.open("POST", URL, true);
	rq.setRequestHeader("Content-Type", "application/json");
	rq.onreadystatechange = function () {
		//ready state should be 4 AND status should be 200
		if (rq.readyState == 4 && rq.status == 200) {
			//request is successful and the request is finished

			//nothing to render, the method returns nothing.

			
		}

	}
	//POST information sent through the .send() method
	rq.send(JSON.stringify(teacherData));
	console.log('sent');

}