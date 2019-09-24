---
title: .net core 3.0 Signalr - 01 基础篇
date: '2019-09-21 10:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61070
---

.net core 3.0 Signalr - 01 基础篇 以最简洁的方式介绍如何创建一个可连接的hub
<!-- more -->

因为将signalr作为单独的站点，此处需要建立两个项目，一个专门用于signalr作为推送项目，一个客户端(实际的业务项目)

## 基础知识速览

### Clients对象属性
|   属性    |   描述 
|   :---    |   :--- 
|   All    |   在所有连接的客户端上调用方法
|   Caller  |   在调用集线器方法的客户端上调用方法
|   Others  |   除当前连接外的所有连接

### Clients对象方法
|   方法    |   描述 
|   :---    |   :--- 
|   AllExcept    |   在所有连接的客户端（指定的连接除外）上调用方法
|   Client  |   在特定连接的客户端上调用方法(单个)
|   Clients  |   在特定连接的客户端上调用方法(多个)
|   Group  |   对指定组中的所有连接调用方法
|   GroupExcept  |   对指定组中的所有连接调用方法，指定的连接除外
|   Groups  |   在多组连接上调用方法
|   OthersInGroup  |   对一组连接调用方法，而不包括调用该集线器方法的客户端
|   User  |   对与特定用户关联的所有连接调用方法
|   Users  |   对与指定用户相关联的所有连接调用方法


## Signalr推送端
- 通过命令行或者vs 2019新建.netcore web项目，选择.net core 3.0、webapi  
- 建立一个Hub
    ``` C#
    public class NotifyHub : Hub
    {

    }
    ```

- 修改Startup中的ConfigServices方法，注册对应的服务
    ``` C#
    // 添加Signalr
    services.AddSignalR(config =>
    {
        // _webEnv为通过依赖注入在Startup的构造函数中注入的 IWebHostEnvironment
        if (_webEnv.IsDevelopment())
        {
            config.EnableDetailedErrors = true;
        }
    });
    ```
- 修改Configure配置HTTP请求的管道
    ``` C#
    ...
    app.UseRouting();
    app.UseEndpoints(endpoints =>{
        endpoints.MapHub<NotifyHub>("/notify-hub");
    });

    ```
## 业务端
[相关文档](https://docs.microsoft.com/zh-CN/aspnet/core/tutorials/signalr?view=aspnetcore-3.0&tabs=visual-studio)

- 创建连接对象
    ``` js
    var connection=new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Error) // 前端控制台的日志级别，根据需要配置
    .withUrl('http://localhost:50001/notify-hub') // 连接地址,这个地址是signalr项目的地址
    .withAutomaticReconnect([0, 2000, 5000, 10000, 20000]) // 配置重连的时间
    .build();

    // 重连的时候触发
    connection.onreconnecting(function (info) {
        console.info('----------------------------------signalr-- onreconnecting', info);
    });

    //连接关闭的回调
    connection.onclose(function (err) {
        console.info('--------------------------------signalr-- onclose', err);
    });

    connection.start().then(function (data) {
        console.log('已成功连接到signalr服务器')
    }).catch(function (error) {
        console.error(error.toString());
    });

    ```

更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   下一篇  |   [.net core 3.0 Signalr - 02 使用强类型的Hub](/2019/09/22/dotnetcore/signalr/02-type-hub/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
