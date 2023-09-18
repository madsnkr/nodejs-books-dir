const books = require('./books.json');

class Model {
  static async findAll() {
    return new Promise((resolve,) => resolve(books));
  }
}

module.exports = Model;
