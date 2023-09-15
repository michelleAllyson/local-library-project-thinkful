function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let bk in books) {
    if (books[bk].borrows[0].returned === false) {
      total ++
    }
  }
  return total;
}

//single parameter, array of books
//returns array containg five objects or fewer (.slice 0,5)
//each object in the returned array has two keys:
//'name' key represents the name of the genre
//'count' key represents the number of time the genre occurs

    
  
  function getMostCommonGenres(books) {
    const genresOfBooks = books.map((bk) => bk.genre);
    const fiveCommonGenres = [];
  genresOfBooks.map((genre) => {
      const exists = fiveCommonGenres.findIndex((element) => element.name === genre);
      if (exists >= 0) {
        fiveCommonGenres[exists].count = fiveCommonGenres[exists].count + 1;
      } else {
        fiveCommonGenres.push({ name: genre, count: 1 });
      }
    });
    fiveCommonGenres.sort((a, b) => b.count - a.count);
    if (fiveCommonGenres.length > 5) {
      return fiveCommonGenres.slice(0, 5);
    }
  return fiveCommonGenres;
}




//single parameter: array of books
//returns array containing five objects or fewer (.slice 0,5)
//'name' key represents title of book
//'count' key represents number of times book borrowed
function getMostPopularBooks(books) {
  let allPopularBooks = books.map((bk) => ({name: bk.title, count: bk.borrows.length}));
  let result = allPopularBooks.sort((bkA, bkB) => {
    if (bkA.count > bkB.count) return -1;
    if (bkA.count < bkB.count) return 1;
    return 0;
  })
  return result.slice(0,5);
}

//two parameters: an array of book objects, an array of author objects
//returns array containing five objects or fewer (.slice 0,5) 

function sortAndGiveTopFive(array) {
  return array.sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1)).slice(0,5)
}

const {
  findAuthorById,
} = require('./books.js');

function getMostPopularAuthors(books, authors) {
  const result = books.reduce((acc, book) => {
    const { name: { first, last } } = findAuthorById(authors, book.authorId);
    acc.push({
      name: `${first} ${last}`,
      count: book.borrows.length,
    });
    return acc;
  }, []);
  return sortAndGiveTopFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
