const Book = require("./model.js");
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
    const foundBook = await Book.findOne(id);

    if (!foundBook) return res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book not found" }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(foundBook));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

const addBook = async (req, res) => {
  try {
    const body = await getBodyData(req);
    const { title, desc } = JSON.parse(body);

    if (!title || !desc) return res
      .writeHead(400, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book needs to have a title and description" }));

    const newBook = await Book.add({ title, desc });
    await Book.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newBook));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

const updateBook = async (req, res, id) => {
  try {
    let body = await getBodyData(req);

    const foundBook = await Book.findOne(id);

    if (!foundBook) return res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book not found" }));

    const fields = Object.fromEntries(Object.entries(JSON.parse(body)).filter(([, v]) => v !== ''));//Exclude empty fields

    if (Object.keys(fields).length <= 0) return res
      .writeHead(400, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book cannot be updated with: ''" }));


    const updatedBook = await Book.update(id, fields);
    await Book.save();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedBook));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

const deleteBook = async (req, res, id) => {
  try {
    const foundBook = await Book.findOne(id);

    if (!foundBook) return res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Book not found" }));

    const books = await Book.delete(id);
    await Book.save();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook };
