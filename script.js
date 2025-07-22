const add = document.querySelector(".add");
const books = document.querySelector(".books");
const bookForm = document.querySelector(".book-form");

add.addEventListener("click", function(){
    if (bookForm.style.display === "none" || bookForm.style.display === "") {
        bookForm.style.display = "block";
    } else {
        bookForm.style.display = "none";
    }
})

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = this.title.value.trim();
    const author = this.author.value.trim();
    const pages = Number(this.pages.value);
    const read = this.read.checked;


    addBookToLibrary(title, author, pages, read);

    this.reset();
    bookForm.style.display = "none";
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    books.innerHTML = "";

    myLibrary.forEach(function(book, index) {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
        <p class="book-title">${book.title}</p>
        <p>Autor: ${book.author}</p>
        <p>Páginas: ${book.pages}</p>
        <p>${book.read ? "Leído" : "No leído"}</p>
        <button class="toggle-read">Cambiar estado</button>
        <button class="delete-book">Eliminar</button>
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