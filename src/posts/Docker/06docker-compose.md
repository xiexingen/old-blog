---
title: 使用docker-compose
date: 2018-06-04 10:01:10 
categories: ['Docker']
img:
---

使用docker-compose按照webapi&mysql
<!-- more -->

[接Docker制作WebApi&MySql](./05docker-webapi-mysql.html)
1. 创建docker-compose.yml文件  
  ``` docker
  version '1'

  services:
    db:
        image: mysql/mysql-server
        container_name: 'db'
        command: mysqld --character-set-server=utf8 --collaction-server=utf8_general_ci
        restart: always
        ports:
          -'3306:3306'
        environment:
          MYSQL_ROOT_PASSWORD: Abcd1234
          MYSQL_USER: sa
          MYSQL_PASWORD: Abcd1234
        volumes:
          - /docker/mysql/db-init:/docker-entrypoint-initdb.d
    webapi:
        build: .
        container_name: 'webapi01'
        ports:
          -'5000:80'
        depends_on:
          - db
  ```
>【注意】  
由于db需要初始化用户角色 所以在资料卷中指定目录下放入sql 内容  
GRANT ALL PRIVILEGES ON *.* TO 'sa'@'%' WITH GRANT OPTION;  
2. 执行命令     
docker-compose build  
docker up	//docker down 与docker up相反  
> [docker-compose文件](/post-assets/docker-compose/mysql-docker-compose.yml)  