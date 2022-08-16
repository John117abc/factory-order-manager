package com.xjzbfs.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.mapper.CustomerConsignmentMapper;
import com.xjzbfs.pojo.CustomerConsignment;
import com.xjzbfs.tools.DataMethod;
import com.xjzbfs.mapper.CustomerAddressMapper;
import com.xjzbfs.mapper.CustomerMapper;
import com.xjzbfs.pojo.Customer;
import com.xjzbfs.pojo.CustomerAddress;
import com.xjzbfs.service.CustomerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Resource
    CustomerMapper customerMapper;

    @Resource
    CustomerAddressMapper customerAddressMapper;

    @Resource
    CustomerConsignmentMapper customerConsignmentMapper;

    @Override
    public String addCustomerService(JSONObject customer) {
        Customer c = new Customer();
        String cId = UUID.randomUUID().toString();
        String cRegion = customer.getString("c_region");
        String cCompany = customer.getString("c_company");
        String cName = customer.getString("c_name");
        String cPhone = customer.getString("c_phone");

        if(cRegion==null||!DataMethod.checkSZH(cRegion,128)){
            return "客户地区有误";
        }else if (cRegion==null||!DataMethod.checkSZH(cCompany,128)){
            return "客户名称输入有误";
        }else if(cName==null||!DataMethod.checkName(cName)) {
            return "客户姓名必须为汉字";
        }else if (cPhone==null||!DataMethod.checkTelephone(cPhone)) {
            return "手机号输入有误";
        }

        c.setC_id(cId);
        c.setC_region(cRegion);
        c.setC_company(cCompany);
        c.setC_name(cName);
        c.setC_phone(cPhone);

        int result = customerMapper.insertCustomer(c);
        if(result==1)
            return "OK";
        else
            return "客户信息注册失败请联系管理员";

    }

    @Override
    public String getAllCustomersService() {
        List<Customer> customers = customerMapper.getAllCustomer();
        return JSON.toJSONString(customers);
    }

    @Override
    public String getCustomerByIdService(String cId) {
        if(cId==null||!DataMethod.checkIds(cId))
            return "c_id有误";
        Customer customer = customerMapper.searchCustomerById(cId);

        return JSON.toJSONString(customer);
    }


    @Override
    public String getCustomerAddressesByCIdService(String cId) {
        if(cId==null||!DataMethod.checkIds(cId))
            return "id有误";
        List<CustomerAddress> customerAddresses = customerAddressMapper.getOneCustomerAddresses(cId);
        return JSON.toJSONString(customerAddresses);
    }

    @Override
    public String getCustomerConsignmentByCIdService(String cId) {
        if(cId==null||!DataMethod.checkIds(cId))
            return "id有误";
        List<CustomerConsignment> customerConsignments = customerConsignmentMapper.searchCustomerConsignmentByCoCid(cId);
        return JSON.toJSONString(customerConsignments);
    }

    @Override
    public String getCustomerVCCompany(String c_company) {
        if(c_company==null||!DataMethod.checkSZH(c_company,128))
            return "公司或单位名称有误有误";

        List<Customer> customers = customerMapper.searchCustomerVagueCCompany(c_company);
        return JSON.toJSONString(customers);
    }

    @Override
    public String insertCustomerAddressService(JSONObject customerAddress) {
        CustomerAddress c = new CustomerAddress();
        String aId = UUID.randomUUID().toString();
        String aCid = customerAddress.getString("a_cid");
        String aName = customerAddress.getString("a_name");
        String aPhone = customerAddress.getString("a_phone");
        String aAddress = customerAddress.getString("a_address");
        String aDate = String.valueOf(new Date().getTime());
        Integer aCount = 0;
        if(aCid==null||!DataMethod.checkIds(aCid))
            return "客户id有误";
        else if(aName==null||!DataMethod.checkName(aName))
            return "姓名只能为汉字";
        else if (aPhone==null||!DataMethod.checkTelephone(aPhone))
            return "手机号码必须为数字";
        else if (aAddress==null||!DataMethod.checkSZH(aAddress,256))
            return "地址只能为英文字符和汉字";

        c.setA_id(aId);
        c.setA_cid(aCid);
        c.setA_name(aName);
        c.setA_phone(aPhone);
        c.setA_address(aAddress);
        c.setA_date(aDate);
        c.setA_count(aCount);
        int result = customerAddressMapper.insertUserAddress(c);

        if (result==1)
            return "OK";
        return "客户地址注册失败请联系管理员";
    }

    @Override
    public String insertCustomerConsignmentService(JSONObject customerConsignment) {
        CustomerConsignment c = new CustomerConsignment();
        String coId = UUID.randomUUID().toString();
        String coCid = customerConsignment.getString("co_cid");
        String coName = customerConsignment.getString("co_name");
        String coPhone = customerConsignment.getString("co_phone");
        String coDepartment = customerConsignment.getString("co_department");
        String coDate = String.valueOf(new Date().getTime());
        Integer aCount = 0;
        if(coCid==null||!DataMethod.checkIds(coCid))
            return "客户id有误";
        else if(coName==null||!DataMethod.checkName(coName))
            return "姓名只能为汉字";
        else if (coPhone==null||!DataMethod.checkTelephone(coPhone))
            return "手机号码必须为数字";
        else if (coDepartment==null||!DataMethod.checkSZH(coDepartment,256))
            return "地址只能为英文字符和汉字";

        c.setCo_id(coId);
        c.setCo_cid(coCid);
        c.setCo_name(coName);
        c.setCo_phone(coPhone);
        c.setCo_department(coDepartment);
        c.setCo_date(coDate);
        c.setCo_count(aCount);
        int result = customerConsignmentMapper.insertCustomerConsignment(c);

        if (result==1)
            return "OK";
        return "客户地址注册失败请联系管理员";
    }

}
