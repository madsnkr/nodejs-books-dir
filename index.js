const http = require('http');
const PORT = process.env.PORT || 5000;
const { getBooks } = require('./controller');

const server = http.createServer((req, res) => {
  if (req.url === '/api/books' && req.method === 'GET') {
    getBooks(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
