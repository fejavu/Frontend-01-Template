/**
 * Numeric Literal： 
 * 1. Decimal Literal 
 * 2. BinaryInteger Literal
 * 3. OctalInteger Literal
 * 4. HexInteger Literal
*/

let numBinary = '0b00345';
let numOctal = '0O23467';
let numHex = '0x3248acdef';
let numDec = '232E+10'

let regBina = /^0((b|B)[01]+)/g;
let regOct = /^0((o|O)[0-7]+)/g;
let regHex = /^0(((x|X)[0-9a-fA-F]+))/g;
let regDec = /(\d+)\.\d{0,}([e|E][-|+]\d+)|(\.\d+([e|E][-|+]\d+))|((\d+)([e|E][-|+]\d+))/g;

let regNumeric = /(\d+)\.\d{0,}([e|E][-|+]\d+)|(\.\d+([e|E][-|+]\d+))|((\d+)([e|E][-|+]\d+))|^0(((b|B)[01]+)|((o|O)[0-7]+)|((x|X)[0-9a-fA-F]+))/g;

console.log(num.match(regNum));
console.log(num_two.match(regNum));