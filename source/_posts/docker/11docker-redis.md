---
title: Docker安装redis
date: 2018-06-06 11:15:10 
categories: ['Docker']
tags: ['Docker']
---

Docker下安装redis
<!-- more -->

1. 创建网络  
docker network create net_redis
2. 创建redis配置文件(/docker/redis/config/redis.conf)  
    ``` bash
    #redis的databases数量
    databases 32
    #redis密码
    requirepass 123
    ```
3. 通过docker-compose安装  
docker-compose -f redis-docker-compose.yml up -d  
[文件链接](http://pfp2er1o1.bkt.clouddn.com/blog/files/docker/redis-docker-compose.yml)  
