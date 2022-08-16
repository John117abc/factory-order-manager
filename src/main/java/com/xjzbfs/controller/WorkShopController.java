package com.xjzbfs.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.pojo.Goods;
import com.xjzbfs.pojo.WorkShop;
import com.xjzbfs.service.WorkShopService;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class WorkShopController {

    @Resource
    WorkShopService workShopService;

    /**
     * 车间用户注册
     * @param jsonObject    注册信息
     * @return  是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/WorkShop/2021/workshop")
    public String registerWorkShop(@RequestBody JSONObject jsonObject) {
        String result = workShopService.registerWorkShopService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            successResponce.put("uid", result);
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10008");
        errorResponce.put("error_desc", result+"10008");
        return errorResponce.toJSONString();
    }

    /**
     * 车间用户登录
     * @param jsonObject    登录信息
     * @return  车间用户全部信息
     */
    @PostMapping("/api/v1.0/xjzbfs/WorkShop/2021/workshop/signin")
    public String workShopSignIn(@RequestBody JSONObject jsonObject, HttpServletResponse resp, HttpServletRequest req){
        String result = workShopService.signInWorkshopService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("用户名格式有误") ||result.equals("密码格式有误")||result.equals("用户名或密码错误")||result.equals("用户名或密码错误")) {
            errorResponce.put("status", "0");
            errorResponce.put("error_code", "10031");
            errorResponce.put("error_desc", result+"10031");
            return errorResponce.toJSONString();
        }
        jsonObject.put("sessionId",req.getSession().getId());
        successResponce.put("status", "1");
        successResponce.put("WorkShop", JSONObject.parseObject(result));
        req.getSession().setAttribute("u_id",JSON.parseObject(result).getString("w_id"));
        return successResponce.toJSONString();
    }

    /**
     * 获取所有车间用户信息
     * @return  车间用户信息
     */
    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/workshops")
    public String getAllWorkShop() {
        List<WorkShop> result = workShopService.getAllWorkShopService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("workshop", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10032");
        errorResponce.put("error_desc", "获取车间信息失败10032");
        return errorResponce.toJSONString();
    }

    /**
     * 获取指定id订单信息
     * @param o_id  车间用户id
     * @return  车间用户信息
     */
    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/workshop/show")
    public String getPresentGoodsOrder(@Param("o_id")String o_id) {
        String result = workShopService.getGoodsOrderService(o_id);
        return result;
    }

    /**
     * 更新订单生产时间以及生产人姓名
     * @param jsonObject    信息
     * @return  是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/goodsOreder/workshop")
    public String updateGoodsOrderMakeTimeAndMaker(@RequestBody JSONObject jsonObject) {
        String result = workShopService.updateGoodsOrderMakeTimeAndMakerService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result=="OK") {
            successResponce.put("status", "1");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10033");
        errorResponce.put("error_desc", result+"10033");
        return errorResponce.toJSONString();
    }

    /**
     * 完成订单制作反馈信息接口
     * @param o_id  订单id
     * @return  是否成功
     */
    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/workshop/fisnsh")
    public String finishGoodsOrder(@Param("o_id")String o_id,@Param("o_wftime")String o_wftime){
        String result = workShopService.finishProductOrderService(o_id,o_wftime);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result=="OK") {
            successResponce.put("status", "1");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10034");
        errorResponce.put("error_desc", result+"10034");
        return errorResponce.toJSONString();
    }

    /**
     * 获取将要制作订单列表
     * @return  订单列表
     */
    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/goodsorder/list")
    public String getWillMakeOrderList() {
        String result = workShopService.getWillMakeOrderService();
        return result;
    }

    /**
     * 获取指定id订单的物品信息
     * @param o_id
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/goodsorder/goods")
    public String getPresentGoodsOrderGoods(@Param("o_id")String o_id) {
            String result = workShopService.getGoodsByOidService(o_id);
            return result;
    }

    @GetMapping("/api/v1.0/xjzbfs/WorkShop/2021/goodsorder/oreview/wid")
    public String getWillMakOrdersByOWId(@Param("o_wid")String o_wid,@Param("o_review")String o_review) {
        JSONArray result = workShopService.getWillMakOrdersByOWIdService(o_wid,o_review);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()>0) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrder", result);
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10035");
        errorResponce.put("error_desc", "获取订单信息失败10035");
        return errorResponce.toJSONString();
    }

}
