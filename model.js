const books = require('./books.json');
const fsp = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

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

  static async create(fields) {
    return new Promise((resolve,) => {
      const newBook = { id: uuidv4(), ...fields };

      books.push(newBook);
      fsp.writeFile('./books.json', JSON.stringify(books), 'utf8');

      resolve(newBook);
    });
  }
}

module.exports = Model;
