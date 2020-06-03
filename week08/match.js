function match(element, selector) {
  if(!element || !selector) {
    return false;
  }

  if(selector.charAt(0) === '#') {
    let attr = element.attributes.filter( attr => attr.name === 'id')[0];
    if(attr && attr.value === selector.replace('#', '')) {
      return true
    }
  } else if(selector.charAt(0) === '.') {
    let attr = element.attributes.filter( attr => attr.name === 'class')[0];    
    if(attr && attr.value === selector.replace('.', '')) {
      return true
    }
  } else if(selector.charAt(0) === '[' && selector[selector.length-1] === ']') {
    let seleAttr = selector.split('=')[0].replace('[','');
    let seleAttrValue = selector.split('=')[1].replace(']','');

    if(element.attributes['seleAttr'] && element.attributes['seleAttr'] === seleAttrValue) {
      return true;
    }
  } else if (element.tagName === selector) {
    return true;
  } else {
    return false;
  }
}