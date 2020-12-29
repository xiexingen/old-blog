---
title: 通过dotnet命令上传自己的nuget包
categories:
  - 工具
tags:
  - 工具
abbrlink: 20038
date: 2018-05-16 09:10:13
---

通过dotnet命令上传自己的nuget包
<!-- more -->

##### 通过dotnet命令上传自己的nuget包
- 编辑项目属性 在打包选项中设置各种东西 勾选'在版本中生成Nuget包'、设置其他东西 如包Id、版本等  
- 通过vs发布该包 我生成的为:XXG.AutoMapper.AutoReg.1.1.0.nupkg
- 执行命令
    ``` bash
    dotnet nuget push XXG.AutoMapper.AutoReg.1.1.0.nupkg -k oy2km5lmhmh4lnff32uadp2qudugxwce5jjamrh6xgx4vy -s https://api.nuget.org/v3/index.json
    ```
