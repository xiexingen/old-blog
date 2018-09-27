---
title: Docker安装RabbitMQ
date: 2018-06-08 11:30:10 
categories: ['Docker']
tags: ['Docker']
---

Docker安装RabbitMQ
<!-- more -->

> 参考地址:https://hub.docker.com/_/rabbitmq/
- 运行命令   
    ``` docker
    docker run -d -p 8092:15672 -p 5672:5672  --restart always --hostname my-rabbit --name rabbit -e RABBITMQ_DEFAULT_USER=xxg -e RABBITMQ_DEFAULT_PASS=Abcd1234  rabbitmq:3-management
    ```
> 说明  
-e RABBITMQ_DEFAULT_USER=xxg    --默认用户名  
-e RABBITMQ_DEFAULT_PASS=Abcd1234   --默认密码  
rabbitmq:3-management       --表示使用带插件版本的(可以通过http://host-ip:8092 访问管理控制台)  
4369/tcp    服务器 需要开放这个端口  
5671/tcp    服务器 需要开放这个端口  