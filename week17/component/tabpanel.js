import { createElement, Text, Wrapper } from "./createElement";
import css from "./tabpanel.css";

export class TabPanel {
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

  select(i) {
    for (const view of this.childViews) {
      view.style.display = "none";
    }
    this.childViews[i].style.display = "";

    for (const view of this.titleViews) {
      view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
    // this.titleViews[i].innerText = this.children[i].title;
  }

  render() {
    this.childViews = this.children.map(child => <div style="border: 1px solid skyblue; min-height: 300px; width: 300px">{child}</div>);
    this.titleViews = this.children.map((child,i) => <span onClick={() => this.select(i)} 
    style="font-size: 22px; margin: 0 3px;padding: 3px 5px; min-height: 300px; width: 300px; cursor: pointer">
      {child.getAttribute("title") || " "}
      </span>);

    setTimeout(()=> this.select(0), 16);

    let root = <div class="tabpanel">
      <h1 style="color: white; margin: 10px 0;width: 300px">{this.titleViews}</h1>
      <div >
        {this.childViews}
      </div>
    </div>

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}