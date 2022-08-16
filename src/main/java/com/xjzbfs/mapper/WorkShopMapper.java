package com.xjzbfs.mapper;

import com.xjzbfs.pojo.WorkShop;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WorkShopMapper {
    WorkShop searchWorkShopById(@Param("wId")String wId);
    int registerWorkShop(WorkShop workShop);
    WorkShop signInWorkShop(@Param("w_account")String w_account,@Param("w_password")String w_password);
    WorkShop searchWorkShopByName(@Param("w_account")String w_account);
    List<WorkShop> getAllWorkShop();
}
