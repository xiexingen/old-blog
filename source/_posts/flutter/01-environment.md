---
title: Flutter-01 环境搭建
date: 2019-09-09 19:40:22
categories: ['Flutter']
tags: ['Flutter']
---

Flutter-01 环境搭建
<!-- more -->

文档地址 https://developer.android.google.cn/studio/intro

# Window10环境搭建Flutter开发环境

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
![20190909203319.png](http://qiniu.xxgtalk.cn/blog/images/20190909203319.png)

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

### 在Android模拟器上运行Flutter
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


------------------------------------------------------


# Mac 环境搭建Flutter开发环境
> 由于没有mac电脑，所以特地在VM下安装了一个mac系统

## 前置条件
- 磁盘空间足够
- 安装了命令行工具: bash、curl、git 2.x、mkdir、rm、unzip、which
- 由于国内访问Flutter可能受限，Flutter官方为中国地区待见了临时镜像，可添加如下环境变量到用户的环境变量中
``` bash
// Macintosh HD->Users->用户名->.bash_profile
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
// 注:这些镜像为临时镜像，并不保证一直可用，可以从https://flutter.dev/community/china 查看最新的网址
```

## 安装

### Flutter SDK

2. 下载并安装
- 下载stable版本的sdk，然后解压到~/flutter


3. 添加flutter路径到path中
``` bash
cd ~
vim .bash_profile
// 然后添加下面行,;wq 保存，然后重启bash
export PATH=/Users/xiexingen/flutter/bin:$PATH
```

4. 运行flutter doctor来检查flutter
会有很多xx 比如xcode，android相关的工具

### Android Studio(建议3.0及以上)
1. 下载
- https://developer.android.google.com/studio(需要翻墙)
- https://developer.android.google.cn/studio  
如果过程提示是否安装一些东西，点同意即可,会自动安装java jdk

2. 为Android Studio安装Flutter和Dart插件
File->Settings->Plugins 然后搜索Flutter点击安装，这个时候会提示安装Dart插件，点安装 然后重启Android Studio
如图
![20190909203319.png](http://qiniu.xxgtalk.cn/blog/images/20190909203319.png)

### 设置环境变量
- 添加系统环境变量
``` bash
// 电脑/Users/用户名/.bash_profile
# Android 环境变量 xiexingen为我的用户名
export ANDROID_HOME=/Users/xiexingen/Library/Android/sdk
# Android 模拟器路径
export PATH=${PATH}:${ANDROID_HOME}/emulator
# Android tools 路径
export PATH=${PATH}:${ANDROID_HOME}/tools
# Android 平台工具路径
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
# Android NDK路径
ANDROID_NDK_HOME=/Users/xiexingen/Library/Android/ndk/android-ndk-r10e
# Flutter镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# Flutter 环境变量
export PATH=/Users/xiexingen/flutter/bin:$PATH
```

> 配置完成后，需要重启电脑

### 安装Xcode
1. 通过苹果应用商店安装
2. 配置Xcode命令行工具以使用最新安装的Xcode版本
``` bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### 设置IOS模拟器
1. 在终端输入如下命令行打开一个ios模拟器
``` bash
open -a Simulator
```
2. 通过模拟器菜单的 *硬件->设备*,确保是64位的iphone5s或更新的模拟器

### 如何将Flutter安装到IOS真机上

要通过*flutter run* 将Flutter应用安装到ios整机设备，需要一些额外的工具和一个Apple账号，还需要在Xcode中进行设置：
> 当然，用XCode来讲Flutter运行在真机上更简单，只需要点 *run*按钮即可，可以根据需要进行两种不同的运行方式；  
1. 安装 [Homebrew](https://brew.sh)
2. 确保homebrew最新
``` bash
brew update
```
3. 打开终端并运行如下命令来安装用于将Flutter应用安装到IOS设备的工具
``` bash
brew install --HEAD usbmuxd
brew link usbmuxd
brew install --HEAd libimobiledevice
brew install ideviceinstaller ios-deploy cocoapods
pod setup
```
如果这些命令中的任何一个失败并出现错误，可运行*brew doctor*并按照说明来解决问题

4. 遵循Xcode前面流程来配置项目
* 在你Flutter项目目录中通过*open ios/Runner.xcworkspace*打开默认的Xcode workspace
* 在Xcode中，选择导航面板左侧中的Runner项目
* 在Runner target设置页面中，确保在 常规>前面>团队 下选择了您的开发团队。当你选择一个团队时，Xcode会创建并下载开发证书，向您的设备注册您的账户，并创建和下载配置文件(如果需要)
    * 要开始您的第一个IOS开发项目，您可能需要使用您的APP ID登录Xcode
    * 任何App Id都支持开发和测试，但是如想法不到App Store则需要支付99到的开发者账号
* 当你第一次attach真机设备进行ios开发时，需要同时信任你的Mac和该设备上的开发证书。首次将IOS设备连接到Mac时，请在对话中选择 *信任*,然后，转到IOS设备上的设置应用程序，选择 常规>设备管理 并信任您的证书
    * 如果Xcode中的自动签名失败，请验证项目的 General>Identity>Bundle Identifier值是否唯一.

5. 通过flutter run 运行启动项目
``` bash
flutter run
```


# 其他

## 验证
- 运行 adb // 检测android相关
- 运行flutter doctor  // 检测flutter相关
> 第一次运行flutter命令(如 flutter doctor)，它会下载自己的依赖项目并自动编译，并缓存


## FAQ

### 无法启动模拟器
> emulator: ERROR:x86 emulation currently requires hardware acceleration! Please ensure Windows Hypervisor Platform (WHPX) is properly installed and usable. CPU acceleration status: HAXM is not installed on this machine  
解决方案:选择 Tools-> SDK Manager -> SDK Tools,安装 HAXM 即可
![20190909204602.png](http://qiniu.xxgtalk.cn/blog/images/20190909204602.png)

### 创建flutter项目
1. 通过android studio创建
File->Create->New Flutter Project

2. 通过命令行
flutter create my_first_app

### 运行flutter项目
1. 通过android studio 启动按钮

2. 命令行运行android模拟器
``` bash
// hw1 表示模拟器的名称
emulator -avd hw1
```

3. 命令行 flutter run
前置条件，需要一个已经启动的android模拟器或者连接到电脑的android设备