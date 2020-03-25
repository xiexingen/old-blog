---
title: scrapy环境搭建
date: 2018-05-16 09:10:10 
categories: ['python']
tags: ['python']
---

scrapy环境搭建
<!-- more -->

## 环境 wind10 64位
1. 安装vscode 并在插件中搜索python 并安装插件
2. 安装[anaconda](https://www.anaconda.com/distribution/#download-section)
下载适合自己的版本即可，安装路径不要带空格；全勾选
3. vscode终端输入 `conda -V` 来确定是否安装正确  
如果提示conda 不是内部或外部命令，当修改环境变量无法解决时  
定位到安装路径，比如我的:D:\ProgramFiles\Anaconda\Scripts\  
输入：activate.bat 然后再执行第4步
4. 安装scrapy,终端输入:`conda install -c conda-forge scrapy`
5. 选取Python解释器
使用`Ctrl+Shift+P`打开命令板，输入`Python: Select Interpreter` 找到刚的安装目录，选择确定

## 问题&解决

执行的时候提示 Fatal error in launcher: Unable to create process using '"c:\bld\scrapy_1564100571450\_h_env\python.exe"  "C:\Users\Rodzice.Mateusz-PC\Anaconda3\Scripts\scrapy.exe" '

解决办法  

1. pip install scrapy

2. scrapy -v

3. scrapy startproject example
