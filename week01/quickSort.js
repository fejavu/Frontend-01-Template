function quickSort(arr) {
  const len = arr.length;
  
  if(len < 2) return arr;

  let basic = arr[0], left = [], right = [];

  for(let i=0;i<len;i++) {
    if(arr[i]<basic) {
      left.push(arr[i]);
    }else {
      right.push(arr[i]);
    }
  }
  return left.quickSort().concat(basic, right.quickSort());
}