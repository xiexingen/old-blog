---
title: DIY一个集搜索、排序、分页功能的列表组件
categories:
  - React
tags:
  - 前端
  - React
abbrlink: 22484
date: 2019-05-22 20:10:10
---

DIY一个集搜索、排序、分页功能的列表组件
<!-- more -->

[源码地址](https://github.com/wetrial/wetrial-template): [https://github.com/wetrial/wetrial-template](https://github.com/wetrial/wetrial-template)<br />效果<br />![test.gif](https://cdn.nlark.com/yuque/0/2019/gif/173421/1558523693173-c0265a6e-5263-4317-bf76-99b17c86ec1c.gif#align=left&display=inline&height=513&name=test.gif&originHeight=1508&originWidth=2193&size=4252316&status=done&width=746)
<a name="UKzZ5"></a>
# 背景
在中控台系统中经常需要带条件过滤、分页、排序等的列表页面，antd提供了表格、排序、分页等，多个页面中使用会发现里面其实有很多重复的代码，自己捣腾下最后有了这个组件，
<a name="pfCYQ"></a>
# 使用说明
<a name="7qJ13"></a>
## 列表使用
如图所示:<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/173421/1558524295889-fe6fce9b-1d53-4849-898c-39a7decf52ec.png#align=left&display=inline&height=1323&name=image.png&originHeight=1985&originWidth=2000&size=270488&status=done&width=1333.3333333333333)

1. 引入高阶组件pagedQuery
1. 引入封装的TableList 基本上跟Antd table组件用法一致，只是初始化了许多默认参数
1. 用高阶组件包裹组件，并传参
```jsx
// type为必须参数，一般对应dva中model的effects
{
  type: string; // 类型 一般指获取数据源的action
  page?: number; // 当前页 从1开始
  defaultPageSize?:number; // 每页默认显示的条数
  pageSize?: number; // 每页显示数量
  record?: boolean; // 是否记录搜索状态
}
```

4. 请求附带的基础参数，通过_getQueryParams返回一个对象，用于一些特殊场景，一般为空_
4. 处理搜索按钮的点击事件，将搜索表单中的值收集并传递给onSearchData方法
4. 处理重置按钮，将重置按钮的点击事件绑定来源于高阶组件给组件的onResetData
4. 获取数据源并给到table
<a name="AiF39"></a>
## 详情页面
回退到列表页面有两种形式，<br />1.通过浏览器上的回退按钮<br />2.详情页面放置一个回退按钮，代码层面实现路由跳转到列表页<br />一般情况都使用第二种方式，因为如果编辑页面比较负责，可能里面有子页面，子页面又可以进入这一通过浏览器上的回退按钮需要点击N多次，再者，浏览器的回退有数量限制<br />同样，如图所示：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/173421/1558524894480-261376dd-c130-40e0-b993-23812add160f.png#align=left&display=inline&height=877&name=image.png&originHeight=1316&originWidth=1714&size=188537&status=done&width=1142.6666666666667)

1. 引入方法backRouter
1. 在需要跳转路由的地方调用一下backRoute方法，并将路由传递给方法，该方法会返回之前记录的列表路由
<a name="VNgB5"></a>
# 思路
实现思路，通过高阶组件实现，[代码](https://github.com/wetrial/wetrial/blob/master/src/components/PagedQuery/index.tsx)  、  [api文档](https://github.com/wetrial/wetrial/blob/master/src/components/PagedQuery/index.zh-CN.md)  <br />记录搜索状态，通过sessionStorage来实现，考虑到sessionStore的一个优势，关闭当前tab页就失效了 省去还得去手动清除记录状态的麻烦(比如放到localStorage)，再者 这种查询状态不需要持久记录  <br />回退方法backRouter，由于高阶组件中会在组件的componentWillUnmount方法中记录搜索状态，以location的pathname为key，以location的search为值存放，所以通过backRouter方法匹配的时候会从sessionStorage中查询，如果有则带上查询串，以此来达到记录页面状态的效果

> 更多请参观：[https://www.yuque.com/wetrial/front-end/](https://www.yuque.com/wetrial/front-end/)