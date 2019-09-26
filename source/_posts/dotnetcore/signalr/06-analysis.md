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
4. 文件下载
用户在界面上选择了多个文件，然后选择批量打包下载，后端后台线程进行压缩、压缩完成后通过signalr通知该用户(的某个连接,比如当前用户开了多个tab页，应该只能推送给操作的那个tab页)

## 功能设计
> 名词解释: 业务系统:具体业务功能的系统     推送系统:实际的Signalr系统，跟业务系统分开部署
1. 将推送单独成一个子系统；支持单独部署，可一台服务器也可以多台，通过redis作为底板来分发到服务器
2. 推送子系统端自定义管理用户、连接、组，业务系统调用的时候
3. 推送系统开发一个api，给业务系统直接调用(当然这不是最佳选择，可以通过消息队列，支持重试、优先级等，性能会比http形式好很多)
业务系统调用推送系统的时候传递参数包括，组、用户、推送数据对象，比如如下代码  
  ``` C#
  var send = new Send()
  {
      // 推送的组，多个用,隔开
      GroupId = GroupId,
      // 关联的UserId 多个用,隔开
      UserIds= UserIds,
      // 是否排除用户
      ExcludeUsers=ExcludeUsers,
      // 实际推送的对象
      NotifyObj = new NotifyObj()
      {
          Data = Data,
          NotifyType = NotifyType,
          OpType= OpType
      },
  };
  ``` 
* 有GroupId
  * ExcludeUsers=true
    推送给指定的组中所有用户(排除掉UserIds部分)

  * ExcludeUsers=false
    推送给组中指定(UserIds中指定的)的这些用户

* 无GroupId
  * ExcludeUsers=true
    推送给当前所有连接(排除掉UserIds部分的用户)

  * ExcludeUsers=false
    推送给指定用户(UserIds中指定的用户)

## 架构设计
1. 组、用户、连接的关系
- 用户:[连接Id]
一个用户用多个连接、以Set形式存redis中
- 组:[连接Id:用户Id]
以Redis中的Hash格式存储，以Group为Key，以连接Id为Name，以UserId为值，一个用户在组中可能多个连接(开多个浏览器tab页),这样设计的好处是可以满足以下的几种情况
  * 给某个人推送
  从redis中直接根据该用户的UserId查询该用户的所有连接，然后通过连接推送即可
  * 给某个组推送
  从redis中根据组名查询出所有的连接Id，通过连接直接推送
  * 给某个组中的某些人推
  这个时候不能根据人查连接Id，需要先根据组得到组中的人、连接Id，然后只给组中这些人对应的连接推送
  * 用户上线的时候
  在redis中存储一份用户与连接的关系；如果有组的情况，同时以Hash形式存储组、连接Id、用户Id
  * 用户再开一个浏览器tab页
  在redis中该用户对应的连接中增加新的连接Id；如果有组的情况，同时以Hash形式存储组、连接Id、用户Id(因为是一连接Id为name的，然而连接Id是不重复的，所以是可以存着同一个组、同一个用户不同连接这种情况的)
  * 用户退出页面
  在redis中找到该用户，从redis中删除改用户的找个连接Id，组的情况同样处理
  * 给某个用户的某个连接Id推送
  比如:用户点击打包下载，服务器端后台线程进行打包、压缩，完成后推送给指定的连接Id，前端界面再进行处理下载

至此，业务分析完毕，更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 05 使用jwt将用户跟signalr关联](/2019/10/02/dotnetcore/signalr/05-jwt/) 
|   下一篇  |   [.net core 3.0 Signalr - 07 业务实现-服务端 自定义管理组、用户、连接](/2019/10/04/dotnetcore/signalr/07-self-manager/)  
|   源码地址  |   [源码](https://github.com/xiexingen/Core.Signalr.Template) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
