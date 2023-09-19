const getBodyData = async (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on('error', (err) => {
      reject(err.message);
    }).on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      resolve(body);
    });
  });
};

module.exports = { getBodyData };
