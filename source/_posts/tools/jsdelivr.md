---
title: jsdelivr
categories:
  - 工具
tags:
  - 工具
abbrlink: 46571
date: 2021-01-16 10:00:12
---

如何提速github 静态站点速度
<!-- more -->

## 为何要用jsdelivr

- GitHub上存储的图片、视频资源，由于某种因素会出现访问受限的情况，导致图片、视频显示异常
- 为了图片、视频显示正常可以使用CDN进行加速，从而使资源得以正确加载并显示的目的
- jsDelivr 是一个免费开源的 CDN 解决方案，用于帮助开发者和站长。包含 JavaScript 库、jQuery 插件、CSS 框架、字体等等 Web 上常用的静态资源

## 用途

- 托管自己的js库，比如我们的nomui
- 托管自己的博客，加速国内访问


## 使用方式

地址 https://www.jsdelivr.com/

jsDeliver可以给npm、GitHub、WordPress平台资源加速，我们以GitHub为例进行说明


https://cdn.jsdelivr.net/gh/:user/:repo@:branch/:path.html

-  https://cdn.jsdelivr.net：jsdelivr的URL
- gh：GitHub的缩写(表示加速GitHub资源)
- :user：GitHub上注册的用户名比如(xiexingen)
- :repo：仓库名称
- :branch: 分支名,可以没有，默认为master
- :path 文件路径

## 案例

https://github.com/xiexingen/blog/blob/gh-pages/index.html
https://cdn.jsdelivr.net/gh/xiexingen/blog@gh-pages/index.html



## 扩展(cdn) 自己类推
https://cdn.staticaly.com/gh/:user/:repo/:tag/:file
https://cdn.staticaly.com/gh/xiexingen/blog/master/README.md