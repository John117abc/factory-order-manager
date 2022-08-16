package com.xjzbfs.config;

import com.xjzbfs.mapper.WorkShopMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: workShopInterceptor
 * @Author: 姜丞轩
 * @Description: 车间拦截器
 * @Date: 2022/5/4 23:10
 */
@Component
public class WorkShopInterceptor implements HandlerInterceptor {

    @Resource
    WorkShopMapper workShopMapper;

    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
    }
    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
    }
    @Override
    public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
        //首页路径以及登录放行
        if ("/workshop/login".equals(arg0.getRequestURI()) || "/workshop/register".equals(arg0.getRequestURI())) {
            return true;
        }

        //重定向
        Object w_id = arg0.getSession().getAttribute("u_id");

        if (workShopMapper.searchWorkShopById((String)w_id) == null) {
            arg1.sendRedirect("/workshop/login");
            return false;
        }
        return true;
    }
}

