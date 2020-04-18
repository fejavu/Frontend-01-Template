function unicodeFun() {
  for(let i=0;i<128;i++) {
    document.write();
    document.write("<span>"+String.fromCharCode(i)+"</span>"+"<br>");
  }
  
  let \u5389\u5bb3 = 1; // "厉害" 两个字的 \u 转义
  console.log(厉害);
}

unicodeFun();