---
title: npm前端项目
date: 2018-05-16 09:10:12 
categories: ['工具']
tags: ['工具']
---

npm相关前端操作
<!-- more -->

##### 本地调试
调试本地的包  
1. cd 到包的文件夹下 将当前包link到全局
    ``` bash
    npm link
    ```
2. cd 到项目文件夹 将要使用的包link过来 命令如下
    ``` bash
    npm link [package name]
    ```
示例：
> 包名称 xxg-uim-plugin-locale、项目名称 xxg-admin  
先在 xxg-uim-plugin-locale文件夹下将当前包link到全局，执行 :npm link  
在定位到xxg-admin项目下，执行: npm link xxg-umi-plugin-locale  
这样 如果通过yarn add xxg-umi-plugin-locale 安装包的时候会link到本地而不会从npm下载 这样方便本地开发调试

##### 发布到npm  
续待更新...