class Sorted {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare;
  }

  take() {
    if(!this.data.length) {
      return;
    }

    let min = this.data[0];
    let minIndex = 0;

    for(let i=1; i < this.data.length; i++) {
      if(this.compare(this.data[i], min) > 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    this.data[minIndex] = this.data[this.data.length -1];
    this.data.pop();  // 取出最后一个
    
    return min ;
  }

  insert(v) {
    this.data.push(v)
  }

  get length() {
    return this.data.length;
  }
}

class BinaryHeap {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare;
  }

  take() {
    if(!this.data.length) {
      return;
    }

    let min = this.data[0];
    let i = 0;

    while(i < this.data.length) {
      if(i * 2 + 1 >= this.data.length) {
        break;
      }      
      
      if(i * 2 + 2 >= this.data.length) {
        i = i * 2 + 1;
        break;
      }

      if(this.compare(this.data[i * 2 + 1], this.datap[i * 2 + 2]) < 0) {
        this.data[i] = this.data[i * 2 + 1];
        i = i * 2 + 1;
      } else {
        this.data[i] = this.data[i * 2 + 2];
        i = i * 2 + 2;

      }
      
    }
    
    if(i < this.data.length-1) {
      this.insertAt(i, this.data.pop());
    } else {
      this.data.pop();
    }

    this.insertAt(i, this.data.pop());

    return min ;
  }

  insertAt(i, v) {
    while(i > 0 && ths.compare(v, this.data[Math.floor((i-1)/2)]) < 0) {
      this.data[i] = this.data[Math.floor((i-1)/2)];
      this.data[Math.floor((i-1)/2)] = v ;
      i = Math.floor((i-1)/2);
    }
  }

  insert(v) {
    return this.insertAt(this.data.length, v);
  }

  get length() {
    return this.data.length;
  }
};

function findPath(map, start, end) {
  map = map.slice();

  function distance([x, y]) {
    return (x- end[0]) ** 2 + (y - end[1]) ** 2;
  }

  let queue = map[start];

  async function insert([x, y]) {
    if(map[100 * y + x] !== 0) {
      return;
    }
    if(x < 0 || y < 0 || x>=100 || y >= 100) {
      return;
    }

    map[100*y + x] = 2;
    queue.push([x, y]);
  }

  while(queue.length) {
    let [x, y] = queue.shift();

    if(x === end[0] && y === end[1]) {
      let path = [];
      while(x !== start[0] || y !== start[1]) {
        path.push([x, y]);
        container.children
      }
    }

    await insert([x-1, y]);
    await insert([x+1, y]);
    await insert([x, y-1]);
    await insert([x, y+1]);
  }
  return false;
}