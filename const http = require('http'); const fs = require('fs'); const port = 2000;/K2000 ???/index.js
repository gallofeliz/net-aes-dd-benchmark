const http = require('http');
const fs = require('fs');
const port = 2000; // K2000 ???

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

const server = http.createServer((req, res) => {

  if (req.method === 'POST') {
    var w = fs.createWriteStream('file.out.txt', {encoding: null});
    var encrypt = crypto.createCipher(algorithm, password);

    req.pipe(encrypt).pipe(w);

    req.once('end', () => {
      res.end();
    })
  } else {

    var w = fs.createReadStream('file.out.txt', {encoding: null});
    var encrypt = crypto.createDecipher(algorithm, password);

    w.pipe(encrypt).pipe(res);
  }
});

server.listen(port);
