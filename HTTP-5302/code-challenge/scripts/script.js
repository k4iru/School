/* Coding Challenge */
/* Kyle Cheung */

// root element to append employees to
let root = document.getElementById("root");

/**
 * Main initialize function
 */
async function init() {
  let employees = await getEmployees();

  // iterate employees and render each one
  for (const [_, value] of Object.entries(employees)) {
    renderEmployee(value);
  }
}

/**
 * creates an api request for a list of all employees
 * @returns {Object}
 */
async function getEmployees() {
  try {
    const response = fetch(
      "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"
    );

    const data = await (await response).json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}


/**
 * Returns a url string for the employee profile picture
 * @param {number} id 
 * @returns {string}
 */
function getPictureUrl(id) {
  return `http://sandbox.bittsdevelopment.com/code1/employeepics/${id}.jpg`;
}

// render employee roles returns a f
function renderRoles(roles) {

  // create fragment to avoid working directly with DOM
  let fragment = document.createDocumentFragment();

  // create container for employee roles
  let container = document.createElement("div");
  container.className = "role__container";

  // add each role
  roles.forEach(role => {
    const rolename = role.rolename;

    let roleText = document.createTextNode(rolename);
    let roleNode = document.createElement("span");
    roleNode.appendChild(roleText);
    roleNode.className = `${rolename} role`;
    container.appendChild(roleNode);

  });

  fragment.appendChild(container);

  return fragment;

}

/**
 * Renders each employee
 * @param {Employee Object} e 
 */
function renderEmployee(e) {

  // create fragment to contain employees to avoid working directly with DOM until needed
  let fragment = document.createDocumentFragment();

  // destructure roles array
  const { roles } = e;

  let container = document.createElement("div");
  container.className = "container";

  // add a crown to the container if employee is featured
  if (e.employeeisfeatured == 1) {
    let crown = document.createElement("span");

    // insert html entity code
    crown.innerHTML = "&#128081;";
    crown.className = "crown";
    container.appendChild(crown);
  }

  // profile image
  let profile = document.createElement("img");
  profile.src = getPictureUrl(e.employeeid);
  container.appendChild(profile);

  // employee name
  let nameText = document.createTextNode(e.employeefname + " " + e.employeelname);
  let name = document.createElement("h1");
  name.appendChild(nameText);
  container.appendChild(name);

  // employee bio
  let bioText = document.createTextNode(e.employeebio);
  let bio = document.createElement("p");
  bio.appendChild(bioText);
  container.appendChild(bio);

  // roles
  container.appendChild(renderRoles(roles));

  // attach fragment to root node
  fragment.appendChild(container);
  root.appendChild(fragment);
}

// init page
init();
