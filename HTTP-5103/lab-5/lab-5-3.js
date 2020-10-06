//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 3:  MAKE THE BANK
//alert("Connected");//COMMENT OUT AS SOON AS YOU KNOW YOU ARE CONNECTED!!!!


let customer = {
    lastName: "Stan",
    branchNumber: 2,
    accountBalance: 20,
    interestRate: 1.10,
    multipleAccounts: true,
    makeDeposit: function (amount) {
        this.accountBalance += amount;
    },
    makeWithdrawal: function (amount) {
        if (amount > this.accountBalance) {
            alert("low on funds");
        } else {
            this.accountBalance -= amount;
        }
    },
    addInterest: function () {
        let interest = this.interestRate;
        let balance = this.accountBalance;
        if (this.multipleAccounts) interest += .005;
        balance *= interest;
        this.accountBalance = balance.toFixed(2);
    }
}

console.log(`Thank you, your balance is now ${customer.accountBalance}`);

customer.makeDeposit(200);
console.log(`Thank you, your balance is now ${customer.accountBalance}`);

customer.makeWithdrawal(75);
console.log(`Thank you, your balance is now ${customer.accountBalance}`);

customer.addInterest();
console.log(`Thank you, your balance is now ${customer.accountBalance}`);