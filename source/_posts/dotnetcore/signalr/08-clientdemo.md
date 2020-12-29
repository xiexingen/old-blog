---
title: .net core 3.0 Signalr - 08 业务实现-客户端demo
date: '2019-10-05 20:34:10'
categories:
  - .NetCore
tags:
  - Signalr
  - .NetCore
abbrlink: 61069
---

.net core 3.0 Signalr - 08 业务实现-客户端demo
<!-- more -->
由于signalr作为一个单独的推送系统，跟业务系统是分离开的，所以此处模拟一个业务系统，新建一个.net core app项目

## 模拟实现一个登录功能  
我们的登录很简单，当进入系统，如果检测到用户未登录则跳转到登录页面，用户只需要输入用户名点击登录即算登录成功  
- 配置ConfigServices方法 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Startup.cs#L41-L47)
  ``` C#
  services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
  .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, cookieOption =>
  {
      cookieOption.LoginPath = "/Account/Login";
      cookieOption.AccessDeniedPath = "/Account/Login";
  });
  ```
- 配置Config方法，配置认证、授权的请求管道 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Startup.cs#L73-L74)
  ``` C#
  app.UseRouting();
  app.UseAuthentication();
  app.UseAuthorization();
  ```
- 接收登录的post请求，写cookie，跳转 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Controllers/AccountController.cs#L33-L59)

## 前端页面实现
首先在Layout页面引入需要的js文件(vue、signalr、msgpack5、signalr-protocol-msgpack)   [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Shared/_Layout.cshtml#L78-L81)  

### 封装signalr连接相关js
signalr客户端js的操作就是，创建连接、监听推送,封装后端js如下   [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/wwwroot/js/initSignalr.js)  
``` js
/**
 * 初始化连接
 * @param {object} option 参数
 * @param {string} option.url 连接的url地址
 * @param {string} option.loggingLevel 日志级别,默认为 Error
 * @param {number} option.delay 延迟连接 默认为3000毫秒
 * @param {function} option.onStarted 启动时触发
 * @param {function} option.onLine 启动时触发
 * @param {function} option.offLine 启动时触发
 * @returns {object} 连接的实例
 */
function initSignalr(option) {
    var config = Object.assign(true, {
        loggingLevel: signalR.LogLevel.Error,
        delay: 3000,
        url: ''
    }, option);

    var connection = new signalR.HubConnectionBuilder()
        .configureLogging(config.loggingLevel)
        .withUrl(config.url, {
            accessTokenFactory: option.accessTokenFactory
        })
        .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
        .withAutomaticReconnect([0, 2000, 5000, 10000, 20000])
        .build();

    connection.onreconnecting(function (info) {
        console.info('----------------------------------signalr-- onreconnecting', info);
    });

    connection.onclose(function (err) {
        console.info('--------------------------------signalr-- onclose', err);
    });

    connection.on('OnNotify', config.onNotify);

    connection.on('OnLine', config.onLine);

    connection.on('OffLine', config.offLine);

    setTimeout(function () {
        connection.start().then(function (data) {
            option.onStarted && option.onStarted(data);
        }).catch(function (error) {
            console.error(error.toString());
        });
    }, option.delay);

    return connection;
}
```

### 调用封装的js初始化连接 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L183)  
- 然后在Home/Index.cshtml中引入上面的js  
- 在页面加载完后，调用初始化(案例中使用了vue)  
在进入页面后会弹窗让用户输入加入的组，可以不输入也可以多个 
  ``` js
  function initConnect() {
    $("#collectionUserInfo").modal({
        keyboard: false,
        show: true,
        backdrop: 'static'
    })

    $('#collectionUserInfo').on('hidden.bs.modal', function () {
        var groups = $("#groups").val()||'';
        connect=initSignalr({
            delay: 0,
            url:`${notifyUrl}notify-hub?userId=${vm.userInfo.userName}&group=${groups}`,
            loggingLevel: signalR.LogLevel.Error,
            onNotify: dealNotify,
            onLine: function (data) {
                if (data.IsFirst) {
                    getOnlineUsers();
                }
                getOnlineGroups();
                vm.logs.push(`新连接上线：${JSON.stringify(data)}`);
            },
            offLine: function (data) {
                if (data.IsLast) {
                    getOnlineUsers();
                }
                getOnlineGroups();
                vm.logs.push(`连接下线：${JSON.stringify(data)}`);
            },
            onStarted: function () {
                getOnlineUsers();
                getOnlineGroups();
                vm.$set(vm.userInfo, 'connectionId', connect.connectionId);
                vm.$set(vm.userInfo, 'groups', groups);
                vm.logs.push('连接成功');
            }
        });
    })
    }
  ```
onNotify方法，如果仔细的话会看到里面的onNotify方法，所有的推送最终都会调用到该方法来进行分发。[查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L200)   
offLine，当有客户端下线的时候会触发，data里面包含有用户Id、连接Id、是否该用户的最后一个连接,可根据需要使用[查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L201-L207)   
onLine,当用户连接的时候会触发，data里面包含有用户Id、连接Id、是否该用户的第一个连接(用于用户上线后的逻辑处理)，可根据需要使用  [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L208-L214)   
onStarted，当成功连接后触发，可用于做一些连接后的业务逻辑处理，可根据需要使用 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L215-L221)  

