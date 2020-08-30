const http = require('http');
const fs = require('fs');
const unzipper = require('unzipper');
const fetch = require('node-fetch');

const server = http.createServer((req, res) => {
  if(req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  if(req.url.match(/^\/getUser/)) {
    return getUser(req, res);
  }

  if(!req.url.match(/^\/$/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end('NOT FOUND');
    return;
  }
});

function auth(request,res) {
  let code = request.url.match(/code=([^&]+)/)[1];
  let state = "abc123";
  let client_id = ''      // get from oauth.json;
  let client_secret = '' ;
  let redirect_uri = "http://localhost:8000/auth";
  let post_url = "https://github.com/login/oauth/access_token"; 
  let publish_url = "http://localhost:8080/publish";
  
  let data = {
    client_id: client_id,
    client_secret: client_secret,
    code: code,
    redirect_uri: redirect_uri,
    state: state
  }

  fetch(post_url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.text())
  .then(data => {
    let token = data.match(/=([^&]+)/)[1];
    if(token) {
      res.writeHead(200, {
        "access_token": token,
        "Content-Type": "text/html"
      });
      res.end(`<a href=${publish_url}?token=${token}>Publish</a>`);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('ERROR');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function getUser(request, response) {
  let getUserUrl = "https://api.github.com/user";
  let  accese_token = request.headers.token;
  // debugger;
  fetch(getUserUrl, {
    method: 'GET',
    headers: {
      "Authorization": "token " + accese_token,
      "User-Agent": "fejavuOauthDemo"
    }
  }).then(response => response.json())
    .then(data => {
    console.log(data);
  
    // check user authorization and do something
    /* code */

    var writeStream = unzipper.Extract({path: "../server/public/"});
    request.pipe(writeStream);
    
    response.writeHead(200, { 'Content-Type' : 'text/plain' });
    response.end('OKAY');
  }).catch((error) => {
    console.error('Error:', error);
  });
}

server.listen(8000);