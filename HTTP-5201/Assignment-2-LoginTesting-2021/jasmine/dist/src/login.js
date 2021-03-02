
// test username and password hash
let validUsername = "kyle"
let validPassword = "5f4dcc3b5aa765d61d8327deb882cf99" // password

/// a function that checks whether a specified username / password are valid
/// Paramenters 
/// username: a string 
/// password: as string
/// Returns: boolean true if username and password hash match a known one, 
/// otherwise returns an appropriate error message
function checkLogin(username, password) {
    

    // empty string or no input
    if (username === "" || username === undefined) return "No username entered.";
    if (password === "" || password === undefined) return "No password entered.";

    // get password hash
    let hashed = md5Encrypt(password);

    // check if valid username / password
    if (username == validUsername && hashed == validPassword) {
        return true;
    }

    // invalid username / password 
    return "Invalid Username or Password."
}
