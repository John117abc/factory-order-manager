package com.xjzbfs.mapper;

import com.xjzbfs.pojo.Stock;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StockMapper {
    int insertStock(Stock stock);
    List<Stock> getStockByOId(@Param("s_oid")String s_oid);
    int updateOutStock(@Param("s_oid")String o_id,@Param("s_odate")String s_odate,@Param("s_status")String s_status);
    int deleteStockBySOid(@Param("s_oid")String s_oid);
    List<Stock> getAllStock();
}
