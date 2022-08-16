package com.xjzbfs.config;

import com.xjzbfs.mapper.UserMapper;
import com.xjzbfs.mapper.WorkShopMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: ManagerInterceptor
 * @Author: 姜丞轩
 * @Description: 管理端过滤器
 * @Date: 2022/5/4 23:23
 */
@Component
public class ManagerInterceptor implements HandlerInterceptor {
    @Resource
    UserMapper userMapper;

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
        if ("/register".equals(arg0.getRequestURI()) || "/signin".equals(arg0.getRequestURI())) {
            return true;
        }

        //重定向
        Object u_id = arg0.getSession().getAttribute("u_id");
        if (null == userMapper.searchUserById((String)u_id)) {
            arg1.sendRedirect("/signin");
            return false;
        }
        return true;
    }
}
