---
title: lerna包管理
categories: + 前端-其他

tags: + 前端-其他

comments: false
abbrlink: 100
date: 2020-03-26 21:10:10
img:
---

Lerna 是一个工具，它优化了使用 git 和 npm 管理多包存储库的工作流。

# 工作的两种模式

1. Fixed(默认)

所有包同一个版本, 在 `publish` 的时候, 会在 lerna.json 文件里面 `"version": "0.1.5"` 根据这个号，进行增加.

2. Independent
每个包不同的版本号

# 修改工作模式

lerna 默认使用 npm，而且每个子 package 都有自己的 node_modules，设置后可以将字 node_modules 全移到顶层 node_modules 下。

1. 修改顶层的 package.json,增加

```json
 "private": true,
  "workspaces": [
    "packages/*"
  ],
```

2. 修改 lerna.json，增加

```json
"npmClient": "yarn",
"useWorkspaces": true,
```

各个包不同的版本号，通过 `lerna init --independent` 初始化项目, lerna.json 文件里面"version": "independent"

# 命令
* `lerna init [--independent]`
    初始化仓库
    - `--independent` 每个子包不同版本号  
    - lerna init ➜ 将会在当前目录下初始化一个lerna项目
* ` lerna create <name> [loc]`
    增加本地或者远程 package 做为当前项目 packages 里面的依赖  
    - `--dev ` 安装到devDependencies下(默认为dependencies)  
    - `--exact` 使用精确版本号，如：'^1.1.0' ➜ '1.1.0'  

* `lerna add [@version] [--dev] [--exact] [--scope]` 安装包(外部、本地)到指定项目    
    - `--scope`:只安装到指定的项目  
    `lerna add @wetrial/blogs --scope=@wetrial/host` ➜ 将在@wetrial/host项目中安装@wetrial/blogs

* `lerna bootstrap` 安装项目的依赖包

* `lerna list` 列出项目中的所有包

* `lerna run <script> -- [.args] ` 执行指定脚本
    - `lerna run --scope @wetrial/host start ` 在@wetrial/host项目下执行start

* `lerna exec` 在每个包运行指定脚本
    - `lerna exec -- rm -rf ./node_modules`  会移除每个子包下的node_modules 

* `lerna link` 建立项目包软链，类似npm link

* `lerna clean`  删除所有包的node_modules目录

* `lerna changed` 列出下次发版lerna publish 要更新的包

* `lerna publish` 会打tag，上传git,上传npm。 如果你的包名是带scope的例如："name": "@wetrial/blogs", 那需要在packages.json添加
    ``` json
    "publishConfig": {
        "access": "public"
    },
    ```

> 更多资料 https://github.com/lerna/lerna