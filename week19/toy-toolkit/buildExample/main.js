import { createElement, Text, Wrapper } from "./lib/createElement.js";

let component = <div>Hello World</div>
let document = <html><body></body></html>
component.mountTo(document.body);