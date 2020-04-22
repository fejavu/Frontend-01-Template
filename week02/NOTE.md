### 本周内容
本周主要学习了编程语言通识与 `JavaScript `的语法以及类型。

**编程语言通识**
编程语言按照乔姆斯基谱系主要分为 4 种类型语言：无限制文法、上下文相关文法、上下文无关文法、正则文法。而语言的规则主要由产生式来生成。

语言的图灵完备性，需要具有例如`goto`, `if/while`等图灵机的语法结构；或者包含lambda表达式，递归等；或者可以通过元编程（生成程序的程序）

**动态语言与静态语言**
编程序言分为动态语言和静态语言。动态语言运行在用户设备上，语言的编译是runtime（运行时），因此产生错误的时候是运行在用户设备上的时候，比较不稳定；静态语言是在测试环境中，开发环境中编译运行，因此大型的应用适合用静态语言去作为开发语言。

**强类型和弱类型**
强弱类型主要看会不会发生变量间的类型转换，弱类型在运行时会发生类型转换，`Boolean`换成`Number`等，强类型语言则不会发生类型转换，变量类型不对则直接报错等。

**命令式编程语言组成**
一般的编程语言主要由词法（Atom）、表达式、声明语句、程序结构、程序组成。

**`JavaScript`语言词法**
`JavaScript`输入参数主要有空白符、断行符、注释、Token组成。其中Token包括标记名称、文法、Punctuator等组成，文法比较重要的为JavaScript中的7中数据类型：Numbe, String, Boolean, Undifined, Null, Symbol, Object。

### 本周作业
写一个正则表达式 匹配所有 Number 直接量
写一个 UTF-8 Encoding 的函数
写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

Number直接量，在EcmaScript 标准中，Number直接量主要为二进制、八进制、十进制、十六进制（Binary/Decimal/Octal/Hex）
```
let regBina = /^0((b|B)[01]+)/g;
let regOct = /^0((o|O)[0-7]+)/g;
let regHex = /^0(((x|X)[0-9a-fA-F]+))/g;
let regDec = /(\d+)\.\d{0,}([e|E][-|+]\d+)|(\.\d+([e|E][-|+]\d+))|((\d+)([e|E][-|+]\d+))/g;

let regNumeric = /(\d+)\.\d{0,}([e|E][-|+]\d+)|(\.\d+([e|E][-|+]\d+))|((\d+)([e|E][-|+]\d+))|^0(((b|B)[01]+)|((o|O)[0-7]+)|((x|X)[0-9a-fA-F]+))/g;
```

UTF8_Encoding 编码函数，UTF8编码主要是将码点按照规则转换为16进制的转化。
1	7	U+0000	U+007F	                0xxxxxxx			
2	11	U+0080	U+07FF	                110xxxxx	10xxxxxx		
3	16	U+0800	U+FFFF	                1110xxxx	10xxxxxx	10xxxxxx	
4	21	U+10000	U+10FFFF[12]	11110xxx	10xxxxxx	10xxxxxx	10xxxxxx

String直接量