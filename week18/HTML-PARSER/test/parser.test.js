var assert = require('assert')
const { parseHTML } = require("../src/parser.js")

it('parser a single div', function () {
  let doc = parseHTML("<div></div>");
  let ele = doc.children[0];
  assert.equal(ele.type, "element")
  assert.equal(ele.children.length, 0)
  assert.equal(ele.tagName, "div")
})

it('parser a single div with text content', function () {
  let doc = parseHTML("<div>helloWorld</div>");
  let ele = doc.children[0];
  let text = doc.children[0].children[0];

  assert.equal(ele.type, "element")
  assert.equal(ele.children.length, 1)
  assert.equal(ele.tagName, "div")
  assert.equal(text.type, "text")
  assert.equal(text.content, "helloWorld")
})

it('tag does not matched', function () {
  try {
    let doc = parseHTML("<div></siv>");
  } catch(error) {
  assert.equal(error.message, "Tag start end doesn't match!")
  // console.log(error)
  }
})

it('tag with', function () {
  let doc = parseHTML("<div>a < b</div>");

  let text = doc.children[0].children[0];
  assert.equal(text.type, "text")
  assert.equal(text.content, "a < b")
})

it('tag property', function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
  let div = doc.children[0];

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === "id") {
      assert.equal(attr.value, "a");
      count++
      return
    }    
    if(attr.name === "class") {
      assert.equal(attr.value, "cls");
      count++
      return
    }    
    
    if(attr.name === "data") {
      assert.equal(attr.value, "abc");
      count++
      return
    }
  }
  assert.ok(count === 3);
})

it('double queted end  ', function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" > </div>");
  let div = doc.children[0];

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === "id") {
      assert.equal(attr.value, "a");
      count++
      return
    }    
    if(attr.name === "class") {
      assert.equal(attr.value, "cls");
      count++
      return
    }    
    
    if(attr.name === "data") {
      assert.equal(attr.value, "abc");
      count++
      return
    }
  }
  assert.ok(count === 3);
})

it('self end tag', function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>");
  let div = doc.children[0];

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === "id") {
      assert.equal(attr.value, "a");
      count++
      return
    }    
    if(attr.name === "class") {
      assert.equal(attr.value, "cls");
      count++
      return
    }    
    
    if(attr.name === "data") {
      assert.equal(attr.value, "abc");
      count++
      return
    }
  }
  assert.ok(count === 3);
})

it('script test', function () {
  let testCase = `<script>
  <div attr=name>   </div>
  <span></span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script
  </script>   
  `
  let doc = parseHTML(testCase);
})

it('attribute with no value', function () {
  let doc = parseHTML("<div attr> <img/></div>");
  let div = doc.children[0];

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === "attr") {
      count++
      return
    }    
  }
  assert.ok(count === 1);
})

it('attribute with no value', function () {
  let doc = parseHTML("<div attr />");
})

it('attribute with uppercase', function () {
  let doc = parseHTML("<IMG     />");
})

it('double quoted attr value', function () {
  let doc = parseHTML("<div attr=\"\"value\"-of\" />");
})

// bug to be fix
// it('end before attr value', function () {
//   let doc = parseHTML("<div attr=/>");
// })

it('unquoted ', function () {
  let doc = parseHTML("<img attr=unquoted/><img attr=selfClosing>");
})

it('selfClosing eof ', function () {
  let doc = parseHTML("<img /");
})

// it('end tag else', function () {
//   let doc = parseHTML("<div></>");
// })

// it('end tag eof ', function () {
//   let doc = parseHTML("<div></");
// })