async function foo() {
  console.log('-2');

  await new Promise(resolve => resolve());
  console.log('-1');
}

new Promise(resolve => (console.log('0'),resolve()))
  .then(() => (
    console.log('1'),
    new Promise(resolve => resolve())
      .then(() => console.log('1.5')) 
));

setTimeout(function() {
  console.log('2');

  new Promise(resolve => resolve())
    .then(console.log('3'));
}); 

console.log('4');
console.log('5')
foo();
