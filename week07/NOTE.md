# 每周总结Week07

### CSS Computing
第一步，利用 npm 社区的 CSS 解析库，将 text 解析成 CSS 规则的一条条规则对象，收集CSS规则。
第二步，创建一个元素后，立即计算该元素的 CSS 属性，理论上，当分析一个元素时，已获取全部的样式表规则。
第三步，获取父元素序列，在计算CSS中，我们必须知道所有父元素才能判断元素与规则是否匹配；我们首先获取当前元素，所以获得父元素的匹配顺序是从内向外。
第四步，拆分选择器。
第五步，计算元素与属性匹配。
第六步，一旦选择匹配上computedStyle， 则立即应用到元素上，形成computed style。
第七步，specifity优先级，确定覆盖关系。

### layout
第一步 | flex layout。主轴，交叉轴。主轴方向：flex-direction: row/column

第二步 | 收集元素进到行里，mainSize 表示主轴宽度。
```
<style>
  div span {

  }
</style>

<div>
  <span>demo</span>
</div>

```

### CSS 2.1 

- @charset
- @import
- rules
   - @media
   - @page
   - rule