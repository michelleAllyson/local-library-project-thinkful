//ALL FUNCTIONS COMPLETE AND PASSED//

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//takes in an array of book objects. It returns an array with two arrays inside of it (returned: true and returned:false)

function partitionBooksByBorrowedStatus(books) {
  let booksOut = books.filter(bk => {
    return bk.borrows[0].returned === false;
  });
  let booksIn = books.filter(bk => {
    return bk.borrows[0].returned === true;
  });
  return [booksOut, booksIn];
}


//two parameters: a book object, an array of all account objects
//return an array of ten or fewer account objects that represent the accounts given by the IDs in the book's 'borrows' array. 
//object should include the 'returned' entry from corresponding transation object in the 'borrows' array.
function getBorrowersForBook(book, accounts) {
  let borrows = [];
  accounts.forEach((acct) => {
    book.borrows.forEach((transaction) => {
      if (transaction.id === acct.id) {
        let acctObj = {...acct};
        acctObj.returned = transaction.returned;
        borrows.push(acctObj);
      }
    });
  });
  return borrows.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
