# 每周总结可以写在这里

### Single File Components
在大型的前端应用中，往往不是大概念上的HTML、CSS、JavaScript 不同类型文件的分离，而是基于业务需求的子业务划分的分离，例如不同页面中相似的 `Header`、`Aside`、`Footer`、`Carousel`、`ListView`、`Panel`等子组件，为了业务和项目的快速上线，代码的复用，以及相同模块的风格的统一，往往需要将这些内容变成单文件组件，其子组件内部其紧密耦合的`method` 、`CSS`等

```
// greeting component
<template>
  <p> {{ greeting }} world!!! </p>
</template>

<script>
  module.exprots = {
    data: function() {
      return {
        greeting: 'hello'
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 18px;
    line-height: 20px;
  }
</style>
```
[Vue Single File Component](https://cn.vuejs.org/v2/guide/single-file-components.html)

### Animation
Animation 的基础库主要是由