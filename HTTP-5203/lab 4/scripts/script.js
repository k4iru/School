let xml = new XMLHttpRequest();
let xd; // xml document

xml.open("POST", "xml/books.xml");
xml.responseType = "document";
xml.send();

xml.onload = function() {
    let form = document.forms.book_form;
    xd = xml.responseXML;
    generateTable();

    form.onsubmit = function() {
        createPerson();
        generateTable();


        // prevent default form behaviour
        return false;
    }
}

xml.onerror = function() {
    console.log("error loading the xml file");
}

function generateTable() {
    let output = document.getElementById("tableResults");

    // read the xml DOM
    let books = xd.getElementsByTagName("book");
    let trow = "";
    let middle = "";
    
    for (let i = 0; i < books.length; i++) {
        let id = books[i].getElementsByTagName("id")[0].textContent;
        let bookTitle = books[i].getElementsByTagName("title")[0].textContent;
        let author = books[i].getElementsByTagName("author")[0];
        let authorTitle = author.getAttribute("title");
        let first = author.getElementsByTagName("firstname")[0].textContent;
        
        if (author.getElementsByTagName("middlename").length !== 0) {
            middle = author.getElementsByTagName("middlename")[0].textContent;
        }
        else {
            middle = "";
        }
       
        let last = author.getElementsByTagName("lastname")[0].textContent;
        trow += `<tr>
        <td>${id}</td>
        <td>${bookTitle}</td>
        <td>${last}, ${authorTitle} ${first} ${middle} <button type="button" class="remove">Remove</button></td>
        </tr>`
    };

    output.innerHTML = trow;

    let btns = document.getElementsByClassName("remove");
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            let indexNum = this.parentElement.parentElement.rowIndex - 1;
            let rem = xd.getElementsByTagName("book")[indexNum];
            xd.documentElement.removeChild(rem);
            generateTable();
        }
    }

}

function createPerson() {
    let form = document.forms.book_form;
    // create new book node
    let book = xd.createElement("book");

    // used to make child nodes line up to access id.
    let buffNode = xd.createElement("Text");
    book.appendChild(buffNode);

    let bookId = xd.createElement("id");

    // get last book id, increment by 1 and pad with 0s.
    let id;
    let result = xd.evaluate("//book[last()]", xd, null, XPathResult.ANY_TYPE, null);

    // get the last book node
    while (node = result.iterateNext()) {
        id = node;
    }


    id = id.childNodes[1].textContent;
    id = pad(parseInt(id) + 1, 4);

    let idtext = xd.createTextNode(id);
    bookId.appendChild(idtext);
    book.appendChild(bookId);

    // book title
    let title = xd.createElement("title");
    let bookTitle = form.book.value;
    let titletext = xd.createTextNode(bookTitle);
    title.appendChild(titletext);
    book.appendChild(title);

    // author
    let author = xd.createElement("author");

    // attribute
    let att = xd.createAttribute("title");
    let arthurTitle = form.title.value;
    att.value = arthurTitle;
    author.setAttributeNode(att);

    // first
    let first = xd.createElement("firstname")
    let fname = form.fname.value;
    let fnametext = xd.createTextNode(fname);
    first.appendChild(fnametext);
    author.appendChild(first);

    // middle
    let middle = xd.createElement("middlename")
    let mname = form.mname.value;
    let mnametext = xd.createTextNode(mname);
    middle.appendChild(mnametext);
    author.appendChild(middle);

    // last
    let last = xd.createElement("lastname");
    let lname = form.lname.value;
    let lnametext = xd.createTextNode(lname);
    last.appendChild(lnametext);
    author.appendChild(last);

    book.appendChild(author);

    xd.documentElement.appendChild(book);
}

function pad(n, width) {
    z = '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }