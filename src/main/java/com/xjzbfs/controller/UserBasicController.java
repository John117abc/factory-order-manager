package com.xjzbfs.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xjzbfs.pojo.Goods;
import com.xjzbfs.pojo.GoodsOrder;
import com.xjzbfs.service.CustomerService;
import com.xjzbfs.service.UserService;
import com.xjzbfs.service.WorkShopService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class UserBasicController {
    @Resource
    UserService userService;
    @Resource
    CustomerService customerService;

    /**
     * 需要修改
     *
     * @param uid
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/user/id")
    public String searchUserBySession(@RequestParam("id") String uid) {
        String result = userService.searchUserByIdService(uid);

        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result != null) {
            successResponce.put("status", "1");
            successResponce.put("sid", "0");
            successResponce.put("uid", "1");
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10007");
        errorResponce.put("error_desc", "用户不存在10007");
        return errorResponce.toJSONString();
    }

    /**
     * 用户注册接口
     *
     * @param jsonObject
     * @return
     */
    @PostMapping("/api/v1.0/xjzbfs/Users/2021/user")
    public String registerUser(@RequestBody JSONObject jsonObject) {
        String result = userService.registerUserService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            successResponce.put("uid", result);
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10008");
        errorResponce.put("error_desc", result+"10008");

        return errorResponce.toJSONString();
    }

    /**
     * 获取所有用户接口
     *
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/users")
    public String getAllUser() {
        String result = userService.getAllUserService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result != null) {
            successResponce.put("status", "1");
            successResponce.put("users", JSONArray.parseArray(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10009");
        errorResponce.put("error_desc", "获取全部用户出错10009");
        return errorResponce.toJSONString();
    }

    /**
     * 用户登录接口
     *
     * @param jsonObject
     * @return
     */
    @PostMapping("/api/v1.0/xjzbfs/Users/2021/user/signin")
    public String userSignIn(@RequestBody JSONObject jsonObject, HttpServletResponse resp, HttpServletRequest req) {
        jsonObject.put("sessionId",req.getSession().getId());
        String result = userService.userSignInService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (!result.equals("用户名或密码错误")) {
            successResponce.put("status", "1");
            successResponce.put("user", JSONObject.parseObject(result));
            req.getSession().setAttribute("u_id",JSON.parseObject(result).getString("u_id"));
            req.getSession().setAttribute("u_admin",JSON.parseObject(result).getString("u_admin"));
            req.getSession().setAttribute("fl",JSON.parseObject(result).getString("fl"));
            req.getSession().setAttribute("fs",JSON.parseObject(result).getString("fs"));
            req.getSession().setAttribute("wg",JSON.parseObject(result).getString("wg"));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10010");
        errorResponce.put("error_desc", result+"10010");
        return errorResponce.toJSONString();
    }

    /**
     * 添加客户信息
     *
     * @param jsonObject
     * @return
     */
    @PostMapping("/api/v1.0/xjzbfs/Customers/2021/customer")
    public String customerInsert(@RequestBody JSONObject jsonObject) {
        String result = customerService.addCustomerService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();

        if (result.equals("OK") != true) {
            errorResponce.put("status", "0");
            errorResponce.put("error_code", "10011");
            errorResponce.put("error_desc", result+"10011");
            return errorResponce.toJSONString();
        }

        successResponce.put("status", "1");
        successResponce.put("customer", result);
        return successResponce.toJSONString();
    }

    /**
     * 获取所用客户信息api
     *
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Customers/2021/customers")
    public String getAllCustomers() {
        String result = customerService.getAllCustomersService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result != null) {
            successResponce.put("status", "1");
            successResponce.put("customers", JSONArray.parseArray(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10012");
        errorResponce.put("error_desc", "获取全部客户出错10012");
        return errorResponce.toJSONString();
    }

    /**
     * 通过公司或单位名模糊搜索客户
     *
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Customers/2021/customers/vccompany")
    public String getCustomersVCCompany(HttpServletResponse resp,HttpServletRequest req) {
        String c_company = req.getParameter("c_company");
        String result = customerService.getCustomerVCCompany(c_company);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (!result.equals("id有误")) {
            successResponce.put("status", "1");
            successResponce.put("customers", JSONArray.parseArray(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10013");
        errorResponce.put("error_desc", "获取客户信息出错10013");
        return errorResponce.toJSONString();
    }

    /**
     * 通过id获取某一客户所有地址
     *
     * @param req 地址id
     * @return 地址信息
     */
    @GetMapping("/api/v1.0/xjzbfs/Customers/2021/customer/address/id")
    public String getCustomerAddressByCId(HttpServletRequest req,HttpServletResponse resp) {
        String c_id = req.getParameter("c_id");
        String result = customerService.getCustomerAddressesByCIdService(c_id);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (!result.equals("id有误")) {
            successResponce.put("status", "1");
            successResponce.put("customer_addresses", JSONArray.parseArray(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10014");
        errorResponce.put("error_desc", "获取客户地址信息出错10014");
        return errorResponce.toJSONString();
    }

    /**
     * 通过id获取某一客户所有托运部
     *
     * @param req 地址id
     * @return 地址信息
     */
    @GetMapping("/api/v1.0/xjzbfs/Customers/2021/customer/consignment/id")
    public String getCustomerConsignmentByCId(HttpServletRequest req,HttpServletResponse resp) {
        String c_id = req.getParameter("c_id");
        String result = customerService.getCustomerConsignmentByCIdService(c_id);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (!result.equals("id有误")) {
            successResponce.put("status", "1");
            successResponce.put("customer_consignment", JSONArray.parseArray(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10015");
        errorResponce.put("error_desc", "获取客户托运部信息出错10015");
        return errorResponce.toJSONString();
    }

    /**
     * 插入指定客户id的客户地址信息
     *
     * @param jsonObject CustomerAdderss
     * @return 是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/Customers/2021/customer/address")
    public String insertCustomerAddressByCid(@RequestBody JSONObject jsonObject) {
        String result = customerService.insertCustomerAddressService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            successResponce.put("success_desc", "插入客户地址成功");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10016");
        errorResponce.put("error_desc", result+"10016");
        return errorResponce.toJSONString();
    }


    /**
     * 插入指定客户id的客户托运部信息
     *
     * @param jsonObject CustomerAdderss
     * @return 是否成功
     */
    @PostMapping("/api/v1.0/xjzbfs/Customers/2021/customer/consignment")
    public String insertCustomerConsignmentByCid(@RequestBody JSONObject jsonObject) {
        String result = customerService.insertCustomerConsignmentService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.equals("OK")) {
            successResponce.put("status", "1");
            successResponce.put("success_desc", "插入客户地址成功");
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10017");
        errorResponce.put("error_desc", result+"10017");
        return errorResponce.toJSONString();
    }

    /**
     * 通过id获取客户信息
     *
     * @param cId 客户id
     * @return 客户信息
     */
    @GetMapping("/api/v1.0/xjzbfs/Customers/2021/customer/id")
    public String getCustomerById(@RequestParam("c_id") String cId) {
        String result = customerService.getCustomerByIdService(cId);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (!result.equals("c_id有误")) {
            successResponce.put("status", "1");
            successResponce.put("success_desc", JSONObject.parseObject(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10018");
        errorResponce.put("error_desc", "获取客户信息失败10018");
        return errorResponce.toJSONString();

    }

    /**
     * 为指定用户添加产品
     *
     * @param jsonObject
     * @return
     */
    @PostMapping("/api/v1.0/xjzbfs/Goods/2021/Goods")
    public String insertGoods(@RequestBody JSONObject jsonObject) {
        String result = userService.insertGoodsService(jsonObject);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();

        if (result.equals("OK") != true) {
            errorResponce.put("status", "0");
            errorResponce.put("error_code", "10019");
            errorResponce.put("error_desc", result);
            return errorResponce.toJSONString();
        }
        successResponce.put("status", "1");
        successResponce.put("商品插入成功", result+"10019");
        return successResponce.toJSONString();
    }

    /**
     * 获取所有服饰以及辅料产品
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/clothesorCclth")
    public String getAllClothesOrClothGoods() {
        JSONArray result = userService.getAllClothesOrClothGoodsService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10020");
        errorResponce.put("error_desc", "获取服饰以及辅料产品信息失败10020");
        return errorResponce.toJSONString();

    }

    /**
     * 通过模糊搜索客户单位名称获取客户辅料以及服饰订单
     * @param req
     * @param resp
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/VCcompany")
    public String getClothesOrClothGoodsByVCName(HttpServletRequest req,HttpServletResponse resp) {
        String cCompany = req.getParameter("c_company");
        JSONArray result = userService.getClothesOrClothGoodsByVCNameService(cCompany);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10021");
        errorResponce.put("error_desc", "获取客户信息失败10021");
        return errorResponce.toJSONString();
    }

    /**
     * 获取所有外购商品
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/AllbuyGoods")
    public String getAllBuyGoods() {
        List<Goods> result = userService.getAllBuyGoodsService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10022");
        errorResponce.put("error_desc", "获取外购商品失败10022");
        return errorResponce.toJSONString();
    }

    /**
     * 通过商品名称名称模糊搜索外购物品
     * @param req
     * @param resp
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/VGname")
    public String getBuyGoodsByVGName(HttpServletRequest req,HttpServletResponse resp) {
        String gName = req.getParameter("g_name");
        List<Goods> result = userService.getBuyGoodsByVName(gName);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10023");
        errorResponce.put("error_desc", "获取外购物品失败10023");
        return errorResponce.toJSONString();
    }

    /**
     * 获取所有我外购产品以及根据客户id获取客户自己的商品
     * @param resp
     * @param req
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Goods/2021/goods/cid/buy")
    public String getGoodsAllBuyAndClothesBuyCId(HttpServletResponse resp,HttpServletRequest req) {
        String c_id = req.getParameter("c_id");
        List<Goods> result = userService.getGoodsAllBuyAndClothesBuyCIdService(c_id);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goods", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10024");
        errorResponce.put("error_desc", "获取客户信息失败10024");
        return errorResponce.toJSONString();
    }

    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/GoodsOrders/ocid")
    public String getGoodsOrdersByCId(HttpServletRequest req,HttpServletResponse resp) {
        String o_cid = req.getParameter("o_cid");
        List<GoodsOrder> result = userService.getAllOrdersByCustomerIdService(o_cid);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrders", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10025");
        errorResponce.put("error_desc", "获取订单信息失败10025");
        return errorResponce.toJSONString();
    }

    /**
     * 通过order的id获取订单详细信息
     * @param resp
     * @param req
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/goodsorder/detail")
    public String getGoodsOrderDetailByOId(HttpServletResponse resp,HttpServletRequest req) {
        String o_id = req.getParameter("o_id");
        JSONObject result = userService.getOrderDetailByOId(o_id);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size() == 4 || result.size() == 5||result.size() == 6||result.size() == 7) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrders", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10026");
        errorResponce.put("error_desc", "获取订单信息失败10026");
        return errorResponce.toJSONString();
    }

    /**
     * 通过order的code获取订单详细信息
     * @param resp
     * @param req
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/goodsorder/code/detail")
    public String getGoodsOrderDetailByOCode(HttpServletResponse resp,HttpServletRequest req) {
        String o_code = req.getParameter("o_code");
        JSONObject result = userService.getOrderDetailByOCodeService(o_code);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()==4||result.size()==5) {
            successResponce.put("status", "1");
            successResponce.put("goodsOrders", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }

        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10027");
        errorResponce.put("error_desc", "获取订单信息失败10027");
        return errorResponce.toJSONString();
    }

    /**
     * 通过月份获取用户订单
     * @param response
     * @param request
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/GoodsOrders/ocid/times")
    public String getGoodOrdersByMonth(HttpServletResponse response,HttpServletRequest request) {
        String o_cid = request.getParameter("o_cid");
        String date = request.getParameter("date");
        List<GoodsOrder> result = userService.getDateOrdersByCustomerIdService(o_cid,date);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()==0) {
            errorResponce.put("status", "0");
            errorResponce.put("error_code", "10028");
            errorResponce.put("error_desc", "获取订单信息失败10028");
            return errorResponce.toJSONString();
        }
        successResponce.put("status", "1");
        successResponce.put("goodsOrders", JSONObject.toJSON(result));
        return successResponce.toJSONString();

    }

    /**
     * 通过订单id删除订单和库存
     * @param response
     * @param request
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/GoodsOrders/2021/GoodsOrders/oid/delete")
    public String deleteGoodOrders(HttpServletResponse response,HttpServletRequest request) {
        String o_id = request.getParameter("o_id");
        String u_id = request.getParameter("u_id");
        String result = userService.deleteOrderAndStockService(o_id,u_id);
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result!="OK") {
            errorResponce.put("status", "0");
            errorResponce.put("error_code", "10029");
            errorResponce.put("error_desc", "撤销失败10029");
            return errorResponce.toJSONString();
        }
        successResponce.put("status", "1");
        return successResponce.toJSONString();

    }

    /**
     * 获取所有工厂账号的信息
     * @return
     */
    @GetMapping("/api/v1.0/xjzbfs/Users/2021/userandworkshop/mes")
    public String getAllUserAndWorkShop() {
        JSONArray result = userService.getAllWorkUserService();
        JSONObject successResponce = new JSONObject();
        JSONObject errorResponce = new JSONObject();
        if (result.size()!=0) {
            successResponce.put("status", "1");
            successResponce.put("users", JSONObject.toJSON(result));
            return successResponce.toJSONString();
        }
        errorResponce.put("status", "0");
        errorResponce.put("error_code", "10030");
        errorResponce.put("error_desc", "获取信息失败10030");
        return errorResponce.toJSONString();
    }
}