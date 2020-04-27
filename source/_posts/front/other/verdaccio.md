---
title: 前端私有仓库verdaccio
categories:
  - 前端-其他
tags:
  - 前端-其他
comments: false
abbrlink: 100
date: 2020-04-27 21:10:10
---

## docker 方式安装

1. 拉取 Verdaccio 的 docker 镜像

```bash
docker pull verdaccio/verdaccio
```

2. 在根目录下创建 docker 文件

```bash
mkdir -p ~/docker/tmp && cd ~/docker/tmp
```

3. 从 git 拉取示例到 tmp 到目录下

```bash
git clone https://github.com/verdaccio/docker-examples && cd ~/docker/tmp/docker-examples
```

4. 移动配置文件

```bash
mv docker-local-storage-volume ~/docker/verdaccio
```

5. 设置文件夹权限

```bash
chown -R 100:101 ~/docker/verdaccio
```

6. 使用 docker-compose 启动镜像

- 重定向到目录

```bash
cd ~/docker/verdaccio
```

- 修改 docker-compose.yml,更换端口 8000 内容如下

```bash
version: '2.1'
services:
  verdaccio:
    image: verdaccio/verdaccio:4
    container_name: verdaccio
    ports:
      - "8000:4873"
    volumes:
        - "./storage:/verdaccio/storage"
        - "./conf:/verdaccio/conf"
volumes:
  verdaccio:
    driver: local
```

启动

```bash
docker-compose up -d
```

> 生成密码

```bash
echo -n 'wetrial:Abcd1234#' | openssl base64
```

```bash
#
# This is the config file used for the docker images.
# It allows all users to do anything, so don't use it on production systems.
#
# Do not configure host and port under `listen` in this file
# as it will be ignored when using docker.
# see https://github.com/verdaccio/verdaccio/blob/master/wiki/docker.md#docker-and-custom-port-configuration
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: /verdaccio/storage

auth:
  htpasswd:
    file: /verdaccio/conf/htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
security:
  api:
    jwt:
      sign:
        expiresIn: 60d
        notBefore: 1
  web:
    sign:
      expiresIn: 7d

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org

web:
  enable: true
  title: Wetrial
  scope:

packages:
  '@wt/*':
      access: $all
      publish: $all

  '@*/*':
    # scoped packages
    access: $all
    publish: $all
    proxy: npmjs

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish packages
    # (anyone can register by default, remember?)
    publish: $all

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

# To use `npm audit` uncomment the following section
middlewares:
  audit:
    enabled: true

# log settings
logs:
  - {type: stdout, format: pretty, level: trace}
  #- {type: file, path: verdaccio.log, level: info}

```

https://blog.csdn.net/github_33420275/article/details/83035973

cp -r verdaccio-bak verdaccio

## 权限

chown -R 100:101 ~/docker/verdaccio
