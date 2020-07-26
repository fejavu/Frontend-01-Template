let element = document.body;

// mouse native events
element.addEventListener("mousedown", (event) => {
  start(event)
  let mousemove = (event) => {
    move(event);
    // console.log(event.clientX, event.clientY);
  }

  let mouseend = (event) => {
    end(event)
    document.addEventListener("mousemove", mousemove)
    document.addEventListener("mouseup", mouseend);
  }

  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", mouseend);
});

/**
 * gesture native events
 */
element.addEventListener("touchstart", event => {
  for (const touch of event.changedTouches) {
    start(touch)
  }
  // console.log(event.type);
  // console.log(event.changedTouches[0]);
});

element.addEventListener("touchmove", event => {
  for (const touch of event.changedTouches) {
    move(touch)
  }
  // console.log(event.changedTouches[0]);
  // console.log(event.type);
});

element.addEventListener("touchend", event => {
  for (const touch of event.changedTouches) {
    end(touch)
  }
  // console.log(event.type);
});

element.addEventListener("touchcancel", event => {
  for (const touch of event.changedTouches) {
    cancel(touch)
  }
  console.log(event.type);
});

/**
 * 
 * abstract events
 */
let start = (point) => {
  console.log("start", point.clientX, point.clientY)
}

let move = (point) => {
  console.log("move", point.clientX, point.clientY)
  
}

let end = (point) => {
  console.log("end", point.clientX, point.clientY)
  
}

let cancel = (point) => {
  console.log("cancel")
  
}