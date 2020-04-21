/**
 * 
1	7	U+0000	U+007F	0xxxxxxx			
2	11	U+0080	U+07FF	110xxxxx	10xxxxxx		
3	16	U+0800	U+FFFF	1110xxxx	10xxxxxx	10xxxxxx	
4	21	U+10000	U+10FFFF[12]	11110xxx	10xxxxxx	10xxxxxx	10xxxxxx
 */

function UTF8_Encoding(str) {
  let res = '';
  if(str.length<1) return res;
  
  for(let i=0;i<str.length; i++) {
    res += toStrHex(str.charCodeAt(i));
  }
  return res; 
}

function toStrHex(num) {
  if(num < 0x007F) {
    return '\\x'+num.toString(16);    
  }else if(num <0x7FF){
    let temp = num.toString(2);
    temp = '110'+temp.slice(0,5)+'10'+temp.slice(5,11);
    return binaryStrToHex(temp);
  }else if(num <0xFFFF){
    let temp = num.toString(2);
    temp = '1110'+temp.slice(0,4)+'10'+temp.slice(4, 10)+'10'+temp.slice(10, 16);
    return binaryStrToHex(temp);
  }else if(num < 0x10FFFF){
    let temp = num.toString(2);
    temp = '11110'+temp.slice(0,3)+'10'+temp.slice(3, 9)+'10'+temp.slice(9, 15)+'10'+temp.slice(15, 21);
    return binaryStrToHex(temp);
  }
}

function binaryStrToHex(binaryStr){
  let res = '';
  let byteCount = binaryStr.length / 4;

  for(let i=0;i<byteCount;i++) {
    let tempStr = binaryStr.slice(i, i+4);
    res += '\\x'+byteToNum(tempStr).toString(16);
  }
}

function byteToNum(str) {
  let res = 0;
   for(let i=0;i<str.length;i++) {
     res += str[i]*Math.pow(16, 3-i);
   }
   return res;
}

let demoStr = 'winter is coming';
// console.log(UTF8_Encoding(demoStr));