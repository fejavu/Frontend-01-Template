let css = require('css');

module.exports = function(source, map) {
  let obj = css.parse(source);
  let name = this.resourcePath.match(/([^/]+).css$/)[1];
  console.log(source);

  for (const rule of StyleSheet.StyleSheet.rules) {
    rule.selectors = rule.selectors.map(selector => {
      selector.match(new RegExp(`^.${name}`)) ? selector :`${name} ${selector}`
    });
    // console.log(rule);
  }
  
  // console.log(css.stringify(stylesheet));
  // console.log(obj)
  return obj;
}