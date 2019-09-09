---
title: Flutter-01 环境搭建
date: 2019-09-09 19:40:22
categories: ['Flutter']
tags: ['Flutter']
---

Flutter-01 环境搭建
<!-- more -->

# Window10环境搭建Flutter开发环境

文档地址 https://developer.android.google.cn/studio/intro

## 前置条件
- 磁盘空间足够
- git 2.x

## 安装

### Android Studio(建议3.0及以上)
1. 下载
- https://developer.android.google.com/studio(需要翻墙)
- https://developer.android.google.cn/studio  
如果过程提示是否安装一些东西，点同意即可,会自动安装java jdk

2. 为Android Studio安装Flutter和Dart插件
File->Settings->Plugins 然后搜索Flutter点击安装，这个时候会提示安装Dart插件，点安装 然后重启Android Studio
如图
![20190909203319.png](qiniu.xxgtalk.cn/blog/images/20190909203319.png)

### Flutter SDK
1. 配置flutter临时镜像(非必须)
``` bash
// 增加如下变量到用户环境变量中
PUB_HOSTED_URL=https://pub.flutter-io.cn  
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
// 注:这些镜像为临时镜像，并不保证一直可用，可以从https://flutter.dev/community/china 查看最新的网址
```

2. 下载并安装
- 通过 git 克隆flutter项目代码到本地，比如我的是D:\Program Files\Flutter
不建议放到高级目录，比如C:\Program Files
- 然后在Flutter安装目录的flutter文件下找到flutter_console.bat 双击运行  

### 设置环境变量
1. 系统环境PATH添加 D:\Program Files\Flutter\bin
2. Android环境变量配置
- 添加系统环境变量
``` bash
// 键和值，其中目录为Android SDK的目录，可以通过android studio菜单File->Settings 然后搜索SDK 可查看SDK的安装目录
ANDROID_HOME:C:\Users\xiexingen\AppData\Local\Android\Sdk
```
- 在系统环境变量中的Path中添加%ANDROID_HOME%\emulator
- 在系统环境变量中的Path中添加%ANDROID_HOME%\platform-tools
- 在系统环境变量中的Path中添加%ANDROID_HOME%\tools

> 配置完成后，需要重启电脑

### 验证
- cmd 运行 adb // 检测android相关
- 运行flutter doctor  // 检测flutter相关
> 第一次运行flutter命令(如 flutter doctor)，它会下载自己的依赖项目并自动编译，并缓存

## 在Android模拟器上运行Flutter
* 机器上需要启用VM acceleration
* 启动android studio 菜单 Tools->AVD Manager 并选择 `Create Virtual Device`
* 选择一个设备 然后点 Next
* 为要模拟的Android版本选择一个或多个系统镜像，然后选择Next(建议使用x86)
* 在Emulated Performance下，选择 Hardware-GLES 2.0 以启用硬件加速
* 验证AVD配置是否正确，然后选Finish,更多问题可以参考文档
* 在Android Virtual Device Manager中，点击工具栏的 `Run`,启动模拟器并显示所选择的操作系统版本或设备的启动画面
* 通过 `flutter run` 命令行运行启动项目

## 如何在Android真机运行
要准备在Android设备上运行并测试Flutter，需要安装Android4.1 (API level 16)或者更高低版本
* 在设备上启用 `开发人员选项`和`USB调试`，可自行google
* 使用USB将手机插入电脑，如果有授权提示则点同意
* 在终端中，运行 `flutter devices`命令以验证Flutter是否识别你连接的Android设备
* 通过 `flutter run` 启动项目

## FAQ

### 无法启动模拟器
> emulator: ERROR:x86 emulation currently requires hardware acceleration! Please ensure Windows Hypervisor Platform (WHPX) is properly installed and usable. CPU acceleration status: HAXM is not installed on this machine  
解决方案:选择 Tools-> SDK Manager -> SDK Tools,安装 HAXM 即可
![20190909204602.png](qiniu.xxgtalk.cn/blog/images/20190909204602.png)

### 创建flutter项目
1. 通过android studio创建
File->Create->New Flutter Project

2. 通过命令行
flutter create my_first_app

### 运行flutter项目
1. 通过android studio 启动按钮

2. 命令行 flutter run
前置条件，需要一个已经启动的android模拟器或者连接到电脑的android设备