package com.xjzbfs.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class StockController {

    @Resource
    UserService userService;

    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/Stock/clothes")
    public String getClothesStock(HttpServletRequest request, HttpServletResponse response) {
        JSONArray result = userService.getAllNeedStockService(request.getParameter("o_ptype"));
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("stocks", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10006");
        errorResponce.put("error_desc", "获取库存失败10006");
        return errorResponce.toJSONString();
    }
}
