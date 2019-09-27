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
从连接信息中获取UserId、Groups,ConnectId，并实现这三者的关系，存放于redis中
[代码请查看](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Server/Hubs/NotifyHub.cs)
  ``` c#
  using CTS.Signalr.Server.Cores;
  using CTS.Signalr.Server.Dtos;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.SignalR;
  using Microsoft.Extensions.Logging;
  using System;
  using System.Linq;
  using System.Threading.Tasks;

  namespace CTS.Signalr.Server.Hubs
  {
      /// <summary>
      /// 服务端接口
      /// </summary>
      public interface IServerNotifyHub
      {

      }

      /// <summary>
      /// 客户端使用的接口
      /// </summary>
      public interface IClientNotifyHub
      {
          Task OnNotify(object data);

          Task OnLine(object data);

          Task OffLine(object data);
      }


      [Authorize]
      public class NotifyHub : Hub<IClientNotifyHub>,IServerNotifyHub
      {
          private readonly SignalrRedisHelper _signalrRedisHelper;
          private readonly ILogger _logger;

          public NotifyHub(SignalrRedisHelper signalrRedisHelper, ILogger<NotifyHub> logger)
          {
              _signalrRedisHelper = signalrRedisHelper;
              _logger = logger;
          }

          public override async Task OnConnectedAsync()
          {
              //await Clients.All.OnNotify(new { UserId= Context.User.Identity.Name, Name=Context.User.Identity.Name, ConnectId = Context.ConnectionId });
              var userId= Context.User.Identity.Name;
              var groups=Context.GetHttpContext().Request.Query["group"].FirstOrDefault();
              _logger.LogDebug($"OnConnectedAsync----userId:{userId},groups:{groups},connectionId:{ Context.ConnectionId}");
              if (!string.IsNullOrWhiteSpace(userId))
              {
                  await _signalrRedisHelper.AddConnectForUserAsync(userId, Context.ConnectionId);
                  await JoinToGroup(userId, Context.ConnectionId, groups?.Split(','));
                  await DealOnLineNotify(userId, Context.ConnectionId);
              }
              await base.OnConnectedAsync();
          }

          public override async Task OnDisconnectedAsync(Exception exception)
          {
              var userId = Context.User.Identity.Name;
              var groups = Context.GetHttpContext().Request.Query["group"].FirstOrDefault();
              _logger.LogDebug($"OnDisconnectedAsync----userId:{userId},groups:{groups},connectionId:{ Context.ConnectionId}");
              if (!string.IsNullOrWhiteSpace(userId))
              {
                  await _signalrRedisHelper.RemoveConnectForUserAsync(userId, Context.ConnectionId);
                  await DealOffLineNotify(userId,Context.ConnectionId);
              }
              await LeaveFromGroup(Context.ConnectionId, groups?.Split(','));
              await base.OnDisconnectedAsync(exception);
          }

          /// <summary>
          /// 加入组
          /// </summary>
          /// <param name="groupName"></param>
          /// <returns></returns>
          private async Task JoinToGroup(string userId,string connectionId,params string[] groups)
          {
              if (!string.IsNullOrWhiteSpace(userId)&& groups!=null&&groups.Length>0)
              {
                  foreach (var group in groups)
                  {
                      await Groups.AddToGroupAsync(connectionId, group);
                      await _signalrRedisHelper.AddUserForGroupAsync(group, connectionId, userId);

                      // await Clients.Group(group).OnJoinGroup(new { ConnectId = connectionId, UserId = userId, GroupName = group });
                  }
              }
          }

          /// <summary>
          /// 从组中移除
          /// </summary>
          /// <param name="groupName"></param>
          /// <returns></returns>
          private async Task LeaveFromGroup(string connectionId,params string[] groups)
          {
              if (groups != null && groups.Length > 0)
              {
                  foreach (var group in groups)
                  {
                      await Groups.RemoveFromGroupAsync(connectionId, group);
                      await _signalrRedisHelper.RemoveConnectFromGroupAsync(group,connectionId);
                      // await Clients.Group(group).OnLeaveGroup(new { ConnectId = connectionId, GroupName = group });
                  }
              }
          }

          /// <summary>
          /// 处理上线通知(只有用户第一个连接才通知)
          /// </summary>
          /// <param name="userId"></param>
          /// <param name="connectionId"></param>
          /// <returns></returns>
          private async Task DealOnLineNotify(string userId,string connectionId) 
          {
              var userConnectCount = await _signalrRedisHelper.GetConnectsCountByUserAsync(userId);
              await Clients.All.OnLine(new OnLineData()
              {
                  UserId = userId,
                  ConnectionId = connectionId,
                  IsFirst = userConnectCount == 1
              });
          }

          /// <summary>
          /// 处理下线通知(只有当用户一个连接都没了 才算下线)
          /// </summary>
          /// <param name="userId"></param>
          /// <param name="connectionId"></param>
          /// <returns></returns>
          private async Task DealOffLineNotify(string userId,string connectionId)
          {
              var userConnectCount = await _signalrRedisHelper.GetConnectsCountByUserAsync(userId);
              await Clients.All.OffLine(new OffLineData()
              {
                  UserId = userId,
                  ConnectionId = connectionId,
                  IsLast = userConnectCount == 0
              });
          }
      }
  }
  ```

