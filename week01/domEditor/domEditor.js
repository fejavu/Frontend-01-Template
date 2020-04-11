let frameWindow = window.frames[0];  
let frameDocument = frameWindow.document;
let count = 0;

frameWindow.document.body.style.border='1px solid #ccc';

function addEle() {
  let newDiv = frameDocument.createElement('div');
  let newContent = frameDocument.createTextNode('new div'+count);

  newDiv.appendChild(newContent);
  frameDocument.body.appendChild(newDiv);
  count++;
}

function removeEle() {
  let eleColle = frameDocument.getElementsByTagName('div');
  let length = eleColle.length;
  
  if(length>0) {
    eleColle[length-1].remove();
    count--;
  } else {
    console.error('there is no element in frame');
  }
}

let addButton = document.querySelector('#add');
let removeButton = document.querySelector('#remove');
let moveButton = document.querySelector('#move');

addButton.addEventListener('click', addEle);
removeButton.addEventListener('click', removeEle);
