const Book = require("./model.js");
//const books = require("./books.json");
const { getBodyData } = require('./utils.js');

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

const getBook = async (req, res, id) => {
  try {
    const book = await Book.findOne(id);

    if (!book) return res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book not found" }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

const createBook = async (req, res) => {
  try {
    const body = await getBodyData(req);
    const { title, desc } = JSON.parse(body);

    if (!title || !desc) return res
      .writeHead(400, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book needs to have a title and description" }));

    const newBook = await Book.create({ title, desc });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newBook));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

module.exports = { getBooks, getBook, createBook };
