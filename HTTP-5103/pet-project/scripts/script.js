console.log('test');

class Character {
    // might speed, sanity, knowledge are 2 arrays, first element contains position of default stat, second element is array of stat range
    constructor(name, might, speed, sanity, knowledge) {
        this.name = name;
        this.might = might[1][might[0]];
        this.mightArr = might[1];
        this.speed = speed[1][speed[0]];
        this.speedArr = speed[1];
        this.sanity = sanity[1][sanity[0]];
        this.sanityArr = sanity[1];
        this.knowledge = knowledge[1][knowledge[0]];
        this.knowledgeArr = knowledge[1];
    }
}

const darrin = new Character(
    'Darrin "Flash" Williams',
    [3, [-1, 2, 3, 3, 4, 5, 6, 6, 7]],
    [5, [-1, 4, 4, 4, 5, 6, 7, 7, 8]],
    [3, [-1, 1, 2, 3, 4, 5, 5, 5, 7]],
    [3, [-1, 2, 3, 3, 4, 5, 5, 5, 7]]);

flash = document.getElementById('flash');

flash.onclick = function () {
    let val = parseInt(this.value);
    switch (val) {
        case 1:
            showCharacter(darrin);
            break;
        case 2:
            break;
        default:
    }
}


function showCharacter(c) {

    let show = document.getElementById('showChar');
    // remove children first
    while (show.firstChild) {
        show.removeChild(show.lastChild);
    }

    let character = new DocumentFragment();
    let might = paginate(c.might, c.mightArr);
    character.appendChild(might);
    show.appendChild(character);

}

function paginate(mIndex, mightArr) {
    let ul = document.createElement('ul');
    for (let i = 0; i < mightArr.length; i++) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(mightArr[i]));
        if (i === mIndex) {
            li.classList.add('current');
        }
        ul.appendChild(li);
    }
    return ul;
}
