import { createElement, Text, Wrapper } from "./createElement";
import {Carousel} from "./Carousel";
import {TabPanel} from "./TabPanel";
import {ListView} from "./ListView";

let carouselData = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let carousel = <Carousel data={carouselData}/>

let panel = <TabPanel>
  <span title="Food">Food Area</span>
  <span title="Cloth">Shopping Mall</span>
  <span title="Book">Stranger </span>
  <span title="Cyber">Cyber Truck</span>
</TabPanel>

let listdata = [
  {title: "Cat A", url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
  {title: "Cat B", url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
  {title: "Cat C", url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
  {title: "Cat D", url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
]
let list = <ListView data = {listdata}>
  {record => <figure>
    <img src={record.url}/>
    <figcaption>{record.title}</figcaption>
  </figure>}
</ListView>

carousel.mountTo(document.body);
panel.mountTo(document.body);
list.mountTo(document.body);

