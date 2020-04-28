function convertStringToNumber(string, x) {
  x = x || 10;  // 默认为 10 进制
  var chars = string.split('');
  var number = 0;
  var i = 0;
  var exStr = 'eE';

  // 整数部分
  while (i<chars.length && chars[i] != '.' &&　(exStr.indexOf(chars[i]))<0) {
    number = number*x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  
  // 小数部分
  if(chars[i] === '.') {
    i++;
  }
  var fraction = 1;
  while (i<chars.length && (exStr.indexOf(chars[i]))<0) {
    fraction = fraction / x;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0))*fraction;
    i++;
  }

  // 指数部分
  if((exStr.indexOf(chars[i])) != -1) {
    i++;
  }
  var exNum =0;
  while(i<chars.length) {
    exNum = exNum*x;
    exNum += chars[i].codePointAt(0) - '0'.codePointAt(0) ;   
    i++;
  }
  
  if(exNum>0) {
    number = Math.pow(number, exNum);  
  }

  return number;
}

console.log(convertStringToNumber('2e10'));
console.log(Math.pow(2, 10));