## 提供给业务系统调用的API
- [POST] api/notify/post 
application/json形式 提交，数据格式如下
  ``` json
  {
    GroupIds:'', // [可空] 组id集合，多个用,隔开
    UserIds:'',// [可空] 用户id集合，多个用,隔开
    ExcludeUsers:boolean, // 是否排除用户列表中的用户
    NotifyObj:Object // 通知的对象，任意类型(总大小不要超过36k)
  }
  ```
  * 有GroupIds
    * ExcludeUsers=true
      推送给指定的组中所有用户(排除掉UserIds部分)

    * ExcludeUsers=false
      推送给组中指定(UserIds中指定的)的这些用户

  * 无GroupIds
    * ExcludeUsers=true
      推送给当前所有连接(排除掉UserIds部分的用户)

    * ExcludeUsers=false
      推送给指定用户(UserIds中指定的用户)

- [POST] api/notify/postConnects  
application/json提交，数据格式如下
  ``` json
  {
    Connects:'', // 连接Id集合，多个用，隔开
    NotifyObj:Object // 通知的对象，任意类型(总大小不要超过36k)
  }
  ```
  * 有UserId
    * ExcludeConnectId=true
      给改用户除指定的ConnectId外的所有连接端推送
    * ExcludeConnectId=false
      跟没指定UserId一致
  * 无UserId
    给指定连接Id推送

- [GET] api/users  
获取在线用户Id列表

- [GET] api/groups 
获取在线组列表


## 增加日志记录
为了方便分析和定位问题，使用log4net来作为日志记录器。
- nuget 安装log4net
nuget 搜索 log4net，安装
- Config中配置  
在Config中注入ILoggerFactory，然后使用添加Log4Net,代码如下所示
``` C#
public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    app.UseHsts();

    loggerFactory.AddLog4Net();
    ...
}
```
- 添加log4net配置文件  
更多配置请自行查找log4net官方配置文档
``` xml
<?xml version="1.0" encoding="utf-8" ?>
<!--LOG4日志级别 
    0：TRACE；记录一些对程序员调试问题有帮助的信息, 其中可能包含一些敏感信息, 所以应该避免在生产环境中启用Trace日志。
    1：DEBUG；记录一些在开发和调试阶段有用的短时变量(Short-term usefulness), 所以除非为了临时排除生产环境的故障，开发人员应该尽量避免在生产环境中启用Debug日志。
    2：INFO；信息日志，记录应用程序的一些流程, 例如，记录当前api请求的url，请求参数等。
    3：WARN；警告日志；记录应用程序中发生的不正常或者未预期的事件信息。这些信息中可能包含错误消息或者错误产生的条件, 例如, 文件未找到，用户不存在。
    4：ERROR；错误日志；记录应用程序中某个操作产生的错误和异常信息，如对空值进行操作等。
    5：FATAL；毁灭性错误；记录一些需要立刻修复的问题。例如数据丢失，磁盘空间不足。
trace<debug<info<warn<error<fatal -->
<log4net>
  <appender name="ErrorRollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <file value="AppData\\logs\\" />
    <appendToFile value="true" />
    <rollingStyle value="Date"/>
    <datePattern value="yyyy-MM-dd-'error.log'"/>
    <maxSizeRollBackups value="100" />
    <staticLogFileName value="false" />
    <encoding value="utf-8" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%-5level %date [%-5.5thread] %-40.40logger - %message%newline" />
    </layout>
    <filter type="log4net.Filter.LevelRangeFilter">
      <levelMin value="ERROR" />
      <levelMax value="FATAL" />
    </filter>
  </appender>

  <root>
    <level value="All" />
    <appender-ref ref="ErrorRollingFileAppender" />
  </root>
</log4net>
```
至此，log4net配置完毕


更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |  [.net core 3.0 Signalr - 06 业务实现-业务分析](/2019/10/03/dotnetcore/signalr/06-analysis/) 
|   下一篇  |   [.net core 3.0 Signalr - 08 业务实现-客户端demo](/2019/10/05/dotnetcore/signalr/08-clientdemo/)  
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
