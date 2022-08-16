package com.xjzbfs.service;

import com.alibaba.fastjson.JSONObject;

public interface CustomerService {
    String addCustomerService(JSONObject customer);
    String getAllCustomersService();
    String getCustomerByIdService(String cId);
    String getCustomerAddressesByCIdService(String cId);
    String getCustomerConsignmentByCIdService(String cId);
    String getCustomerVCCompany(String c_company);
    String insertCustomerAddressService(JSONObject customerAddress);
    String insertCustomerConsignmentService(JSONObject customerConsignment);
}
