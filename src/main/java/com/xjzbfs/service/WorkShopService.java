package com.xjzbfs.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.pojo.GoodsOrder;
import com.xjzbfs.pojo.WorkShop;

import java.util.List;

public interface WorkShopService {
    String registerWorkShopService(JSONObject workshop);
    String signInWorkshopService(JSONObject workshop);
    String updateGoodsOrderMakeTimeAndMakerService(JSONObject info);
    List<WorkShop> getAllWorkShopService();
    String getGoodsOrderService(String o_id);
    String finishProductOrderService(String o_id,String o_wftime);
    String getWillMakeOrderService();
    String getGoodsByOidService(String o_id);
    JSONArray getWillMakOrdersByOWIdService(String o_wid,String o_review);

}
