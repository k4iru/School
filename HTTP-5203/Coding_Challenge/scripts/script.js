// DOM elements
let dropDown = document.getElementById("options");
let parkDetails = document.getElementById("out")
let form = document.forms.parks;

// xml request
let xml = new XMLHttpRequest();
let xd;

xml.open("POST", "xml/toronto-parks.xml");
xml.responseType = "document";
xml.send();

// xml on load
xml.onload = function () {

    xd = xml.responseXML;

    // build the select tag and options
    generateDropDown();

    // on form submit
    form.onsubmit = function() {
        
        // get park details
        viewDetails(form.park.value);

        // prevent reload
        return false;
    }
}

// error handling if xml cant find the file
xml.onerror = function() {
    console.log("error loading xml file");
}

// generates the dropdown menu for the form
function generateDropDown() {

    // get all the locations
    let locations = xd.getElementsByTagName("Location")

    // create a select element
    let select = document.createElement("select");
    select.setAttribute("name", "park");

    // iterate through each location
    for (let location of locations) {

        // grab the location name and id from the current location
        let locationId = location.getElementsByTagName("LocationID")[0].textContent;
        let locationName = location.getElementsByTagName("LocationName")[0].textContent;

        // create an option element with the location id as the value and the name as the text content
        let option = document.createElement("option");
        option.setAttribute("value", locationId);
        let text = document.createTextNode(locationName);

        // append the elements
        option.appendChild(text);
        select.appendChild(option);
    }

    // append the dropdown
    dropDown.appendChild(select);
}

// get the details for each park based on the park location id
function viewDetails(id) {

    // get the location based on the id
    let location = xd.evaluate(`//Location[LocationID=${id}]`, xd, null, XPathResult.ANY_TYPE, null);

    // iterate to get the node instead of an xpath result
    location = location.iterateNext();

    // get the facilities
    let facilities = location.getElementsByTagName("FacilityDisplayName");

    // remove the current park details if present
    while (parkDetails.firstChild) {
        parkDetails.removeChild(parkDetails.firstChild);
    }

    // create ul element
    let ul = document.createElement("ul");

    // iterate through each facility at the location
    for (let facility of facilities) {

        // create a li element and set the text as the facility display name
        let li = document.createElement("li");
        let text = document.createTextNode(facility.textContent);

        // append children
        li.appendChild(text);
        ul.appendChild(li);
    } 

    // append the details
    parkDetails.appendChild(ul);
}