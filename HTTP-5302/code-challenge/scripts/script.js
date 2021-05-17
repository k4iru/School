/* Coding Challenge */
let root = document.getElementById("root");
async function init() {
  let employees = await getEmployees();
  
  for(let e in employees) {
      renderEmployee(employees[e]);
  }
}

// get all employees
async function getEmployees() {
  //let data = [];
  let test;
  let res = await fetch(
    "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"
  )
    .catch((err) => console.error(err));

  return res.json();
}

// spread operator for an undetermined number of roles
async function getRoles(...roles) {
  let res;

  // if no roles are specified get all roles
  if (roles.length == 0) {
    res = await fetch(
      "http://sandbox.bittsdevelopment.com/code1/fetchroles.php"
    ).catch((err) => console.error(err));
  } else {
    // build query string
    let s = "?roles=";
    for (let i = 0; i < roles.length; i++) {
      if (i == 0) {
        s += roles[i].toString();
      } else {
        (s += "," + roles[i]), toString();
      }
    }
    res = await fetch(
      `http://sandbox.bittsdevelopment.com/code1/fetchroles.php${s}`
    ).catch((err) => console.error(err));
  }

  return res.json();
}

// get employee picture
function getPictureUrl(id) {
  return `http://sandbox.bittsdevelopment.com/code1/employeepics/${id}.jpg`;
}

function renderEmployee(e) {
  let fragment = document.createDocumentFragment();

  let container = document.createElement("div");
  container.className = "container";

  let profile = document.createElement("img");
  profile.src = getPictureUrl(e.employeeid);

  container.appendChild(profile);

  let nameText = document.createTextNode(e.employeefname + e.employeelname);
  let name = document.createElement("h1");
  name.appendChild(nameText);

  container.appendChild(name);

  let bioText = document.createTextNode(e.employeebio);
  let bio = document.createElement("p");
  bio.appendChild(bioText);

  container.appendChild(bio);
  fragment.appendChild(container);

  root.appendChild(fragment);
}

init();
