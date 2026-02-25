const container = document.querySelector("#container");

const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.read}, id: ${this.id}`;
};

addBookToLibrary = function (title, author, numberOfPages, read) {
  const book = new Book(title, author, numberOfPages, read);

  myLibrary.push(book);
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "read");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, "not read");
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 365, "read");
addBookToLibrary("The Children of Hurin", "J.R.R. Tolkien", 320, "not read");
addBookToLibrary("The Unfinished Tales", "J.R.R. Tolkien", 400, "read");
addBookToLibrary(
  "The History of Middle-earth",
  "J.R.R. Tolkien",
  500,
  "not read"
);

console.log(myLibrary);

const displayBookButton = document.createElement("button");
displayBookButton.textContent = "Display Library";
document.body.appendChild(displayBookButton);

const newBookButton = document.createElement("button");
newBookButton.textContent = "New Book";
document.body.appendChild(newBookButton);

displayBookButton.addEventListener("click", function () {
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.textContent = book.info();
    bookElement.classList.add("book");
    bookElement.dataset.id = book.id;
    container.appendChild(bookElement);

    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";
    bookElement.appendChild(removeBook);

    removeBook.addEventListener("click", function () {
      const bookId = document.querySelector("[data-id='" + book.id + "']");
      console.log(bookId);
      console.log(myLibrary);
      const bookIndex = myLibrary.findIndex((b) => b.id === bookId);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        bookElement.remove();
      }
    });
    
  });
});

newBookButton.addEventListener("click", function () {
  const bookDialog = document.createElement("dialog");

  const bookForm = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  bookForm.appendChild(titleInput);

  const authorInput = document.createElement("input");
  authorInput.placeholder = "Author";
  bookForm.appendChild(authorInput);

  const pagesInput = document.createElement("input");
  pagesInput.placeholder = "Number of Pages";
  bookForm.appendChild(pagesInput);

  const readInput = document.createElement("select");
  const option1 = document.createElement("option");
  option1.value = "read";
  option1.textContent = "Read";
  readInput.appendChild(option1);
  const option2 = document.createElement("option");
  option2.value = "not read";
  option2.textContent = "Not Read";
  readInput.appendChild(option2);
  bookForm.appendChild(readInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Add Book";
  bookForm.appendChild(submitButton);

  

  bookDialog.appendChild(bookForm);
  document.body.appendChild(bookDialog);
  bookDialog.showModal();

  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value
    );
    bookForm.reset();
    bookDialog.close();
  });
});
