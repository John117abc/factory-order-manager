package com.xjzbfs.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * 添加拦截器
 */
@Component
@Configuration
public class SessionConfiguration implements WebMvcConfigurer {

    @Resource
    private SessionInterceptor sessionInterceptor;

    @Resource
    private WorkShopInterceptor workShopInterceptor;

    @Resource
    private ManagerInterceptor managerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry ){
        registry.addInterceptor(sessionInterceptor).addPathPatterns("/*");

        registry.addInterceptor(workShopInterceptor).addPathPatterns("/workshop*");

        registry.addInterceptor(managerInterceptor).addPathPatterns("/index*");
        //网站配置生成器：添加一个拦截器，拦截路径为整个项目
    }
}
