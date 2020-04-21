/**
 * String Literal
 *  Double String Characters
 *    DoubleStringChar
 *      SourceChar(non " or \ or LineTerminator)
 *      <LS>
 *      <PS>
 *      \Exc
 *  Single String Characters
 */

let regDobleString = /"(?:["\n\\\r\u2028\u2029]|\\(?:["'\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux"'\\bfnrtv\n\r\u2028\u2029])*"/g;
let regSigleString = /'(?:["\n\\\r\u2028\u2029]|\\(?:["'\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux"'\\bfnrtv\n\r\u2028\u2029])*'/g;