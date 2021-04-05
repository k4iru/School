//LAB 7 - MODULES - LOGIC FILE
//THIS FILE CONTAINS ALL OF THE LOGIC THAT BELONGS WITH THE HTML PAGE - window.onload ETC. IN HERE YOU WILL REFERENCE AND USE YOUR MODULE.

class NameTag extends HTMLElement {
    constructor() {
        super();
        let template = document.querySelector("template");
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
        this.onclick = function(){citeMe()};
    }
}

customElements.define('name-tag', NameTag);

function citeMe() {
    //console.log("test");
    myModNS.citeMe("test");
}