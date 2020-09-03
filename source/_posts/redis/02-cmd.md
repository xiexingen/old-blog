---
title: redis-cli基础
categories:
  - redis
tags:
  - redis
abbrlink: 21149
date: 2018-12-02 09:10:10
---

redis-cli基础
<!-- more -->

- 参考文档:http://redisdoc.com/


| 命令 | 说明 | 参数说明 | 案例
| :--- | :--- | :--- | :--- 
|redis-cli -h [host] -p [port] -a [password]| 通过redis-cli连接redis | host:地址<br>port:端口号,默认为6379<br> password:密码 | redis-cli -h localhost -p 7379 -a test
| ping | 测试是否通 | 如果返回pong，表示通了 | 
| FLUSHALL | 清空所有db |  | 
| FLUSHDB | 清空当前db |  | 
| select [index] | 切换到第几个db | index：从0开始的db下标 | select 0
| DBSIZE | 显示当前db中的key个数  |  | 
| keys [pattern] | 显示当前db中的所有key | pattern：匹配符(如：？) |  keys *
| get [key] | 查询指定key的值 | key:键名  |  get name
| del [key] | 删除指定key的值 | key:键名  |  del name
| EXISTS [key] | 判断是否存在指定的key  | key:键名 |  EXISTS name
| move [key] [db] | 移动指定的key到指定的db |key:键名<br> db:db下标  | 
| ttl [key] | 查看过期时间  | key:键名,返回值(-1:永不过期 -2:已过期，会移除) |  ttl name
| EXPIRE [key] [time] | 设置带过期时间的键值 | key:键名<br>time:过期时间(秒)<br>| EXPIRE name 10
| type [key]| 查看指定key的数据类型 | key:键名| 

# String
- append [key]:追加   

- STRLEN [key]:字符串长度

- INCR [key]:数值增加 

- INCRBY [key] v:数值增加v

- DECR [key] :数值减少

- DECRBY [key] v:数值减少v

- GETRANGE [key] [start] [end]:字符串截取

- SETRANGE [key] [start] [end]:字符串截取

- setnx [key] [v]: 如果不存在才设置

- msetnx [key] [...v] : 设置多个

# List
- LPUSH [key] [...v] :依次往左边插入多个

- RPUSH [key] [...v] :依次往右边插入多个

- LRANGE [key] [start] [end] :列出多个

- lpop [key] :删除第一个

- rpop [key] :删除第一个

- LINDEX [key] [index] :查看指定下标的值

- LLEN [key] :查看list长度

- LREM [key] [count] [v]:删除指定列表中指定的count个v

- LTRIM [key] [start] [end]: 从start开始删除到end为止

- rpoplpush [source] [destination]: 移除source的最后一项 并插入到destination的第一项

- lset [key] [index] [value] : 用value替换指定下标的值

- linsert [key] [before/after] [value1] [value2]: 在value1前/后插入value2

# Set
- SMEMBERS [key] :查看set中数据集合

- sadd [key] [...v]:添加多个值，去重复的

- scard [key] :查看元素中的数量

- SREM [key] [v] :删除指定集合中的指定的值

- srandmember [key] [count]: 随机生成count个整数

- spop [key]:随机删除一个

- smove [key1] [key2] [v] :将set集合key1中的v移到key2中

- sdiff [key1] [key2]: 查询key1中有，key2中没有的

- sinter [key1] [key2]: 查询两个中都有的

- sunion [key1] [key2]：查询两个的去重后的合并集合

# Hash => K/V模式不变，V是一个键值对

- hget [key] [vKey]:查询key中v的值

- hmget [key] [...vKey]: 一次查询多个

- hset [key] [vKey] [value]：设置key中v的值为value,例:hset user id 1

- hmset [key] [...[vKey] [value]]: 一次设置多个，例:hmset user name xxg age 28 id

- HGETALL [key] :查询key中所有的键值对，得到数组['属性','值']形式

- hdel [key] [...vKey] :删除多个指定的vKey

- hlen [key] :查询指定key中的数量

- hexists [key] [vKey]:判断key里面是否存在某个值的key

- HKEYS [key] : 查看指定key中所有的值的key

- hvals [key] : 查看指定key中所有的值

- HINCRYBY/HINCRYBYFLOAT [key] [vKey] [v] :给指定key增加指定的整数/小数

- hsetnx [key] [vKey] [value]：设置值，如果不存在

# Zset 

卧槽，实在不想写了，参考: http://redisdoc.com/sorted_set/index.html