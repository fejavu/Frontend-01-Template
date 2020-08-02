import { createElement, Text, Wrapper } from "./createElement";
import {Timeline , Animation} from "./animation";
import {cubic} from "./cubicBezier";
import {enableGesture, enablegesture} from "./gesture"


export class Carousel {
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
    
    let timeLine = new Timeline;
    timeLine.start();

    let curPosition = 0;

    let nextPicStopHandler = null;

    let children = this.data.map((url, curIndex) => {

      let nextPosition = (curIndex + 1) % this.data.length;
      let prevPostion = (curIndex - 1 + this.data.length) % this.data.length;

      let offset = 0;
      
      let getEleTransform = (element) => {
        return Number(element.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);;
      }

      let onStart = () => {
        timeLine.pause();
        clearTimeout(nextPicStopHandler);
        
        let curEle = children[curIndex];
        curEle.style.cursor = 'grabbing';
        let curEleTransformValue = getEleTransform(curEle);
        offset = curEleTransformValue + 500 * curIndex
      }
  
      let onPan = (event) => {
        let dx = event.detail.clientX - event.detail.startX;
        let curEle = children[curIndex];
        let preEle = children[prevPostion];
        let nextEle = children[nextPosition];

        let curEleTransformValue = - 500 * curIndex + offset + dx;
        let prevEleTransformValue = -500 - 500 * prevPostion + offset + dx;
        let nextEleTransformValue = 500 - 500 * nextPosition + offset + dx;


        curEle.style.transform = `translateX(${curEleTransformValue}px)`;
        preEle.style.transform = `translateX(${prevEleTransformValue}px)`;
        nextEle.style.transform = `translateX(${nextEleTransformValue}px)`;
      }

      let onPanend = event => {
        let direction = 0;
        let dx = event.detail.clientX - event.detail.startX;
        let curEle = children[curIndex];
        let preEle = children[prevPostion];
        let nextEle = children[nextPosition];

        console.log("flick", dx, event.detail.isFlick);

        curEle.style.cursor = 'grab';

        if(dx + offset > 250 || dx > 0 && event.detail.isFlick) {
          direction = 1;
        } else if(dx + offset  < -250 || dx < 0 && event.detail.isFlick) {
          direction = -1;
        }

        timeLine.reset();
        timeLine.start();

        let curAnimation = new Animation(curEle.style, "transform", - 500 * curIndex + offset + dx,
        - 500 * curIndex + direction*500, 500, 0, cubic.easeInOut, v => `translateX(${v}px)`);
        
        let preAnimation = new Animation(preEle.style, "transform", -500 - 500 * prevPostion + offset + dx,
        -500 - 500 * prevPostion + direction * 500, 500, 0, cubic.easeInOut, v => `translateX(${v}px)`);

          let nextAnimation = new Animation(nextEle.style, "transform", 500 - 500 * nextPosition + offset + dx,
          500 - 500 * nextPosition + direction * 500, 500, 0, cubic.easeInOut, v => `translateX(${v}px)`);

          timeLine.add(preAnimation);
          timeLine.add(curAnimation);
          timeLine.add(nextAnimation);

          curPosition = (curPosition - direction + this.data.length) % this.data.length;
          nextPicStopHandler = setTimeout(nextPic, 3000);


        // preEle.style.transform = `translateX(${offset * 500 - 500 - 500 * prevPostion}px)`;
        // curEle.style.transform = `translateX(${offset * 500- 500 * curPosition}px)`;
        // nextEle.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

        // curPosition = (curPosition - offset + this.data.length) % this.data.length;
      }


      let element = <img src={url} onStart = {onStart} onPan={onPan}  onPanend={onPanend} enablegesture={true} />;
      element.style.transform = "translateX(0px)";
      element.addEventListener("dragstart", event => {
        event.preventDefault();
      });

      return element;
    });
    
    let root = <div class="carousel">{children}</div>

    let nextPic = () => {
      let nextPosition = (curPosition + 1) % this.data.length; // number circle use % operator
      
      let curEle = children[curPosition];
      let nextEle = children[nextPosition];

      let curAnimation = new Animation(curEle.style, "transform", - 100 * curPosition,
      - 100 - 100 * curPosition, 500, 0, cubic.easeInOut, v => `translateX(${5 * v}px)`);
      
      let nextAnimation = new Animation(nextEle.style, "transform", 100 - 100 * nextPosition,
       - 100 * nextPosition, 500, 0, cubic.easeInOut, v => `translateX(${5 * v}px)`);

       timeLine.add(curAnimation);
       timeLine.add(nextAnimation);

       curPosition = nextPosition;
       // js control css
      // curEle.style.transition = `ease 0s`
      // nextEle.style.transition = `ease 0s`

      // curEle.style.transform = `translateX(${ - 100 * curPosition}%)`
      // nextEle.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // setTimeout(function() {
      //   curEle.style.transition = ``; // = "" means use the CSS rules
      //   nextEle.style.transition = ``;
  
      //   curEle.style.transform = `translateX(${- 100 - 100 * curPosition}%)`
      //   nextEle.style.transform = `translateX(${- 100 * nextPosition}%)`
  
      //   curPosition = nextPosition;
      // }, 16);
      nextPicStopHandler = setTimeout(nextPic, 3000);
    }
    setTimeout(nextPic, 3000);


    // root.addEventListener("mousedown", (event) => {     
    //   let initX = event.clientX;
    //   let nextPosition = (curPosition + 1) % this.data.length;
    //   let prevPostion = (curPosition - 1 + this.data.length) % this.data.length
      
    //   let preEle = children[prevPostion];
    //   let curEle = children[curPosition];
    //   let nextEle = children[nextPosition];
      
    //   preEle.style.transition = `ease 0s`;
    //   curEle.style.transition = `ease 0s`;
    //   nextEle.style.transition = `ease 0s`;

    //   preEle.style.transform = `translateX(${ -500 - 500 * prevPostion}px)`;
    //   curEle.style.transform = `translateX(${- 500 * curPosition}px)`;
    //   nextEle.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

    //   let move = event => {
    //     preEle.style.transform = `translateX(${event.clientX - initX - 500 - 500 * prevPostion}px)`;
    //     curEle.style.transform = `translateX(${event.clientX - initX - 500 * curPosition}px)`;
    //     nextEle.style.transform = `translateX(${event.clientX - initX + 500 - 500 * nextPosition}px)`;
        
    //   };
  
    //   let up = (event) => {
    //     let offset = 0;

    //     if(event.clientX - initX > 250) {
    //       offset = 1;
    //     } else if(event.clientX - initX < -250) {
    //       offset = -1;
    //     }

    //     // use the CSS rules
    //     preEle.style.transition = ``;
    //     curEle.style.transition = ``;
    //     nextEle.style.transition = ``;

    //     preEle.style.transform = `translateX(${offset * 500 - 500 - 500 * prevPostion}px)`;
    //     curEle.style.transform = `translateX(${offset * 500- 500 * curPosition}px)`;
    //     nextEle.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

    //     curPosition = (curPosition - offset + this.data.length) % this.data.length;

    //     children.forEach(item => {
    //       item.style.cursor = 'grab';
    //     });

    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //   };
  
    //   // document.addEventListener("mousemove", move);
    //   // document.addEventListener("mouseup", up);
    // });
    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}