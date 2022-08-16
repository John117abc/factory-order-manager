package com.xjzbfs.mapper;

import com.xjzbfs.pojo.CustomerConsignment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomerConsignmentMapper {
    int insertCustomerConsignment(CustomerConsignment customerConsignment);
    int updateCustomerConsignmentByCoId(@Param("co_id")String co_count,@Param("co_date")String co_date);
    CustomerConsignment searchCustomerConsignmentByCoId(@Param("co_id")String co_id);
    List<CustomerConsignment> searchCustomerConsignmentByCoCid(@Param("co_cid")String co_cid);
    List<CustomerConsignment> getAllCustomerConsignment();
}
