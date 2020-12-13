// declare characters
let darrin;
let ox;
let heather;
let jenny;
let father;
let professor;
let madame;
let vivian;
let missy;
let zoe;
let brandon;
let peter;

// grab DOM elements
const show1 = document.getElementById('showChar1');
const show2 = document.getElementById('showChar2');
const show3 = document.getElementById('showChar3');
const show4 = document.getElementById('showChar4');
const show5 = document.getElementById('showChar5');
const show6 = document.getElementById('showChar6');

const c1 = document.getElementById('flash');
const c2 = document.getElementById('heather');
const c3 = document.getElementById('father');
const c4 = document.getElementById('madame');
const c5 = document.getElementById('missy');
const c6 = document.getElementById('brandon');

const reset = document.getElementById('reset');

// Character builder
class Character {
    //name is a string
    // stats are taken as an array where the first element is the index position of that stats default value,
    // and the 2nd element is an array for the stat range
    constructor(name, might, speed, sanity, knowledge) {
        this.name = name;
        this.mightIndex = might[0];
        this.mightArr = might[1];
        this.speedIndex = speed[0];
        this.speedArr = speed[1];
        this.sanityIndex = sanity[0];
        this.sanityArr = sanity[1];
        this.knowledgeIndex = knowledge[0];
        this.knowledgeArr = knowledge[1];
    }
}

// pressing on the button with a characters name will switch them to their counterpart
function switchChar(button, showHere, c1, c2) {
    if (button.innerText === c1.name) {
        button.innerText = c2.name;
        showCharacter(c2, showHere);
    }
    else {
        button.innerText = c1.name;
        showCharacter(c1, showHere);
    }
}

// displays the character on the specified DOM element
function showCharacter(c, show) {

    // clear away characters before appending a new one
    while (show.firstChild) {
        show.removeChild(show.lastChild);
    }

    // use a documentFragment to decrease amount of times we need to modify DOM
    let character = new DocumentFragment();

    // pass specific increase and decrease
    let might = getStat('might', c, c.mightIndex, c.mightArr, mdecrease, mincrease);
    let speed = getStat('speed', c, c.speedIndex, c.speedArr, sdecrease, sincrease);
    let sanity = getStat('sanity', c, c.sanityIndex, c.sanityArr, sadecrease, saincrease);
    let knowledge = getStat('knowledge', c, c.knowledgeIndex, c.knowledgeArr, kdecrease, kincrease);

    // append to fragment
    character.appendChild(might);
    character.appendChild(speed);
    character.appendChild(sanity);
    character.appendChild(knowledge);

    // append fragment to DOM
    show.appendChild(character);

}

// populate stat table
function getStat(str, c, index, arr, decrease, increase) {
    // create html elements
    let ul = document.createElement('ul');
    let b1 = document.createElement('button');
    let b2 = document.createElement('button');
    let span = document.createElement('span');
    span.className = 'stat';

    span.innerText = str;
    ul.appendChild(span);
    // buttons for increasing and decreasing stats
    b1.appendChild(document.createTextNode('<'));
    b2.appendChild(document.createTextNode('>'));

    // build event listeners and use specified increase and decrease functions
    b1.onclick = function () { decrease(c, ul); };
    b2.onclick = function () { increase(c, ul); };

    // decrease button
    ul.appendChild(b1);

    // populate stats
    for (let i = 0; i < arr.length; i++) {

        // first element is a skull for death
        let li = document.createElement('li');
        if (i === 0) {
            li.innerHTML = "<i class=\"fas fa-skull\"></i>";
        }

        // append values from array
        else {
            li.appendChild(document.createTextNode(arr[i]));
        }

        // highlight default for current stat
        if (i === index) {
            li.classList.add('current');
        }
        ul.appendChild(li);
    }

    // increase button
    ul.appendChild(b2);

    // return the stat list
    return ul;
}

// might button handlers
function mdecrease(c, ul) {

    // only decrease if greater than 0
    if (c.mightIndex > 0) {

        // update the current class
        ul.childNodes[c.mightIndex + 1].classList = ''
        c.mightIndex--;
        ul.childNodes[c.mightIndex + 1].classList = 'current'
        if (c.mightIndex === 0) {
            ul.childNodes[c.mightIndex + 1].classList = 'dead'
        }

    }
}