### 获取当前用户信息、在线列表 
在用户连接成功后，获取当前在线用户、用户组、当前用户信息,并设置到vue的data中 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L216-L217)  

### 模拟一个任务分配
在项目中心中，点击"模拟推送待办"按钮，将会向当前用户所在组中推送一条代码消息，可以登录不同账号、开多个tab页体验 
点击事件代码位置 [查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L132-L141) 
``` js
assignTaskToUser: function () {
    var that = this;
    $.ajax({
        type: 'POST',
        url: '/api/ServerProxy/AssignTaskToUser',
        data: {
            groups:that.userInfo.groups
        }
    })
},
```
对应的推送解析代码 
> 首先当有推送过来的时候，会首先进到onNotify方法，然后根据不同类型在分配到不同的js方法中  
[查看代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L268-L279)   
效果图  
![20190927212304.png](http://qiniu.xxgtalk.cn/blog/images/20190927212304.png)

### 模拟发送消息
消息发送，可以选定组、人进行消息发送  
[发送端代码](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L145-L157)  
[解析端](https://github.com/xiexingen/CTS.Signalr/blob/master/CTS.Signalr.Client/Views/Home/Index.cshtml#L281-L290)

### 登录互斥
登录互斥是指，当一个账号在A电脑登录，然后再在B电脑登录，最后的登录会排斥掉开始的登录，即，将A上的挤下线  
首先用谷歌浏览器登录，输入用户名：xiexingen，然后连接  
接着使用360急速浏览器登录，输入用户名:xiexingen 这个时候会发现谷歌浏览器中的登录已经退出，如图
![20190927213637.png](http://qiniu.xxgtalk.cn/blog/images/20190927213637.png)
> 必要条件: 不同浏览器、同一用户,比如:同一个浏览器，不同tab就不算(能共用cookie)

### 文件下载(指定连接推送)
文件下载的场景，用户在操作页面上选择了上千个文件，然后点击打包下载，这个时候可能需要很久时间才反应回来，那么这段时间如果让用户一直等待显然不妥，所以，当用户点击打包下载的时候，后端启用一个后台线程去打包、压缩，然后立即返回；用户可以继续操作，当服务器端打包好后推送给用户端，用户点击下载即可。
此处分两种情况  
1. 单连接推送
用户开了多个tab页，在其中一个上下载文件，如果后端推送的时候，直接给该用户推，显然不妥；正确的做法一个是只给操作的那个tab页推，这就需要，调用服务器端业务api的时候，需要把当前tab页对应的连接id发送到服务器端，服务器端处理完业务后，调用推送服务器，告诉推送服务器只推我给你的这个连接的客户端，这样就能指定连接推送。
2. 单用户排除某个连接的其他连接推送  
这种情况比较少见，告诉推送服务器，给这个用户，除了某个连接外的其他所有连接推送

模拟操作  
点击第一个图中的"打包下载文件" 按钮，当前页面会受到文件下载的推送  
在点击图二中的"推送当前用户其他页面更新操作"按钮，会发现出了当前tab页外，其他tab也都收到了推送消息，如下图
![20190927214530.png](http://qiniu.xxgtalk.cn/blog/images/20190927214530.png)

至此，signalr相关文章算是到此结束了，下一篇谈谈个人的一点心得以及里面存着的一些问题。

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |  [.net core 3.0 Signalr - 07 业务实现-服务端 自定义管理组、用户、连接](/2019/10/04/dotnetcore/signalr/07-self-manager/) 
|   下一篇  |   [.net core 3.0 Signalr - 09 待改进&交流](/2019/10/05/dotnetcore/signalr/09-todo/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
