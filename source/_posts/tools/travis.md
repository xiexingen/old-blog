---
title: 使用travis自动部署到github
date: 2019-03-16 09:10:15
categories: ['工具']
tags: ['工具']
---

#### 使用github+travis+ant-design-pro-site打造自己公司的前端开发文档站点
<!-- more -->

#### 开篇

> 插播一条小广告，我们公司招人.net、前端(react栈) ；有求职意向可以私我内推(qq:1002275364)

目前公司的系统是基于.net web mvc开发，由于历史原因吧，里面有razor写的，也有公司自定义的前端单页框架jui写的一部分，在后续的开发、维护过程中愈发困难；基于各方面考虑以最后打算后端基于.netcore；前端基于react+antd+dva+umi栈重构；
1. 为什么用.net core  
其实吧，我跟后端是有很大的渊源的，做了好几年后端吧，发现.net后端其实蛮苦逼的，不仅得写后端api还得写前端页面(没办法，你让美工去写razor页面 他估计会把机箱上的菜刀拿起来)，这也是为什么要前后端分离的原因之一(虽然分离之后前端页面还是后端开发人员兼职写^_^)；  
.net core 天生为了跨平台、高性能、微服务、云而生；作为一个后端黑带6道的我，中小型项目里面玩的还是蛮顺手的(像什么abp、DI、dapper、ef、NPOI、itextsharp、quartznet、CAP、SignalR、Polly、DotnetSpider等还是玩过一些些的，只要别跟我扯什么动不动就双十一的场景，还是可以聊的下去的)  
其次，.net core生态圈目前虽然不如java等，但是还是可以看到一直在进步；像什么桌面应用、Xamarin、ML.NET、爬虫、Xamarin、区块链、IoT、Unity3D、等都有涉及到;微服务方向，有Ocelot、Consul、Polly 等等等等等等等等等等等等等...  
2. 为啥用react+antd+dva+umi【+ts】栈
目前开发人员以后端人员为主力，对jquery栈比较熟悉；切换到react后需要比较大的转变，需要接触很多新知识，比如es6的析构赋值、rest、箭头函数、Generate、Promise、模板字符串;再比如 react的生命周期、redux的数据流等 这些都是新的东西；考虑到各方面，最终打算数据量方案使用dva(简单明了以model为单位集reducers、effects、subscribe等)，至于antd不用过多介绍，业界公认前端ui库

好像有点跑题了~~~~~

#### 工作准备
1. 注册账号[github](https://github.com)、[travis](https://travis-ci.org)
2. github上创建仓库(wetrial-site)
3. github上生成一个token(记得保存下来)，用于travis推送代码到gh-pages分支  
![生成token](http://qiniu.xxgtalk.cn/blog/images/tools/travis_github_generate_token.jpg) 
记得将tokens保存下来，稍后要用到，仓库权限选择第一项 repo即可  
4. travis设置  
点击头像、然后选择项目，默认是用户，如果你的项目是组织项目的，需要切换到组织，如图所示  
![travis项目选择](http://qiniu.xxgtalk.cn/blog/images/tools/travis_project_list.jpg) 
5. 进入项目配置页面，如图  
![travis项目选择](http://qiniu.xxgtalk.cn/blog/images/tools/travis_project_setting.jpg) 
添加环境变量相关东西，包括域名、token等
![配置](http://qiniu.xxgtalk.cn/blog/images/tools/travis_environment.jpg)   
6. 回到实际的项目
从ant-design-pro-site拉取代码，然后根据自己的实际情况做修改；比如我去掉了尾栏的一些东西，增加了css相关的大栏(这里不具体介绍)  
7. 在根目录下添加travis的配置文件.travis.yml 内容如下所示
``` yml
language: node_js

node_js:
  - "8"

# 缓存依赖
cache:
  directories:
    - node_modules

before_install:
  - export TZ='Asia/Shanghai' # 更改时区

# 依赖安装
install:
  - npm install

# 构建脚本
script: 
  - npm run build-site

# 分支白名单
branches:
  only:
    - master # 只对 master 分支进行构建

# GitHub Pages 部署
deploy:
  - provider: pages
    skip_cleanup: true
     # 在项目仪表盘的 Settings -> Environment Variables 中配置
    github_token: $GITHUB_TOKEN
    # 将 build 目录下的内容推送到默认的 gh-pages 分支上，并不会连带 build 目录一起
    local_dir: _site
    #fqdn: $CUSTOM_DOMAIN
    name: $GIT_NAME
    email: $GIT_EMAIL
```
然后提交并同步到github,回到travis将会看到如下一幕  
![配置](http://qiniu.xxgtalk.cn/blog/images/tools/travis_log.jpg)    
你也可以从日志里面看到具体的执行过程，等待执行完成后回到github中将会看到里面多了一个gh-pages分支，没错 这个分支就是travis中的deploy推送过去的，里面就是编译后的代码，再回到setting里面，将会看到已经默认配置好站点地址了，这里我们改改 使用自己的域名，如图所示:  
![github域名](http://qiniu.xxgtalk.cn/blog/images/tools/travis_github_config.jpg) 
最后，去域名管理页，将自己的这个子域名一定一个类型为CNAME的，地址为:wetrial.github.io

#### 致次，大功告成了 访问刚配置的地址:http://ant.xxgtalk.cn 可以看到部署好的文档

![github域名](http://qiniu.xxgtalk.cn/blog/images/tools/wetrial-site.jpg) 