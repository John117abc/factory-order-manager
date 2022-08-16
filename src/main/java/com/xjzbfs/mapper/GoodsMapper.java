package com.xjzbfs.mapper;

import com.xjzbfs.pojo.Goods;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
@Mapper
public interface GoodsMapper {
    int insertGoods(Goods goods);
    Goods searchGoodByOId(@Param("g_oid")String g_oid);
    List<Goods> searchGoodsByCId(@Param("g_cid")String g_cid);
    Goods searchGoodById(@Param("g_id")String g_id);
    List<Goods> getAllGoods();
    List<Goods> getAllClothesOrClothGoods(@Param("g_type1")String g_type1,@Param("g_type2")String g_type2);
    List<Goods> getClothesOrClothGoodsByVCName(@Param("g_type1")String g_type1,@Param("g_type2")String g_type2,@Param("g_cid")String g_cid);
    List<Goods> getAllBuyGoods(@Param("g_type")String g_type);
    List<Goods> getBuyGoodsByVGName(@Param("g_type")String g_type,@Param("g_name")String g_name);
    List<Goods> getGoodsByVName(@Param("g_name")String g_name);
    int updateGoodsGPriceByGId(@Param("g_id")String g_id, @Param("g_price")String g_price);
    int deleteGoodsByGId(@Param("g_id")String g_id);
    int updateGoodsByGid(Goods goods);

}
