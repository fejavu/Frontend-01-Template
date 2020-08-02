import { createElement, Text, Wrapper } from "./createElement";
export class Carousel {
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
    let data = this.getAttribute('data');
    return <div class='list-view'>
      
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }

  getAttribute(attr) {
    return this[name];
  }
}