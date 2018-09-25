---
title: Centos7.x 安装gitlab-runner
date: 2018-06-01 10:35:10 
categories: ['Docker']
tags: ['Docker']
comments: false
img:
---

> 说明：开始尝试过在docker中安装gitlab-runner注册gitlab-runner啥的都没问题 但是gitlab-ci.yml文件中使用docker的时候提示xxxx daemon文件问题 折腾了好几天没能解决(大概的意思就是在容器内部使用使用docker访问不了外面的啥东西最后放弃了，该用在centos中直接安装gitlab-runner形式)   
> 参考地址: http://www.cnblogs.com/xishuai/p/ubuntu-gitlab-ci-docker-aspnet-core-part-2.html  
> 【前置条件】 系统安装了docker、docker-compose、git、dotnetcore  
>> docker 这个必须要  
>> git 必须，因为需要通过git获取代码  
>> docker-compose根据情况 因为我的ci中使用了docker-compose所以要  
>> dotnetcore 因为我是微软的铁杆粉丝  
1. 安装docker、docker-compose[参考01](01Dcocker安装及配置加速镜像.md)    
2. gitlab-runner  
* 安装命令  
 sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-ci-multi-runner-linux-amd64  
* 给予其权限  
sudo chmod +x /usr/local/bin/gitlab-runner  
* 注册  
sudo gitlab-runner register  
根据提示输入gitlab地址、token、描述信息、tag、[true|false]、[true|false]、shell    
* 添加一个用于跑 GitLab Runner 的gitlab-runner用户  
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash    
* 指定 GitLab Runner 执行的用户和工作目录    
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner  
* 启动gitlab-runner    
sudo gitlab-runner start  
* 把 GitLab Runner 服务器中的gitlab-runner账户，添加到docker用户组中  
sudo usermod -aG docker gitlab-runner  
* 在 GitLab Runner 服务器中，切换到gitlab-runner用户下，配置 SSH  
    ```
    su gitlab-runner
    ssh-keygen -t rsa -P ''
    ssh-copy-id root@你的ip地址
    ```
3. 安装git  
cd ~  
yum -y install git  

