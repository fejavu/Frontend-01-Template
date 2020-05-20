const EOF = Symbol("EOF");  // EOF: End Of File

let currentToken = null;
let currentAttribute = null;

function emitToken(token) {
  if(token.type != "text") {
    console.log(token);
  }
}

function data(c) {
  if(c == "<") {
    return tagOpen;
  } else if(c == EOF) {
    emitToken({
      type: "EOF"
    });
    return ;
  } else {
    emitToken({
      type: "text",
      content: c
    });
    return data;
  }
}

function tagOpen(c) {
  if(c === "/") {
    return endTagOpen;  // </body> end tag
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c);  // <body>
  } else {
    emitToken({
      type: "text",
      content: c
    });
    return;
  }
}

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c);
  } else if(c==">") {

  } else if(c == EOF) {

  } else {

  }
}

function tagName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c === "/") {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; // c.toLowerCase()
    return tagName;
  } else if(c === ">") {
    emitToken(currentToken);
    return data;
  } else {
    currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '>' || c == '/' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '=') {
    // return ;
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '='){
    return beforeAttributeValue;
  } else if(c=='\u0000') {

  } else if(c == '\"' || c == "'" || c == "<") {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF) {
    return beforeAttributeValue;
  } else if(c == "\'") {
    return singleQuotedAttributeValue;
  }  else if(c == "\"") {
    return doubleQuotedAttributeValue;
  } else if (c == '>') {

  } else {
    return UnquoteAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c == "\u0000"){

  } else if(c == EOF) {

  }else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if(c == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c == "\u0000"){

  } else if(c == EOF) {

  }else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == "/") {
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emitToken(currentToken);
    return data;
  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function afterAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if(c == "/") {
    return selfClosingStartTag;
  } else if(c == "=") {
    return beforeAttributeValue;
  } else if(c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emitToken(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}

function UnquoteAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if(c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emitToken(currentToken);
    return data;
  } else if(c == '\u0000') {

  } else if(c == '\"' || c == "'" || c == "<" || c == "=" || c == "`") { 

  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquoteAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if(c == ">") {
    currentToken.isSelfClosing = true;
    emitToken(currentToken)
    return data;
  } else if(c == "EOF"){

  } else {
    
  }
}

module.exports.parserHTML = function parserHTML(html) {
  let state = data;
  for(let c of html) {
    state = state(c);
  }
  state = state(EOF);
}