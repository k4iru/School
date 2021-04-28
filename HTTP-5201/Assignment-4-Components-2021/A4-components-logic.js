//ASSIGNMENT 4 WEB COMPONENTS
//LOGIC FILE
//IN THIS FILE YOU WILL SIMPLY GRAB YOUR CUSTOM ELEMENT AND ATTACH YOUR METHOD FROM YOUR MODULE TO IT.

class HumberCountDown extends HTMLElement {
  constructor() {
    super();
    let template = document.querySelector("template");
    let templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateContent.cloneNode(true)
    );
  }
  // once loaded get how many days left
  connectedCallback() {
    let daysLeft = this.shadowRoot.getElementById("days-left");
    daysLeft.innerText = Semester.getDaysLeft();
  }

  // check days left if element moved
  adoptedCallback() {
    let daysLeft = this.shadowRoot.getElementById("days-left");
    daysLeft.innerText = Semester.getDaysLeft();
  }
}

// define the custom element
customElements.define("humber-countdown", HumberCountDown);
