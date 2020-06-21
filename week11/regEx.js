<style>
  .keywords {
    color: purples;
  }
</style>

<pre id = "container"> 

</pre>

let source = `
function sleep() {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
}
`;

let regexp = /(function|new|return) |([ \t\n\r]+) | ([a-zA-Z0-9]*) | ([\{\}\{\}\,\;])/g 

let dictionary = ['keywords', 'whitespace', 'indentifier', 'puntuator'];

let token = null;
let lastIndex = 0;
let container = document.getElementById("container");

do {
  lastIndex = regexp.lastIndex;
  token = regexp.exec(source);

  console.log(token);
  console.log(lastIndex);
  
  if(!token) break;

  let text = document.createElement("span");
  text.textContent = token[0];
  
  for(var i = 1; i < 5; i++) {
    if(token[i]) {
      text.classList.add(dictionary[i-1]);
    }
  }

  container.appendChild(text);
  
} while (token)
  


