function convertNumToStr(number, x) {
  x = x || 10;
  var integer = Math.floor(number);
  var fraction = number - integer;
  var string = '';

  // 整数部分
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }

  // 小数部分
  var fraStr = '';
  while(fraction>0) {
    fraStr += Math.floor((fraction*x));
    fraction = (fraction*x) - Math.floor((fraction*x));
  }

  string = string + '.'+fraStr;
  string = string.slice(0, number.toString().length);  
  
  return string;
}

console.log(convertNumToStr(2.430432));