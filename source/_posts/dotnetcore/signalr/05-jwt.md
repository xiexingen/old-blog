---
title: .net core 3.0 Signalr - 05 使用jwt将用户跟signalr关联
date: '2019-10-02 18:34:10'
categories:
  - .NetCore
tags:
  - Signalr
  - .NetCore
abbrlink: 61069
---

.net core 3.0 Signalr - 05 使用jwt将用户跟signalr关联
<!-- more -->
Signalr是以Group、Connect为核心来进行推送，比如，给某个组、某个连接来推送，但实际场景中，核心应该是某个组、某个人；然而一个人可以对应多个连接(浏览器多个tab页)；本节就来介绍下自行管理人、组、连接这些关系  
由于signalr连接的时候不那么方便附带header和cookie(因为推送独立成一个子系统了)，实际实现中采用以url query的形式附带上token，然后服务器端自定义解析token得到用户信息；

## 服务器端实现
- ConfigureServices中添加服务相关方法，代码如下,完整代码
  ``` C#
  public void ConfigureServices(IServiceCollection services)
  {
      var appSection = Configuration.GetSection("App");
      services.Configure<AppSetting>(option => appSection.Bind(option));
      var appSetting = appSection.Get<AppSetting>();

      services.AddSingleton<SignalrRedisHelper>();

      // services.AddHostedService<ClearBackGroundService>();

      services.AddAuthentication(options =>
      {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(option =>
      {
          option.SecurityTokenValidators.Clear();
          option.SecurityTokenValidators.Add(new UserTokenValidation()); ;

          option.Events = new JwtBearerEvents()
          {
              OnMessageReceived = context =>
              {
                  var userId = context.Request.Query["userId"].FirstOrDefault();
                  if (!string.IsNullOrWhiteSpace(userId))
                  {
                      context.Token = userId;
                  }
                  return Task.CompletedTask;
              }
          };
      });

      services.AddCors(options => options.AddPolicy(corsPolicy, builder =>
      {
          builder
                .SetIsOriginAllowedToAllowWildcardSubdomains()
                .WithOrigins(appSetting.CORS.Split(","))
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader()
                .Build();
      }));

      services.AddControllers()
          .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver())
          .ConfigureApiBehaviorOptions(options =>
          {
              options.InvalidModelStateResponseFactory = context =>
              {
                  var result = new BadRequestObjectResult(context.ModelState);
                  result.ContentTypes.Add(MediaTypeNames.Application.Json);
                  // result.ContentTypes.Add(MediaTypeNames.Application.Xml);

                  return result;
              };
          })
          .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

      // 添加Signalr
      services.AddSignalR(config =>
      {
          if (_webEnv.IsDevelopment())
          {
              config.EnableDetailedErrors = true;
          }
      })
      // 支持MessagePack
      .AddMessagePackProtocol()
      // 使用redis做底板 支持横向扩展 Scale-out
      .AddStackExchangeRedis(o =>
        {
            o.ConnectionFactory = async writer =>
            {
                var config = new ConfigurationOptions
                {
                    AbortOnConnectFail = false,
                    // Password = "changeme",
                    ChannelPrefix = "__signalr_",
                };
                //config.EndPoints.Add(IPAddress.Loopback, 0);
                //config.SetDefaultPorts();
                config.DefaultDatabase = appSetting.SignalrRedisCache.DatabaseId;
                var connection = await ConnectionMultiplexer.ConnectAsync(appSetting.SignalrRedisCache.ConnectionString, writer);
                connection.ConnectionFailed += (_, e) =>
                {
                    Console.WriteLine("Connection to Redis failed.");
                };

                if (connection.IsConnected)
                {
                    Console.WriteLine("connected to Redis.");
                }
                else
                {
                    Console.WriteLine("Did not connect to Redis");
                }

                return connection;
            };
        });
  }
  ```
其中，SignalrRedisHelper 为redis辅助方法，[详情请参见](https://github.com/xiexingen/CTS.Signalr/blob/master/Core.Signalr.Template.Web/Cores/SignalrRedisHelper.cs)  
UserTokenValidation 为自定义token解析方法，[详情请参见](https://github.com/xiexingen/CTS.Signalr/blob/master/Core.Signalr.Template.Web/Cores/UserTokenValidation.cs),由于历史遗留问题，此处直接使用了userId，建议的做法是传递jwttoken，然后服务器端解析jwt token得到用户信息    

## Hub中跟用户关联
在Hub中通过Context.User.Identity.Name可以获取到解析的值，通过这种关系来跟用户关联上，当然，也可以自定义修改使用其他信息，比如Email或其他自定义的名称，具体请google

更多内容请通过快速导航查看下一篇

## 快速导航

|   标题    |   内容 
|   :---    |   :--- 
|   索引    |   [.net core 3.0 Signalr - 实现一个业务推送系统](/2019/09/20/dotnetcore/signalr/00-introduct/) 
|   上一篇  |   [.net core 3.0 Signalr - 04 使用Redis做底板来支持横向扩展](/2019/10/01/dotnetcore/signalr/04-redis/) 
|   下一篇  |   [.net core 3.0 Signalr - 06 业务实现-业务分析](/2019/10/03/dotnetcore/signalr/06-analysis/) 
|   源码地址  |   [源码](https://github.com/xiexingen/CTS.Signalr) 
|   官方文档  |   [官方文档](https://docs.microsoft.com/zh-CN/aspnet/core/?view=aspnetcore-3.0) 
