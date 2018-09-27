---
title: Docker安装及配置加速镜像
date: 2018-05-30 09:15:08 
categories: ['Docker']
tags: ['Docker']
---

Docker安装及配置加速镜像
<!-- more -->

> 个人阿里云加速镜像个人地址&nbsp; https://noe4mlw6.mirror.aliyuncs.com

***
##### CentOS 7 (使用yum进行安装)
如果之前安装过】先卸载依赖  
  ``` bash
    sudo yum remove docker \
    docker-common \
    container-selinux \
    docker-selinux \
    docker-engine \
    docker-engine-selinux
  ```
1. 直接安装  
curl -sSL https://get.docker.com/ | sh
2. 启动 并设置开机启动  
```
sudo systemctl start docker
sudo systemctl enable docker
```

> 配置docker使用国内镜像  
如何配置镜像加速器  
您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器：  
```
{
  "registry-mirrors": ["https://noe4mlw6.mirror.aliyuncs.com"]
}
```
重启docker  
```
sudo systemctl daemon-reload
sudo systemctl restart docker
```
###  安装docker-compose
1. sudo curl -L https://github.com/docker/compose/releases/download/1.20.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose  
2. sudo chmod a+x /usr/local/bin/docker-compose 
> 卸载  
sudo rm /usr/local/bin/docker-compose