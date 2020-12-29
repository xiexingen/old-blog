---
title: Docker安装MsSqlserver
categories:
  - Docker
tags:
  - Docker
abbrlink: 58308
date: 2018-06-02 09:25:10
---
Docker安装MsSqlserver
<!-- more -->
> 未成功
1. 执行命令  
``` sql
 docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Abcd1234' -v=/docker/mssql:/var/opt/mssql  -p 1433:1433 --name sqlserver  -d microsoft/mssql-server-linux:2017-latest  
* * * * * * * * * 备注 * * * * * * * * * 
 docker run -e 'ACCEPT_EULA=Y'  --是否接受协议
    -e 'MSSQL_SA_PASSWORD=<YourStrong!Passw0rd>' --设置密码
    -p 1433:1433    --端口
    --name sqlserver       --用户
   -d microsoft/mssql-server-linux:2017-latest --2017latest版本
```
