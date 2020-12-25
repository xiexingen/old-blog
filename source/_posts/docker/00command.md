---
title: Docker常用命令
categories:
  - Docker
tags:
  - Docker
abbrlink: 7569
date: 2018-05-28 09:10:10
---

Docker常用命令
<!-- more -->

| 命令 | 说明 | 参数
| :--- | :--- | :---
|docker --version | 查看当前docker版本 |
|docker ps    | 查看当前正在运行的容器 |
|docker images | 查看本地所有镜像 |
|docker pull [镜像名称]|  拉取一个镜像到本地  |
|docker run [容器名称]| 运行一个容器  |
|docker rm [容器名称] | 删除本地使用过的容器  |
|docker start [Name] | 启动指定容器  |
|docker stop [Name] | 关闭指定容器  |
|docker kill [Name] | 强制关闭指定容器  |
|docker pause [Name]|暂停指定容器 |
|docker unpause [Name]|恢复指定容器 |
|docker rmi -f $(docker images -a -q)|  移除所有images  |
|docker rmi $(docker images -f 'dangling=true' -q)|移除none的images  
|docker inspect [容器名称] | 查看容器的信息  |
|docker exec -it [容器名称] bash | 在容器内执行bash 比如执行后可以执行ls查看目录 也可以创建文件等  |
|docker rm -fv [容器Id] | 停止、删除容器、清除数据  |
|docker images -f [option] | 过滤查询 | 
|docker logs -f [container-name]| 查看日志
|docker history [container-name]| 查看镜像的构建历史

* 数据卷
-v 主机目录:容器目录   
docker run -it -v /docker/data:/config [--privileged=true] 表示将宿主机中的/docker目录跟容器中的/config目录做一个映射，如果没有将自动创建  
> 如果遇到数据卷没权限访问，则在后面增加 --privileged=true即可

* 数据卷容器
--volumns-form containerId|name  表示容器数据卷从name容器同步  
> docker run -it --name xxg2 --volumns-from xxg1 nginx

warning 温馨提示
* docker run -p 8001:80   &nbsp;&nbsp;--运行 指定端口 8001外部端口  80表示内部端口
* docker run -d     		&nbsp;&nbsp;--detach 还可以继续操作 不会阻塞
* docker run --name		&nbsp;&nbsp;--运行的docker镜像的名称
* docker run -p 8001:80 &nbsp;&nbsp;--name myapi helloapi:latest  
表示运行docker中名为helloapi的容器 版本为latest docker的端口为80 本机的端口8001 名字为myapi
* docker ps -a			&nbsp;&nbsp;--查看所有容器 不管有没运行
* 过滤查询  
 docker images --filter "before=image1" 查询image1之后的  
 docker images --filter "since=image3"  查询image3之前的  
 docker images "wechat:v1.3.*"  查询wechat:1.3.x的  
 docker rmi -f $(docker images "wechat:v1.2.*" -q) 移除wechat:v1.2.*版本的
* docker logs查看日志
 docker logs -f gitlab 查看gitlab容器所有日志
 docker logs --tail 20 -f gitlab 查看gitlab最近20条的日志
 docker logs --since 30s -f gitlab 查看gitlab最近30s的日志

* docker inspect 查看日志文件位置  
``` bash
docker inspect --format='{{.LogPath}}' mysql  
```
* 清空docker实例的日志内容  

``` bash
$(docker inspect --format='{{.LogPath}}' <容器ID>)
```

* 退出 -it  
exit 或者ctrl+p+q
:::



