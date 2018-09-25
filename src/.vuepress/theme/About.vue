<template>
  <div class="container blog-container grid-list-xl align-center">
    <div class="layout row wrap">
      <div class="flex mb-3 xs12">
        <article class="v-card theme--light elevation-16 post-card">
          <div class="v-card__title">
            <div class="flex xs12">
              <h2 class="display-1 mb-3">关于我</h2>
            </div>
          </div>
          <div class="v-card__text pt-0 pb-0">
            <div class="flex xs12">
              <div class="content custom">
                <h4 style="padding-top:0;" id="个人信息"><a href="#个人信息" aria-hidden="true" class="header-anchor">#</a> 个人信息</h4>
                <p>姓名: <em><strong>谢新根</strong></em>
                  昵称: 程序有Bug <code>（英名:XXG）</code>
                  地址：目前浪迹于大长沙
                  QQ: 1002275364
                  自我描述: 爱代码爱生活</p>
                <h5 id="技术星级"><a href="#技术星级" aria-hidden="true" class="header-anchor">#</a> 技术星级</h5>
                <table>
                  <thead>
                    <tr>
                      <th style="text-align: left;">技术点</th>
                      <th style="text-align: center;width:110px;">星级</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align: left;">.NET、.NETCore、js、SqlServer</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-full"></span><span class="task-star star-half"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">Dapper、EF、PetaPoco</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-full"></span><span class="task-star star-off"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">Signalr、ABP、DDD、Redis、RabbitMQ、IdentityServer</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-off"></span><span class="task-star star-off"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">CAP、Consul、Ocelot、微服务、Polly、OChars、微信公众号、微信小程序</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-off"></span><span class="task-star star-off"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">React、Antd、Vue、ElementUI、TypeScript、Webpack</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-off"></span><span class="task-star star-off"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">Docker、CICD、GitLab、Linux</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-off"></span><span class="task-star star-off"></span></td>
                    </tr>
                    <tr>
                      <td style="text-align: left;">第三方支付、第三方登录、快递接口、短信接口、web快递单打印、条码打印、导出excel,word,pdf等常用第三的东西</td>
                      <td style="text-align: center;"><span class="task-star star-full"></span><span class="task-star star-full"></span><span
                          class="task-star star-full"></span><span class="task-star star-off"></span><span class="task-star star-off"></span></td>
                    </tr>
                  </tbody>
                </table>
                <h5 id="做过的系统"><a href="#做过的系统" aria-hidden="true" class="header-anchor">#</a> 做过的系统</h5>
                <ul>
                  <li><a href="http://www.wetrial.com" target="_blank" rel="noopener noreferrer">临床试验平台</a></li>
                  <li>跨境电商物流系统</li>
                  <li>外贸ERP</li>
                  <li>其他(懒得写了)</li>
                </ul>
                <h5 id="个人链接"><a href="#个人链接" aria-hidden="true" class="header-anchor">#</a> 个人链接</h5>
                <ul>
                  <li><a href="http://www.cnblogs.com/xiexingen" target="_blank" rel="noopener noreferrer">博客</a>、<a
                      href="http://blog.xxgtalk.cn" target="_blank" rel="noopener noreferrer">github博客</a></li>
                  <li><a href="http://www.github.com/xiexingen" target="_blank" rel="noopener noreferrer">Github</a></li>
                  <li><a href="http://jui-sample.xxgtalk.cn" target="_blank" rel="noopener noreferrer">demo</a>
                    --(服务器比较弱)</li>
                  <li><a href="https://www.cnblogs.com/xiexingen/p/4553354.html" target="_blank" rel="noopener noreferrer">其他</a></li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: ''
  }
</script>
<style lang="stylus">
  .task-star {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
  .star-half {
    background: url("/star-half.svg");
  }
  .star-full {
    background: url("/star-full.svg");
  }
  .star-off {
    background: url("/staroff.svg");
  }
</style>