---
title: .NetCore+centos环境搭建手摸手实战
author: 谢新根
categories:
  - .NetCore
tags:
  - .NetCore
abbrlink: 36628
date: 2018-03-03 21:01:01
---

.NetCore+centos环境搭建手摸手实战
<!-- more -->

1. 安装VMware Workstation  
下载地址:https://my.vmware.com/cn/web/vmware/info/slug/desktop_end_user_computing/vmware_workstation_pro/14_0  下载安装 
2. 安装CentOS7  
安装好后发现不能使用网络 参考资料
http://blog.csdn.net/wanz2/article/details/52820876
3. 安装.net core  
参考官网步骤:https://www.microsoft.com/net/learn/get-started/linuxcentos
4. 安装nginx  
同样参考官网步骤:https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7
5. vs2017新建项目发布成本地文件夹  
新建项目，使用mvc模板发布到本地文件夹
6. 通过Xftp上传到centos  
通过Xftp将打包的文件直接粘贴到centos中(我是在root目录下建了个web文件夹专门用于存放部署的站点)
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0601.png)
7. 将dotnetcore站点运行起来  
在Xftp中点击新建终端打开XsHell 将路径定位到站点文件夹 cd /root/web/mvc  执行 dotnet HelloWord.dll  看到如下信息 表示你已经成功了
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0701.png)
这个时候你在外面访问是访问不了的 因为防火墙没有启用5000端口
如果一定想看看 可以再开一个终端 输入如图
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0702.png)
8. 配置nginx将80端口指向dotnetcore站点  
这一步就是通过nginx将80请求转到上面的localhost:5000
先找着nginx中的配置
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0801.png)
打开后会发现里面有个
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0802.png)
在如下目录中新建一个文件 输入配置   
    ```nginx
        server {
            listen 80;
            location / {
                proxy_pass http://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection keep-alive;
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }
    ```  
    ![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0803.png)
然后重启nginx ==》sudo nginx -s reload  
9. 查看成果  
在浏览器中输入192.168.2.105  如图
![](http://qiniu.xxgtalk.cn/blog/images/dotnetcore/core/01/0901.png)

> 总结:  
> 过程中遇到一些问题，比如虚拟机中的centos系统中使用不了网络 这个折腾了劳资一个上午(如有碰到，第2点中有参考资料)