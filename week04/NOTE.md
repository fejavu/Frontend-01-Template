### 宏任务
宏任务是浏览器执行代码时的一个单元粒度。由于JavaScript 的运行时单线程，不存在阻塞等设计，因此需要等一个宏任务执行完之后，才会执行下一个宏任务。因此分析代码，需要把执行代码，首先分成不同的宏任务执行力度。
```
console.log("Script start");

setTimeout(function() {
  console.log("In setTimeout")
}, 100);
// Script start
// In setTimeout
```
如上面代码中代码片段将分为两个宏任务：
1. 一个是执行 window.console.log()
2. 一个是浏览器发起的 setTimeout 宏任务

在 ECMAScript 标准中，提到类似宏任务的就是无论是 sourceText 是Module 还是Script 都要入队执行：
>a. If sourceText is the source code of a script, then
i. Perform EnqueueJob("ScriptJobs", ScriptEvaluationJob, « sourceText, hostDefined »).
b. Else sourceText is the source code of a module,
i. Perform EnqueueJob("ScriptJobs", TopLevelModuleEvaluationJob, « sourceText, hostDefined »).

### 微任务
微任务是宏任务中更小的异步执行队列。一个宏任务中只有一个微任务队列，并且同一个宏任务中的微任务可以不断在微任务队列中入队新的微任务，知道微任务队列执行为空，才会执行下一个宏任务。

练习题：
```
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
```
根据代码执行顺序，分成宏任务和宏任务中的同步执行代码、微任务，有以下分析：

宏任务一：
   同步执行代码：script start, async1 start, async2, promise1, script end;
   微任务一： async1 end
   微任务二：promise2

宏任务二：
  同步执行代码：setTimeout

因此最终的顺序为：
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```