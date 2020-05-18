### 每周总结Week 05
本周主要学习了最后一点 Javascript 内容，关于JS context ，也就是 Realm。

浏览器知识中的简单的 HTTP 请求与响应，并完成了一个玩具浏览器简单的请求，以及返回响应的解析。

Realm 是一个 JS 上下文，也就是 JS 代码的执行环境，它内置了所有 JS 需要的对象，包括常用的 Math , NaN, Infinity, Array……等。

简单的玩具浏览器包含主要的功能是请求的发送和接收。HTTP请求有对应的格式: host:port /path?params，在 node.js 环境下，使用 connection模块创建一个请求，并按照格式写入对应的字段，发送到服务端并处理返回的响应。

返回的响应体也有响应的格式。第一行是返回的状态码，以及对应的状态说明。接着是一个响应头 Header ，响应头中有属性和属性值，需要分别解析。content-type : application/www-urlencoded等。响应头之后是一个换行符以及一个回到行首。之后是一个响应的body，body就是服务器返回的具体的响应内容。包括常见的 HTML 文件等，之后就是解析body的过程。