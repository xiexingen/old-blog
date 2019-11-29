---
title: Dockerfile解析
date: 2018-05-30 09:15:08 
categories: ['Docker']
tags: ['Docker']
---

Dockerfile解说
<!-- more -->

| 关键字 | 说明 | 例子
| :--- | :--- | :---
|FROM | 以此为基础来构建 | FROM debian:buster-slim
|MAINTAINER | 镜像维护着的项目和邮箱地址 | MAINTAINER The CentOS Project <xxxx@centos.org>
| RUN | 容器构建时运行的命令  | 
| EXPOSE | 当前容器对外暴露的端口  | 
| WORKDIR | 指定容器创建后，终端默认进来的工作目录  | 
| ENV | 用来在构建镜像过程中设置环境变量 | 
| ADD | 将宿主机目录下的文件拷贝到镜像且ADD命令会自动处理URL和解压tar压缩包 | ADD c48-docker.tar.xz /
| COPY | 跟ADD类似，但是不会解压 | copy src desc、copy ["src","desc"]
| VOLUME | 容器数据卷，用于数据保存和持久化工作 | VOLUME ["/xxg-data1","/xxg-data2"]
| CMD | 指定一个容器启动时要运行的命令，Dockerfile中可以有多个CMD指令，***但只有最后一个生效***，CMD会被docker run之后的参数替换 | CMD /bin/bash 
| ENTRYPOINT | 指定一个容器启动时要运行的命令，和CMD一样，都是指定容器启动程序及参数 | ENTRYPOINT netcore.dll
| ONBUILD |  当构建一个被继承的Dockerfile时运行命令，父镜像在被子继承后父镜像的onbuild被触发 | 


``` Dockerfile
# 案例一  构建一个自己的centos系统

FROM centos

ENV mypath /tmp
WORKDIR $mypath

RUN yum -y install vim
RUN yum -y install net-tools

EXPORT 80

CMD /bin/bash 
```


