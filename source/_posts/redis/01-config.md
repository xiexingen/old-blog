---
title: redis-config常用点介绍
date: 2018-12-03 09:10:10 
categories: ['redis']
tags: ['redis']
---

redis-config常用点介绍
<!-- more -->

> 参考文档:http://redisdoc.com/

1. 是否以守护进程方式运行，redis默认不是守护进程方式运行，可以修改该配置项来使用守护进程方式运行
daemonizo:yes

2. pidfile 指定守护进程方式的写入文件
当redis以守护进程方式运行时，redis默认会吧pid写入/var/run/redis.pid文件，可以通过pidfile指定 pidfile /var/run/redis.pid

3. 指定redis端口 
配置文件里面找port，默认是6379 

4. bind 绑定的主机ip
``` bash
bind 127.0.0.1
```

5. timeout
超时时间,默认为0 表示关闭该功能

6. loglevel 
``` bash
设置日志级别 debug verbose notice warning  
syslog-enabled:是否将日志输出到系统日志syslog里头    
syslog-indent: 指定syslog里的日志标志
syslog-facility： 指定syslog设备，值可以是USER或者LOCAL0-LOCAL7
```

7. 日志记录方式，默认为标志输出，如果配置redis为守护进程方式运行，而这里又配置日志记录方式为标准输出，则日志将会发送给/dev/nulll
logfile stdout

8. databases 数据库数量
``` bash
databases 16
```

9. 指定多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件适配
``` bash
save <seconds> <changes>
# redis 默认配置文件提供了三个条件
# save 900 1 # 900秒内有一个更改
# save 300 10 # 300秒内有10个更改
# save 60 10000 # 60秒内有10000个更改
```

10. 指定存储至本地数据库时是否压缩数据，默认为yes，redis采用LZF压缩，如果为了节省CPU时间，可以关闭该选项，单会大致数据库文件变得巨大
``` bash
rdbcompression yes
```

11. 指定本地数据库文件名，默认为dump.rdb
``` bash
dbfilename dump.rdb
```

12. 指定本地数据库存放目录
``` bash
dir ./
```

13. 设置当本机为slav服务是，设置master服务的ip地址及端口，在redis启动时，他会自动从master进行数据同步
``` bash
slaveof <masterip> <masterport>
```

14. 当master服务设置了密码保护时，slav服务连接master的密码
``` bash
masterauth <master-password>
```

15. 设置redis连接密码，如果设置了密码，客户端在连接的时候需要通过 auth <password> 提供密码，默认为关闭
``` bash
requirepass Abcd1234
```

16. 设置同一时间最大客户端连接数，默认无限制，redis可以同时打开的客户端连接数为redis经常可以打开的最大文件描述符数，如果设置maxclients 0,表示不作限值。当客户端连接数达到限制时，redis会关闭新的连接并向客户端返回 max number of clients reached错误信息
``` bash
maxclients 128
```

17. 指定redis最大内存限制，redis在启动时会把数据加载到内存中，达到最大内存后，redis会尝试清除已到期或即将到期的key，当次方法处理后，仍然达到最大内存设置，将无法进行写入操作，但仍可以读，redis新的vm机制，会把key存放内存，value存放在swap区
``` bash
maxmemory <bytes>
```

18. 指定是否每次更新操作后进行日志记录，redis在默认情况下是异步吧数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失，因为redis本身同步数据文件是按上面save条件来同步的，所有的数据会在一段时间内只存在于内存中。默认为 no
``` bash
appendonly no
```

19. 指定更新日志文件名，默认为appendonly.aof
``` bash
appendfilename  appendonly.aof
```

20. 指定更新日志条件，共有3个可选值
no: 表示等操作系统镜像数据缓存同步到磁盘(块)
always: 表示每次更新操作后手动调用fsync()将数据写到磁盘(慢，安全)
everysec:表示每秒同步一次(折中，默认值)
``` bash
appendfsync everysec
```

21. 指定是否启用虚拟内存机制，默认为no，简单的介绍下，VM机制将数据分页存放，有redis将访问量较少的页即冷水机swap到磁盘上，访问多的页由磁盘自动换出到内存中
``` bash
vm-enabled no
```

22. 虚拟内存文件路径，默认值为/temp/redis.swap，不可多个redis实例共享
``` bash
vm-swap-file /tmp/redis.swap
```

23. 将所有大于vm-max-memory的数据存入虚拟内存，无论vm-max-memory设置多小，所有索引数据都是内存存储的(redis的所有数据就是keys)，也就是说 当vm-max-memory设置为0的时候，其实就是所有的value都存在于磁盘。默认值为0
``` bash
vm-max-memory 0
```

24. redis swap文件分成了很多的page，一个对象可以保存在多个page上面，但是一个page上不能被多个对象共享，vm-page-size是要根据存储的数据大小来设定的，建议如果存储很多小对象，page大小最好设置为32或者64bytes；如果存储很大对象，可以使用更大的page，如果不确定，就是用默认值
``` bash
vm-max-size 32
```

25. 设置swap文件中的page数量，由于页表(一种表示页面空闲或使用bitmap)是放在内存中的，在磁盘上每8个pages将消耗1bytes内存。
``` bash
vm-pages 1342177289
```

26. 设置访问swap文件的线程数，最好不要超过机器的核数，如果设置为0，那么对所有swap文件的操作都是串行的，可能会造成比较长的延迟，美容是4
``` bash
vm-max-thread:4
```

27. 设置在想客户端应答时，是否吧较小的包合并为一个包发送，默认为开启
``` bash
glueoutputbuf yes
```

28. 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法
``` bash
# hash-max-zipmap-entries 64
# has-max-zipmap-value 512
```

29. 指定是否激活重置哈希，默认为开启
``` bash
activerehashing yes
```

30. 指定包含其他的配置文件，可以在同一主机上多个redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件
``` bash
include /path/to/local.conf
```


##  SNAPSHOTTING快照

## REPLICATION复制

## SECURITY安全

- requirepass节点  
config get requirepass   
config set requirepass [v]


## LIMITS限值

- maxclients :最大连接数

- maxmemory :最大内存

- maxmemory-policy : 默认为noeviction
volatile-lru: 使用LRU算法移除key，只对设置了过期时间的键

allkeys-lru:使用LRU算法移除key

volatile-random:在过期集合中随机移除，值对设置了过期时间的键有效

allkeys-random: 随机移除key

volatile-ttl: 移除那些TTL值最小的key，也就是最近要过期的key

noeviction: 永不过期，不进行移除，针对写操作，直返回错误信息


- maxmemory-samples


## APPEND ONLY MODE追加
