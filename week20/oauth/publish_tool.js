const http = require('http');
const { fstat } = require('fs');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');
const fetch = require('node-fetch');

var packname = "./package"
var filename = "./eibg.jpg";
let state = "abc123";
let client_id = ""; // get from oauth.json
let redirect_uri = "http://localhost:8000/auth";
let authorize_url = "https://github.com/login/oauth/authorize";

// open the default browser to get the 'code'
child_process.exec(`start ${authorize_url}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`)

// open a server to receive the token and request the user
const server = http.createServer((req, res) => {
  // debugger;
  if(req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end('NO FAV ICON');
    return;
  }
  let accese_token = req.url.match(/token=([^&]+)/)[1];

  req.on('error', (error) => {
    console.log("ERROR", error);
  });

  fetch("http://localhost:8000/getUser", {
    method: 'POST',
    headers: {
      'token': accese_token,
      'Content-Type': 'application/octet-stream'
    }
  })
  .then(response => {
    return response.text();
  })
  .then(data => {
    console.log('success: ', data);

    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
  
    archive.directory(packname, false);
    archive.finalize();
    archive.pipe(req);
    archive.on('end' , () => {
      res.end('TOOL OKAY');
      server.close();
    });
  }).catch((error) => {
    console.error('Error:', error);
  });
});

server.listen(8080);