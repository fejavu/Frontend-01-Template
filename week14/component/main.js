
function createElement(Cls, attributes, ...children) {
  let o;
  if(typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {}
    });
  }  
  for(let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  for(let child of children) {
    if(typeof child === "string") {
      child = new Text(child);
    }

    o.appendChild(child);
  }

  return o;
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  // attributes
  setAttribute(name, val) {
    this.root.setAttribute(name, val);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for(let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

class Mycomponent {
  constructor(config) {
    this.children = [];
  }

  // attributes
  setAttribute(name, val) {
    this.root.setAttribute(name, val);
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return <article>
      <header>This is header</header>
      {this.slot}
      <footer>This is footer</footer>
    </article>
  }

  mountTo(parent) {
    this.slot = <div></div>

    for(let child of this.children) {
      this.slot.appendChild(child)  ;
    }
    this.render().mountTo(parent);
  }
}

let componet = <Mycomponent>
    <div>Component | Add JSX into componets</div>
</Mycomponent>

componet.mountTo(document.body);