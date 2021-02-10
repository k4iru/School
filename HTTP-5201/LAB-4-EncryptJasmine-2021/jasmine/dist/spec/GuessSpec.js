describe("Number Guesser Suite", function () {

    // test to pass
    it("Entered 4 should return 'You guessed it!`", function () {
        expect(guessNum(4)).toEqual("You guessed it!");
    });

    // test to pass 
    it("Entered 2 should return 'Guess again'", function () {
        expect(guessNum(2)).toEqual("Guess again.");
    });

    // test to fail undefined input
    it("Should not return 'A value was not entered.'", function () {
        expect(guessNum()).not.toEqual("A value was not entered.");
    });

    // test to fail not a number
    it("Entered '' should not return 'A number was not input.'", function () {
        expect(guessNum("")).not.toEqual("A number was not input.");
    });

    // boundary test lower out of limits
    it("Entered 1 should return 'Guess again.'", function () {
        expect(guessNum(1)).toEqual("Guess again.");
    });

    // boundary test higher out of limits
    it("Entered 10 should return 'Guess again.'", function () {
        expect(guessNum(10)).toEqual("Guess again.");
    });

    // boundary test lower within limits
    it("Entered 2 should return 'Guess again.'", function () {
        expect(guessNum(2)).toEqual("Guess again.");
    });

    // boundary test higher within limits
    it("Entered 9 should return 'Guess again.'", function () {
        expect(guessNum(9)).toEqual("Guess again.");
    });

    // boundary test lower out of limits
    it("Entered 0 should return 'Way off!!!!Pick between 1 and 10.", function () {
        expect(guessNum(0)).toEqual("Way off!!!!Pick between 1 and 10.");
    });

    // boundary test higher out of limits
    it("Entered 11 should return 'Way off!!!!Pick between 1 and 10.", function () {
        expect(guessNum(11)).toEqual("Way off!!!!Pick between 1 and 10.");
    });

    it("Entered 'df' should return 'A number was not inputed'", function () {
        expect(guessNum('df')).toEqual("A number was not input.");
    });

    it("Should return 'A value was not entered.'", function() {
        expect(guessNum()).toEqual("A number was not input.");
    });

    it("Entered 4 should return 'You guessed it!'", function() {
        expect(guessNum('4')).toEqual("You guessed it!");
    });

    it("Should return 'Way off!!!!Pick between 1 and 10.", function () {
        expect(guessNum(-5)).toEqual("Way off!!!!Pick between 1 and 10.");
    });

});