---
title: ASP.NET Core + Docker + Jenkins + gogs + CentOS 从零开始搭建持续集成
categories:
  - Docker
tags:
  - Docker
abbrlink: 52714
date: 2018-06-06 11:01:10
---

ASP.NET Core + Docker + Jenkins + gogs + CentOS 从零开始搭建持续集成
<!-- more -->
 
> 参考地址：https://www.cnblogs.com/stulzq/p/8629165.html    
> https://www.jianshu.com/p/64e9708c23e7  
>前置条件 安装了docker、配置了加速镜像(参考01)  
1. 使用docker安装免费https证书  
```
 sudo docker run -it --rm --name certbot \
    -v "/etc/letsencrypt:/etc/letsencrypt" \
    -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
    certbot/certbot certonly
```
按照提示进行操作  
2. docker安装Gogs (一个gitserver，类似于gitlab)    
创建文件/docker/gogs  然后运行如下命令  
docker run -d --name=gogs -p 23:22 -p 8090:3000 --mount type=bind,src=/docker/gogs,dst=/data --restart always gogs/gogs   
>参考地址 https://github.com/gogits/gogs/tree/master/docker   
3. docker 安装jenkins  
自定义镜像  
``` yml
FROM jenkins
USER root
#清除了基础镜像设置的源，切换成腾讯云的jessie源
#使用非腾讯云环境的需要将 tencentyun 改为 aliyun
RUN echo '' > /etc/apt/sources.list.d/jessie-backports.list \
  && echo "deb http://mirrors.tencentyun.com/debian jessie main contrib non-free" > /etc/apt/sources.list \
  && echo "deb http://mirrors.tencentyun.com/debian jessie-updates main contrib non-free" >> /etc/apt/sources.list \
  && echo "deb http://mirrors.tencentyun.com/debian-security jessie/updates main contrib non-free" >> /etc/apt/sources.list
#更新源并安装缺少的包
RUN apt-get update && apt-get install -y libltdl7 && apt-get update

ARG dockerGid=999

RUN echo "docker:x:${dockerGid}:jenkins" >> /etc/group 

# 安装 docker-compose 因为等下构建环境的需要
RUN curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

RUN chmod +x /usr/local/bin/docker-compose
```
docker build -t auto-jenkins .  
创建目录/docker/jenkins/docker.sock、/docker/jenkins/jenkins_home  
``` yml
docker run --name jenkins -p 8091:8080 -p 50000:50000 \
    --mount type=bind,src=/docker/jenkins/docker.sock,dst=/var/run/docker.sock \
    --mount type=bind,src=$(which docker),dst=/bin/docker \
    --mount type=bind,src=/docker/jenkins/jenkins_home,dst=/var/jenkins_home \
    --restart always \
    -d auto-jenkins
```
docker run --name jenkins -p 8091:8080 -p 50000:50000 --mount type=bind,src=/docker/jenkins/docker.sock,dst=/var/run/docker.sock  --mount type=bind,src=$(which docker),dst=/bin/docke  --mount type=bind,src=/docker/jenkins/jenkins_home,dst=/var/jenkins_home --restart always -d auto-jenkins  

4. ASP.NET Core 持续集成  
5. Jenkins配置Gogs webhook插件  
6. Jenkins持续集成演示  
