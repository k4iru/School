//#### ASSIGNMENT 4 - VETERINARY CLINIC ####
//pet objects

// pet class
class Pet {
    constructor(name, breed, type, sex) {
        this.name = name;
        this.breed = breed;
        this.type = type;
        this.sex = sex;
    }
}

// pets
let whiskers = new Pet('Whiskers', 'Tabby', 'Cat', 'M');
let jenkins = new Pet('Jenkins', 'Labrador', 'Dog', 'M');
let biscuits = new Pet('Biscuits', 'Giant', 'Turtle', 'F');

//client object

//client class
class Customer {
    constructor(clientName, phone, pets = [], address) {
        this.clientName = clientName;
        this.phone = phone;
        this.pets = pets;
        this.address = address;
    }
}

// client
let c1 = new Customer('John', 1241231, [whiskers, jenkins, biscuits], '123 street');


//Logical programming

// make sure window is loaded before executing js
window.onload = init;

function init() {

    // places client name in DOM
    let client = document.getElementById('clientName');
    client.innerText = c1.clientName;

    // listen for click event for view  Pets button
    let btn = document.getElementById('clientBtn');
    btn.onclick = function () {
        displayPets(c1)
    };

    // function to display pets
    function displayPets(customer) {

        // find out how many pets client has
        let n = customer.pets.length;

        // clear petsDiv of any previous pets. prevents the list from growing indefinitely
        let pets = document.getElementById('petDiv');
        pets.innerHTML = "";


        // loop for each pet the client has, creates a new p html tag with a class petP
        // displays the pets name and type
        for (let i = 0; i < n; i++) {
            let node = document.createElement("p");
            let text = document.createTextNode(`name: ${customer.pets[i].name} type: ${customer.pets[i].type}`);
            node.appendChild(text);
            node.className = 'petP';
            pets.appendChild(node);
        }
    }
}