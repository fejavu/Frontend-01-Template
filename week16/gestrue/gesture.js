let element = document.body;

function enabelGesture(element) {

  let context = Object.create(null);

  let MOUSE_SYMBOL = Symbol("mouse");

  // mouse events
  if(document.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      context[MOUSE_SYMBOL] = Object.create(null);
      start(event, context[MOUSE_SYMBOL]);
      let mousemove = event => {
        move(event, context[MOUSE_SYMBOL]);
        console.log("move", event.clientX, event.clientY);
      }

      let mouseend = event => {
        end(event, context[MOUSE_SYMBOL]);
        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseend);
      }

      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseend);
    });
  }
  // gesture events
  element.addEventListener("touchstart", event => {
    // console.log(event.type);
    for (const touch of event.changedTouches) {
      context[touch.indenifier] = Object.create(null);
      start(touch, context[touch.indenifier]);
    }
  });

  element.addEventListener("touchmove", event => {
    for (const touch of event.changedTouches) {
      move(touch, context[touch.indenifier]);
    }
  });

  element.addEventListener("touchend", event => {
    for (const touch of event.changedTouches) {
      end(touch, context[touch.indenifier]);
      delete context[touch.indenifier];
    }
  });

  element.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
      cancel(touch, context[touch.indenifier]);
      delete context[touch.indenifier];
    }
  });

  // tap 
  // pan pan-start pan-end
  // flick
  // press  press-start press-end





  // 抽象函数
  let start = (point, context) => {
    element.dispatch(new CustomEvent('start', {
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY
    }));
    context.startX = point.clientX, context.startY = point.clientY;
    context.isTap = true;
    context.isPan =false;
    context.isPress = false;
    context.moves = [];

    context.timeoutHandler = setTimeout(() => {
      if(context.isPan) {
        return;
      } 
      context.isTap = false;
      context.isPan =false;
      context.isPress = true;
      console.log("press start")
      element.dispatch(new CustomEvent('pressstart', {}));
    }, 500)
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY -context.startY;

    if(dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;

      element.dispatch(new CustomEvent('panstart', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY
      }));
      console.log("pan start")
    }

    context.moves = context.moves.filter(record => {
      Date.now() - record.t < 300;
    });

    if(context.isPan) {
      context.moves.push({
        dx, dy,
        t: Date.now()
      });

      context.moves = context.moves.filter(record => Date.now() - record.t < 300);
      console.log("pan");

    }

  }

  let end = (point, context) => {
    if(context.isPan) {
      let dx = point.clientX - context.startX, dy = point.clientY -context.startY;
      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);

      let isflick = speed > 2.5
      if(isflick) {
        element.dispatch(new CustomEvent('flick', {
          startX: point.clientX,
          startY: point.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed,
          isflick: isflick
        }));
        // console.log("flick");
      }
      element.dispatch(new CustomEvent('panend', {}));

      // console.log("pan end");
    }
    if(context.isTap){
      element.dispatch(new CustomEvent('tap', {}));
    }

    if(context.isPress) {      
      element.dispatch(new CustomEvent('panstart', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
        speed: speed
      }));
      console.log("press end");
    }

    clearTimeout(context.timeoutHandler);
  }

  let cancel = (point,context) => {
      element.dispatch(new CustomEvent('canceled', {}));
      clearTimeout(context.timeoutHandler);
  }
}