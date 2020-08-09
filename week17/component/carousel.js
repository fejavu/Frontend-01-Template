import { createElement, Text, Wrapper } from "./createElement";
import {Timeline , Animation} from "./animation";
import {cubic} from "./cubicBezier";
import {enableGesture, enablegesture} from "./gesture";
import css from "./carousel.css";

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
      nextPicStopHandler = setTimeout(nextPic, 3000);
    }
    setTimeout(nextPic, 3000);
    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}