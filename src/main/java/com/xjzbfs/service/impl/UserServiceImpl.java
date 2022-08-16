package com.xjzbfs.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.mapper.*;
import com.xjzbfs.pojo.*;
import com.xjzbfs.tools.DaoIf;
import com.xjzbfs.tools.DataMethod;
import com.xjzbfs.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    UserMapper userMapper;
    @Resource
    GoodsOrderMapper goodsOrderMapper;
    @Resource
    CustomerMapper customerMapper;
    @Resource
    GoodsMapper goodsMapper;
    @Resource
    StockMapper stockMapper;
    @Resource
    MySessionMapper mySessionMapper;
    @Resource
    CustomerAddressMapper customerAddressMapper;
    @Resource
    WorkShopMapper workShopMapper;
    @Resource
    OrderGoodsMapper orderGoodsMapper;

    @Value("${register.super.code}")
    private String superCheckCode;

    @Value("${register.normal.code}")
    private String normalCheckCode;
    @Override
    public String registerUserService(JSONObject user) {
        User u = new User();
        String uId = UUID.randomUUID().toString();
        String uName = user.getString("u_name");
        String uPhone = user.getString("u_phone");
        String uPassward = user.getString("u_password");
        String uAdmin = user.getString("u_admin");
        String uDate = String.valueOf(new Date().getTime());
        String uTname = user.getString("u_tname");
        String checkCode = user.getString("checkCode");

        if(uName==null||!DataMethod.checkUsername(uName)) {
            return "用户名必须以字母开头,只能包括 字母 , 下划线 , 数字长度必须在6 到 16 之间";
        }else if(uPhone==null||!DataMethod.checkTelephone(uPhone)) {
            return "手机号格式有误";
        }else if(uPassward==null||!DataMethod.checkPassword(uPassward)) {
            return "密码验证要大于6小于16位";
        }else if(uAdmin==null||!DataMethod.isNumeric(uAdmin)&&uAdmin.length()!=1) {
            return "账户类型有误";
        }else if (uTname==null||!DataMethod.checkName(uTname)) {
            return "真实姓名格式有误";
        }else if ("0".equals(uAdmin) && !normalCheckCode.equals(checkCode)){
            return "校验码有误";
        } else if ("1".equals(uAdmin) && !superCheckCode.equals(checkCode)) {
            return "校验码有误";
        } else if(userMapper.searchUserByName(uName)!=null) {
            return "用户名已被注册";
        }else if (userMapper.searchUserByPhone(uPhone)!=null) {
            return "手机号已被注册";
        }

        String MD5Passward = DataMethod.generate(uPassward);
        u.setU_id(uId);
        u.setU_name(uName);
        u.setU_phone(uPhone);
        u.setU_password(MD5Passward);
        u.setU_admin(Integer.parseInt(uAdmin));
        u.setU_date(uDate);
        u.setU_tname(uTname);
        MySession mySession = new MySession();
        mySession.setUser_id(uId);
        mySession.setUser_type(0);
        int result = userMapper.registerUser(u);
        result+= mySessionMapper.insertSession(mySession);
        if(result==2)
            return "OK";
        else
            return "注册失败请联系管理员";
    }

    @Override
    public String searchUserByIdService(String uid) {
        User result = userMapper.searchUserById(uid);
        return JSON.toJSONString(result);
    }

    @Override
    public String getAllUserService() {
        List<User> users = userMapper.getAllUsers();
        return JSON.toJSONString(users);
    }

    @Override
    public String updateUserDateService(String uid,String loginDate) {
        if(searchUserByIdService(uid)==null)
            return "用户不存在";

        int result = userMapper.updateUserDateById(uid,loginDate);

        if(result!=1)
            return "fail";

        return "ok";

    }

    @Override
    public String userSignInService(JSONObject user){
        User user1 = new User();
        if(user.get("u_name")!=null||!DataMethod.checkSZH(user.get("u_name").toString(),20)) {
            user1 = userMapper.searchUserByName(user.getString("u_name"));
            if (user1==null)
                return "用户名或密码错误";
            if(user.get("u_password")==null||!DataMethod.verify(user.getString("u_password"),user1.getU_password()))
                return "用户名或密码错误";
        }
        MySession mySession = new MySession();
        mySession.setCreate_time(String.valueOf(new Date().getTime()));
        mySession.setSessionId(user.getString("sessionId"));
        mySession.setUser_id(user1.getU_id());
        userMapper.updateUserDateById(user1.getU_id(),String.valueOf(new Date().getTime()));
        mySessionMapper.updateSessionByUid(mySession);
        JSONObject result = JSONObject.parseObject(JSON.toJSONString(user1));
        Map<String,String> month = DataMethod.getNowMonthEndAndStart();
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getGoodOrdersByThisMonth(month.get("Start"),month.get("End"));
        BigDecimal fl = new BigDecimal("0.00");
        BigDecimal fs = new BigDecimal("0.00");
        BigDecimal wg = new BigDecimal("0.00");
        for (int i=0;i<goodsOrders.size();i++) {
            if (goodsOrders.get(i).getO_ptype()==0) {
                fl =  fl.add(goodsOrders.get(i).getO_price());
            }
            if (goodsOrders.get(i).getO_ptype()==1) {
                fs = fs.add(goodsOrders.get(i).getO_price());
            }
            if (goodsOrders.get(i).getO_ptype()==2) {
                wg = wg.add(goodsOrders.get(i).getO_price());
            }
        }
        result.put("fl",fl.toString());
        result.put("fs",fs.toString());
        result.put("wg",wg.toString());
        return JSON.toJSONString(result);
    }

    @Transactional
    @Override
    public String insertGoodsOrderService(JSONObject goodsOrder) {
        GoodsOrder g = new GoodsOrder();
        String oId = UUID.randomUUID().toString();
        String oMaketime = String.valueOf(new Date().getTime());
        String oDate = goodsOrder.getString("o_date");

        String oGids[] = goodsOrder.getString("o_gid").replaceAll("[\\[\\]\\,]", "").split(" ");
        String oCounts[] = goodsOrder.getString("o_count").replaceAll("[\\[\\]\\,]", "").split(" ");
        Integer oCount = new Integer(0);

        for (int i=0;i<oCounts.length;i++) {
            oCount+=Integer.parseInt(oCounts[i]);
        }

        Map<String,String> map = DaoIf.mergeOgIdAndOgCount(oGids,oCounts);


        if (!DataMethod.checkIds("o_cid")||customerMapper.searchCustomerById(goodsOrder.getString("o_cid"))==null){
            return "客户id有误";
        }

        String oCode = DataMethod.toOrderCode(oDate,oId,goodsOrder.getString("o_cid"));
        String oCid = goodsOrder.getString("o_cid");
        String oPtype = goodsOrder.getString("o_ptype");
        String oOtype = goodsOrder.getString("o_otype");
        String oDeadline = goodsOrder.getString("o_deadline");
        String oPayType = goodsOrder.getString("o_pay_type");
        Integer oPrintCount = 0;
        Integer oStatus = 0;
        Integer oReview = 1;
        String oPrice = goodsOrder.getString("o_price");
        Integer oDeliver = 0;
        String oIsinvoice = goodsOrder.getString("o_isinvoice");
        String oMuid = goodsOrder.getString("o_muid");
        String oMname = goodsOrder.getString("o_mname");
        String oAddress = goodsOrder.getString("o_address");
        String oWId = goodsOrder.getString("o_wid");
        String oRemarks = goodsOrder.getString("o_remarks");
        if(oPtype==null||!oPtype.equals("0")&&!oPtype.equals("1")&&!oPtype.equals("2"))
            return "订单生产类型出错";
        else if (oOtype==null||!oOtype.equals("0")&&!oOtype.equals("1"))
            return "订单类型出错";
        else if (oDeadline==null||oDeadline.length()!=13&&!DataMethod.isNumeric(oDeadline))
            return "订单截至日期出错";
        else if (oPayType==null||!oPayType.equals("0")&&!oPayType.equals("1"))
            return "付款类型出错";
        else if (oPrice==null||oPrice.length()>9&&!DataMethod.isNumeric(oPrice))
            return "订单金额出错";
        else if (oIsinvoice==null||!oIsinvoice.equals("0")&&!oIsinvoice.equals("1"))
            return "是否开具发票出错";
        else if (oMuid==null||!DataMethod.checkIds(oMuid))
            return "制单人id出错";
        else if (oMname==null||!DataMethod.checkName(oMname))
            return "制单人姓名有误";
        else if (oCid==null||!DataMethod.checkIds(oCid))
            return "客户id有误";
        else if (oAddress==null||!DataMethod.checkSZH(oAddress,256))
            return "订单地址有误";
        else if (oDate==null||!DataMethod.isNumeric(oDate)&&oDate.length()>13)
            return "订单日期有误";
        else if (!oWId.equals("-1")&&DataMethod.checkIds(oWId)) {
            g.setO_wid(oWId);
        }else if (!DataMethod.checkSZH(oRemarks,255)) {
            return "订单备注应大于1小于200字";
        }
        if (oOtype.equals("1"))     //如果是外购订单，则不需要制作,直接进入审核阶段
            oReview = 3;


        g.setO_id(oId);
        g.setO_date(oDate);
        g.setO_code(oCode);
        g.setO_cid(oCid);
        g.setO_ptype(Integer.parseInt(oPtype));
        g.setO_otype(Integer.parseInt(oOtype));
        g.setO_deadline(oDeadline);
        g.setO_pay_type(Integer.parseInt(oPayType));
        g.setO_print_count(oPrintCount);
        g.setO_status(oStatus);
        g.setO_review(oReview);
        g.setO_price(new BigDecimal(oPrice));
        g.setO_deliver(oDeliver);
        g.setO_count(oCount);
        g.setO_isinvoice(Integer.parseInt(oIsinvoice));
        g.setO_muid(oMuid);
        g.setO_mname(oMname);
        g.setO_address(oAddress);
        g.setO_mtime(oMaketime);
        g.setO_remarks(oRemarks);
        int resultOrder = goodsOrderMapper.insertGoodsOrders(g);

        //添加商品到订单物品表
        Iterator<String> iter = map.keySet().iterator();
        while(iter.hasNext()){
            OrderGoods orderGoods = new OrderGoods();
            String ogId = UUID.randomUUID().toString();
            orderGoods.setOg_id(ogId);
            orderGoods.setOg_oid(oId);
            String key=iter.next();
            String value = map.get(key);
            orderGoods.setOg_gid(key);
            orderGoods.setOg_count(value);
            resultOrder+=orderGoodsMapper.insertOrderGoods(orderGoods);
        }

        if (resultOrder<2)
            return "插入订单失败";
        else
            return "OK";
    }

    @Override
    public String getFinishMakeOrderService() {
        final String o_otype = "0";
        final String o_review = "3";
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getAllOrdersIsNullTime(o_review,o_otype);

        if(goodsOrders.size()==0)
            return "empty";

        return JSON.toJSONString(goodsOrders);
    }

    @Transactional
    @Override
    public String finishArrangementOrderService(JSONObject arrMes) {
        String oAuid = arrMes.getString("o_auid");
        String oAuname = arrMes.getString("o_auname");
        String oAutime = arrMes.getString("o_autime");
        String oReview = arrMes.getString("o_review");
        String oId = arrMes.getString("o_id");

        if(oAuid==null||!DataMethod.checkIds(oAuid)&&userMapper.searchUserById(oAuid)==null)
            return "整理人id有误";
        else if (oAuname==null||!DataMethod.checkName(oAuname))
            return "姓名格式有误";
        else if (oId==null||!DataMethod.checkIds(oId))
            return "订单id有误";
        else if (StringUtils.isEmpty(oAutime)||oAutime.length()!=13&&!DataMethod.isNumeric(oAutime)) {
            return "时间有误";
        }else if (StringUtils.isEmpty(oReview)||!"4".equals(oReview)) {
            return "进度有误";
        }

        int result = goodsOrderMapper.finishCheckOrder(oAuid,oAuname,oAutime,oId,oReview);

        if (!oReview.equals("4")&&result==1)
            return "OK";

        List<OrderGoods> orderGoods = orderGoodsMapper.getOrderGoodsByOId(oId);

        for (int i=0;i<orderGoods.size();i++) {
            Stock stock = new Stock();
            String sId = UUID.randomUUID().toString();
            String sGid = orderGoods.get(i).getOg_gid();
            stock.setS_id(sId);
            stock.setS_gid(sGid);
            stock.setS_oid(oId);
            stock.setS_idate(oAutime);
            stock.setS_status(0);
            result+= stockMapper.insertStock(stock);
        }
         if (result<2)
             return "库存写入失败";
         return "OK";

    }

    @Override
    public List<GoodsOrder> getAllSimpleOrderService() {
        final String o_review = "3";
        final String o_otype = "1";
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getAllOrdersIsNullTime(o_review,o_otype);
        return goodsOrders;
    }

    @Override
    public List<GoodsOrder> getAllConfirmOrdersService() {
        final String o_review = "3";
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getAllConfirmOrders(o_review);
        return goodsOrders;
    }

    @Override
    public String settlementOrderService(JSONObject jsonObject) {
        String oId = jsonObject.getString("o_id");
        String oAeid = jsonObject.getString("o_aeid");
        String oAetime = jsonObject.getString("o_aetime");
        String oAename = jsonObject.getString("o_aename");
        String sDate = String.valueOf(new Date().getTime());
        String sStatus = "1";
        GoodsOrder goodsOrder = new GoodsOrder();
        final Integer oReview = 5;
        int result = 0;
        if (oId==null||!DataMethod.checkIds(oId))
            return "订单id有误";
        else if (oAeid==null||!DataMethod.checkIds(oAeid))
            return "结算人id有误";
        else if (oAetime==null||DataMethod.isNumeric(oAetime)&&oAename.length()>14)
            return "结算时间有误";
        else if (oAename==null||DataMethod.checkName(oAename))
            return "结算人姓名有误";

        GoodsOrder g = goodsOrderMapper.searchGoodsOrderById(oId);
        if (g.getO_invoice()!=null){
            String oInvoice = jsonObject.getString("o_invoice");
            if (oInvoice==null||oInvoice.length()!=8&&oInvoice.length()!=10)
                return "发票号有误";

            goodsOrder.setO_id(oId);
            goodsOrder.setO_aeid(oAeid);
            goodsOrder.setO_aename(oAename);
            goodsOrder.setO_aetime(oAetime);
            goodsOrder.setO_review(oReview);
            goodsOrder.setO_invoice(oInvoice);

            result += goodsOrderMapper.updateSettlementOrder(goodsOrder);
        }else {
            goodsOrder.setO_id(oId);
            goodsOrder.setO_aeid(oAeid);
            goodsOrder.setO_aename(oAename);
            goodsOrder.setO_aetime(oAetime);
            goodsOrder.setO_review(oReview);
            result += goodsOrderMapper.updateSettlementOrderWithout(goodsOrder);
        }
        result += stockMapper.updateOutStock(oId,sDate,sStatus);

        if (result!=3)
            return "结算失败";

        return "结算成功";
    }

    @Override
    public String insertGoodsService(JSONObject goods) {
        //插入商品到数据库
        String gId = UUID.randomUUID().toString();
        String gName = goods.getString("g_name");
        String gCid = goods.getString("g_cid");
        String gProduction = goods.getString("g_production");
        String gSize = goods.getString("g_size");
        String gCsize = goods.getString("g_csize");
        String gPsize = goods.getString("g_psize");
        String gSpecifications = goods.getString("g_specifications");
        String gUnit = goods.getString("g_unit");
        String gPrice = goods.getString("g_price");
        String gType = goods.getString("g_type");
        String gExplain = goods.getString("g_explain");

        if(gName==null||!DataMethod.checkSZH(gName,128))
            return "商品名称有误";
        else if (gSpecifications==null||!DataMethod.checkSZH(gSpecifications,256))
            return "产品规格有误";
        else if (gUnit==null||!DataMethod.checkSZH(gUnit,16))
            return "产品单位有误";
        else if (gPrice==null||!DataMethod.isNumeric(gPrice)&&gPrice.length()>9)
            return "产品单价有误";
        else if (gType==null||!DataMethod.checkSZH(gType,16))
            return "产品类型有误";
        Goods g = new Goods();
        if (gId!=null)
            g.setG_id(gId);
        if (gCid!=null)
            g.setG_cid(gCid);
        if (gName!=null)
            g.setG_name(gName);
        if (gProduction!=null)
            g.setG_production(gProduction);
        if (gSize!=null)
            g.setG_size(gSize);
        if (gCsize!=null)
            g.setG_csize(gCsize);
        if (gPsize!=null)
            g.setG_psize(gPsize);
        if (gSpecifications!=null)
            g.setG_specifications(gSpecifications);
        if (gUnit!=null)
            g.setG_unit(gUnit);
        if (gId!=null)
            g.setG_price(new BigDecimal(gPrice));
        if (gType!=null)
            g.setG_type(gType);
        if (gExplain!=null)
            g.setG_explain(gExplain);

        int resultGoods = goodsMapper.insertGoods(g);
        if (resultGoods==1)
            return "OK";
        else
            return "插入订单失败";
    }

    @Override
    public JSONArray getAllClothesOrClothGoodsService() {
        String gType1 = "0";
        String gType2 = "1";
        JSONArray jsonArray = new JSONArray();
        List<Goods> g = goodsMapper.getAllClothesOrClothGoods(gType1,gType2);
        if (g.size()==0)
            return new JSONArray();
        for (int i=0;i<g.size();i++) {
            Customer c = customerMapper.searchCustomerById(g.get(i).getG_cid());
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("c_company",c.getC_company());
            jsonObject.put("g_id",g.get(i).getG_id());
            jsonObject.put("g_cid",g.get(i).getG_cid());
            jsonObject.put("g_name",g.get(i).getG_name());
            jsonObject.put("g_production",g.get(i).getG_production());
            jsonObject.put("g_size",g.get(i).getG_size());
            jsonObject.put("g_csize",g.get(i).getG_csize());
            jsonObject.put("g_psize",g.get(i).getG_psize());
            jsonObject.put("g_specifications",g.get(i).getG_specifications());
            jsonObject.put("g_unit",g.get(i).getG_unit());
            jsonObject.put("g_price",g.get(i).getG_price());
            jsonObject.put("g_type",g.get(i).getG_type());
            jsonObject.put("g_explain",g.get(i).getG_explain());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    @Override
    public JSONArray getClothesOrClothGoodsByVCNameService(String gName) {
        List<Customer> customers = customerMapper.searchCustomerVagueCCompany(gName);
        if (customers.size()==0)
            return new JSONArray();
        JSONArray jsonArray = new JSONArray();
        for (int i=0;i<customers.size();i++) {
            String c_id = customers.get(i).getC_id();
            List<Goods> g = goodsMapper.searchGoodsByCId(c_id);
            for (int j=0;j<g.size();j++) {
                if (g.size()==0)
                    continue;
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("c_company",customers.get(i).getC_company());
                jsonObject.put("g_id",g.get(i).getG_id());
                jsonObject.put("g_cid",g.get(i).getG_cid());
                jsonObject.put("g_name",g.get(i).getG_name());
                jsonObject.put("g_production",g.get(i).getG_production());
                jsonObject.put("g_size",g.get(i).getG_size());
                jsonObject.put("g_csize",g.get(i).getG_csize());
                jsonObject.put("g_psize",g.get(i).getG_psize());
                jsonObject.put("g_specifications",g.get(i).getG_specifications());
                jsonObject.put("g_unit",g.get(i).getG_unit());
                jsonObject.put("g_price",g.get(i).getG_price());
                jsonObject.put("g_type",g.get(i).getG_type());
                jsonObject.put("g_explain",g.get(i).getG_explain());
                jsonArray.add(jsonObject);
            }
        }

        if (jsonArray.size()==0)
            return new JSONArray();

        return jsonArray;
    }

    @Override
    public List<Goods> getAllBuyGoodsService() {
        String gType = "2";
        List<Goods> goods = goodsMapper.getAllBuyGoods(gType);
        return goods;
    }

    @Override
    public List<Goods> getBuyGoodsByVName(String gName) {
        String gType = "2";
        if (gName==null||gName.length()==0||gName.length()>50)
            return new LinkedList<Goods>();
        List<Goods> goods = goodsMapper.getBuyGoodsByVGName(gType,gName);
        return goods;
    }

    @Override
    public List<Goods> getGoodsAllBuyAndClothesBuyCIdService(String c_id) {
        String buyGoodType = "2";
        List<Goods> BuyGoods = goodsMapper.getAllBuyGoods(buyGoodType);
        List<Goods> allGoods = goodsMapper.searchGoodsByCId(c_id);
        allGoods.addAll(BuyGoods);
        return allGoods;
    }

    @Override
    public List<GoodsOrder> getAllOrdersByCustomerIdService(String o_cid) {
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getAllOrdersByCustomerId(o_cid);
        return goodsOrders;
    }

    /**
     * 通过月份获取用户订单
     * @param o_cid
     * @param date
     * @return
     */
    @Override
    public List<GoodsOrder> getDateOrdersByCustomerIdService(String o_cid, String date) {
        Map<String,String> time = DataMethod.toEndAndStartMonth(date);
        if (StringUtils.isBlank(o_cid)||!DataMethod.checkIds(o_cid))
            return new LinkedList<>();
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getGoodOrdersByTimes(time.get("Start"),time.get("End"),o_cid);
        if (goodsOrders.size()==0)
            return new LinkedList<>();
        return goodsOrders;
    }

    /**
     * 通过订单id获取订单详细信息包括客户，地址以及物品
     * @param o_id
     * @return
     */
    @Override
    public JSONObject getOrderDetailByOId(String o_id) {
        String oId = o_id;
        GoodsOrder goodsOrder = goodsOrderMapper.searchGoodsOrderById(o_id);
        if (o_id==null||!DataMethod.checkIds(o_id)||goodsOrder==null)
            return new JSONObject();

        Customer customer = customerMapper.searchCustomerById(goodsOrder.getO_cid());
        CustomerAddress customerAddress = customerAddressMapper.getCustomerAddressesByAId(goodsOrder.getO_address());
        List<OrderGoods> orderGoods = orderGoodsMapper.getOrderGoodsByOId(o_id);
        List<Goods> goods = new ArrayList<Goods>();

        for (int i=0;i<orderGoods.size();i++) {
            goods.add(goodsMapper.searchGoodById(orderGoods.get(i).getOg_gid()));
        }

        JSONObject result = new JSONObject();
        if (goodsOrder.getO_wid()!=null) {
            WorkShop workShop = workShopMapper.searchWorkShopById(goodsOrder.getO_wid());
            result.put("workShop",workShop);
        }

        if (goodsOrder.getO_review()==5) {
            List<Stock> stocks = stockMapper.getStockByOId(oId);
            result.put("stocks",stocks);
        }

        result.put("orderGoods",orderGoods);
        result.put("goodsOrder",goodsOrder);
        result.put("customer",customer);
        result.put("customerAddress",customerAddress);
        result.put("goods",goods);
        return result;
    }


    /**
     * 通过订单code获取订单详细信息包括客户，地址以及物品
     * @param o_code
     * @return
     */
    @Override
    public JSONObject getOrderDetailByOCodeService(String o_code) {
        String oCode = o_code;
        GoodsOrder goodsOrder = goodsOrderMapper.getGoodOrderByOCode(oCode);

        if (o_code==null||!DataMethod.checkIds(o_code)||goodsOrder==null)
            return new JSONObject();

        Customer customer = customerMapper.searchCustomerById(goodsOrder.getO_cid());
        CustomerAddress customerAddress = customerAddressMapper.getCustomerAddressesByAId(goodsOrder.getO_address());
        Goods goods = goodsMapper.searchGoodById(goodsOrder.getO_gid());
        JSONObject result = new JSONObject();
        if (goodsOrder.getO_wid()!=null) {
            WorkShop workShop = workShopMapper.searchWorkShopById(goodsOrder.getO_wid());
            result.put("workShop",workShop);
        }

        if (goodsOrder.getO_review()==5) {
            List<Stock> stocks = stockMapper.getStockByOId(goodsOrder.getO_id());
            result.put("stocks",stocks);
        }

        result.put("goodsOrder",goodsOrder);
        result.put("customer",customer);
        result.put("customerAddress",customerAddress);
        result.put("goods",goods);
        return result;
    }

    @Override
    public JSONArray getAllNeedStockService(String o_ptype) {
        List<Stock> stocks = stockMapper.getAllStock();

        if (stocks.size()==0)
            return new JSONArray();

        JSONArray result = new JSONArray();

        for (int i=0;i<stocks.size();i++) {
            JSONObject stock = new JSONObject();
            GoodsOrder goodsOrder = goodsOrderMapper.searchGoodsOrderById(stocks.get(i).getS_oid());
            if (goodsOrder.getO_ptype()==Integer.parseInt(o_ptype)) {
                Customer customer = customerMapper.searchCustomerById(goodsOrder.getO_cid());
                Goods goods = goodsMapper.searchGoodById(stocks.get(i).getS_gid());
                stock.put("s_ocode",goodsOrder.getO_code());
                stock.put("s_customer",customer.getC_company());
                stock.put("s_name",goods.getG_name());
                stock.put("s_specifications",goods.getG_specifications());
                stock.put("s_unit",goods.getG_unit());
                stock.put("s_price",goods.getG_price());
                stock.put("s_count",goodsOrder.getO_count());
                result.add(stock);
            }else if ("-1".equals(o_ptype)) {
                Customer customer = customerMapper.searchCustomerById(goodsOrder.getO_cid());
                Goods goods = goodsMapper.searchGoodById(stocks.get(i).getS_gid());
                stock.put("s_ocode",goodsOrder.getO_code());
                stock.put("s_customer",customer.getC_company());
                stock.put("s_name",goods.getG_name());
                stock.put("s_specifications",goods.getG_specifications());
                stock.put("s_unit",goods.getG_unit());
                stock.put("s_price",goods.getG_price());
                stock.put("s_count",goodsOrder.getO_count());
                result.add(stock);
            }
        }
        return result;
    }

    @Override
    public JSONArray getAllWorkUserService() {
        List<User> users = userMapper.getAllUsers();
        List<WorkShop> workShops = workShopMapper.getAllWorkShop();

        if (workShops.size()==0&&users.size()==0) {
            return new JSONArray();
        }

        JSONArray result = new JSONArray();
        for (int i=0;i<users.size();i++) {
            JSONObject temp = new JSONObject();
            temp.put("id",users.get(i).getU_id());
            temp.put("name",users.get(i).getU_name());
            temp.put("admin",users.get(i).getU_admin());
            temp.put("tname",users.get(i).getU_tname());
            temp.put("type","2");
            result.add(temp);
        }

        for (int i=0;i<workShops.size();i++) {
            JSONObject temp = new JSONObject();
            temp.put("id",workShops.get(i).getW_id());
            temp.put("name",workShops.get(i).getW_account());
            temp.put("admin","");
            temp.put("tname",workShops.get(i).getW_name());
            temp.put("type",workShops.get(i).getW_type());
            result.add(temp);
        }

        return result;
    }

    @Transactional
    @Override
    public String deleteOrderAndStockService(String o_id,String u_id) {
        User user = userMapper.searchUserById(u_id);
        if (user==null) {
            return "失败";
        }

        GoodsOrder goodsOrder = goodsOrderMapper.searchGoodsOrderById(o_id);
        int result = 0;
        if (goodsOrder.getO_review()<4) {
            result+= goodsOrderMapper.deleteOrderByOId(o_id);
        }else {
            result+= goodsOrderMapper.deleteOrderByOId(o_id);
            result+=stockMapper.deleteStockBySOid(o_id);
            result+=orderGoodsMapper.deleteOrderGoods(o_id);
        }

        if (result<3&&result!=1) {
            return "失败";
        }
        return "OK";
    }

    @Override
    public JSONArray getAllGoodsAndCompanyNameService() {
        List<Goods> goods = goodsMapper.getAllGoods();
        JSONArray result = new JSONArray();
        if (goods.size()==0)
            return result;

        for (int i=0;i<goods.size();i++) {
            JSONObject jsonObject = new JSONObject();
            if (goods.get(i).getG_cid()!=null) {
                Customer customer = customerMapper.searchCustomerById(goods.get(i).getG_cid());
                jsonObject.put("c_id",customer.getC_id());
                jsonObject.put("c_company",customer.getC_company());
            }
            jsonObject.put("g_id",goods.get(i).getG_id());
            jsonObject.put("g_code",goods.get(i).getG_explain());
            jsonObject.put("g_name",goods.get(i).getG_name());
            if (!jsonObject.containsKey("c_company"))
                jsonObject.put("c_company","公共共享");
            jsonObject.put("g_type",goods.get(i).getG_type());
            result.add(jsonObject);
        }
        return result;
    }

    @Override
    public String deleteGoodsByGIdService(String g_id) {
        if (StringUtils.isBlank(g_id)||!DataMethod.checkIds(g_id)) {
            return "产品id有误";
        }
        int result = goodsMapper.deleteGoodsByGId(g_id);

        if (result!=1)
            return "删除失败";
        return  "OK";
    }

    @Override
    public JSONArray getVGoodsAndCompanyNameService(String g_name) {
        List<Goods> goods = goodsMapper.getGoodsByVName(g_name);
        JSONArray result = new JSONArray();
        if (goods.size()==0)
            return result;

        for (int i=0;i<goods.size();i++) {
            JSONObject jsonObject = new JSONObject();
            if (goods.get(i).getG_cid()!=null) {
                Customer customer = customerMapper.searchCustomerById(goods.get(i).getG_cid());
                jsonObject.put("c_id",customer.getC_id());
                jsonObject.put("c_company",customer.getC_company());
            }
            jsonObject.put("g_id",goods.get(i).getG_id());
            jsonObject.put("g_code",goods.get(i).getG_explain());
            jsonObject.put("g_name",goods.get(i).getG_name());
            if (!jsonObject.containsKey("c_company"))
                jsonObject.put("c_company","公共共享");
            jsonObject.put("g_type",goods.get(i).getG_type());
            result.add(jsonObject);
        }
        return result;
    }

    @Override
    public JSONObject getEditDetailGoodsService(String g_id) {
        if (StringUtils.isBlank(g_id)||!DataMethod.checkIds(g_id)) {
            return new JSONObject();
        }
        Goods goods = goodsMapper.searchGoodById(g_id);
        JSONObject result = new JSONObject();
        if (goods.getG_cid()!=null) {
            result.put("g_id",g_id);
            result.put("g_cid",goods.getG_cid());
            result.put("g_name",goods.getG_name());
            result.put("g_production",goods.getG_production());
            result.put("g_size",goods.getG_size());
            result.put("g_csize",goods.getG_csize());
            result.put("g_psize",goods.getG_psize());
            result.put("g_specifications",goods.getG_specifications());
            result.put("g_unit",goods.getG_unit());
            result.put("g_price",goods.getG_price());
            result.put("g_type",goods.getG_type());
            result.put("g_explain",goods.getG_explain());
        }else  {
            result.put("g_id",g_id);
            result.put("g_cid",goods.getG_cid());
            result.put("g_name",goods.getG_name());
            result.put("g_size",goods.getG_size());
            result.put("g_csize",goods.getG_csize());
            result.put("g_psize",goods.getG_psize());
            result.put("g_specifications",goods.getG_specifications());
            result.put("g_unit",goods.getG_unit());
            result.put("g_price",goods.getG_price());
            result.put("g_type",goods.getG_type());
            result.put("g_explain",goods.getG_explain());
        }
        return result;
    }

    @Override
    public String updateGoodsDetail(JSONObject goods) {
        Goods g = new Goods();
        if (StringUtils.isBlank(goods.getString("g_price"))||!DataMethod.checkMoney(goods.getString("g_price"))) {
            return "订单金额有误";
        }

        g.setG_csize(goods.getString("g_csize"));
        g.setG_size(goods.getString("g_size"));
        g.setG_psize(goods.getString("g_psize"));
        g.setG_explain(goods.getString("g_explain"));
        g.setG_id(goods.getString("g_id"));
        g.setG_name(goods.getString("g_name"));
        g.setG_price(new BigDecimal(goods.getString("g_price")));
        g.setG_production(goods.getString("g_production"));
        g.setG_specifications(goods.getString("g_specifications"));
        g.setG_unit(goods.getString("g_unit"));

        int result = goodsMapper.updateGoodsByGid(g);

        if (result==1) {
            return "OK";
        }

        return "产品更新失败";
    }

    @Override
    public JSONArray getWillCheckGoodsOrdersByUIdService(String o_wid, String o_review) {
        List<GoodsOrder> goodsOrders = goodsOrderMapper.getWillCheckGoodsOrdersByUId(o_wid,o_review);
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
            g.put("o_price",goodsOrders.get(i).getO_price());
            if (goodsOrders.get(i).getO_otype().equals(0)) {
                g.put("o_wname",workShopMapper.searchWorkShopById(goodsOrders.get(i).getO_wid()).getW_name());
            }else {
                g.put("o_wname","无");
            }
            jsonArray.add(g);
        }
        return jsonArray;
    }

    @Override
    @Transactional
    public String updateOutOrderService(JSONObject jsonObject) {
        String o_review = "5";
        String s_status = "1";
        String o_deliver = "1";
        if (StringUtils.isBlank(jsonObject.getString("o_oname")) || !DataMethod.checkName(jsonObject.getString("o_oname")))
            return "出库制单人格式有误";
        else if (StringUtils.isBlank(jsonObject.getString("o_courier")) || !DataMethod.checkName(jsonObject.getString("o_courier")))
            return "送货人格式有误";

        String o_price = "";
        if (!StringUtils.isBlank(jsonObject.getString("o_price")) && DataMethod.checkMoney(jsonObject.getString("o_price"))) {
            o_price = jsonObject.getString("o_price");
        }

        int result = goodsOrderMapper.updateOutOrderByOId(jsonObject.getString("o_id"), jsonObject.getString("o_oname"),
                jsonObject.getString("o_otime"), jsonObject.getString("o_oid"), jsonObject.getString("o_courier"),
                o_review,o_deliver);

        result += stockMapper.updateOutStock(jsonObject.getString("o_id"), jsonObject.getString("s_odate"), s_status);

        if (o_price.length() != 0) {
            int or = 0;
            or = goodsOrderMapper.updateOrderOPriceByOId(jsonObject.getString("o_id"),o_price);
            if (or == 0)
                return "金额写入失败,请联系管理员";
        }

        if (result < 2)
            return "写入失败";

        return "OK";
    }

    @Override
    public String updateSettlementOrderByOIdService(JSONObject settlementMessage) {
        String o_review = "6";
        if (StringUtils.isBlank(settlementMessage.getString("o_aename"))||!DataMethod.checkName(settlementMessage.getString("o_aename")))
            return "结算人姓名格式有误";
        else if (settlementMessage.getString("o_isinvoice").equals("0")) {
            if (StringUtils.isBlank(settlementMessage.getString("o_invoice"))||settlementMessage.getString("o_invoice").length()>12)
                return "发票格式有误";
        }

        System.out.println(settlementMessage);

        if (settlementMessage.getString("o_isinvoice").equals("0")) {
            int ir = 0;
            ir = goodsOrderMapper.updateInvoiceByOId(settlementMessage.getString("o_id"), settlementMessage.getString("o_invoice"), settlementMessage.getString("o_isinvoice"));
            if (ir==0)
                return "发票号写入失败";
        }

        int result = goodsOrderMapper.updateSettlementOrderByOId(settlementMessage.getString("o_id"),
                settlementMessage.getString("o_aetime"),settlementMessage.getString("o_aeid"),
                settlementMessage.getString("o_aename"),o_review);

        if (result==1)
            return "OK";

        return "订单更新失败请联系管理员";
    }

}
