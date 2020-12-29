---
title: Openssl生成免费证书
categories:
  - 工具
tags:
  - 工具
abbrlink: 31096
date: 2018-05-16 09:10:10
---

使用Openssl生成免费证书
<!-- more -->

> 官网地址 openssl的windows官网: https://slproweb.com/products/Win32OpenSSL.html  
1. 下载安装
2. 在自己目录下运行 
    ``` bash
    openssl req -newkey rsa:2048 -nodes -keyout socialnetwork.key -x509 -days 365 -out socialnetwork.cer
    ```
3. 生成pfx文件命令
    ``` bash
    openssl pkcs12 -export -in socialnetwork.cer -inkey socialnetwork.key -out socialnetwork.pfx
    ```