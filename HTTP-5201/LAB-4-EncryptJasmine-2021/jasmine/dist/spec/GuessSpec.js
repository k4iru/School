describe("Number Guesser Suite", function() {
    it("Should return 'You guessed it!` if correct", function() {
        expect(guessNum(4)).toEqual("You guessed it!");
    });
});