---
title: Docker安装mongodb
categories:
  - Docker
tags:
  - Docker
abbrlink: 30287
date: 2018-06-01 09:15:10
---

Docker安装mongodb
<!-- more -->

1. 配置好docker的加速镜像[参考02Docker安装及配置]  
2. docker pull mongo 拉去mongo镜像  
3. 启动docker实例  
> 方式一  
docker run -d -p 27017:27017 --name mongodb mongo   
> 方式二 将容器的文件挂在到Host Volume  
--首先创建文件夹  /docker/mongo/config  以及/docker/mongo/data 用于与docker中mongo实例链接  然后运行命令
``` bash
docker run -d -p 27017:27017 --name mongo01 -v /docker/mongo/config:/data/configdb -v=/docker/mongo/data:/data/db mongo
```