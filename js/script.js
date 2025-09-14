const library = [];

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

addToLibrary(createBook("The Hobbit", "J.R.R. Tolkien", 295, "Not Read"));
addToLibrary(createBook("Practical Object-Oriented Design", "Sandi Metz", 288, "Not Read"))
addToLibrary(createBook("The Practicing Mind", "Thomas M. Sterner", 164, "Not Read"))
addToLibrary(createBook("The Richest Man in Babylon", "George S. Clason", 128, "Read"))
console.log(library[3].info());
