package com.xjzbfs.controller;

import com.xjzbfs.service.WorkShopService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.Resource;

@Controller
public class PageRouterController {

    @Resource
    WorkShopService workShopService;

    /**
     * 注册页跳转
     * @return
     */
    @GetMapping("/register")
    public String goRegister() {
        return "page-register.html";
    }

    /**
     * 跳转登录页面
     * @return
     */
    @GetMapping("/signin")
    public String goSignIn() {
        return "page-login.html";
    }

    /**
     * 跳转首页
     * @return
     */
    @GetMapping("/index")
    public String goIndex(){
        return "index.html";
    }

    /**
     * 跳转添加订单页面
     * @return
     */
    @GetMapping("/addOrder")
    public String goOrderInput() {
        return "form-order-input.html";
    }

    /**
     * 跳转客户基础信息添加页面
     * @return
     */
    @GetMapping("/addCustomerBasicMes")
    public String goCustomerInput() {
        return "form-customer-basic-input.html";
    }

    /**
     * 跳转添加客户详细地址页面
     * @return
     */
    @GetMapping("/addCustomerAddressMesDetail")
    public String goCustomerAddressDetailInput() {
        return "form-customer-address-input-02.html";
    }

    /**
     * 跳转添加客户托运部页面
     * @return
     */
    @GetMapping("/addCustomerConsignmentMesDetail")
    public String goCustomerConsignmentDetailInput() {
        return "form-customer-consignment-input.html";
    }

    /**
     * 添加外购商品详情页面
     * @return
     */
    @GetMapping("/addBuyMes")
    public String goAddBuyGoodsInput() {
        return "from-goods-add-buy.html";
    }

    /**
     * 订单搜索页面跳转
     * @return
     */
    @GetMapping("/searchAllOrder")
    public String goSearchOrder() {
        return "page-search-order.html";
    }

    /**
     * 车间首页
     * @return
     */
    @GetMapping("/workshop")
    public String goWorkShopIndex() {
        return "index-workshop.html";
    }

    @GetMapping("/workshop/login")
    public String goWorkShopLogin() {
        return "page-login-workshop.html";
    }

    @GetMapping("/workshop/register")
    public String goWorkShopRegister() {
        return "page-workshop-register.html";
    }

    @GetMapping("/error/404")
    public String error404(){
        return "404.html";
    }

    @GetMapping("/error/500")
    public String error500(){
        return "500.html";
    }
}
