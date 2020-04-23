function cls1(s) {
  console.log(s);
}

function cls2(s) {
  console.log('2',s);
  return cls1(s)
}

let obj = new cls2();

class foo {
  constructor() {
    this.b = 1;
  }
}

new foo()['b'];
new foo(['b']);