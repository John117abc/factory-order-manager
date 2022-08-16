// const urlHeader = "http://localhost:8888/api/v1.0/xjzbfs"
const urlHeader = "/api/v1.0/xjzbfs"

/**
 * 异步请求
 * @param serviceName
 * @param reqData
 * @param aJaxOperation
 */
function ajaxRequest(serviceName,reqData,aJaxCallbackObj){
    $.ajax( {
        url:urlHeader+serviceName,
        data: reqData,
        type: "POST",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        cache:false,
        contentType:'application/json;charset=utf-8',
        //几个参数需要注意一下
        success:function(data) {
            aJaxCallbackObj.doSuccess(data);
        },
        error:function() {
            aJaxCallbackObj.doError();
        }
    });
}


/**
 * 异步请求
 * @param serviceName
 * @param reqData
 * @param aJaxOperation
 */
function ajaxRequestGET(serviceName,aJaxCallbackObj){
    $.ajax( {
        url:urlHeader+serviceName,
        type: "GET",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        cache:false,
        contentType:'application/json;charset=utf-8',
        //几个参数需要注意一下
        success:function(data) {
            aJaxCallbackObj.doSuccess(data);
        },
        error:function() {
            aJaxCallbackObj.doError();
        }
    });
}

function ajaxRequestNull(serviceName,aJaxCallbackObj,opt){
    $.ajax( {
        url:urlHeader+serviceName,
        type: "GET",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        cache:false,
        contentType:'application/json;charset=utf-8',
        async:false,
        //几个参数需要注意一下
        success:function(data) {
            aJaxCallbackObj.doSuccess(data,opt);
            return true;
        },
        error:function() {
            aJaxCallbackObj.doError();
            return false;
        }
    });
}



/**
 * 提交基础用户信息
 */
function basicCustomer(){

    var formObject = {};
    var formArray = $("#basicCustomerMesForm").serializeArray();
    $("#submitBtn").html("提交...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });

    if (String(formObject["c_company"])==null||String(formObject["c_company"]).length>30||String(formObject["c_company"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }

    if (String(formObject["c_name"])==null||String(formObject["c_name"]).length>30||String(formObject["c_name"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["c_region"])==null||String(formObject["c_region"]).length>30||String(formObject["c_region"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["c_phone"])==null||String(formObject["c_phone"]).length!=11||String(formObject["c_phone"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    ajaxRequest("/Customers/2021/customer",JSON.stringify(formObject),basicCustomerCallbackOperation);
    return;
}

/**
 * 基础用户信息提交回调函数
 */
var basicCustomerCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]!=1) {
            $("#reg_mes").html(String(result["error_desc"]));
            $("#submitBtn").html("提交失败");
        }
        else{
            $("#submitBtn").html("提交完成");
            $("#submitBtn").attr("disabled", true);
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}

/**
 * 提交客户托运部信息
 */
function detailCustomerConsignment(){
    var formObject = {};
    var formArray = $("#consignmentCustomerMesForm").serializeArray();
    $("#submitBtn").html("提交中...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });

    formObject['co_cid'] = sessionStorage.getItem('c_id');
    if (String(formObject["co_name"])==null||String(formObject["co_name"]).length>30||String(formObject["co_name"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["co_phone"])==null||String(formObject["co_phone"]).length!=11||String(formObject["co_phone"]).length==0){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("手机号码有误");
        return;
    }
    if (String(formObject["co_address"])==null||String(formObject["co_address"]).length>200||String(formObject["co_address"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }

    ajaxRequest("/Customers/2021/customer/consignment",JSON.stringify(formObject),setAddressCustomerCallbackOperation);
    return;
}

/**
 * 提交客户详细地址信息
 */
function detailCustomerAddress(){
    var formObject = {};
    var formArray = $("#addressCustomerMesForm").serializeArray();
    $("#submitBtn").html("提交中...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });

    formObject['a_cid'] = sessionStorage.getItem('c_id');
    if (String(formObject["a_name"])==null||String(formObject["a_name"]).length>30||String(formObject["a_name"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["a_phone"])==null||String(formObject["a_phone"]).length!=11||String(formObject["a_phone"]).length==0){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("手机号码有误");
        return;
    }
    if (String(formObject["a_address"])==null||String(formObject["a_address"]).length>200||String(formObject["a_address"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }

    ajaxRequest("/Customers/2021/customer/address",JSON.stringify(formObject),setAddressCustomerCallbackOperation);
    return;
}


/**
 * 基础客户详细地址信息提交回调函数
 */
var setAddressCustomerCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]!=1) {
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(String(result["error_desc"]));
        }
        else{
            $("#submitBtn").html("提交完成");
            $("#submitBtn").attr("disabled", true);
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}

/**
 * 提交产品信息服饰或者辅料
 */
function addClothesOrCloth(){
    var formObject = {};
    var formArray = $("#clothesOrClothOrBuyMesForm").serializeArray();
    $("#submitBtn").html("提交中...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    if (String(formObject["c_name"])==null||String(formObject["c_name"]).length>30||String(formObject["c_name"]).length==0){
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["g_size"]).length>20){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("产品尺码过长");
        return;
    }
    if (String(formObject["g_csize"]).length>20){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("衣服尺码过长");
        return;
    }
    if (String(formObject["g_psize"]).length>20){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("裤子尺码过长");
        return;
    }
    if (String(formObject["g_production"])==null||String(formObject["g_production"]).length==0||String(formObject["g_production"]).length==512){
        $("#reg_mes").html("制作工艺过长");
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject['g_price'])==null||String(formObject['g_price']).length==0||String(formObject['g_price']).length>=10||regMoney(String(formObject['g_price']))==false){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("输入金额格式有误");
        return;
    }
    if (String(formObject["g_specifications"])==null||String(formObject["g_specifications"]).length==0||String(formObject["g_specifications"]).length>256){
        $("#reg_mes").html("产品规格过长");
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["g_explain"])==null||String(formObject["g_explain"]).length==0||String(formObject["g_explain"]).length>36){
        $("#reg_mes").html("货号过长");
        $("#submitBtn").html("提交");
        return;
    }

    ajaxRequest("/Goods/2021/Goods",JSON.stringify(formObject),addClothesOrClothCallbackOperation);
    return;
}


/**
 * 基础客户详细地址信息提交回调函数
 */
var addClothesOrClothCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]!=1) {
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(String(result["error_desc"]));
        }
        else{
            $("#submitBtn").html("提交完成");
            $("#submitBtn").attr("disabled", true);
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}
// /**
//  * ajax无参数传入获取服务器数据
//  * @param serviceName   url
//  * @param aJaxCallbackObj   回调函数
//  */
// function ajaxRequest(serviceName,aJaxCallbackObj){
//     $.ajax( {
//         url:urlHeader+serviceName,
//         type: "GET",//方法类型
//         dataType: "text",//预期服务器返回的数据类型
//         cache:false,
//         contentType:'application/json;charset=utf-8',
//         //几个参数需要注意一下
//         success:function(data) {
//             aJaxCallbackObj.doSuccess(data);
//         },
//         error:function() {
//             aJaxCallbackObj.doError();
//         }
//     });
// }

/**
 * 判断金额是否合法
 * @param value
 */
function regMoney(value) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

    if (reg.test(value.toString())) {
        return true;
    }else{
        return false;
    };
}

/**
 * 判断是否为正整数
 */

function regNumber(value) {
    var reg = /^\+?[1-9][0-9]*$/;

    if (reg.test(value.toString()))
        return true;
    else
        return false;
}

/**
 * 时间戳字符串转日期
 * @param value
 * @returns {string}
 */
function formatDate(value) {
    var date = new Date(parseInt(value));
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if (m < 10) { m = '0' + m; }
    if (d < 10) { d = '0' + d; }
    if (h < 10) { h = '0' + h; }
    if (i < 10) { i = '0' + i; }
    if (s < 10) { s = '0' + s; }
    var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
    return t;
}


/**
 * 时间戳字符串转日期
 * @param value
 * @returns {string}
 */
function formatDateNYR(value) {
    var date = new Date(parseInt(value));
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate()
    if (m < 10) { m = '0' + m; }
    if (d < 10) { d = '0' + d; }
    var t = y + '-' + m + '-' + d;
    return t;
}


function getOReview(value) {
    var oReview = String(value);
    if (oReview=="1")
        return "订单制表完成，待制作";
    else if (oReview=="2")
        return "订单制作中";
    else if (oReview=="3")
        return "订单制作完成，待审核";
    else if (oReview=="4")
        return "审核完成已入库";
    else if (oReview=="5")
        return "订单已出库";
    else if (oReview=="6")
        return "订单完成";
    return  "错误review";
}

function getOdeliver(value){
    var odeliver = String(value);
    if (odeliver=="1")
        return "已发货";
    else
        return "未发货"
}

function getOpayType(value) {
    var value =String(value);
    if (value=="0")
        return "对公";
    else
        return "对私";
}

function getOotype(value){
    var value =String(value);
    if (value=="0")
        return "制作";
    else
        return "外购";
}

function getOptype(value){
    var value =String(value);
    if (value=="0")
        return "敷料";
    else if (value=="1")
        return "服饰";
    else
        return "其它";
}

function getDeliver(value) {
    if (value=="0")
        return "未发货";
    else
        return "已发货";
}

function getIsinvoice(value) {
    if (value=="0")
        return "开";
    else return "不开";
}

function getUType(value) {
    if (value=="0")
        return "裁剪室";
    else if (value=="1")
        return "敷料室";
    else return "管理员";
}

function getUAdmin(value) {
    if (value=="0")
        return "普通管理员";
    else if (value=="1")
        return "超级管理员";
    else
        return "车间";
}

function getInvoiceStatus(value) {
    if (value==undefined||value.length==0){
        return "未开票";
    }
    return "已开票";
}

function revokeOrder() {
    let o_id = sessionStorage.getItem("o_id");
    let u_id = sessionStorage.getItem("u_id");
    $("#submitBtn").html("删除中...");
    $("#submitBtn").attr("disabled", true);
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/oid/delete?u_id="+u_id.toString()+"&o_id="+o_id,revokeOrderCallbackOperation)
}


var revokeOrderCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1) {
            $("#submitBtn").html("删除成功");
        }else {
            $("#submitBtn").html("删除失败");
        }
    },
    doError:function () {
        alert("请联系管理员");
    }
}

function addGoods(g,glength){
    if ($('div[name="goodsbox"]').length>=glength||$('div[name="goodsbox"]').length>10) {
        $("#reg_mes").html("产品数量超出限制");
        return ;
    }
    let data ='<div class="input-group col-xs-12" name="goodsbox">\n' +
        '        <div class="input-group-btn">\n' +
        '            <div class="col-lg-4">\n' +
        '                <select class="selectpicker" name="o_gid" title="请选择" data-width="auto" data-live-search="true">\n'
                            +g+
        '                </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <input type="number" class="form-control" name="goodsnumber" placeholder="请输入产品数量...">\n' +
        '        <span class="input-group-btn">\n' +
        '            <input type="button" name="add" class="btn btn-default" value="+" onclick="addGoods(\'' + g.replaceAll("\n", "") + '\',\'' +glength+ '\')">\n' +
        '        </span>\n' +
        '    </div>\n'+
        '    <div class="form-group row">\n' +
        '       <input style="visibility: hidden">\n' +
        '    </div>\n';
    $("input[name='add']").css('visibility','hidden');
    $("#goodsGroup").append(data);
    $('.selectpicker').selectpicker({});
}

