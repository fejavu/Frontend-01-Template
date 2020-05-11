/**
 * client with node.js toy browser
 * methods / HTTP/1.1
 * Host: 127.0.0.1
 * Content-Type: application/x-www-form-urlencode
 */

const net = require('net');

/**Request Formation
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
    return new Promise((resolve, reject) => {
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

      connection.on('data', (data) => {
        resolve(data.toString());
        connection.end();
      });
      
      connection.on('error', (error) => {
        reject(error);
        connection.end();
        console.log('disconnected from server');
      });

    });
  }
}

/**
 * Response Fromation
 * status line
 * headers 
 * body
 */
class Response {
  
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_VALUE = 3;
    this.WAITING_HEADER_LINE_END = 4;
    this.WAITING_HEADER_BLOCK_END = 5;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
  }

  receive(string) {
    for(let i=0; i<string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    if(this.current === this.WAITING_STATUS_LINE) {
      
    }
  }
}

class TrunkedParser {
  constructor() {

  }

  receive(string) {

  }
}
void async function() {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    headers: {
      ["x-foo"]: "2"
    },
    path: "/",
    body: {
      name: "sunshine"
    }
  });

  let response = await request.send();
  console.log(response);
}();



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