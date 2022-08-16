package com.xjzbfs.mapper;


import com.xjzbfs.pojo.CustomerAddress;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomerAddressMapper {
    int insertUserAddress(CustomerAddress customerAddress);
    int updateUserAddressCount(@Param("aId") String aId);
    String searchCustomerAddressId(@Param("cId")String cId,@Param("address") String address);
    List<CustomerAddress> getAllCustomerAddress();
    List<CustomerAddress> getOneCustomerAddresses(@Param("cId") String cId);
    CustomerAddress getCustomerAddressesByAId(@Param("a_id") String a_id);
}
