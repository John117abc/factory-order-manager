package com.xjzbfs.mapper;

import com.xjzbfs.pojo.OrderGoods;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderGoodsMapper {
    List<OrderGoods> getOrderGoodsByOId(@Param("og_oid")String og_oid);
    List<OrderGoods> getOrderGoodsByGId(@Param("og_gid")String og_gid);
    List<OrderGoods> getAllOrderGoods();
    OrderGoods getOrderGoodsByOgId(@Param("og_id")String og_id);
    int insertOrderGoods(OrderGoods orderGoods);
    int deleteOrderGoods(@Param("og_oid")String og_oid);
}
