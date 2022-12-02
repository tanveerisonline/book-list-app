/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

// a function to generate unique alpha-numeric id
function genId(length) {
  let id = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = chars.length;
  for (let i = 0; i < length; i += 1) {
    id += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return id;
}

class BookInfo {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookId = genId(8);
  }
}

// Create a class for the collection. This class will contain:

//  a function to remove books

class Collection {
  //  1. a constructor for book data
  constructor() {
    // create an array of BookInfos
    this.bookData = [];
  }

  //  a function to add books
  addBook(singleBook) {
    // push BookInfo to bookData
    this.bookData.push(singleBook);
    // save it to localStorage
    localStorage.setItem('Library', JSON.stringify(this.bookData));
    // add to the webpage
    addToPage(singleBook);
  }

  deleteBook(bookId) {
    // get the book element by id
    const bookElement = document.getElementById(bookId);
    bookElement.remove();
    this.bookData = this.bookData.filter((bookObject) => bookObject.bookId !== bookId);
    localStorage.setItem('Library', JSON.stringify(this.bookData));
  }
}
const collection = new Collection();
// Create a function tp get the from inputs
function readInput() {
  // get book title from the input
  const title = document.getElementById('book-title');
  // get book title from the input
  const author = document.getElementById('book-author');
  const errorMsg = document.getElementById('error');
  const successMsg= document.getElementById('success');
  
    if (title.value === '' && author.value === '') {
    errorMsg.innerHTML = '* All fields are required';
    return false;
  }else if (title.value === '') {
    errorMsg.innerHTML = '* Title Empty';
    return false
  }else if (author.value === '') {
    errorMsg.innerHTML = '* Author Empty';
    return false;
  }
  const singleBookInput = new BookInfo(title.value, author.value);
  // reset the form
  errorMsg.innerHTML = '';
  successMsg.innerHTML = `You added a book! See in the <strong><a onclick="showSec('list')">List</a></strong>`;
  successMsg.classList.remove('d-none');
  
  title.value = '';
  author.value = '';
  return singleBookInput;
}
// Create a function to add data to the page
function addToPage(bookObject) {
  const bookList = document.getElementById('book-list');
  const singleBook = document.createElement('tr');
  const emptyMsg = document.getElementById ('empty-message');
  singleBook.classList.add('single-book');
  singleBook.setAttribute('id', bookObject.bookId);
  singleBook.innerHTML = `<td>${bookObject.title}</td>
  <td>${bookObject.author}</td>`;
  const btnCell = document.createElement('td');
  btnCell.classList.add('btn-cell');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.addEventListener('click', () => {
    collection.deleteBook(bookObject.bookId);
    if (bookList.childNodes.length === 0){
      if (emptyMsg.classList.contains('d-none') === true){
        emptyMsg.classList.remove('d-none');
      }
    }
  });
  
  singleBook.appendChild(btnCell);
  btnCell.appendChild(deleteBtn);
  bookList.appendChild(singleBook);
}

// Code for add button
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
  const singleBook = readInput();
  if (singleBook !== false && singleBook !== null) {
    collection.addBook(singleBook);
  }
  const emptyMsg = document.getElementById ('empty-message');
  if (emptyMsg.classList.contains('d-none') === false){
    emptyMsg.classList.add('d-none');
  }
});

// construct the collection ont the page using data from local storage
window.onload = () => {
  collection.bookData = JSON.parse(localStorage.getItem('Library' || '[]'));
  const emptyMsg = document.getElementById ('empty-message');
  if (collection.bookData === null) {
    collection.bookData = [];
    if (emptyMsg.classList.contains('d-none') === true){
      emptyMsg.classList.remove('d-none');
    }
    return;
  }
  
  
  collection.bookData.forEach((singleBook) => addToPage(singleBook));
  document.getElementById('date').innerHTML = Date();
};

// menu

function showSec(section) {
  const secBookList = document.getElementById('list');
  const secBookForm = document.getElementById('add-book');
  const secContact = document.getElementById('contact');
  const successMsg = document.getElementById('success')

  switch (section) {
    case 'list':
      if (secBookList.classList.contains('d-none')) {
        secBookList.classList.remove('d-none');
        secBookForm.classList.add('d-none');
        secContact.classList.add('d-none');
      }
      break;

    case 'form':
      if (secBookForm.classList.contains('d-none')) {
        secBookForm.classList.remove('d-none');
        secBookList.classList.add('d-none');
        secContact.classList.add('d-none');
        successMsg.classList.add('d-none');
      }
      break;

    case 'contact':
      if (secContact.classList.contains('d-none')) {
        secContact.classList.remove('d-none');
        secBookForm.classList.add('d-none');
        secBookList.classList.add('d-none');
      }
      break;

    default: break;
  }
}
