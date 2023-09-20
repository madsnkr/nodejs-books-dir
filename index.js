const http = require('http');
const PORT = process.env.PORT || 5000;
const { getBooks, getBook, addBook, updateBook } = require('./controller');

const server = http.createServer((req, res) => {
  if (req.url === '/api/books' && req.method === 'GET') {
    getBooks(req, res);
  } else if (req.url.match(/\/api\/books\/(\w+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getBook(req, res, id);
  } else if (req.url === '/api/books' && req.method === 'POST') {
    addBook(req, res);
  } else if (req.url.match(/\/api\/books\/(\w+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateBook(req, res, id);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
