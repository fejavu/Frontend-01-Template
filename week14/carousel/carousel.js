class Carousel {
  constructor(){
    this.root = null;
    this.data = null;
  }

  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");

    for(let d of this.data) {
      let element = document.createElement("img");
      element.src = d;
      element.addEventListener("dragstart", event => {
        event.preventDefault();
        element.style.cursor = 'grabbing';
      });
      this.root.appendChild(element);
    }

    let curPosition = 0;

    let nextPic = () => {
      let nextPosition = (curPosition + 1) % this.data.length; // number circle use % operator
      
      let curEle = this.root.childNodes[curPosition];
      let nextEle = this.root.childNodes[nextPosition];

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
      // setTimeout(nextPic, 3000);
    }
    // setTimeout(nextPic, 3000);


    this.root.addEventListener("mousedown", (event) => {     
      let initX = event.clientX, initY = event.clientY;
      let nextPosition = (curPosition + 1) % this.data.length;
      let prevPostion = (curPosition - 1 + this.data.length) % this.data.length
      
      let preEle = this.root.childNodes[prevPostion];
      let curEle = this.root.childNodes[curPosition];
      let nextEle = this.root.childNodes[nextPosition];
      
      preEle.style.transition = `ease 0s`;
      curEle.style.transition = `ease 0s`;
      nextEle.style.transition = `ease 0s`;

      preEle.style.transform = `translateX(${ -500 - 500 * prevPostion}px)`;
      curEle.style.transform = `translateX(${- 500 * curPosition}px)`;
      nextEle.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      this.root.childNodes.forEach(item => {
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

        this.root.childNodes.forEach(item => {
          item.style.cursor = 'grab';
        });

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
  
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }
}