const http = require('http');
const { fstat } = require('fs');
const fs = require('fs');
var archiver = require('archiver');

var packname = "./package"
var filename = "./eibg.jpg";

fs.stat(filename, (error, stat) => {
  // console.log(stat.size);
  const options = {
    host: 'localhost',
    port: 8000,
    path: '/?filename=' + 'package.zip',
    method: 'POST',  
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory(packname, false);

  archive.finalize();

  archive.pipe(req);

  archive.on('end' , () => {
    req.end();
  });
});





