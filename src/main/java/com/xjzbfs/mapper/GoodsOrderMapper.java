package com.xjzbfs.mapper;

import com.xjzbfs.pojo.GoodsOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GoodsOrderMapper {
    int insertGoodsOrders(GoodsOrder goodsOrder);
    int updateMakeTimeAndMaker(GoodsOrder goodsOrder);
    GoodsOrder searchGoodsOrderById(@Param("o_id")String o_id);
    int finishProductOrder(@Param("o_id")String o_id,@Param("o_wftime")String o_mtime,@Param("o_review")Integer o_review);
    List<GoodsOrder> getAllOrdersIsNullTime(@Param("o_review")String o_review,@Param("o_otype")String o_otype);
    List<GoodsOrder> getAllConfirmOrders(@Param("o_review")String o_review);
    List<GoodsOrder> getAllOrdersByCustomerId(@Param("o_cid")String o_cid);
    int updateSettlementOrderWithout(GoodsOrder goodsOrder);
    int updateSettlementOrder(GoodsOrder goodsOrder);
    List<GoodsOrder> getWillMakeGoodsOrdersByOWId(@Param("o_wid")String o_wid,@Param("o_review")String o_review);       //获取处在不同时期的生产车间订单
    List<GoodsOrder> getWillCheckGoodsOrdersByUId(@Param("o_muid")String o_muid,@Param("o_review")String o_review);     //搜索需要某个用户后整理的订单
    int finishCheckOrder(@Param("o_auid")String o_auid,@Param("o_auname")String o_auname,@Param("o_autime")String o_autime,@Param("o_id")String o_id,@Param("o_review")String o_review);
    int updateOutOrderByOId(@Param("o_id")String o_id,@Param("o_oname")String o_oname,@Param("o_otime")String o_otime,@Param("o_oid")String o_oid,@Param("o_courier")String o_courier,@Param("o_review")String o_review,@Param("o_deliver")String o_deliver);       //更新订单出库
    int updateOrderOPriceByOId(@Param("o_id")String o_id,@Param("o_price")String o_price);      //根据订单id更新金额
    int updateSettlementOrderByOId(@Param("o_id")String o_id,@Param("o_aetime")String o_aetime,@Param("o_aeid")String o_aeid,@Param("o_aename")String o_aename,@Param("o_review")String o_review);//更新结算信息
    int updateInvoiceByOId(@Param("o_id")String o_id,@Param("o_invoice")String o_invoice,@Param("o_isinvoice")String o_isinvoice);//跟新发票信息
    GoodsOrder getGoodOrderByOCode(@Param("o_code")String o_code);      //根据订单编号获取订单
    List<GoodsOrder> getGoodOrdersByTimes(@Param("start")String start,@Param("end")String end,@Param("o_cid")String o_cid);     //根据月份范围查找订单
    List<GoodsOrder> getGoodOrdersByThisMonth(@Param("start")String start,@Param("end")String end);
    int deleteOrderByOId(@Param("o_id")String o_id);
}
