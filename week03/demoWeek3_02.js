{
  const a = 1;

}

// Iteration Statement
for(let i = 0; i < 10 ; i++) {
  console.log(i);
}

// for 为外层父作用域，console.log()无法访问外层i
for(let i = 0; i < 10 ; i++) {
  let i = 0;
  console.log(i); // 0 * 10
}

// var VS let/const
function run() {
  for(var i = 0; i < 10 ; i++) {
    console.log(i);
  }
  return ;
  var i;
} 

run()

// for in (key in obj)
for(let p in {a:1,b:2}) {
  console.log(p); // a, b
}

/**
 * for of Iterator,
 * Iterator 访问generator 与 Array
 */

function *generator() {
  yield 0;
  yield 1;
  yield 4;
}

// Iterator Obj
for(let p of generator) {
  console.log(p); // 1,2,3,4
}

/**
 * label statement
 */
function g() {
  // 错误的写法，模仿Java。
  public: 
    this.a = 1;
    this.b = 2;

  private:
    var x = 3;
    var y = 4;
}

var o = new g();
o.a;  //1
o.b;  //2
o.x;  //undefied

/**
 * try/catch/finally
 */
try {
  throw
} catch (error) {

}finally{

}

/**
 * Declaration
 */

 // Function  Declaration
 function foo() {

 }

 // Generator Declaration
 function* foo() {
   yield 1;
   yield 2; 

   while(true) {
     yield i++;
   }
 }

 // Asyn Function
let i = 0;

function tick() {
  console.log(i++);
  setTimeout(() => {
    tick();
  }, 1000);
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

void async function() {
  var i = 0;
  while(true) {
    console.log(i++);
    await sleep(1000);
  }
}

async function* foo() {
  var i = 0;
  while(true) {
    yield i++;
    await sleep(1000);
  }
}

void async function() {
  var g = 0;
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
}