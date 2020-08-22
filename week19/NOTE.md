# 每周总结Week 19 

### Tool Kit

工具链包含开发到发布到几大环节，包括项目初始化、开发调试、代码测试、发布。分别会用到例如cli工具（Vue、React、Angular），VsCode、Chrome devtool、webpack、babel、mocha nyc ava、archiver、unzipper、等


#### Initalize
yeoman generators-initial

generator.fs.copyTpl()， 复制 generator 中模板的文件到相应的目标文件。
generator.npmInstall(["packges"], config)，项目初始化，安装依赖包。

项目常用配置（面试常问）

```
"devDependencies": {
  "@babel/core": "^7.11.1",
  "@babel/plugin-transform-react-jsx": "^7.10.4",
  "@babel/preset-env": "^7.11.0",
  "@babel/register": "^7.10.5",
  "@istanbuljs/nyc-config-babel": "^3.0.0",
  "babel-loader": "^8.1.0",
  "babel-plugin-istanbul": "^6.0.0",
  "html-webpack-plugin": "^4.3.0",
  "mocha": "^8.1.1",
  "nyc": "^15.1.0",
  "webpack": "^4.44.1",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.0"
}
```
`babel`系列：`JavaScript` 不同版本解析与输出， 包括ES6，JSX，CSS loader
`webpack`系列：文件打包输出，运行时`debug`
`mocha`系列： 包括`mocha`、`nyc`、`ava` 等测试框架，对代码进行单元测试。

#### Dev
VS-Code 编辑器工具，chrome dev-tool/nodejs 调试工具、babel、webpack代码编译打包工具

#### Test
mocha测试框架，针对单个文件进行结果测试，也是根据测试结果 debug 的过程，nyc是测试代码通用性的工具，一般要覆盖90%以上的代码行数，才能认为这个文件的代码健壮性。

#### Publish
客户访问服务器，测试环境服务器，发布工具。确认本地代码运行无误后，通过发布工具打包本地发文件（unzipper），并且通过 nodeJS的文件系统 readStream，pipe到生产环境服务器 server（同级发布）