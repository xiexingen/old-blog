---
title: Docker 安装MySql
date: 2018-06-02 09:20:10 
categories: ['Docker']
tags: ['Docker']
---

Docker 安装MySql
<!-- more -->

>将docker容器中的实例中的文件跟物理文件链接起来 即使删掉容器 数据还在 再创建容器的时候 任然可以对应上之前的数据  
#### 一、安装篇
1. 使用docker-compose安装  
+ [1.1] 在目录/docker/mysql/mysql-init下创建init-user.sql文件 内容如下  
```
use mysql;
CREATE USER 'sa'@'%' IDENTIFIED BY 'Abcd1234';
GRANT ALL PRIVILEGES ON *.* TO 'sa'@'%';
```
+ [1.2]   
docker-compose -f mysql-docker-compose.yml up -d    
对应的mysql-docker-compose.yml文件
``` bash
version: '2.3'

services:
  db:
    image: mysql/mysql-server
    container_name: mysql01
    restart: always
    command: mysqld --character-set-server=utf8 --collation-server=utf8_general_ci
    ports:
      - 3306:3306
# networks:
#   - net_mysql
    environment:
      MYSQL_ROOT_PASSWORD: Abcd1234
    volumes:
      - /docker/mysql/mysql-init:/docker-entrypoint-initdb.d
      - /docker/mysql/data:/var/lib/mysql
# volumes:
#   mysql-data:
#     external: true
# networks:
#   net_mysql:
#     external: true
```

2. mount【推荐使用】  
```
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Abcd1234 --name mysql01 --restart always --mount type=bind,src=/docker/mysql/config/my.cnf,dst=/etc/my.cnf --mount type=bind,src=/docker/mysql/data,dst=/var/lib/mysql mysql
```
> /docker/mysql/config/my.cnf	&nbsp;&nbsp;对应物理磁盘位置 需要新建my.cnf 内容如下
```
[mysqld]
user=root
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```
> /etc/my.cnf	--docker创建mysql后该mysql容器对应的配置文件  
/docker/mysql/data	--对应物理磁盘位置 表示docker中数据映射到的物理文件位置  
/var/lib/mysql mysql/mysql-server &nbsp;&nbsp;对应docker中mysql实例容器的文件位置  
-e  MYSQL_ROOT_PASSWORD=Abcd1234 &nbsp;设置初始密码  
1. volume[后期废用]  推荐使用mount形式  
```
docker run -d -p 3306:3306 --name mysql01 -v=/docker/mysql/config/my.cnf:/etc/my.cnf -v=/docker/mysql/data:/var/lib/mysql mysql/mysql-server
```
#### 二、使用篇
>docker 操作mysql  
1. 连接mysql  
docker exec -it mysql01 bash   
mysql -u root -p [密码] 	--密码可以待mysql容器启动后  
通过docker logs mysql01 找到生成的随机密码 密码在一段类型：
![](/images/docker/040101.png)
2. 设置mysql密码  
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('Abcd1234');	--用户名为root 密码为Abcd1234  
3. 实验一下	【--exit 退出当前】  
use mysql;	--使用数据库查询  
select user,host from user;	--查询用户信息  
show variables like ‘%char%’;		--查看当前使用的字符集  
在mysql中创建网络用户 这样可以非本机访问  
mysql> CREATE USER 'sa'@'%' IDENTIFIED BY 'Abcd1234';  
mysql> GRANT ALL PRIVILEGES ON *.* TO 'sa'@'%';
>docker run -d -p 3306:3306 -e"MYSQL_USER=Zarc" -e"MYSQL_PASSWORD=pwd123456" -e"MYSQL_ROOT_PASSWORD=password123" -e"MYSQL_RANDOM_ROOT_PASSWORD=true" --name mysql01 mysql/mysql-server --character-set-server=utf8 --collation-server=utf8_general_ci     
备注： : When this is true (which is its default state, unless MYSQL_ROOT_PASSWORD is set or MYSQL_ALLOW_EMPTY_PASSWORD is set to true), a random password for the server's root user is generated when the Docker container is started 当这个MYSQL_RANDOM_ROOT_PASSWORD 为true 时 为root用户设置密码是没有作用的还是会生成随机的密码，设置为false 或者不加这个环境变量  