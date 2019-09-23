---
title: .net core 3.0 Signalr - 02 使用强类型的Hub
date: '2019-09-22 10:34:10'
categories:
  - .NetCore
tags:
  - Signalr
abbrlink: 61069
---

.net core 3.0 Signalr - 02 使用强类型的Hub
<!-- more -->

## 强类型的优缺点
- 优点
强类型的Hub可以避免魔法函数名，相比弱类型更容易维护和发现问题，直接上代码
- 缺点
特么的得多些好几行代码

## 代码

### 接口定义
  ``` C#
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
        // 这里我们定义一个统一的客户端通知方法
        Task OnNotify(object data);
    }
  ```
### 实现
- 对之前的Hub进行修改,暂时就先通过OnNotify给当前所有客户端推送一个信息
``` C#
  public class NotifyHub : Hub<IClientNotifyHub>,IServerNotifyHub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.OnNotify(new { ConnectId = Context.ConnectionId });
            await base.OnConnectedAsync();
        }
    }
  ```
  
## 在api中调用Hub推送
大部分情况下，是通过客户端某个操作，比如:将任务分配给张三，那么在分配任务的这个api中会调用推送 推送给张三一个通知，xxx分配了一个任务给你，在Controller中注入强类型的Hub，代码如下
  ``` C#
  ...
  private readonly IHubContext<NotifyHub,IClientNotifyHub> _notifyHub;
  public NotifyController(IHubContext<NotifyHub,IClientNotifyHub> notifyHub)
  {
      _notifyHub = notifyHub;
  }
  ```

至此，强类型的Hub介绍完毕，更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 01 基础篇](/2019/09/21/dotnetcore/signalr/01-base/) 
|   下一篇  |   [.net core 3.0 Signalr - 03 使用MessagePack压缩传输内容](/2019/09/29/dotnetcore/signalr/03-message-pack) 
|   源码地址  |   [源码](https://github.com/xiexingen/Core.Signalr.Template) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
