---
title: IdentityServer4-ClientCredentials模式
date: 2018-03-10 21:01:01
author: 谢新根
categories: ['.NetCore']
tags: ['.NetCore','IdentityServer4']
---

IdentityServer4-ClientCredentials模式
<!-- more -->

##### 一、IdentityServer端 也叫服务端
1. 新建.netcore web项目 设置启动端口为60000 并通过Nuget引用IdentityServer4
2. 添加ApiResource和Client(此处方便测试固定了一些数据)
    ``` cs
    using IdentityServer4.Models;
    using System.Collections.Generic;

    namespace Api
    {
        public class Config
        {
            public static IEnumerable<ApiResource> GetResources()
            {
                return new List<ApiResource>()
                {
                    new ApiResource("api","My Api")
                };
            }

            public static IEnumerable<Client> GetClients()
            {
                return new List<Client>()
                {
                    new Client(){
                        ClientId="client",
                        AllowedGrantTypes=GrantTypes.ClientCredentials,
                        ClientSecrets={
                            new Secret("secret".Sha256())
                        },
                        AllowedScopes={"api"}
                    }
                };
            }
        }
    }
    ```
3. 使用IdentityServe4
    ``` cs
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddIdentityServer()
            .AddDeveloperSigningCredential()
            .AddInMemoryApiResources(Config.GetResources())
            .AddInMemoryClients(Config.GetClients());
    }

    public void Configure(IApplicationBuilder app,IHostingEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseIdentityServer();
    }
    ```
4. 启动项目 http://localhost:60000/.well-known/openid-configuration 可以看到相关json数据
![json](~@post-img/dotnetcore/identityserver4/01/1-0401.png)

#### 二、Api端
1. 新建.netcore web项目 设置启动端口为60001 
通过Nuget引用IdentityServer4.AccessTokenValidation 此处只需要验证所以不需要引用IdentityServer4
2. 配置StartUp
    ``` cs
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    namespace Api
    {
        public class Startup
        {
            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            // This method gets called by the runtime. Use this method to add services to the container.
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddAuthentication("Bearer")
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = "http://localhost:60001";//设置认证服务器地址
                        options.RequireHttpsMetadata = false;//不需要https
                        options.ApiName = "api";//api resource的名字 对应定义的ApiResource中的name
                    });
                services.AddMvc();
            }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                app.UseAuthentication();
                app.UseMvc();
            }
        }
    }
    ```
3. 在controller上贴上属性[Authorize] 表示只允许登录用户访问
4. 通过postman获取token(注意请求body中的参数)
![json](~@post-img/dotnetcore/identityserver4/01/2-0401.png)
5. 请求需要登录的api 此处为api/values
![json](~@post-img/dotnetcore/identityserver4/01/2-0501.png)

#### 三、client 客户端也叫ThirPart【选修】
定义一个控制台程序 访问api获取数据
1. 创建.net core控制台程序 通过Nuget引用包IdentityModel
    ``` cs
    using IdentityModel.Client;
    using System;
    using System.Net.Http;

    namespace Client
    {
        class Program
        {
            static void Main(string[] args)
            {
                var diso = DiscoveryClient.GetAsync("http://localhost:60000").Result;
                if (diso.IsError)
                {
                    Console.WriteLine(diso.Error);
                }
                var tokenClient = new TokenClient(diso.TokenEndpoint, "client", "secret");
                var tokenResponse = tokenClient.RequestClientCredentialsAsync("api").Result;
                if (tokenResponse.IsError)
                {
                    Console.WriteLine(tokenResponse.Error);
                }
                else {
                    Console.WriteLine(tokenResponse.Json);
                }

                var httpClient= new HttpClient();
                httpClient.SetBearerToken(tokenResponse.AccessToken);
                var response = httpClient.GetAsync("http://localhost:60001/api/values").Result;
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.Content.ReadAsStringAsync().Result);
                }



                Console.ReadKey();
            }
        }
    }

    ```