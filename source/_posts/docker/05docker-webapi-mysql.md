---
title: Docker制作WebApi&MySql
date: 2018-06-03 09:30:10 
categories: ['Docker']
tags: ['Docker']
comments: false
img:
---
Docker制作WebApi&MySql 直接上图
<!-- more -->

![](/images/assets/docker/050a01.png)
1. docker文件  
    ``` docker
    FROM microsoft/aspnetcore-build as build-env
    WORKDIR /code
    COPY *.csproj ./
    RUN dotnet restore

    COPY . ./
    RUN dotnet publish -c Release -o out

    FROM microsoft/aspnetcore
    WORKDIR /app
    COPY --from=build-env /code/out ./

    EXPOSE 50000
    ENTRYPOINT ["dotnet","WebApiDocker.dll"]
    ```
2. 编译docker文件  
    ``` docker
    docker build -t  xxg/aspnetcore:1.0 .
    ```
3. 使用该镜像启动一个容器  
a. docker run -d -p 5000:80  --name api01 --link mysql01:db xxg/aspnetcore:1.0  
b. 使用bridge形式  
docker network create -d bridge mybridge		//创建一个网络  
docker run -d -p 5000:5000 --net mybridge --name api1 xxg/aspnetcore:1.0  
docker network connect mysql01  mybridge	//表示将mysql01跟mybridge网络连接起来  
    >--link mysql01:db		--表示将mysql01取个别名db并连接到当前容器  
    >--net mybridge		--表示使用指定网络