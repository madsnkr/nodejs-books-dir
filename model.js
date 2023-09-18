const books = require('./books.json');

class Model {
  static async findAll() {
    return new Promise((resolve,) => resolve(books));
  }

  static async findOne(id) {
    return new Promise((resolve,) => {
      const book = books.find((book) => book.id === id);

      resolve(book);
    });
  }
}

module.exports = Model;
