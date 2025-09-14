const library = [];

// Book
function Book(title, author, pages, read) {
  this.id = getUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function createBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  return newBook;
}

function getUUID() {
  return crypto.randomUUID();
}

function addToLibrary(newBook) {
  library.push(newBook);
  return library;
}

// Utility
function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function createBookRow(parentElement, elementName, elementClass) {
  const book = document.createElement(elementName);
  book.className = elementClass;
  parentElement.appendChild(book);
  return book;
}

// Table
function createBookColumn(row) {
  // book row
  const bookList = document.querySelector("#bookList");
  const bookID = `book`;
  row(bookList, "tr", bookID);

  // book serial number
  const book = document.getElementsByClassName(bookID);
  console.log(book[0]);
  row(book[0], "th", "serial");

  // create elements for book details
  childClassList = [
    "bookTitle",
    "bookAuthor",
    "bookPages",
    "bookRead",
    "update",
  ];

  childClassList.forEach((element) => {
    row(book[0], "th", element);
  });

  // create buttons
  ["change", "remove"].forEach((element) => {
    const update = document.querySelector(".update");
    row(update, "button", element).innerText = capitalize(element);
  });
}

addToLibrary(createBook("The Hobbit", "J.R.R. Tolkien", 295, "Not Read"));
addToLibrary(
  createBook("Practical Object-Oriented Design", "Sandi Metz", 288, "Not Read")
);
addToLibrary(
  createBook("The Practicing Mind", "Thomas M. Sterner", 164, "Not Read")
);
addToLibrary(
  createBook("The Richest Man in Babylon", "George S. Clason", 128, "Read")
);
createBookColumn(createBookRow);
