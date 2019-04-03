---
title: 使用umi-library来打包组件
date: 2019-04-02 21:35:10 
categories: ['React']
tags: ['前端','React','umi']
---

通过umi-library将自己的组件打包成各种类型的包...
<!-- more -->

# 文件格式说明 
### esm 用途
es6语法格式(也叫AMD)，主要用在浏览器中 export default ...；可以做 tree-shaking(打包成一个文件，但是项目中使用时只引入需要的那一部分) 
### cjs 用途
es5的语法(也叫CommonJS)，目前主要给node用； module.exports=...
### umd 用途
兼容esm和cjs，先判断是否支持node模块module.exports

# 步骤  
1. 安装umi-library  
    ``` node
    yarn add umi-library -D
    ```
2. 配置.umirc.library.js文件
    ``` js
    export default {
    // 使用babel方式打包 将按照源代码的文件目录进行打包，默认为rollup方式(将文件合并成一个)
    esm: 'babel', 
    cjs: 'babel',
    autoprefixer: {
        browsers: ['ie>8', 'Safari >= 6'],
    },
    extraBabelPlugins: [
        [
        'babel-plugin-import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        },
        ],
    ],
    };
    ```
3. 执行打包
可以参考github项目 https://github.com/wetrial/wetrial

> umi-library[地址](https://github.com/umijs/umi/tree/master/packages/umi-library)