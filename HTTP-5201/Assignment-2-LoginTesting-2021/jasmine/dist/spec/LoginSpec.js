describe("md5 encryption", function() {
    it("should return a 32 character string", function() {
        expect(md5Encrypt("password")).toMatch(/^\w{32}$/);
    });
});

describe("login validation", function() {

    // test to pass
    it("should return true", function() {
        expect(checkLogin("kyle", "password")).toBeTrue();
    });

    it("should return 'No username entered.'", function() {
        expect(checkLogin()).toMatch("No username entered.");
    })

    it("should return 'No password entered.'", function() {
        expect(checkLogin("kyle")).toMatch("No password entered.");
    });

    it("should return 'Invalid Username or Password.'", function() {
        expect(checkLogin("kyle", "notpassword")).toMatch("Invalid Username or Password.");
    });

    // test to fail
    it("no input should not return true", function() {
        expect(checkLogin()).not.toBeTrue();
    })

    // test to fail
    it("missing password should not return true", function() {
        expect(checkLogin("kyle")).not.toBeTrue();
    });

    it("incorrect password should not return true", function() {
        expect(checkLogin("kyle", "notpassword")).not.toBeTrue();
    });
});