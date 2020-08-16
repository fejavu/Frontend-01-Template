import { createElement, Text, Wrapper } from "./createElement";

export class Panel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let root = <div class="panel">
      <h1 style="background-color: lightskyblue; color: white; margin: 10px 0;width: 300px">{this.title}</h1>
      <div style="border: 1px solid skyblue; min-height: 300px; width: 300px">
        {this.children}
      </div>
    </div>

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}