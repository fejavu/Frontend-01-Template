### ECMAScript 中所有的特殊对象
**Bound Function Exotic Objects**
被绑定的函数对象，就是在 Javascript 中被绑定到包装函数绑定到函数，通常调用一个被绑定到函数会作用在包裹函数上。

他们有 BoundTargetFunction, 也就是包裹函数。还有伴随传递的`this`值。最后的形式是：
```
WrapFunction.call(target, boundThis, args)
```
**Array Exotic Objects**
数组特殊对象。数组对象的特殊性在于：每个属性值都是数组的索引值（0, 1, 2, 3...length-1）；也被称为一个元素。

每个数组对象都有一个不可配置的值，就是数组的长度，小于2^32。当一个新的属性值被创造，并且是以数组索引作为值的时候，length的值就会发生相应的改变。如果length值被改变，则小于length的索引值对应的属性元素会被删除。

**String Exotic Objects**
字符串对象是将每个字符码元字符的值，对应成整数索引的数据属性。和数组一样，字符串也有一个length值，对应的值是字符串中字符的个数。length属性和每个字符的数据属性都是不可写、不可配置的。

**Arguments Exotic Objects**
大部分的ECMAScript 函数都会有一个参数对象，由函数本身定义。参数对象本身具有整数索引值，并对应到索引值所对应的参数值。

**Integer-Indexed Exotic Objects**
整数索引特殊对象是对整数索引属性键执行特殊处理的特殊对象。它具有通用的属性[[ViewedArrayBuffer]],[[ArrayLength]], [[ByteOffset]], and [[TypedArrayName]] 

**Module Namespace Exotic Objects**
模块命名空间特殊对象公开了从ECMAScript模块中导出的绑定。模块命名空间对象是不可拓展的。该种对象有特殊的插槽[[Module]], [[Exports]]

**Immutable Prototype Exotic Objects**
固定原型特殊对象有一个特殊对象 [[Prototype]]，一旦初始化之后不会变得。就是平时使用的时候

### 本周作业

**作业一**
完成 string to number 剩余部分，以及完成 number to string 全部。

作业见统计目录中 strToNum.js 以及 numToStr.js

**作业二**
将所有 ECMAScript 文档中，无法实现的出来的特殊对象找出来，并分析其特性，写成总结，见上文。