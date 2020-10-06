//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 2:  I OBJECT!
//alert("Connected");//COMMENT OUT AS SOON AS YOU KNOW YOU ARE CONNECTED!!!!

let meObject = {
    name: "Kyle",
    dexterity: 10,
    wisdom: 1,
    intelligence: 2,
    foo: function () {
        alert(`My name is ${this.name} my dexterity is ${this.dexterity}`);

    }
};

console.log(meObject.name);

//alert(`My name is ${meObject.name} my dexterity is ${meObject.dexterity}`);

meObject.foo();