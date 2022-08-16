package com.xjzbfs.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.pojo.Goods;
import com.xjzbfs.pojo.GoodsOrder;

import java.util.List;

public interface UserService {
    String registerUserService(JSONObject user);
    String searchUserByIdService(String uid);
    String getAllUserService();
    String updateUserDateService(String uid,String loginDate);
    String userSignInService(JSONObject user);
    String insertGoodsOrderService(JSONObject goodsOrder);
    String getFinishMakeOrderService();
    String finishArrangementOrderService(JSONObject arrMes);
    List<GoodsOrder> getAllSimpleOrderService();
    List<GoodsOrder> getAllConfirmOrdersService();
    String settlementOrderService(JSONObject jsonObject);
    String insertGoodsService(JSONObject goods);
    JSONArray getAllClothesOrClothGoodsService();
    JSONArray getClothesOrClothGoodsByVCNameService(String gName);
    List<Goods> getAllBuyGoodsService();
    List<Goods> getBuyGoodsByVName(String gName);
    List<Goods> getGoodsAllBuyAndClothesBuyCIdService(String c_id);      //通过客户id获取所有此公司的产品以及所有外购物品
    List<GoodsOrder> getAllOrdersByCustomerIdService(String o_cid);
    List<GoodsOrder> getDateOrdersByCustomerIdService(String o_cid,String date);        //通过用户id和月份日期获取订单
    JSONObject getOrderDetailByOId(String o_id);            //获取订单的详细信息通过订单id
    JSONArray getWillCheckGoodsOrdersByUIdService(String o_wid,String o_review);        //获取将要后整理审核的订单
    String updateOutOrderService(JSONObject outMessage);        //更新出库订单
    String updateSettlementOrderByOIdService(JSONObject settlementMessage);     //跟新结算订单
    JSONObject getOrderDetailByOCodeService(String o_code);     //获取订单的详细信息通过订单code
    JSONArray getAllNeedStockService(String o_otype);          //获取所有指定类型物品库存
    JSONArray getAllWorkUserService();         //获取所有车间用户以及地方管理员用户信息
    String deleteOrderAndStockService(String o_id,String u_id);      //删除订单
    JSONArray getAllGoodsAndCompanyNameService();          //获取所有产品以及产品的公司名称
    String deleteGoodsByGIdService(String g_id);           //通过产品id删除指定产品
    JSONArray getVGoodsAndCompanyNameService(String g_name);        //通过产品名称模糊搜索产品
    JSONObject getEditDetailGoodsService(String g_id);         //获取需要编辑的产品信息
    String updateGoodsDetail(JSONObject goods);        //编辑产品详细信息
}
