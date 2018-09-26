---
title: IdentityServer4-使用密码授权模式
date: 2018-03-11 21:01:01
author: 谢新根
categories: ['.NetCore']
tags: ['.NetCore','IdentityServer4']
---

IdentityServer4-使用密码授权模式
<!-- more -->

##### 一、IdentityServer 也叫服务端
1. 新建.netcore web项目 设置启动端口为60000 并通过Nuget引用IdentityServer4
2. 添加ApiResource和Client(此处方便测试固定了一些数据)
![](~@post-img/dotnetcore/identityserver4/02/1-0201.png)
3. 使用IdentityServer
![](~@post-img/dotnetcore/identityserver4/02/1-0301.png)
![](~@post-img/dotnetcore/identityserver4/02/1-0302.png)
4. 启动项目 http://localhost:60000/.well-known/openid-configuration 可以看到相关json数据
![](~@post-img/dotnetcore/identityserver4/02/1-0401.png)
##### 二、Api端 (与clientCredentials模式完全一致)
1. 新建.netcore web项目 设置启动端口为60001
   通过Nuget引用IdentityServer4.AccessTokenValidation 此处只需要验证所以不需要引用IdentityServer4
2. 配置
![](~@post-img/dotnetcore/identityserver4/02/2-0201.png)
3. 在controller上贴上属性[Authorize] 表示只允许登录用户访问
4. 通过postman获取token(注意请求body中的参数)
![](~@post-img/dotnetcore/identityserver4/02/2-0401.png)
5. 请求需要登录的api 此处为api/values
![](~@post-img/dotnetcore/identityserver4/02/2-0501.png)
##### 三、client 客户端也叫ThirPart【选修】
>定义一个控制台程序 访问api获取数据
1. 创建.net core控制台程序 通过Nuget引用包IdentityModel
![](~@post-img/dotnetcore/identityserver4/02/3-0101.png)
