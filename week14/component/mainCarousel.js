import { createElement, Text, Wrapper } from "./createElement";

class Carousel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let children = this.data.map(url => {
      let element = <img src={url} />;
      element.addEventListener("dragstart", event => {
        event.preventDefault();
        element.style.cursor = 'grabbing';
      });
      return element;
    });
    let root = <div class="carousel">{children}</div>

    let curPosition = 0;
    let nextPic = () => {
      let nextPosition = (curPosition + 1) % this.data.length; // number circle use % operator
      
      let curEle = children[curPosition];
      let nextEle = children[nextPosition];

      curEle.style.transition = `ease 0s`
      nextEle.style.transition = `ease 0s`

      curEle.style.transform = `translateX(${ - 100 * curPosition}%)`
      nextEle.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      setTimeout(function() {
        curEle.style.transition = ``; // = "" means use the CSS rules
        nextEle.style.transition = ``;
  
        curEle.style.transform = `translateX(${- 100 - 100 * curPosition}%)`
        nextEle.style.transform = `translateX(${- 100 * nextPosition}%)`
  
        curPosition = nextPosition;
      }, 16);
      setTimeout(nextPic, 3000);
    }
    setTimeout(nextPic, 3000);

    root.addEventListener("mousedown", (event) => {     
      let initX = event.clientX;
      let nextPosition = (curPosition + 1) % this.data.length;
      let prevPostion = (curPosition - 1 + this.data.length) % this.data.length
      
      let preEle = children[prevPostion];
      let curEle = children[curPosition];
      let nextEle = children[nextPosition];
      
      preEle.style.transition = `ease 0s`;
      curEle.style.transition = `ease 0s`;
      nextEle.style.transition = `ease 0s`;

      preEle.style.transform = `translateX(${ -500 - 500 * prevPostion}px)`;
      curEle.style.transform = `translateX(${- 500 * curPosition}px)`;
      nextEle.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      children.forEach(item => {
        item.style.cursor = 'grabbing';
      });

      let move = event => {
        // console.log(event.clientX - initX, event.clientY - initY);
        preEle.style.transform = `translateX(${event.clientX - initX - 500 - 500 * prevPostion}px)`;
        curEle.style.transform = `translateX(${event.clientX - initX - 500 * curPosition}px)`;
        nextEle.style.transform = `translateX(${event.clientX - initX + 500 - 500 * nextPosition}px)`;
      };
  
      let up = (event) => {
        let offset = 0;

        if(event.clientX - initX > 250) {
          offset = 1;
        } else if(event.clientX - initX < -250) {
          offset = -1;
        }

        // use the CSS rules
        preEle.style.transition = ``;
        curEle.style.transition = ``;
        nextEle.style.transition = ``;

        preEle.style.transform = `translateX(${offset * 500 - 500 - 500 * prevPostion}px)`;
        curEle.style.transform = `translateX(${offset * 500- 500 * curPosition}px)`;
        nextEle.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

        curPosition = (curPosition - offset + this.data.length) % this.data.length;

        children.forEach(item => {
          item.style.cursor = 'grab';
        });

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
  
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}

let carouselData = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];
let componet = <Carousel data={carouselData}/>
componet.mountTo(document.body);