let author = document.getElementById("author");
let title = document.getElementById("title");
let pages = document.getElementById("pages");
let read = document.getElementById("read");
let cards = document.getElementById("cards");
let coverURL = document.getElementById("coverURL");
let btnResetForm = document.getElementById("reset");
let btnSubmit = document.getElementById("submit");
let msg = document.getElementById("msg");
let form = document.getElementById("form");
let formFields = document.getElementById("formFields")
let doneBlock = document.getElementById("doneBlock")

const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>`


const library = [];

function book() {
    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value;
    this.read = read.checked;
    this.coverURL = coverURL.value;
    this.id = generateID();
}

function generateID() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4()
}

function clearForm () {
    author.value = "";
    title.value = "";
    pages.value = "";
    read.checked = false;
    coverURL.value = "";
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        let bookObj = new book()
        library.push(bookObj);
        console.log(bookObj.id)
        createBookCard(library[library.indexOf(bookObj, 0)]);
        formFields.style.display = "none";
        doneBlock.style.display = "block"
    } else {
        msg.style.display = "block";
        msg.innerText = "Please fill required fields"
    }
})

btnResetForm.addEventListener('click', (e) => {
    e.preventDefault();
    formFields.style.display = "block";
    doneBlock.style.display = "none";
    btnSubmit.style.display = "block";
    clearForm();
})

function toggleRead(id) {
    let book = library.find(obj => obj.id === id);
    if (!book.read) {
        book.read = true;
    } else if (book.read) {
        book.read = false;
    }
    document.getElementById(`${id}-readArea`).innerHTML = 
        `${book.read ? checkIcon : crossIcon}
        <p class="bold">${book.read ? 'Read' : 'Not read yet'}</p>`
}

function removeBook(id) {
    let book = library.find(obj => obj.id === id);
    library.splice(library.indexOf(book), 1);
    document.getElementById(`${id}-card`).remove();
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card")
    card.id = `${book.id}-card`

    card.innerHTML = 
        `<div class="image-holder">
            <img src="${book.coverURL}" alt="">
        </div>
        <hr>
        <p><span class="bold">Title: </span>${book.title}</p>
        <p><span class="bold">Author: </span>${book.author}</p>
        <p><span class="bold">Pages: </span>${book.pages}</p>
        <div class="footer">
            <div class="read-status" id="${book.id}-readArea">
                    ${book.read ? checkIcon : crossIcon}
                    <p class="bold">${book.read ? 'Read' : 'Not read yet'}</p>
            </div>
            <div class="buttons">
                <div class="button btnMarkRead" onclick="toggleRead('${book.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" /></svg>
                </div>
                <div class="button" btnRemove" onclick="removeBook('${book.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>  
                </div>
            </div>    
        </div>`
        


    
    cards.appendChild(card)
}
