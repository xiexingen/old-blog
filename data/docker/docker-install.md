## centos 7 安装&配置docker
``` bash
# 卸载之前安装的
sudo yum remove docker docker-common container-selinux docker-selinux docker-engine docker-engine-selinux

# 直接安装
curl -sSL https://get.docker.com/ | sh

# 启动，设置开机启动
sudo systemctl start docker && sudo systemctl enable docker

# 配置使用阿里云镜像
vim /etc/docker/daemon.json
{
  "registry-mirrors": ["https://noe4mlw6.mirror.aliyuncs.com"]
}

# 重启docker
sudo systemctl daemon-reload && sudo systemctl restart docker
```

## 安装docker-compose
```  bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod a+x /usr/local/bin/docker-compose
```



## docker中安装nginx
```bash
docker run -it -d -v /data/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -p 80:80 -p 443:443 --restart unless-stopped --name nginx nginx
```