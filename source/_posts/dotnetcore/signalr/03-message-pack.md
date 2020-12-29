---
title: .net core 3.0 Signalr - 03 使用MessagePack压缩传输内容
date: '2019-09-29 14:34:10'
categories:
  - .NetCore
tags:
  - Signalr
  - .NetCore
abbrlink: 61069
---

.net core 3.0 Signalr - 03 使用MessagePack压缩传输内容
<!-- more -->

## MessagePack基础介绍
Signalr默认使用的是json形式传递数据，但是signalr提供了灵活的扩展，支持MessagePack形式序列化数据，以增加性能降低网络传输的效果，极大的提高响应速度。

先看一个MessagePack自定义序列化的例子,以一个自定义的实体对象为例，可以使用MessagepackObject标记为序列化的对象，同时定义使用属性名作为key(区分大小写)，同时可以定义忽略某个属性等、以及自定义key等
  ``` C#
    [MessagePackObject(keyAsPropertyName: true)]
    public class OffLineData
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public string UserId { set; get; }
        /// <summary>
        /// 连接Id
        /// </summary>
        public string ConnectionId { set; get; }
        /// <summary>
        /// 是否该用户的最后一个连接
        /// </summary>
        public bool IsLast { set; get; }
        [IgnoreMember]
        public string Test { set;get;}
    }

    // 比如对象，new OffLineData(){UserId="1000",ConnectionId="AZDEFASDFASDF",IsLast:true}通过MessagePack序列化后应该会是{UserId:"1000",ConnectionId:"AZDEFASDFASDF",IsLast:true},这个跟常用的json基本相同
  ```

同时MessagePack还可以定义序列化成数组形式，代码如下
  ``` C#
    [MessagePackObject]
    public class OffLineData
      {
          /// <summary>
          /// 用户Id
          /// </summary>
          [Key(0)]
          public string UserId { set; get; }
          /// <summary>
          /// 连接Id
          /// </summary>
          [Key(0)]
          public string ConnectionId { set; get; }
          /// <summary>
          /// 是否该用户的最后一个连接
          /// </summary>
          [Key(0)]
          public bool IsLast { set; get; }
      }

    // 比如对象，new OffLineData(){UserId="1000",ConnectionId="AZDEFASDFASDF",IsLast:true}通过MessagePack序列化后应该会是["10000","AZDEFASDFASDF",true]
  ```
更多MessagePack的内容可以自行结尾的文档，此处不再过多介绍.


## 为Signalr添加MessagePack支持
- 引入需要的Nuget包
Microsoft.AspNetCore.SignalR.Protocols.MessagePack  
- 修改之前的ConfigureServices
  ``` C#
    // 添加Signalr
    services.AddSignalR(config =>
    {
        if (_webEnv.IsDevelopment())
        {
            config.EnableDetailedErrors = true;
        }
    })
    // 支持MessagePack
    .AddMessagePackProtocol();
  ```
- 前端引入messagepack解析库
由于MessagePack传输是以二进制形式进行传输，降低了带宽，但是同时也增加到了代码的复杂度，原本直接获取数据就可以用的，现在需要先将二进制数据转换成正常数据，好在官方提供了对应的js库*msgpack5*、*signalr-protocol-msgpack*  
可以通过vs的包管理工具或者npm安装，然后拷贝需要的文件到项目的lib文件夹,比如我的结构是
  ``` bash
    signalr-protocol-msgpack
    |-msgpack5.js
    |-msgpack5.min.js
    |-signalr-protocol-msgpack.js
    |-signalr-protocol-msgpack.min.js
  ```
前端页面引入这两个js(注意顺序:signalr、msgpack5、signalr-protocol-msgpack)  

- 修改js连接对象，支持上MessagePack
  ``` js
  new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Error) // 前端控制台的日志级别，根据需要配置
    .withUrl('http://localhost:50001/notify-hub') // 连接地址,这个地址是signalr项目的地址
    .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol()) // 使用Messagepack来解析推送的数据
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

## 尚未解决问题
发现通过json.net序列化得到的对象，直接传递给MessagePack序列化会报错，没找着解决方法，直接改成字符串传递，然后在前端解析了，有遇到过的大佬欢迎指点下
  
至此，MessagePack介绍算结束了，更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 02 使用强类型的Hub](/2019/09/22/dotnetcore/signalr/02-type-hub/) 
|   下一篇  |   [.net core 3.0 Signalr - 04 使用Redis做底板来支持横向扩展](/2019/10/01/dotnetcore/signalr/04-redis/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
|   MessagePack-CSharp  |   [MessagePack-CSharp](https://github.com/neuecc/MessagePack-CSharp) 
|   MessagePack  |   [MessagePack](https://msgpack.org/index.html) 
