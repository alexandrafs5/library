const add = document.querySelector(".add");
const books = document.querySelector(".books");
const bookForm = document.querySelector(".book-form");
const dialog = document.querySelector(".form-dialog");

add.addEventListener("click", function () {
    dialog.showModal();
})

bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = this.title.value.trim();
    const author = this.author.value.trim();
    const pages = Number(this.pages.value);
    const read = this.read.checked;


    addBookToLibrary(title, author, pages, read);

    this.reset();
    dialog.close();
});

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    books.innerHTML = "";

    myLibrary.forEach(function (book, index) {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
        <p class="book-title">${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>${book.read ? "Read" : "Not read"}</p>
        <button class="toggle-read">Change status</button>
        <button class="delete-book">Delete</button>
        `;

        const toggleBtn = card.querySelector(".toggle-read");
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const deleteBtn = card.querySelector(".delete-book");
        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        books.appendChild(card);
    });
}