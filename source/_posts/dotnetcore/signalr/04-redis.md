---
title: .net core 3.0 Signalr - 04 使用Redis做底板来支持横向扩展
date: '2019-10-01 16:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61069
---

.net core 3.0 Signalr - 04 使用Redis做底板来支持横向扩展
<!-- more -->
在实际的系统中，可能需要多台机器部署;然而，Signalr的连接信息是跟站点走的，举个例子  
推送系统部署了A、B两个服务器，张三访问A服务器，李四访问B服务器，当张三通过A服务器向李四推送的时候，A服务器上是找不到李四的连接信息的，自然也就推送不过了，这个时候就需要有一个统一协调的玩意，signalr支持多种，Azure、Redis等，本节以Redis作为底板，介绍如何在Signalr中使用Redis作为底板来支持横向扩展。

## 引入Redis
- 先引入NuGet包
Microsoft.AspNetCore.SignalR.StackExchangeRedis
- 修改Startup中的ConfigureServices方法
  ``` C#
  var appSection = Configuration.GetSection("App");
  services.Configure<AppSetting>(option => appSection.Bind(option));
  var appSetting = appSection.Get<AppSetting>();

  // 添加Signalr
  services.AddSignalR(config =>
  {
      if (_webEnv.IsDevelopment())
      {
          config.EnableDetailedErrors = true;
      }
  })
  // 支持MessagePack
  .AddMessagePackProtocol()
  // 使用redis做底板 支持横向扩展 Scale-out
  .AddStackExchangeRedis(o =>
    {
        o.ConnectionFactory = async writer =>
        {
            var config = new ConfigurationOptions
            {
                AbortOnConnectFail = false,
                ChannelPrefix = "__signalr_",
            };
            config.DefaultDatabase = appSetting.SignalrRedisCache.DatabaseId;
            var connection = await ConnectionMultiplexer.ConnectAsync(appSetting.SignalrRedisCache.ConnectionString, writer);
            connection.ConnectionFailed += (_, e) =>
            {
                Console.WriteLine("Connection to Redis failed.");
            };

            if (connection.IsConnected)
            {
                Console.WriteLine("connected to Redis.");
            }
            else
            {
                Console.WriteLine("Did not connect to Redis");
            }

            return connection;
        };
    });
  ```
可以自定义Redis相关配置，此处的appSetting为已经定义好的配置实体，包括了，主要配置、CROS配置、Jwt配置、redis配置等详情如下
  ``` C#
  /// <summary>
  /// 对应appsettings中的App节点的配置信息
  /// </summary>
  public class AppSetting
  {
      public JwtSetting JwtSetting { set;get;}
      public RedisCache RedisCache { set;get;}
      public RedisCache SignalrRedisCache { set; get; }
      public string CORS { set;get;}
      /// <summary>
      /// 是否主站点(用于运行清理任务等)
      /// </summary>
      public bool MainSite { set;get;}
  }

  /// <summary>
  /// JWT设置
  /// </summary>
  public class JwtSetting
  {
      /// <summary>
      /// 发行者 表示token是谁颁发的
      /// </summary>
      public string Issuer { set; get; }
      /// <summary>
      /// 表示哪些客户端可以使用这个token
      /// </summary>
      public string Audience { set; get; }
      /// <summary>
      /// 加密的Key 必须大于16位
      /// </summary>
      public string SecretKey { set; get; }
  }

  public class RedisCache
  {
      public string ConnectionString { set;get;}
      public int DatabaseId { set; get; }
  }
  ```
对应的配置文件如下
  ``` json
  {
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information",
      "Microsoft.AspNetCore.SignalR": "Trace",
      "Microsoft.AspNetCore.Http.Connections": "Trace"
    }
  },
  "App": {
    "RedisCache": {
      "ConnectionString": "127.0.0.1:6379,password=#####,ssl=false,abortConnect=true,connectTimeout=5000",
      "DatabaseId": 10
    },
    "SignalrRedisCache": {
      "ConnectionString": "127.0.0.1:6379,password=#####,ssl=false,abortConnect=true,connectTimeout=5000",
      "DatabaseId": 10
    },
    "CORS": "https://localhost:60000,http://localhost:60001",
    "MainSite": true,
    "JwtSetting": {
      "Issuer": "http://localhost:50000", //颁发者
      "Audience": "http://localhost:50000", //使用者
      "SecretKey": "Wetrial20196666666" // key 大于16位
    }
  }
}
```
首先，将配置文件跟实体对象映射，下次在其他地方使用的时候可以直接通过DI注入，然后通过AddStackExchangeRedis配置使用redis作为底板

更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 03 使用MessagePack压缩传输内容](/2019/09/29/dotnetcore/signalr/03-message-pack/) 
|   下一篇  |   [.net core 3.0 Signalr - 05 使用jwt将用户跟signalr关联](/2019/10/02/dotnetcore/signalr/05-jwt/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/signalr/redis-backplane?view=aspnetcore-3.0) 
