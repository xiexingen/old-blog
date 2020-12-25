---
title: Docker中安装Consul
categories:
  - .NetCore
tags:
  - Consul
  - .NetCore
abbrlink: 48510
date: 2018-09-04 21:48:20
---

Docker中安装Consul
<!-- more -->

> Consul Docker镜像地址:https://hub.docker.com/_/consul
1. Docker中启动Consul  
    ```
    docker run -d -e 'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}' --name=consul1 consul agent -server -bind=119.29.92.252 -bootstrap-expect=3 -node=consul1
    ```   
    * -node：节点的名称  
    * -bind：绑定的一个地址，用于节点之间通信的地址，可以是内外网，必须是可以访问到的地址  
    * -server：这个就是表示这个节点是个SERVER  
    * -bootstrap-expect：这个就是表示期望提供的SERVER节点数目，数目一达到，它就会被激活，然后就是leader节点了
2. 启动节点2、3
    ```
    docker run -d -e 'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}' --name=consul2 consul agent -server -bind=172.17.0.3  -join=119.29.92.252 -node-id=$(uuidgen | awk '{print tolower($0)}')  -node=consul2

    docker run -d -e 'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}' --name=consul3 consul agent -server -bind=172.17.0.4  -join=119.29.92.252 -node-id=$(uuidgen | awk '{print tolower($0)}')  -node=consul3 -client=172.17.0.4
    ```
    * -join：这个表示启动的时候，要加入到哪个集群内，这里就是说要加入到*节点1的集群
    * -node-id：这个貌似版本8才加入的，这里用这个来指定唯一的节点ID，可以查看这个issue  
    * -client：这个表示注册或者查询等一系列客户端对它操作的IP，如果不指定这个IP，默认是127.0.0.1。
