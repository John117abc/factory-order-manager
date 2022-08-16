package com.xjzbfs.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.pojo.GoodsOrder;
import com.xjzbfs.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class ExaminerController{

    @Resource
    UserService userService;
    /**
     * 获取制作完成的订单列表
     * @return  制作完成的订单列表
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/arrangement")
    public String getFinishMakeOrder(HttpServletResponse response, HttpServletRequest request) {
        String o_muid = request.getParameter("o_muid");
        String o_review = request.getParameter("o_review");
        JSONArray result = userService.getWillCheckGoodsOrdersByUIdService(o_muid,o_review);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()>0) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrder", result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10001");
        errorResponce.put("error_desc", "获取订单失败10001");
        return errorResponce.toJSONString();
    }

    /**
     * 后整理完成制作的订单并入库或退回
     * @param jsonObject  GoodsOrder内容
     * @return 成功或失败
     */
    @PostMapping("/api/v1.0/xjzbfs/Users/2021/goodsorder/arrangement/check/finish")
    public String finishArrangementOrder(@RequestBody JSONObject jsonObject) {
        String result = userService.finishArrangementOrderService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrder", result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10002");
        errorResponce.put("error_desc", result+"10002");
        return errorResponce.toJSONString();
    }

    /**
     * 获取所有未完成的简单订单
     * @return  简单订单列表
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/simple")
    public String getSimpleOrder() {
        List<GoodsOrder> goodsOrders = userService.getAllSimpleOrderService();
        return JSONArray.toJSONString(goodsOrders);
    }

    /**
     * 获取所有需要结算的订单
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/goodsorder/out")
    public String getAllConfirmOrders() {
        List<GoodsOrder> goodsOrders = userService.getAllConfirmOrdersService();
        return JSONArray.toJSONString(goodsOrders);
    }

    /**
     * 订单出库并且填入发票号
     * @param jsonObject    信息
     * @return  是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/Users/2021/goodsorder/settlement")
    public String settlementOrder(@RequestBody JSONObject jsonObject) {
        String result = userService.updateSettlementOrderByOIdService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10003");
        errorResponce.put("error_desc", result+"10003");
        return errorResponce.toJSONString();
    }

    /**
     * 订单出库
     * @param jsonObject
     * @return
     */
    @PostMapping("/api/v1.0/xjzbfs/Users/2021/goodsorder/outorder")
    public String outOrder(@RequestBody JSONObject jsonObject) {
        String result = userService.updateOutOrderService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10004");
        errorResponce.put("error_desc", result+"10004");
        return errorResponce.toJSONString();
    }

}
