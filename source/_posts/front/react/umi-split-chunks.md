---
title: umi文件拆分
date: 2018-11-11 11:35:10 
categories: ['React']
tags: ['前端','React','umi']
---

umi文件拆分
<!-- more -->

> 前言 在umi群里有群友在问umi打包后umi.js文件有1M多甚至更多，那么网站加载的时候会等待这个文件加载完成 可能需要好些时间 这个是比较难忍受的,其实umi有提供代码拆分的功能 只是文档不是很全 这里写了个片博客 谈谈怎么拆分的

1. 使用命令yarn run analyze 打开分析页面，运行后会打开如图的页面
> analyze是package.js中定义好的命令'cross-env ANALYZE=1 umi build' 可以自行添加或者查看umi文档
![](http://qiniu.xxgtalk.cn/blog/images/front/reactumi-split-pre.jpg)
如图所示，目前umi文件比较大，现在来做拆分，比如这：把@ant-design和antd这两个拆分为antdesigns文件、把react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment这些拆分为wendors文件
2. 编写拆分规则 在umi.js||config.js文件的chainWebpack 中加入
``` bash
config.optimization.splitChunks({
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
        priority: -10,
      },
      antdesigns: {
        name: 'antdesigns',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        priority: -11,
      }
    },
  });
```
3. 在umi.js或者config.js 的umi-plugin-react中的chunks属性中配置配置如下
``` bash
chunks: ['vendors','antdesigns', 'umi']
```
4. 重新执行 yarn run analyze 查看拆分后的情况，如图
![](http://qiniu.xxgtalk.cn/blog/images/front/reactumi-split-next.jpg)

致次 拆分完成
