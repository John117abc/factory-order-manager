package com.xjzbfs.mapper;

import com.xjzbfs.pojo.Customer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomerMapper {
    int insertCustomer(Customer customer);
    List<Customer> getAllCustomer();
    Customer searchCustomerById(@Param("c_id") String c_id);
    List<Customer> searchCustomerVagueCCompany(@Param("c_company")String c_company);
}
