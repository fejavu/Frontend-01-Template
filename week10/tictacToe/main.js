
let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

let color = 1;

function show() {
  let board = document.getElementById("board");
  board.innerHTML = "";

  for(let i=0;i<3;i++) {
    for(let j=0;j<3;j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = 
        pattern[i][j] == 2 ? "❌":
        pattern[i][j] == 1 ? "⭕️" : "";
      
      cell.addEventListener("click", () => move(j, i));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }

}

function move(x, y) {
  pattern[y][x] = color;
  if(check(pattern, color)) {
    alert(color == 2 ? "❌ is the Winner" : "⭕️ is the Winner")
  }
  
  // if(willWin(pattern, color)) {
  //   console.log(color == 2 ? "❌ is the Winner" : "⭕️ is the Winner");
  // }
  color = 3 - color;  
  show();
  computerMove();
}

function check(pattern, color)  { 
  
  // 横
  for(let i = 0; i < 3; i++) {
    let win = true;
    
    for(let j = 0; j < 3; j++) {
      if(pattern[i][j] !== color) {
        win = false;
      } 
    }
    if(win) {
      return true;
    }
  }

  // 竖
  for(let i = 0; i < 3; i++) {
    let win = true;
    
    for(let j = 0; j < 3; j++) {
      if(pattern[j][i] !== color) {
        win = false;
      } 
    }
    if(win) {
      return true;
    }
  }
  
  // 斜1
  {
    let win = true;
    
    for(let j = 0; j < 3; j++) {
      if(pattern[j][j] !== color) {
        win = false;
      } 
    }
    if(win) {
      return true;
    }
  }

  // 斜2
  {
    let win = true;
    
    for(let j = 0; j < 3; j++) {
      if(pattern[j][2 - j] !== color) {
        win = false;
      } 
    }
    if(win) {
      return true;
    }
  }
  return false;
}

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

function willWin(pattern, color) {
  for(let i = 0; i < 3; i++) { 
    for(let j = 0; j < 3; j++) {
      if(pattern[i][j] !== 0) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      if(check(temp, color)) {
        return [j, i];
      }
    }
  }
  return null;
}

function computerMove() {
  let choice = bestChoice(pattern, color);
  if(choice.point) {
    pattern[choice.point[1]][choice.point[0]] = color;
  }
  if(check(pattern, color)) {
    alert(color == 2 ? "❌ is the Winner" : "⭕️ is the Winner")
  }
  color = 3 - color;
  show();
  
}

let opening  = new Map();

opening.set([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
].toString() + "1", {
  point: [1, 1],
  result: 0
});

function bestChoice(pattern, color) {

  if(opening.has(pattern.toString() + color)) {
    return opening.get(pattern.toString() + color);
  }
  let point = willWin(pattern, color);

  if(point) {
    return {
      point: point,
      result: 1
    }
  }

  let result = -1;

  for(let i = 0; i < 3; i++) { 
    for(let j = 0; j < 3; j++) {
      if(pattern[i][j] !== 0) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      let opp = bestChoice(temp, 3 - color);
      if(0 - opp.result >= result) {
        point = [j, i];
        result = -opp.result;
      }
    }
  }

  return {
    point: point,
    result: point ? result : 0
  }
}

show();