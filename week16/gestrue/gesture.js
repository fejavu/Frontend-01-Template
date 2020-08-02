class Gesture {
  constructor(element) {
    this.element = element;
    this.contexts = Object.create(null);
    this.MOUSE_SYMBOL = Symbol("mouse");
  }

  log() {
    window.console.log(...arguments);
  }

  // mouse native events
  mouseEvent() {
    let document = window.document;
    if(document.ontouchstart !== null) {
      this.element.addEventListener("mousedown", (event) => {
        this.contexts[MOUSE_SYMBOL] = Object.create(null);
        this.start(event, contexts[MOUSE_SYMBOL]);
        
        let mousemove = (event) => {
          this.move(event, this.contexts[MOUSE_SYMBOL]);
        }
    
        // when end remove all event listener
        let mouseend = (event) => {
          this.end(event, this.contexts[MOUSE_SYMBOL]);
          document.removeEventListener("mousemove", mousemove); 
          document.removeEventListener("mouseup", mouseend);
        }
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseend);
      });
    }
  }

  touchEvent() {
    // gesture native events
    this.element.addEventListener("touchstart", event => {
      for (const touch of event.changedTouches) {
        this.contexts[touch.identifier] = Object.create(null);
        this.start(touch, this.contexts[touch.identifier]);
      }
    });
    
    this.element.addEventListener("touchmove", event => {
      for (const touch of event.changedTouches) {
        this.move(touch, this.contexts[touch.identifier])
      }
    });
    
    this.element.addEventListener("touchend", event => {
      for (const touch of event.changedTouches) {
        this.end(touch, this.contexts[touch.identifier]);
        delete this.contexts[touch.identifier];
      }
    });
    
    this.element.addEventListener("touchcancel", event => {
      for (const touch of event.changedTouches) {
        this.cancel(touch, this.contexts[touch.identifier]);
        delete this.contexts[touch.identifier];
      }
    });
  }

  /**
   * abstract events
   * tap
   * pan - panstart panmove panend
   * flick
   * press pressstart pressend 
   */
  
  start(point, context){
    this.element.dispatchEvent(new CustomEvent('start', {
      bubbles: true,
      detail: {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY
      }
    }));
    context.startX = point.clientX, context.startY = point.clientY;
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.moves = [];
    context.timeHandler = setTimeout(() => {
      if(context.isPan) {
        return;
      }
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      // this.log("press start!!!!!!!");
      this.element.dispatchEvent(new CustomEvent('pressstart', {
        bubbles: true
      }));
    }, 500);
  }
  
  move(point, context){
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
  
    if(dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      if(context.isPress) {
        this.element.dispatchEvent(new CustomEvent('presscancel', {
          bubbles: true
        }));
      }
      this.element.dispatchEvent(new CustomEvent('panstart', {
        bubbles: true,
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }));
    }
  
    if(context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now()
      });
      context.moves = context.moves.filter(record => Date.now() - record.t < 200);
      this.element.dispatchEvent(new CustomEvent('pan', {
        bubbles: true,
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }));
    }
  }
  
  end(point, context) {
    if(context.isPan) {
      let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      let isFlick = speed > 2.5;
      // this.log(speed);
      if(isFlick) {
        this.log("flick");
        this.element.dispatchEvent(new CustomEvent('flick', {
          bubbles: true,
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed:speed
          }
        }));
      }
      this.element.dispatchEvent(new CustomEvent('panend', {
        bubbles: true,
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed:speed,
          idFlick: isFlick
        }
      }));
    }
    if(context.isTap) {
      this.element.dispatchEvent(new CustomEvent('tap', {
        bubbles: true,
        detail: ""
      }));
    } 
    if(context.isPress) {
      this.log("press end!!!!!!!");
      this.element.dispatchEvent(new CustomEvent('pressend', {
        bubbles: true,
        detail: ""
      }));
    }
  
    clearTimeout(context.timeHandler);
  }
  
  cancel(point, context) {
    this.element.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      detail: ""
    }));
    clearTimeout(context.timeHandler);
  }
}