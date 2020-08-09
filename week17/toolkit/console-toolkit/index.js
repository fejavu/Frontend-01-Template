// let stdin = process.stdin;
// let stdout = process.stdout;
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf-8' );

function getChar() {
  return new Promise((resolve) => {
    stdin.once('data', function(key) {
      resolve(key);
    });
  });
}

void async function() {
  stdout.write("Which framework do you want?\n\n")
  let anwser =  await select(["vue", "react", "angular"]);
  stdout.write("\nYou choose " + anwser + "\b");
  process.exit();
}();

function up(n = 1) {
  stdout.write("\033[" + n +"A");
}

function down(n = 1) {
  stdout.write("\033[" + n +"B");
}

function right(n = 1) {
  stdout.write("\033[" + n +"C");
}

function left(n = 1) {
  stdout.write("\033[" + n +"D");
}



async function select(choices) {
  let selected = 0;
  let mark = "\x1b[93m*\x1b[0m";
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];

    if(i === selected) {
      stdout.write(`[${mark}] ${choice}\n`);
    } else {
      stdout.write(`[ ] ${choice}\n`);
    }
  }
  
  up(choices.length);
  right();

  while(true) {
    let char = await getChar();
    if(char === '\u0003') {
      process.exit();
    }

    if(char === 'w' && selected > 0) {
      stdout.write(" ");  
      left();
      selected--;
      up();
      stdout.write(mark);
      left();
    }

    if(char === 's' && selected < choices.length - 1) {
      stdout.write(" ");
      left();
      selected++;
      down();
      stdout.write(mark);
      left();
    }

    if(char === '\r') {
      down(choices.length - selected);
      left();
      return choices[selected];
    }
  }
}