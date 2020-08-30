# 每周总结Week20

phantomJS-Headless Browser

Windows 环境下设置 phantomJS 命令，gitbash 条件下。设置自定义短命令。

其中中间的值`"D:\Software_Exes\phantomJS\phantomjs-2.1.1-windomjs.exe"`为下载解压 phantomJS 的路径

`phantom`为自定义的运行命令

```
alias phantom='"D:\Software_Exes\phantomJS\phantomjs-2.1.1-windomjs.exe"' $@
```

JSlint

#### Oauth

通过练习比较通用的 `Github OAuth`，来理解整个 `OAuth` 的流程。主要就是参数配置、请求`token`，验证`token`、权限系统验证权限、不同的权限进行不同的操作。

1. 参数配置
登录 `Github`，配置一个 `OAuth` 的 App，设置名字，`callback URL`，就可以得到一个`OAuth ` App，详情见官方指南。
[创建OAuth应用](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

2. 请求token-用户侧
`Github` 中请求 `token` 分为两步，第一步`GET`请求得到一个 `code`，通过`code`以及其他的一些参数，得到 `access_token`。
[请求token](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

3. 验证token-get User
步骤2用户侧请求到的`token`，提供到 `OAuth` App端进行验证，App端通过`token`以及Github的`/getUser`API对步骤2的用户信息进行请求，请求到的用户信息提供给下一个步骤进行验证。

4. 权限系统验证权限
步骤3得到发起请求的`user`，在内建的用户权限系统中，对该用户的权限进行验证，看是否有写入的权限，并给出相应的提示。
