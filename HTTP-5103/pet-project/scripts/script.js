

class Character {
    // might speed, sanity, knowledge are 2 arrays, first element contains position of default stat, second element is array of stat range
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

const darrin = new Character(
    'Darrin "Flash" Williams',
    [3, [-1, 2, 3, 3, 4, 5, 6, 6, 7]],
    [5, [-1, 4, 4, 4, 5, 6, 7, 7, 8]],
    [3, [-1, 1, 2, 3, 4, 5, 5, 5, 7]],
    [3, [-1, 2, 3, 3, 4, 5, 5, 5, 7]]
);

const heather = new Character(
    'Heather Granville',
    [3, [-1, 3, 3, 3, 4, 5, 6, 7, 8]],
    [3, [-1, 3, 3, 4, 5, 6, 6, 7, 8]],
    [3, [-1, 3, 3, 3, 4, 5, 6, 6, 6]],
    [5, [-1, 2, 3, 3, 4, 5, 6, 7, 8]]
);

console.log(heather.name);

c1 = document.getElementById('flash');
c2 = document.getElementById('heather');


c1.onclick = function() {showCharacter(darrin);};
c2.onclick = function() {showCharacter(heather);};


function showCharacter(c) {

    let show = document.getElementById('showChar');
    // remove children first
    while (show.firstChild) {
        show.removeChild(show.lastChild);
    }

    let character = new DocumentFragment();
    let might = paginate(c.mightIndex, c.mightArr);
    let speed = paginate(c.speedIndex, c.speedArr);
    let sanity = paginate(c.sanityIndex, c.sanityArr);
    let knowledge = paginate(c.knowledgeIndex, c.knowledgeArr);
    character.appendChild(might);
    character.appendChild(speed);
    character.appendChild(sanity);
    character.appendChild(knowledge);
    show.appendChild(character);

}

function paginate(index, arr) {
    let ul = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(arr[i]));
        li.dataset.index = i;
        if (i === index) {
            li.classList.add('current');
        }
        ul.appendChild(li);
    }
    return ul;
}
