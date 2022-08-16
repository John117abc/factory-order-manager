package com.xjzbfs.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.mapper.CustomerMapper;
import com.xjzbfs.mapper.GoodsMapper;
import com.xjzbfs.mapper.GoodsOrderMapper;
import com.xjzbfs.mapper.WorkShopMapper;
import com.xjzbfs.pojo.*;
import com.xjzbfs.service.WorkShopService;
import com.xjzbfs.tools.DaoIf;
import com.xjzbfs.tools.DataMethod;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class WorkShopServiceImpl implements WorkShopService {

    @Resource
    GoodsOrderMapper goodsOrderMapper;
    @Resource
    WorkShopMapper workShopMapper;
    @Resource
    GoodsMapper goodsMapper;
    @Resource
    CustomerMapper customerMapper;

    @Value("${register.workshop.code}")
    private String workshopCode;
    @Override
    public String registerWorkShopService(JSONObject workshop) {
        String wId = UUID.randomUUID().toString();
        String wType = workshop.getString("w_type");
        String wAccount = workshop.getString("w_account");
        String wPassword = workshop.getString("w_password");
        String wName = workshop.getString("w_name");
        String checkCode = workshop.getString("checkCode");
        if(!wType.equals("1")&&!wType.equals("0"))
            return "车间类型有错";
        else if (wAccount==null||!DataMethod.checkUsername(wAccount))
            return "用户名必须以字母开头只能包括 字母 , 下划线 , 数字长度必须在6 到 16 之间";
        else if (wPassword==null||!DataMethod.checkPassword(wPassword))
            return "密码验证要大于6小于16位";
        else if (!workshopCode.equals(checkCode))
            return "校验码有误";
        else if (workShopMapper.searchWorkShopByName(wAccount)!=null)
            return "用户名已被注册";
        else if (wName==null||!DataMethod.checkSZH(wName,32))
            return "车间名称有误";

        wPassword = DataMethod.generate(wPassword);

        WorkShop workShop = new WorkShop();

        workShop.setW_id(wId);
        workShop.setW_type(Integer.parseInt(wType));
        workShop.setW_account(wAccount);
        workShop.setW_password(wPassword);
        workShop.setW_count(0);
        workShop.setW_name(wName);
        int result = workShopMapper.registerWorkShop(workShop);
        if(result!=1)
            return "注册失败";

        return "OK";

    }

    @Override
    public String signInWorkshopService(JSONObject workshop) {
        String wAccount = workshop.getString("w_account");
        String wPassword = workshop.getString("w_password");
        if (wAccount==null||!DataMethod.checkUsername(wAccount))
            return "用户名格式有误";
        else if (wPassword==null||!DataMethod.checkPassword(wPassword))
            return "密码格式有误";
        WorkShop workShop = workShopMapper.searchWorkShopByName(wAccount);
        if (workShop==null)
            return "用户名或密码错误";

        if(!DataMethod.verify(wPassword,workShop.getW_password()))
            return "用户名或密码错误";

        return JSON.toJSONString(workShop);
    }

    @Override
    public String updateGoodsOrderMakeTimeAndMakerService(JSONObject info) {
        String oId = info.getString("o_id");
        String oEstimate = info.getString("o_estimate");
        String oWid = info.getString("o_wid");
        String oWname = info.getString("o_wname");
        String oWtime = String.valueOf(new Date().getTime());
        Integer oReview = 2;
        if(oId==null|| !DataMethod.checkIds(oId)&&goodsOrderMapper.searchGoodsOrderById(oId)==null)
            return "订单id有误";
        else if (oEstimate==null||oEstimate.length()!=13)
            return "预计时间有误";
        else if (oWid==null||!DataMethod.checkIds(oWid)&&workShopMapper.searchWorkShopById(oWid)==null)
            return "车间id有误";
        else if (oWname==null||!DataMethod.checkName(oWname))
            return "姓名不符合格式";

        GoodsOrder g = goodsOrderMapper.searchGoodsOrderById(oId);

        g.setO_id(oId);
        g.setO_estimate(oEstimate);
        g.setO_wid(oWid);
        g.setO_wname(oWname);
        g.setO_review(oReview);
        g.setO_wtime(oWtime);
        int result = goodsOrderMapper.updateMakeTimeAndMaker(g);

        if(result!=1)
            return "订单更新失败";

        return "OK";
    }

    @Override
    public List<WorkShop> getAllWorkShopService() {
        //需要session判断
        List<WorkShop> workShops = workShopMapper.getAllWorkShop();

        return workShops;
    }

    @Override
    public String getGoodsOrderService(String o_id) {

        if (o_id==null||!DataMethod.checkIds(o_id))
            return "订单id有误";
        GoodsOrder order = goodsOrderMapper.searchGoodsOrderById(o_id);
        Goods goods = goodsMapper.searchGoodByOId(o_id);
        Customer customer = customerMapper.searchCustomerById(order.getO_cid());

        JSONObject goodsorder = new JSONObject();
        goodsorder.put("o_date",order.getO_date());
        goodsorder.put("o_code",order.getO_code());
        goodsorder.put("c_name",customer.getC_name());
        goodsorder.put("o_address",order.getO_address());
        goodsorder.put("o_ptype", DaoIf.getOptype(order.getO_ptype().toString()));
        goodsorder.put("o_otype",DaoIf.getOotype(order.getO_otype().toString()));
        goodsorder.put("o_deadline",DataMethod.stampToDate(order.getO_deadline()));
        goodsorder.put("o_pay_type",DaoIf.getPayType(order.getO_pay_type().toString()));
        goodsorder.put("o_print_count",order.getO_print_count());
        goodsorder.put("o_review",DaoIf.getOreview(order.getO_review().toString()));
        goodsorder.put("g_name",goods.getG_name());
        goodsorder.put("g_production",goods.getG_production());
        goodsorder.put("g_size",goods.getG_size());
        goodsorder.put("g_csize",goods.getG_csize());
        goodsorder.put("g_psize",goods.getG_psize());
        goodsorder.put("g_specifications",goods.getG_specifications());
        goodsorder.put("g_unit",goods.getG_unit());
        goodsorder.put("g_count",order.getO_count());
        goodsorder.put("o_mname",order.getO_mname());
        goodsorder.put("o_mtime",DataMethod.stampToDate(order.getO_mtime()));
        goodsorder.put("o_wname",order.getO_wname());
//        goodsorder.put("o_wtime",DataMethod.stampToDate(order.getO_wtime()));
//        goodsorder.put("o_estimate",DataMethod.stampToDate(order.getO_estimate()));

        return JSON.toJSONString(order);
    }

    @Override
    public String finishProductOrderService(String o_id,String o_wftime) {
        String oId = o_id;
        Integer oReview = 3;

        if (oId==null||!DataMethod.checkIds(oId))
            return "订单id有误";
        else if (o_wftime==null||!DataMethod.isNumeric(o_wftime)&&o_wftime.length()!=13)
            return "完成时间有误";

        int result = goodsOrderMapper.finishProductOrder(oId,o_wftime,oReview);

        if(result!=1)
            return "订单更新失败";

        return "OK";

    }

    @Override
    public String getWillMakeOrderService() {
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getAllOrdersIsNullTime("1","0");
        return JSON.toJSONString(goodsOrders);
    }

    @Override
    public String getGoodsByOidService(String o_id) {
        String oId = o_id;
        if (oId==null||!DataMethod.checkIds(o_id))
            return "订单id有误";

        Goods goods = goodsMapper.searchGoodByOId(oId);

        if (goods==null)
            return "订单id有误";

        return JSON.toJSONString(goods);
    }

    @Override
    public JSONArray getWillMakOrdersByOWIdService(String o_wid,String o_review) {
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getWillMakeGoodsOrdersByOWId(o_wid,o_review);
        if (goodsOrders.size()==0)
            return new JSONArray();

        JSONArray jsonArray = new JSONArray();
        for (int i=0;i<goodsOrders.size();i++) {
            JSONObject g = new JSONObject();
            g.put("o_id",goodsOrders.get(i).getO_id());
            g.put("o_code",goodsOrders.get(i).getO_code());
            g.put("o_deadline",goodsOrders.get(i).getO_deadline());
            g.put("o_count",goodsOrders.get(i).getO_count());
            g.put("g_type",goodsOrders.get(i).getO_ptype());
            jsonArray.add(g);
        }
        return jsonArray;
    }


}
