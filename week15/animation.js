/**
 * new Animation(object, property, start, end, duration, delay, timingFunction)
 * 
 * let timeLine = new TimeLine
 * 
 * timeLine.add(animation);
 * 
 * timeLine.start();
 * timeLine.pause();
 * timeLine.resusme();
 * timeLine.stop();
 * 
 * setTimeout()
 * setInterval()
 * requestAnimationFrame()
 */

export class Timeline{
  constructor() {
    this.state = 'inited';
    this.requestId = null;
    this.animations = [];

    this.tick  = () => {
      let t = Date.now() - this.startTime;
      console.log(t);
      let animations = this.animations.filter(animation => !animation.finished);
      
      for(let animation of this.animations) {

        let {object, property, template, start, end, duration, delay, timingFunction} = animation;
      
        let progression = timingFunction((t- delay)/duration); // 0-1
    
        if(t > animation.duration + animation.delay){
          progression = 1;
          animation.finished = true;
        }

        let value = start + progression * (end - start);

        object[property] = template(value);
      }

      if(animations.length) {
        this.requestId = requestAnimationFrame(this.tick);
        requestAnimationFrame(() => this.tick());
      } 
    }
  }

  start() {
    if(this.state !== 'inited') {
      return;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }
  
  pause() {
    if(this.state !== 'playing') {
      return;
    }
    this.state = 'paused';
    this.pauseTime = Date.now();
    if(this.requestId !== null) {
      cancelAnimationFrame(this.requestId);
    }
  }
  
  resume() {
    if(this.state !== 'paused') {
      return;
    }
    this.state = 'playing';
    this.startTime +=  Date.now() - this.pauseTime;
    this.tick();
  }

  restart() {
    if(this.state === 'playing') {
      this.pause();
    }
    this.animations = [];
    this.requestId = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }
  
  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;

    if(this.state === 'playing') {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay
    this.timingFunction = timingFunction;
  }
}

