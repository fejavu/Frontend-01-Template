const EOF = Symbol("EOF");  // EOF: End of File
let currentToken = null;

function data(c) {
  if(c == "<") {
    return tagOpen;
  } else if (c==EOF) {
    return ;
  } else {
    return data;
  }
}

function tagName() {}

function tagOpen () {}

function endTagOpen(c) {}

function attributeName() {}

function beforeAttributeName(c){}

function selfClosingStartTag(c) {}

function emitToken(token) {}