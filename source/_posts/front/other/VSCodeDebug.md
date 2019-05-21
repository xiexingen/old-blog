---
title: vscode下调试es6编写的npm包
categories:
  - 前端-其他
tags:
  - 前端-其他
comments: false
abbrlink: 100
date: 2018-09-22 21:10:10
img:
---

0. 前置条件 安装好node环境
1. 创建一个文件夹  执行npm init 更具需要选择
2. 通过yarn安装babel-preset-es2015 (也可以通过npm等)
```
yarn add -d babel-cli babel-preset-es2015 //安装babel-cli与babel-preset-es2015
yarn add -d babel-preset-stage-1 //支持babel-preset-stage-1
//yarn add -d babel-preset-react //如果需要支持react
//yarn add -d babel-plugin-transform-object-assign //适用于Object.assign()
//yarn add -d babel-plugin-transform-object-rest-spread //适用于展开运算符
```
3. 在package.json文件夹中添加一个scripts 如下所示:
```
scripts: {
    "build": "babel src --watch --source-maps --presets=es2015,stage-1 --out-dir dist" //切记 --source-maps一定要加上
}
```
4. 跟目录下添加.babelrc 内容如下
```
{
    "presets": [
        "es2015"
        //,"react" //如果有使用react
    ]
    //,
    //"plugins":[
    //    "transform-object-assign", //适用于Object.assign()
    //    "transform-object-rest-spread" //适用于展开运算符 ...
    //]
}
```
5. 编写自己的代码，整体项目结构如下  
|-src  
&emsp;|--cores  
&emsp;&emsp;|--math.js  --被引用的js文件  
&emsp;|--index.js   --主入口js文件 
|.babelrc  
|.package.json  
6. 切到vscode左侧的调试窗口，点击添加配置  
这个时候会生成一个launch.json文件，修改内容如下
```
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch App.js",
            "program": "${workspaceRoot}/src/index.js",
            "outFiles": [
                "${workspaceRoot}/dist/**/*.js"
            ]
        }
    ]
}
```
7. 先生成在运行调试
npm run build会生成一个dist目录，然后点击调试上的运行按钮 执行调试