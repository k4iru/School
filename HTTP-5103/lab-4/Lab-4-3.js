//LAB 4 - ARRAYS & LOOPS - PART 3
//alert("Part 3");//COMMENT THIS OUT ONCE CONNECTED
//PART 3 - SHOPPING CART SHIPPING
//==== VARIABLES ========
let userPrices = [];
let total = 0;

//==== LOGIC ========
//CHECK FOR ITEMS UNTIL THRESHOLD IS MET.
while (total < 35) {
	let item = prompt("Dollar value of next item");

	if (isNaN(item)) {
		alert('invalid input');
	} else {
		let value = parseInt(item);
		userPrices.push(value);
		total += value;
	}
}

alert(`Your shipping for this order will be free Total price: ${total}`);

console.log(`Item prices: ${userPrices.join(" | ")}`)
	//GET ITEM COST FROM USER
	

	//MAKE USER INPUT A NUMBER
	

	
	//ADD ITEM PRICE TO CART ARRAY
	
	
	


//SEND POPUP MESSAGE TO USER


//SEND OUTPUT TO CONSOLE

