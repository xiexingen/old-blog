---
title: DotNetCore 备忘录
author: 谢新根
categories:
  - .NetCore
tags:
  - .NetCore
abbrlink: 13728
date: 2018-03-01 19:01:01
---

DotNetCore 备忘录
<!-- more -->

##### 常用备忘录
> docker run -d -p 8081:80 --name wechat -v /docker/wechat/App_Data/:/app/App_Data/ --restart always registry.cn-hangzhou.aliyuncs.com/xxg/wechat:v1.1.5 
1. 使用dotnet watch 在项目项目文件夹中添加(自.netcore2.1.0开始已经集成进去 不需要手动添加)     
   ``` c#
   <ItemGroup>
    <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="2.0.0" />
   </ItemGroup>   

   <!-- 使用dotnet ef ... -->
   <ItemGroup>
   <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.1" />
   </ItemGroup>   
   ```
2. 测试框架   
Moq  
fluentassertions
3. 查看nuget目录  
通过dotnet dotnet nuget locals all --list  
4. JSON解析不适用首字母小写形式(默认会首字母小写)  
在ConfigureServices中配置
    ``` c#
    services.AddMvc()
        .AddJsonOptions(options =>
        {
            if (options.SerializerSettings.ContractResolver is DefaultContractResolver resolver)
            {
                resolver.NamingStrategy = null;
            }
        });
    ```
5. 添加输出响应内容xml格式   
.net core中默认只返回json格式需要xml的话需要修改Output formatter
    ``` c#
    services.AddMvc()
        .AddMvcOptions(options=> {
            options.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
        })
    ```
6. 全局异常  
+ [6.1] 往MVC Filters中添加过滤器  
添加一个全局异常类继承ExceptionFilterAttribute
    ``` c#
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ILogger<GlobalExceptionFilter> _logger;

        public GlobalExceptionFilter(
            IHostingEnvironment hostingEnvironment,
            IModelMetadataProvider modelMetadataProvider,
            ILogger<GlobalExceptionFilter> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }



        public void OnException(ExceptionContext context)
        {
            HttpStatusCode status = HttpStatusCode.InternalServerError;
            String message = String.Empty;

            var exceptionType = context.Exception.GetType();
            if (exceptionType == typeof(UnauthorizedAccessException))
            {
                message = "Unauthorized Access";
                status = HttpStatusCode.Unauthorized;
            }
            else if (exceptionType == typeof(NotImplementedException))
            {
                message = "A server error occurred.";
                status = HttpStatusCode.NotImplemented;
            }
            else if (exceptionType == typeof(BusinessException))
            {
                message = context.Exception.ToString();
                status = HttpStatusCode.InternalServerError;
            }
            else
            {
                message = context.Exception.Message;
                status = HttpStatusCode.NotFound;
            }
            context.ExceptionHandled = true;

            HttpResponse response = context.HttpContext.Response;
            response.StatusCode = (int)status;
            response.ContentType = "application/json";

            var ar = new AjaxResponse()
            {
                Success = false,
                Message = message,
                Data = context.Exception
            };
            response.WriteAsync(JsonConvert.SerializeObject(ar));


            //context.Result = new JsonNetResult(new AjaxResponse() {
            //    Success=false,
            //    Message=context.Exception.Message,
            //    Data=context.Exception
            //});
        }
    }
    ```
在ConfigureServices方法AddMvc中
    ``` c# 
    services.AddMvc(config=> {
        config.Filters.Add(typeof(GlobalExceptionFilter));
    })
    ```
+ [6.2] 在Configure方法中添加异常处理管道(注意在所有请求管道的最前面)
    ```
    app.UseExceptionHandler(options =>
    {
        options.Run(async context =>
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            var ex = context.Features.Get<IExceptionHandlerFeature>();
            if (ex != null)
            {
                var response = new AjaxResponse()
                {
                    Success = false,
                    Message = ex.Error.Message,
                    Data = ex.Error
                };
                await context.Response.WriteAsync(JsonConvert.SerializeObject(response)).ConfigureAwait(false);
            }
        });
    });
    ```
