---
title: Docker安装GitLab
date: 2018-06-05 10:30:10 
categories: ['Docker']
tags: ['Docker']
---

Docker下安装GitLab
<!-- more -->

> 前置条件 安装好docker  
1. docker运行gitlab(由于22端口被ssh占用 改用23)  
* 在/docker/gitlab 目录下分别创建data、config、logs三个文件夹  
* 执行命令
  ``` docker
  sudo docker run --detach --hostname gitlab.xxgtalk.cn --publish 443:443 --publish 8090:80 --publish 23:22 --name gitlab --restart always -v /docker/gitlab/config:/etc/gitlab -v /docker/gitlab/logs:/var/log/gitlab -v /docker/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
  * * * * * * 介绍 * * * * * *
  sudo docker run --detach \
  --hostname gitlab.xxgtalk.cn \
  --publish 443:443 --publish 8090:80 --publish 23:22 \ 
  --name gitlab \
  --restart always \
  -v /docker/gitlab/config:/etc/gitlab \ 配置文件映射到config文件夹
  -v /docker/gitlab/logs:/var/log/gitlab \
  -v /docker/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce
  ```
::: warning 注意
+ 因为配置的ssh端口是23 所以需要修改/docker/gitlab/config/gitlab.rb文件中修改或增加  
gitlab_rails['gitlab_shell_ssh_port'] = 23
+ 查看日志  
docker logs --follow gitlab  
:::
2. docker下安装gitlab runner  
+ [2.1] 安装gitlab runner
    ``` docker
    sudo docker run -d --name gitlab-runner --restart always -v /srv/gitlab-runner/config:/docker/gitlab-runner/config -v /var/run/docker.sock:/docker/gitlab-runner/run/docker.sock gitlab/gitlab-runner:latest
    * * * * * * 介绍 * * * * * *
    sudo docker run -d --name gitlab-runner --restart always \
    v /srv/gitlab-runner/config:/docker/gitlab-runner/config \
    -v /var/run/docker.sock:/docker/gitlab-runner/run/docker.sock \
    gitlab/gitlab-runner:latest
    ```
+ [2.2] 注册gitlab runner(官方建议跟gitlab不要放在同一个服务器上)【最后没有成功,改用[07Gitlab01-runner](07GitLab01-runner.md) 】  
参考地址:https://docs.gitlab.com.cn/runner/register/index.html  
  * 运行下面命令启动注册程序  
  sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register
  * 输入 GitLab 实例 URL  
  gitlab的域名  
  * 输入获取到的用于注册 Runner 的 token:  
  y8R7nLY4x3mdBiZt9AQV  
  *  输入该 Runner 的描述，稍后也可通过 GitLab's UI 修改:  
  *  给该 Runner 指派 tags, 稍后也可以在 GitLab's UI 修改:  
  *  选择 Runner 是否接收未指定 tags 的任务（默认值：false）， 稍后可以在 GitLab's UI 修改： true  
  *  选择是否为当前项目锁定该 Runner， 之后也可以在 GitLab's UI 修改。 该功能通常用于被指定为某个项目的 Runner （默认值：true）：  
  *  选择 Runner executor:  
 	我们使用docker  
  *  如果你选择 Docker 作为你的 executor，注册程序会让你设置一个默认的镜像， 作用于.gitlab-ci.yml中未指定镜像的项目  
输入: microsoft/dotnet  
---
##### 搭建私有仓库
1. 在docker中创建文件夹registry 用来存放仓库镜像，然后运行命令  
  ``` docker
  docker run -d -v /docker/registry:/var/lib/registry -p 8091:5000 --restart=always --name registry registry
  ```

##### 使用docker-compose安装
请查看[docker-compose文件](http://qiniu.xxgtalk.cn/blog/files/docker/gitlab-docker-compose.yml) 