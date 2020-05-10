/**
 * client with node.js toy browser
 * methods / HTTP/1.1
 * Host: 127.0.0.1
 * Content-Type: application/x-www-form-urlencode
 */

const net = require('net');

/**
 * method, url = host + post + path
 * body: key-value
 * headers
 */

class Request {

  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.path = options.path || "/";
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};

    if(!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if(this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map( key => `${key}=${encodeURIComponent(this.body[key])}`).join("&");
    }

    this.headers["Content-Length"] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join("\r\n")}\r
\r
${this.bodyText}`
  }

  send(connection) {

    return new Promise((resolve, reject) => )

    if(connection) {
      connection.write(this.toString())
    } else {
      connection = net.createConnection({
        host: this.host,
        port: this.port,
      }, () => {
        connection.write(this.toString());
      })
    }

  }
}

class Response {
  
}

let request = new Request({
  method: "POST",
  host: "127.0.0.1",
  port: "8088",
  headers: {
    ["x-foo"]: "2"
  },
  path: "/",
  // headers: ,
  body: {
    name: "sunshine"
  }
});

request.send();

/*
const net = require('net');

const client = net.createConnection({ 
  host: "127.0.0.1",
  port: 8088 }, () => {
  // 'connect' listener.
  console.log('connected to server!');

//   client.write(`
// POST / HTTP/1.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 13\r
// \r
// name=sunshine\r`);

  // ** wrote the request line by line  
  // client.write('POST / HTTP/1.1\r\n');
  // client.write('Content-Length: 20\r\n');
  // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  // client.write('\r\n');
  // client.write('field=aaa&code=x%3D1\r\n');
  // client.write('\r\n');

  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    headers: {
      ["x-foo"]: "2"
    },
    path: "/",
    // headers: ,
    body: {
      name: "sunshine"
    }
  });

  console.log(request.toString());
  client.write(request.toString());
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', (error) => {
  console.log(error);
  client.end();
  console.log('disconnected from server');
});
*/