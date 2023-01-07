const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user. Please provide an user and password"});
});

// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify(books, null, 4))
// });
function getBooks(){
    return new Promise((resolve, reject) => {
        resolve(books)
    });
}

// Get the book list available in the shop with Promises
public_users.get('/',function (req, res) {
    getBooks()
        .then(
            result => res.send(result)
        )
  });

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   const isbn = req.params.isbn
//   res.send(books[isbn]);
//  });

function getByISBN(isbn){
    return new Promise((resolve, reject) => {
        let book = books[isbn]
        if(book){
            resolve(book)
        }
    })
}

// Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    getByISBN(isbn)
        .then(
            result => res.send(result)
        )
   });
  
// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   const author = req.params.author
//   let book = [];
//   Object.keys(books).forEach(i => {
//     if(books[i].author == author){
//         book.push(books[i])
//     }
//   });
//   res.send(book)
// });

function getByAuthor(author){
    return new Promise((resolve, reject) => {
        let book = [];
        Object.keys(books).forEach(i => {
            if(books[i].author == author){
                book.push(books[i])
            }
        });
        if(book.length>0){
            resolve(book)
        }
    });
}

// Get book details based on author using Promise
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    getByAuthor(author)
        .then(
            result => res.send(result)
        )
  });

// // Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//     const title = req.params.title
//     let book = [];
//     Object.keys(books).forEach(i => {
//       if(books[i].title == title){
//           book.push(books[i])
//       }
//     });
//     res.send(book)
// });

function getByTitle(title){
    return new Promise((resolve, reject) => {
        let book = [];
        Object.keys(books).forEach(i => {
            if(books[i].title == title){
                book.push(books[i])
            }  
        });
        if(book.length>0){
            resolve(book);
        }
    });
}

// Get all books based on title using Promise
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    getByTitle(title)
        .then(
            result => res.send(result)
        )
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
