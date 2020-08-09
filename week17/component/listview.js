import { createElement, Text, Wrapper } from "./createElement";


export class ListView {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }
  
  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let data = this.getAttribute("data");
    let root = <div class="listview" style="width: 300px">
      {
        data.map(this.children[0])
      }
    </div>

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}