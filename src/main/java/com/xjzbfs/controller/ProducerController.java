package com.xjzbfs.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class ProducerController {

    @Resource
    UserService userService;
    /**
     * 添加制单完成的订单信息
     * @param jsonObject    订单信息
     * @return  是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/goodsOrders")
    public String insertGoodsOrder(@RequestBody JSONObject jsonObject) {
        String result = userService.insertGoodsOrderService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10005");
        errorResponce.put("error_desc", result+"10005");
        return errorResponce.toJSONString();
    }

    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/goodsOrders/show/edit/all/goods")
    public String getAllEditGoods() {
        JSONArray result = userService.getAllGoodsAndCompanyNameService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods",result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10088");
        errorResponce.put("error_desc", "订单查询失败10088");
        return errorResponce.toJSONString();
    }

    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/delete/gid")
    public String deleteGoodsByGid(HttpServletRequest req) {
        String result = userService.deleteGoodsByGIdService(req.getParameter("g_id"));
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result=="OK") {
            successResponce.put("status", "1");
            successResponce.put("goods",result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10082");
        errorResponce.put("error_desc", "订单删除失败10082");
        return errorResponce.toJSONString();
    }

    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/Goods/show/edit/vname/goods")
    public String getEditGoodsByVGName(HttpServletRequest req) {
        JSONArray result = userService.getVGoodsAndCompanyNameService(req.getParameter("g_name"));
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods",result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10089");
        errorResponce.put("error_desc", "查询订单为空");
        return errorResponce.toJSONString();
    }

    /**
     * 获取编辑产品
     * @param req g_id
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/Goods/show/edit/gid/goods")
    public String getEditDetailGoods(HttpServletRequest req) {
        JSONObject result = userService.getEditDetailGoodsService(req.getParameter("g_id"));
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods",result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10090");
        errorResponce.put("error_desc", "错误查询订单为空10090");
        return errorResponce.toJSONString();
    }

    @PostMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/Goods/edit/gid/goods")
    public String updateGoodsDetail(@RequestBody JSONObject goods) {
        String result = userService.updateGoodsDetail(goods);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result=="OK") {
            successResponce.put("status", "1");
            successResponce.put("goods",result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10091");
        errorResponce.put("error_desc", result+"10091");
        return errorResponce.toJSONString();
    }
}
