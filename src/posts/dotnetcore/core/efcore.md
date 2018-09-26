---
title: EFCore相关资料
date: 2018-03-01 21:01:01
author: 谢新根
categories: ['.NetCore']
tags: ['.NetCore']
---
EFCore相关资料
<!-- more -->

1. 命令行  
CMD形式 | VS中Package Manager形式
---- | ---
dotnet ef migrations add InitCreate	[-o 路径] | Add-Migration InitCreate
dotnet ef database update   | Update-Database
dotnet ef migrations remove | Remove-Migrations
donet ef database update [LastGoodMigration] | Update-Database LastGoodMigration
dotnet ef migrations script [-o 路径] | Script-Migration
>生成 migrationName1 到 -migrationName2的脚本  
> dotnet ef migrations script migrationName1 migrationName2    
> 不能使用dotnet ef命令行解决方式 在项目文件csproj文件中添加  
```
<DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.1" />
```