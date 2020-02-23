---
title: .net core 3.0 Signalr - 09 待改进&交流
date: '2019-10-05 20:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61069
---

.net core 3.0 Signalr - 09 待改进&交流
<!-- more -->

## 个人心得
写博客真的比写代码累，膜拜那些坚持写博客的大佬！  
有时候零散的片段比较多，没写之前感觉有千千万万要写的东西，实际写的时候发现， 好像这个没啥说的，然后就帖了个图，或者一笔带过了

## 待改进&交流
- 使用消息队列替换目前的api调用形式，同时消息队列支持定义推送优先级
- 使用polly来重试失败的调用
- 将连接中传递的userId改成token
- 多个客户端同时关闭，IsLast不准确
- 服务器端需要有定时任务去清除redis中的无效数据(看造化)
- 连接的监控
- 连接的并发数量测试



更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |  [.net core 3.0 Signalr - 08 业务实现-客户端demo](/2019/10/05/dotnetcore/signalr/08-clientdemo/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