function mincrease(c, ul) {
    if (c.mightIndex < c.mightArr.length - 1) {
        ul.childNodes[c.mightIndex + 1].classList = ''
        c.mightIndex++;
        ul.childNodes[c.mightIndex + 1].classList = 'current'

    }
}

// speed button handlers
function sdecrease(c, ul) {
    if (c.speedIndex > 0) {
        ul.childNodes[c.speedIndex + 1].classList = ''
        c.speedIndex--;
        ul.childNodes[c.speedIndex + 1].classList = 'current'
        if (c.speedIndex === 0) {
            ul.childNodes[c.speedIndex + 1].classList = 'dead'
        }

    }
}

function sincrease(c, ul) {
    if (c.speedIndex < c.speedArr.length - 1) {
        ul.childNodes[c.speedIndex + 1].classList = ''
        c.speedIndex++;
        ul.childNodes[c.speedIndex + 1].classList = 'current'
    }
}

// sanity button hanmdlers 
function sadecrease(c, ul) {
    if (c.sanityIndex > 0) {
        ul.childNodes[c.sanityIndex + 1].classList = ''
        c.sanityIndex--;
        ul.childNodes[c.sanityIndex + 1].classList = 'current'
        if (c.sanityIndex === 0) {
            ul.childNodes[c.sanityIndex + 1].classList = 'dead'
        }

    }
}

function saincrease(c, ul) {
    if (c.sanityIndex < c.sanityArr.length - 1) {
        ul.childNodes[c.sanityIndex + 1].classList = ''
        c.sanityIndex++;
        ul.childNodes[c.sanityIndex + 1].classList = 'current'
    }
}

//knowledge button handlers
function kdecrease(c, ul) {
    if (c.knowledgeIndex > 0) {
        ul.childNodes[c.knowledgeIndex + 1].classList = ''
        c.knowledgeIndex--;
        ul.childNodes[c.knowledgeIndex + 1].classList = 'current'
        if (c.knowledgeIndex === 0) {
            ul.childNodes[c.knowledgeIndex + 1].classList = 'dead'
        }

    }
}

function kincrease(c, ul) {
    if (c.knowledgeIndex < c.knowledgeArr.length - 1) {
        ul.childNodes[c.knowledgeIndex + 1].classList = ''
        c.knowledgeIndex++;
        ul.childNodes[c.knowledgeIndex + 1].classList = 'current'
    }
}

