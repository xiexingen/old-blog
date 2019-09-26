---
title: .net core 3.0 Signalr - 07 业务实现-服务端 自定义管理组、用户、连接
date: '2019-10-04 20:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61069
---

.net core 3.0 Signalr - 07 业务实现-服务端 自定义管理组、用户、连接
<!-- more -->
## Hub的管理
- 重写OnConnectedAsync
从连接信息中获取UserId、Groups,
[代码请查看](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Server/Hubs/NotifyHub.cs)

## 提供API给业务系统调用

## 增加日志记录



更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |  [.net core 3.0 Signalr - 06 业务实现-业务分析](/2019/10/03/dotnetcore/signalr/06-analysis/) 
|   下一篇  |   [.net core 3.0 Signalr - 08 业务实现-客户端demo](/2019/10/05/dotnetcore/signalr/08-clientdemo/)  
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
