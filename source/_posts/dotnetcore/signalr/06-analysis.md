---
title: .net core 3.0 Signalr - 06 业务实现-业务分析
date: '2019-10-03 20:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61069
---

.net core 3.0 Signalr - 06 业务实现-业务分析
<!-- more -->

## 业务需求
1. 人-项目关系
一个人可以属于多个项目，一个项目可以有多个人加入，通知的时候，可以通知项目内的所有人，也可以通知部分人或者某个责任人。
2. 登录互斥
同一个人不允许登录两次(不同浏览器或者不同电脑登)，后面登录的会将前面登录的人挤下线。
3. 聊天
可以私聊、也可以创建群聊、上线通知(多个连接的情况)

## 功能设计
> 名词解释: 业务系统:具体业务功能的系统     推送系统:实际的Signalr系统，跟业务系统分开部署
1. 将推送单独成一个子系统；支持单独部署，可一台服务器也可以多台，通过redis作为底板来分发到服务器
2. 推送子系统端自定义管理用户、连接、组，业务系统调用的时候
3. 推送系统开发一个api，给业务系统直接调用(当然这不是最佳选择，可以通过消息队列，支持重试、优先级等，性能会比http形式好很多)



更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 05 使用jwt将用户跟signalr关联](/2019/10/02/dotnetcore/signalr/05-jwt/) 
|   下一篇  |   [.net core 3.0 Signalr - 07 业务实现-服务端 自定义管理组、用户、连接](/2019/10/04/dotnetcore/signalr/07-self-manager/)  
|   源码地址  |   [源码](https://github.com/xiexingen/Core.Signalr.Template) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
