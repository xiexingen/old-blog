---
title: 写博客的神器-图床篇
categories:
  - 其他
tags:
  - 其他
abbrlink: 5711
date: 2019-08-26 20:10:10
---

vscode下使用 PicGo自动上传图片
<!-- more -->

### 前言
> [PicGo github地址](https://github.com/Molunerfinn/PicGo)  
> [PicGo 文档地址](https://picgo.github.io/PicGo-Doc/zh/guide/config.html) 


### 纯手工时代
| 类型 | 优点 | 缺点
| :--- | :---  | :---
|站内 | 1.图片自定义命名<br/> 2.方便管理迁移  | 1.增加博客服务器压力(一般都是比较弱的机器)<br/> 2. 操作麻烦
|外部资源服务器<br/>比如(七牛、微博、腾讯云、阿里云等) |1. 减轻服务器压力<br/> |1.操作麻烦，不好管理图片

### 工业1.0时代
今天的重点是，vscode下的[PicGo](https://github.com/Molunerfinn/PicGo)插件,通过简单的配置可以实现切换 七牛、微博、腾讯云COS、又拍云、github、阿里云oss、imgur等，与vscode很方便的集成，综合对比了下 腾讯云、阿里云皆收费，github国内又有点慢，最后选择了七牛，每个月10G 博客应该够用，配置如下:
![](https://cdn.jsdelivr.net/gh/xiexingen/blog/assets/images/20190807085943.png)
