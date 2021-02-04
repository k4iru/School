//LAB 3 - UNIT TESTING
//======== THIS FILE IS FOR THE checkHumbrId FUNCTION ==========
function checkHumbrId(id) {
    "use strict";
    let regex = /^[nN]\d{8}$/;

    if (regex.test(id) === true) {
        return true;
    } else {
        return false;
    }
}

/** checkHumbrId Function
 * Validate input as a Humber College Student number.
 * Returns true if input validates.
 * @param {string} idIn
 */
