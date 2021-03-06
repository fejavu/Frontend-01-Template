const EOF = Symbol("EOF");  // EOF: End Of File
const css = require('css');
const layout = require('./layout.js');

let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children: []}];
let currentTextNode = null;

let rules = [];
function addCSSRules(text) {
  let ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}

function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  
  for(var part of selectorParts) {
    if(part.charAt(0) == "#") {
      p[1] += 1;
    } else if(part.charAt(0) == ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function match(element, selector) {
  if(!element || !selector) {
    return false;
  }

  if(selector.charAt(0) == "#") {
    let attr = element.attributes.filter(attr => attr.name === "id")[0];
    if(attr && attr.value === selector.replace("#", "")) {
      return true;
    }
  } else if(selector.charAt(0) == ".") {
    let attr = element.attributes.filter(attr => attr.name === "class")[0];
    if(attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else {
    if(element.tagName === selector) {
      return true;
    }
  }
  // console.log(element, selector);
}

function compare(sp_one, sp_two) {
  if(sp_one[0] - sp_two[0]) {
    return sp_one[0] - sp_two[0];
  }

  if(sp_one[1] - sp_two[1]) {
    return sp_one[1] - sp_two[1];
  }
  
  if(sp_one[2] - sp_two[2]) {
    return sp_one[2] - sp_two[2];
  }

  return sp_one[3] - sp_two[3];
}

function computeCSS(element) {
  let elements = stack.slice().reverse(); // 获取父元素序列，slice切片，无参数为复制。
  if(!element.computedStyle) {
    element.computedStyle = {}
  }

  for(let rule of rules) {
    let selectorParts = rule.selectors[0].split(" ").reverse();

    if(!match(element, selectorParts[0])) {
      continue;
    }

    let matched = false;

    var j = 1;
    for(let i=0;i<elements.length; i++) {
      if(match(elements[i], selectorParts[j])){
        j++;
      }
    }
    if(j>=selectorParts.length){
      matched = true;
    }

    if(matched) {
      let sp = specificity(rule.selectors[0]);
      let computedStyle = element.computedStyle;
      for(let declaration of rule.declarations) {
        if(!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
        }
        if(!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
          // computedStyle[declaration.property].value = declaration.value;
          for(var k = 0;k<4; k++) {
            computedStyle[declaration.property][declaration.value][k] += sp[k];
          }
        }

      }
      // console.log(element.computedStyle);
    }
  }
}

function emitToken(token) {
  let topEle = stack[stack.length - 1];

  if(token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    };

    element.tagName = token.tagName;

    for(let p in token) {
      if(p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    computeCSS(element);

    topEle.children.push(element);
    // element.parent = topEle;

    if(!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;

  } else if (token.type == "endTag") {
    if(topEle.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match");
    } else {
      if(topEle.tagName === "style") {
        addCSSRules(topEle.children[0].content);
      }
      stack.pop();
    }
    layout(topEle);
    currentTextNode = null;
  } else if (token.type == "text") {
    if(currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      topEle.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
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
  } else if(c.match(/^[A-Z]$/)) {
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
  } else if(c == '/' || c == '>' || c == EOF) {
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
  return stack[0];
}