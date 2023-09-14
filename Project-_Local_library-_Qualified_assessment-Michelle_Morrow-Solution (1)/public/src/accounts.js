//ALL FUNCTIONS COMPLETE AND PASSED//


function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
   accountA.name.last > accountB.name.last ? 1: -1);
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let index in books) {
    if (books[index].borrows.find((lib)=> lib.id === account.id)){
      total++
    }
  }
  return total;
}

//taking in accunt object, array of all books objects, array of all author objects
//it returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account.
function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];
  books.forEach((bk) => {
    const {id, title, genre, borrows} = bk;
    borrows.forEach((lend) => {
      if (lend.id === account.id && lend.returned === false) {
        authors.forEach(author => {
          if (author.id == bk.authorId) {
            let thisBook = {id, title, genre, author, borrows};
            possessedBooks.push(thisBook);
          }
        })
      }
    })
  })
  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
