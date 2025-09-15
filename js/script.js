const library = [
  {
    id: getUUID(),
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: "Not Read",
    info: "",
  },
  {
    id: getUUID(),
    title: "Practical Object-Oriented Design",
    author: "Sandi Metz",
    pages: 288,
    read: "Not Read",
    info: "",
  },
  {
    id: getUUID(),
    title: "The Practicing Mind",
    author: "Thomas M. Sterner",
    pages: 164,
    read: "Not Read",
    info: "",
  },
  {
    id: getUUID(),
    title: "The Richest Man in Babylon",
    author: "George S. Clason",
    pages: 128,
    read: "Read",
    info: "",
  },
];

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
  let serialNo = document.querySelector("#bookList").children.length + 1
  const bookID = `book-${serialNo}`;
  row(bookList, "tr", bookID);

  // book serial number
  const book = document.getElementsByClassName(bookID);
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
    const update = document.querySelector(`.${bookID} .update`);
    row(update, "button", element).innerText = capitalize(element);
  });
}

function getBookForm() {
  const bookTitle = document.querySelector("#title");
  const bookAuthor = document.querySelector("#author");
  const bookPages = document.querySelector("#pages");
  const bookReadStatus = document.querySelector("#readStatus");
  return { bookTitle, bookAuthor, bookPages, bookReadStatus };
}

function resetFormValues(title, author, pages) {
  title.value = "";
  author.value = "";
  pages.value = "";
}

function addToTable(books) {
  for (let i = 0; i < books.length; i++) {
    createBookColumn(createBookRow);
    updateBookTable(books[i]);
  }
}

function updateBookTable(book) {
  let serialNo = document.querySelector("#bookList").children.length
  let bookClassName = `.book-${serialNo}`;
  console.log(book, bookClassName)
  document.querySelector(`${bookClassName}`).setAttribute("data-id", book.id);
  document.querySelector(`${bookClassName} .serial`).textContent =
    library.length;
  document.querySelector(`${bookClassName} .bookTitle`).textContent =
    book.title;
  document.querySelector(`${bookClassName} .bookAuthor`).textContent =
    book.author;
  document.querySelector(`${bookClassName} .bookPages`).textContent =
    book.pages;
  document.querySelector(`${bookClassName} .bookRead`).textContent = book.read;
}

function addBook() {
  addToTable(library);
  const addBookBtn = document.querySelector("#addBook");
  addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let bookDetails = getBookForm();
    let { bookTitle, bookAuthor, bookPages, bookReadStatus } = bookDetails;

    createBookColumn(createBookRow);

    // Update library object
    let book = createBook(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookReadStatus.value
    );
    addToLibrary(book);
    
    console.log({ bookTitle, bookAuthor, bookPages, bookReadStatus })
    console.log(library);

    updateBookTable(book);
    removeBook();
    updateReadStatus();
  });
}

function removeBook() {
  const removeBookBtns = document.querySelectorAll(".remove");
  removeBookBtns.forEach((element) => {
    element.addEventListener("click", (e) => {
      const parentContainer = e.target.parentElement.parentElement;
      const id = parentContainer.getAttribute("data-id");
      library.forEach((element, index) => {
        if (element.id === id) {
          library.splice(index, 1);
        }
      });
      parentContainer.remove();
      console.log(library);
    });
  });
}

function updateReadStatus() {
  const updateStatusBtn = document.querySelectorAll(".change");
  updateStatusBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      // e.stopPropagation();

      const parentContainer = e.target.parentElement.parentElement;
      const id = parentContainer.getAttribute("data-id");
      const readStatus = parentContainer.querySelector(".bookRead");
      const clickedBtn = e.target;

      library.forEach((element) => {
        if (element.id === id) {
          if (readStatus.innerText === "Not Read") {
            readStatus.innerText = "Read";
            element.read = "Read";
            clickedBtn.remove();
          } else {
            readStatus.innerText = "Not Read";
            element.read = "Not Read";
          }
        }
      });
    });
  });
}

addBook();
