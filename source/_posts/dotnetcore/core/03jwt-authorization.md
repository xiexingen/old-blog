---
title: 基于JWT的认证模式
date: 2018-03-06 21:01:01
author: 谢新根
categories: ['.NetCore']
tags: ['.NetCore']
---

基于JWT的认证模式
<!-- more -->

![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0001.png)
1. 在项目目录下定义一个JwtSetting实体类  
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0101.png)
2. 在appsettings.json中配置值  
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0201.png)
3. 在StartUp中设置验证方式
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0301.png)
4. 在管道中加入认证
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0401.png)
5. 登录  
JwtSecurityToken 需要添加包Microsoft.AspNetCore.Authentication.JwtBearer  
using Microsoft.IdentityModel.Tokens;  
using System.IdentityModel.Tokens.Jwt;  
using System.Security.Claims;  
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0501.png)  
6. 通过postman模拟登录获取token
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0601.png)
7. 将token以请求头形式放到请求中发送请求
[注] 键:Authorization      token值记得加"bearer " 
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/0701.png) 

-------------------------
扩展  
1. 使用自定义验证以及自定义头部token  
定义MyTokenValidation 实现接口ISecurityTokenValidator
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/e0101.png) 
2. 在ConfigureServices方法中   
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/e0201.png) 
3. 运行效果  
![](http://pfp2er1o1.bkt.clouddn.com/blog/images/dotnetcore/core/03/e0301.png) 