// default values and reset values
function init() {

    darrin = new Character(
        'Darrin "Flash" Williams',
        [3, [-1, 2, 3, 3, 4, 5, 6, 6, 7]],
        [5, [-1, 4, 4, 4, 5, 6, 7, 7, 8]],
        [3, [-1, 1, 2, 3, 4, 5, 5, 5, 7]],
        [3, [-1, 2, 3, 3, 4, 5, 5, 5, 7]]
    );

    ox = new Character(
        'Ox Bellows',
        [3, [-1, 4, 5, 5, 6, 6, 7, 8, 8]],
        [5, [-1, 2, 2, 2, 3, 4, 5, 5, 6]],
        [3, [-1, 2, 2, 3, 4, 5, 5, 6, 7]],
        [3, [-1, 2, 2, 3, 3, 5, 5, 6, 6]]
    );

    heather = new Character(
        'Heather Granville',
        [3, [-1, 3, 3, 3, 4, 5, 6, 7, 8]],
        [3, [-1, 3, 3, 4, 5, 6, 6, 7, 8]],
        [3, [-1, 3, 3, 3, 4, 5, 6, 6, 6]],
        [5, [-1, 2, 3, 3, 4, 5, 6, 7, 8]]
    );

    jenny = new Character(
        'Jenny LeClerc',
        [3, [-1, 3, 4, 4, 4, 4, 5, 6, 8]],
        [4, [-1, 2, 3, 4, 4, 4, 5, 6, 8]],
        [5, [-1, 1, 1, 2, 4, 4, 4, 5, 6]],
        [3, [-1, 2, 3, 3, 4, 4, 5, 6, 8]]
    );

    father = new Character(
        'Father Rhinehardt',
        [3, [-1, 1, 2, 2, 4, 4, 5, 5, 7]],
        [3, [-1, 2, 3, 3, 4, 5, 6, 7, 7]],
        [5, [-1, 3, 4, 5, 5, 6, 7, 7, 8]],
        [4, [-1, 1, 3, 3, 4, 5, 6, 6, 8]]
    );

    professor = new Character(
        'Professor Longfellow',
        [3, [-1, 1, 2, 3, 4, 5, 5, 6, 6]],
        [4, [-1, 2, 2, 4, 4, 5, 5, 6, 6]],
        [3, [-1, 1, 3, 3, 4, 5, 5, 6, 7]],
        [6, [-1, 4, 5, 5, 5, 5, 6, 7, 8]]
    );

    madame = new Character(
        'Madame Zostra',
        [4, [-1, 2, 3, 3, 4, 5, 5, 5, 6]],
        [3, [-1, 2, 3, 3, 5, 5, 6, 6, 7]],
        [3, [-1, 4, 4, 4, 5, 6, 7, 8, 8]],
        [4, [-1, 1, 3, 4, 4, 4, 5, 6, 6]]
    );

    vivian = new Character(
        'Vivian Lopez',
        [3, [-1, 2, 2, 2, 4, 4, 5, 6, 6]],
        [4, [-1, 3, 4, 4, 4, 4, 6, 7, 8]],
        [3, [-1, 4, 4, 4, 5, 6, 7, 8, 8]],
        [4, [-1, 4, 5, 5, 5, 5, 6, 6, 7]]
    );

    missy = new Character(
        'Missy Dubourde',
        [4, [-1, 2, 3, 3, 3, 4, 5, 6, 7]],
        [3, [-1, 3, 4, 5, 6, 6, 6, 7, 7]],
        [3, [-1, 1, 2, 3, 4, 5, 5, 6, 7]],
        [4, [-1, 2, 3, 4, 4, 5, 6, 6, 6]]
    );

    zoe = new Character(
        'Zoe Ingstrom',
        [4, [-1, 2, 2, 3, 3, 4, 4, 6, 7]],
        [4, [-1, 4, 4, 4, 4, 5, 6, 8, 8]],
        [3, [-1, 3, 4, 5, 5, 6, 6, 7, 8]],
        [3, [-1, 1, 2, 3, 4, 4, 5, 5, 5]]
    );

    brandon = new Character(
        'Brandon Jaspers',
        [4, [-1, 2, 3, 3, 4, 5, 6, 6, 7]],
        [3, [-1, 3, 4, 4, 4, 5, 6, 7, 8]],
        [4, [-1, 3, 3, 3, 4, 5, 6, 7, 8]],
        [3, [-1, 1, 3, 3, 5, 5, 6, 6, 7]]
    );

    peter = new Character(
        'Peter Akimoto',
        [3, [-1, 2, 3, 3, 4, 5, 5, 6, 8]],
        [4, [-1, 3, 3, 3, 4, 6, 6, 7, 7]],
        [4, [-1, 3, 4, 4, 4, 5, 6, 6, 7]],
        [3, [-1, 3, 4, 4, 5, 6, 7, 7, 8]]
    );

    showCharacter(darrin, show1);
    showCharacter(heather, show2);
    showCharacter(father, show3);
    showCharacter(madame, show4);
    showCharacter(missy, show5);
    showCharacter(brandon, show6);
}

// event listeners
c1.onclick = function () { switchChar(c1, show1, darrin, ox); };
c2.onclick = function () { switchChar(c2, show2, heather, jenny); };
c3.onclick = function () { switchChar(c3, show3, father, professor); };
c4.onclick = function () { switchChar(c4, show4, madame, vivian); };
c5.onclick = function () { switchChar(c5, show5, missy, zoe); };
c6.onclick = function () { switchChar(c6, show6, brandon, peter); };


// reset values
reset.onclick = function() {
    init();
}

init();