export function enablegesture(element) {
  let contexts = Object.create(null);
  let MOUSE_SYMBOL = Symbol("mouse");
  
  
  function log() {
    window.console.log(...arguments);
  }
  
  // mouse native events
  if(document.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL])
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      }
  
      let mouseend = (event) => {
        // when end remove all event listener
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove); 
        document.removeEventListener("mouseup", mouseend);
      }
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseend);
    });
  }
  
  // gesture native events
  element.addEventListener("touchstart", event => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });
  
  element.addEventListener("touchmove", event => {
    for (const touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  });
  
  element.addEventListener("touchend", event => {
    for (const touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  
  element.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  
  
  /**
   * abstract events
   * tap
   * pan - panstart panmove panend
   * flick
   * press pressstart pressend 
   */
  
  let start = (point, context) => {
    element.dispatchEvent(new CustomEvent('start', {
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
      // log("press start!!!!!!!");
      element.dispatchEvent(new CustomEvent('pressstart', {
        bubbles: true
      }));
    }, 500);
  }
  
  let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
  
    if(dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      if(context.isPress) {
        element.dispatchEvent(new CustomEvent('presscancel', {
          bubbles: true
        }));
      }
      element.dispatchEvent(new CustomEvent('panstart', {
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
      element.dispatchEvent(new CustomEvent('pan', {
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
  
  let end = (point, context) => {
    if(context.isPan) {
      let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      let isFlick = speed > 2.5;
      // log(speed);
      if(isFlick) {
        // log("flick");
        element.dispatchEvent(new CustomEvent('flick', {
          bubbles: true,
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed:speed,
            isFlick: isFlick,
          }
        }));
      }
      element.dispatchEvent(new CustomEvent('panend', {
        bubbles: true,
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed:speed,
          isFlick: isFlick
        }
      }));
    }
    if(context.isTap) {
      element.dispatchEvent(new CustomEvent('tap', {
        bubbles: true,
        detail: ""
      }));
    } 
    if(context.isPress) {
      // log("press end!!!!!!!");
      element.dispatchEvent(new CustomEvent('pressend', {
        bubbles: true,
        detail: ""
      }));
    }
  
    clearTimeout(context.timeHandler);
  }
  
  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      detail: ""
    }));
    clearTimeout(context.timeHandler);
  }
}
