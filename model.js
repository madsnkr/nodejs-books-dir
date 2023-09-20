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

  static async add(fields) {
    return new Promise((resolve,) => {
      const newBook = { id: uuidv4(), ...fields };
      books.push(newBook);

      resolve(newBook);
    });
  }

  static async update(id, fields) {
    return new Promise((resolve,) => {
      const index = books.findIndex((book) => book.id === id);
      books[index] = { ...books[index], ...fields };//Update the book

      resolve(books[index]);
    });
  }

  static async save() {
    try {
      await fsp.writeFile('./books.json', JSON.stringify(books), 'utf8');
    } catch (err) {
      throw new Error(`Failed to save books: ${err.message}`);
    }
  }
}

module.exports = Model;
