# 每周总结Week06

#### 有限状态机处理字符串

有限状态机

每个机器里可以做计算、存储、输出；所有机器接受的输入是一致的；状态机本身没有状态，如果使用函数表示，应该是一个纯函数。

每个机器都知道下一个状态。
摩尔型：每个机器都有确定的下一个状态；
米利型：每个机器根据输入决定下一个状态。

JS 中的有限状态机(Mealy)
```
function state(input) {
  // state logic
  return next; // 返回值为下一个状态
}

// call the method
 while (input) {
   state = state(input);  // 状态机返回值作为下一个状态
 }
```

HTML Parser

使用 FSM （有限状态机） 来实现 HTML 分析，在 HTML 标准中，已经规定了 HTML 的状态， Toy-Browser 只挑选其中状态的一部分，完成简单版本。

解析标签

data -> '<'(tag open) -> '/'(end tag open) || 'letter' (tag name)