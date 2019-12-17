---
title: Nginx开篇
date: 2019-11-30 09:10:10 
categories: ['Nginx']
tags: ['Nginx']
---

Docker基础开篇
<!-- more -->

## centos 7安装nginx
- 更新yum
``` bash
yum -y update  
```

- 通过yum安装
``` bash
yum install epel-release
yum install nginx 
```
- 配置nginx自动启动
``` bash
systemctl start nginx
systemctl enable nginx
systemctl status nginx
```

- 配置防火墙
``` bash
firewall-cmd --zone=public --permanent --add-service=http
firewall-cmd --zone=public --permanent --add-service=https
firewall-cmd --reload
``` bash

## nginx 配置文件
- worker_processer
配置支持的并发数量

- events
``` bash
配置网络连接数量
events:{
    worker_connections:1024 
}
```

- http


## 反向代理
``` bash
# 基础案例
server {
    listen 80;
    server_name test.xxgtalk.cn;

    # listen [::]:80 ipv6only=on;
    # root /var/www/mywebsite2;
    # index index.html index.htm;

    location / {
        proxy_pass http://localhost:9001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    # error_page 404 /404.html;
    # error_page 500 502 503 504 /50x.html;
    # location = /50x.html {
    #     root /var/www/mywebsite1;
    # }
} 

```

## 负载均衡
``` bash
# 负载均衡案例
upstream myserver {
 server 192.168.20.23:8080;
 server 192.168.20.23:8081;
}
server {
    listen 80;
    server_name test.xxgtalk.cn;

    # listen [::]:80 ipv6only=on;
    # root /var/www/mywebsite2;
    # index index.html index.htm;

    location / {
        proxy_pass http://myserver;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    # error_page 404 /404.html;
    # error_page 500 502 503 504 /50x.html;
    # location = /50x.html {
    #     root /var/www/mywebsite1;
    # }
} 
```

## 动静分离(跟基础类似)

## 高可用
![20191130225646.png](http://qiniu.xxgtalk.cn/blog/images/20191130225646.png)
1. 需要在轮胎服务器安装nginx
2. 需要再两台服务器上安装keepalived
``` bash
yum install keepalived -y

## 修改每台机器上的keepalived配置文件

## 检测是否安装成功
rpm -q -q keepalived
## 目录位置
/etc/keepalived
```
