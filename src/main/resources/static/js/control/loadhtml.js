/**
 * 加载html
 */

/**
 * 点击最新、热销点卡榜单显示点卡信息
 */

function goPage(e) {
    // let http_request = new XMLHttpRequest();
    // if (http_request.overrideMimeType) {
    //     http_request.overrideMimeType(e.toString());
    //     if (!http_request) {
    //         alert("无法创建XMLHTTP实例");
    //         return false;
    //     }
    //     http_request.open("GET", "/"+e.toString(), true);
    //     http_request.send(null);
    //
    //     var obj = document.getElementById("replace-html");
    //     http_request.onreadystatechange = function () {
    //         if (http_request.readyState == 4) {
    //             if (http_request.status == 200) {
    //                 obj.innerHTML = http_request.responseText;
    //                 // console.log(http_request.responseText.toString())
    //                 $("#replace-html").load(http_request.responseText.toString());
    //             } else {
    //                 alert('您请求的页面发现错误！');
    //             }
    //         }
    //     }
    // }


    if (e.toString()=="addCustomerBasicMes") {
        $('#content-body').remove();
        $("#replace-html").load("/"+e.toString());
        return ;
    }
    if (e.toString()=="addCustomerAddressMes") {
        editAllCustomer("addCustomerAddressMesDetail");
        return ;
    }
    if (e.toString()=="addCustomerConsignmentMes") {
        editAllCustomer("addCustomerConsignmentMesDetail");
        return ;
    }
    if (e.toString()=="customerMes") {
        showCustomerDetail();
        return ;
    }
    if (e=="customerMesDarkSearch") {
        getCustomerByDarkSearch();
        return ;
    }
    if(e.toString()=="addClothesOrClothMes") {
        addClothesOrClothMes();
        return ;
    }
    if (e.toString()=="addBuyMes") {
        $('#content-body').remove();
        $("#replace-html").load("/"+e.toString());
        return ;
    }

    if (e.toString()=="getClothesOrClothMes") {
        getClothesOrClothMes();
        return ;
    }

    if (e.toString()=="clothesOrClothMesDarkSearch") {
        clothesOrClothMesDarkSearch();
        return ;
    }
    if (e.toString()=="getBuyMes") {
        getBuyMes();
        return ;
    }
    if (e.toString()=="buyMesDarkSearch") {
        buyMesDarkSearch();
        return ;
    }

    if (e.toString()=="addOrder"){
        addOrderFirst();
        return ;
    }
    if (e.toString()=="addOrderFirstSearch"){
        addOrderFirstSearch();
        return ;
    }

    if (e.toString()=="searchAllOrder") {
        $('#content-body').remove();
        $("#replace-html").load("/"+e.toString());
        return ;
    }

    if (e.toString()=="stockClothes") {
        stockClothes();
        return ;
    }

    if (e.toString()=="stockFabric") {
        stockFabric();
        return ;
    }

    if (e.toString()=="stockBuy") {
        stockBuy();
        return ;
    }

    if (e.toString()=="stockAll") {
        stockAll();
        return ;
    }

    if(e.toString()=="customerCapital"||e.toString()=="customerCapitalInvoice") {
        customerCapital(e);
        return ;
    }

    if (e.name=="customerCapitalCustomer") {
        customerCapitalCustomer(e.id);
        return ;
    }

    if (e.toString()=="adminMes") {
        adminMes();
        return ;
    }

    if (e.toString()=="editGoods") {
        editGoods();
        return ;
    }

    if (e.toString()=="searchEditGoods") {
        searchEditGoods();
        return ;
    }

}

/**
 * 产品编辑页面搜索产品
 */
function searchEditGoods(){
    let name = $('#searchInput').val();
    if (name.length==0||name.length>10) {
        alert("查询内容有误！");
        return ;
    }
    ajaxRequestGET("/GoodsOrders/2021/Goods/show/edit/vname/goods?g_name="+name.toString(),editGoodsCallbackOperation);
}

/**
 * 编辑产品功能的全部产品展示界面
 */
function editGoods(){
    ajaxRequestGET("/GoodsOrders/2021/goodsOrders/show/edit/all/goods",editGoodsCallbackOperation);
}

var editGoodsCallbackOperation ={
    doSuccess:function (reqData){
        let result = JSON.parse(reqData);
        if (result['status']==1) {
            let goods = '';
            for (let i=1;i<=result['goods'].length;i++) {
                let gid = result['goods'][i-1]['g_id'];
                goods+='<tr>\n' +
                    '                <td>'+i+'</td>\n' +
                    '                <td><strong>'+result['goods'][i-1]['g_code']+'</strong></td>\n' +
                    '                <td>'+result['goods'][i-1]['g_name']+'</td>\n' +
                    '                <td>'+result['goods'][i-1]['c_company']+'</td>\n' +
                    '                <td>'+getOptype(result['goods'][i-1]['g_type'])+'</td>\n' +
                    '                <td>\n' +
                    '                    <div class="d-flex">\n' +
                    '                        <a href="javascript:void(0)" onclick="goPageAndTransport(this,this.name,\'' + gid + '\')" name="edit-goods-detail" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>\n' +
                    '                        <a href="javascript:void(0)" onclick="goPageAndTransport(this,this.name,\'' + gid + '\')" name="delete-goods" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>\n' +
                    '                    </div>\n' +
                    '                </td>\n' +
                    '            </tr>';
            }
            let data ='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">产品列表</h4>\n' +
                '                    <li class="nav-item">\n' +
                '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                '                            <input type="text" class="form-control" maxlength="50" name="addOrderFirstSearch" id="searchInput" placeholder="输入产品名称...">\n' +
                '                            <div class="input-group-append">\n' +
                '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="searchEditGoods"><i class="flaticon-381-search-2"></i></a></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </li>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-responsive-md">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>序号</th>\n' +
                '                                <th>产品货号</th>\n' +
                '                                <th>产品名称</th>\n' +
                '                                <th>产品所属公司</th>\n' +
                '                                <th>产品类型</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +goods+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>\n';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert(result['error_desc']);
        }
    },
    doError:function (){
        alert("数据加载失败，请联系管理员");
    }
}


/**
 * 获取所有管理员以及车间信息并且加载展示页面，用于展示用户信息所用
 */
function adminMes() {
    let opt="";
    ajaxRequestNull("/Users/2021/userandworkshop/mes",adminMesCallbackOperation,opt);
    return;
}

/**
 *取所有管理员以及车间信息并且加载展示页面回调函数，用于展示用户信息所用
 */

var adminMesCallbackOperation={
    doSuccess:function (respData,opt) {
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let datas="";
            let type1="c_id";
            for (let i=0;i<result['users'].length;i++) {
                datas+='<tr>\n' +
                    '                                <td><strong>'+String(parseInt(i+1))+'</strong></td>\n' +
                    '                                <td>'+result['users'][i]['name']+'</td>\n' +
                    '                                <td>'+result['users'][i]['tname']+'</td>\n' +
                    '                                <td>'+getUType(result['users'][i]['type'])+'</td>\n' +
                    '                                <td>'+getUAdmin(result['users'][i]['admin'])+'</td>\n' +
                    // '                                <td>\n' +
                    // '                                    <div class="dropdown">\n' +
                    // '                                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">\n' +
                    // '                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>\n' +
                    // '                                        </button>\n' +
                    // '                                        <div class="dropdown-menu">\n' +
                    // '                                            <a class="dropdown-item" href="javascript:void(0)" onclick="goPageAndTransport(\'' + type1 + '\',this.name,this.id)" name="getCustomerAds">地址</a>\n' +
                    // '                                            <a class="dropdown-item" href="javascript:void(0)"  onclick="goPageAndTransport(\'' + type1 + '\',this.name,this.id)" name="getCustomerCos">托运部</a>\n' +
                    // '                                        </div>\n' +
                    // '                                    </div>\n' +
                    // '                                </td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">用户信息</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body" style="clear:both;">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-responsive-md">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th class="width80">序号</th>\n' +
                '                                <th>用户名</th>\n' +
                '                                <th>真实姓名</th>\n' +
                '                                <th>用户类型</th>\n' +
                '                                <th>用户权限</th>\n' +
                // '                                <th>用户编辑</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert("数据加载失败，请联系管理员");
        }
    },
    doError:function () {
        alert("数据加载失败，请联系管理员");
    }
}

/**
 * 查询月度信息显示客户未结算订单
 * @param o_cid
 */
function searchCustomerBill(o_cid) {
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/ocid"+"?o_cid="+o_cid.toString(),searchCustomerBillCallbackOperation);
    return;
}

var searchCustomerBillCallbackOperation={
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']!=0) {
            let datas='';
            let total = 0.00;
            let unsettled = 0.00;
            for (let i=0;i<result['goodsOrders'].length;i++) {
                let otype = 'o_id';
                let oname = 'getOrderDetailMes';
                total = Math.floor(parseFloat(total*100 + result['goodsOrders'][i]['o_price']*100))/100;
                if (result['goodsOrders'][i]['o_review']!="6"){
                    unsettled = Math.floor(parseFloat(unsettled*100 + result['goodsOrders'][i]['o_price']*100))/100;
                }
                datas+='<tr>\n' +
                    '                                <td><a href="javascript:void(0)" onclick="goPageAndTransport(\'' +otype+'\',\'' +oname+'\',this.id)" id='+result['goodsOrders'][i]['o_id']+'>'+result['goodsOrders'][i]['o_code']+'</a>\n' +
                    '                                </td>\n' +
                    '                                <td>'+formatDateNYR(result['goodsOrders'][i]['o_deadline'])+'</td>\n' +
                    '                                <td><span class="text-muted">￥'+result['goodsOrders'][i]['o_price']+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td><span class="badge badge-outline-secondary">'+getOReview(result['goodsOrders'][i]['o_review'])+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td>'+getOptype(result['goodsOrders'][i]['o_ptype'])+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">订单统计</h4>\n' +
                '                    <h5>全部金额：'+total+'元</h5>\n'+
                '                    <h5>未结算金额：'+unsettled+'元</h5>\n'+
                '                    <div class="col-xl-4 mb-3">\n' +
                '                        选择时间范围：<input onchange="goPageAndTransport(\'null\',this.name,this.value)" name="month-input" type="month">\n' +
                '                    </div>\n'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border table-responsive-sm">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>订单编号</th>\n' +
                '                                <th>截至日期</th>\n' +
                '                                <th>订单金额</th>\n' +
                '                                <th>订单状态</th>\n' +
                '                                <th>订单类型</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("暂无订单");
        }
    },
    doError:function (){
        alert("出错啦，请联系管理员");
    }
}


/**
 * 查询月度信息第一步显示客户
 */
function customerCapital(e) {
    let opt=e;
    ajaxRequestNull("/Customers/2021/customers",customerCapitalCallbackOperation,opt);
    return;
}


/**
 * 通过选择客户单位添加订单第一步
 */
function customerCapitalCustomer(id){
    if ($('#searchInput').val().toString().length==0)
        return ;
    let opt=id;
    ajaxRequestNull("/Customers/2021/customers/vccompany"+"?c_company="+$('#searchInput').val().toString(),customerCapitalCallbackOperation,opt);
    return;
}


/**
 * 查询月度信息第一步显示客户，选择用户回调函数
 */
var customerCapitalCallbackOperation={
    doSuccess:function (respData,opt) {
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let datas="";
            for (let i=0;i<result['customers'].length;i++) {
                let type1 = "c_id";
                let myname = opt;
                datas+='<tr value="c_id" onclick="goPageAndTransport(\'' + type1 + '\',\'' + myname + '\',this.id)"  id='+result['customers'][i]['c_id']+' style="cursor:pointer"  >\n' +
                    '                                <td><strong>'+String(parseInt(i+1))+'</strong></td>\n' +
                    '                                <td>'+result['customers'][i]['c_company']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_name']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_phone']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_region']+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">选择客户</h4>\n' +
                '                    <li class="nav-item">\n' +
                '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                '                                <input type="text" class="form-control" maxlength="50" name="addOrderFirstSearch" id="searchInput" placeholder="输入单位名称...">\n' +
                '                            <div class="input-group-append">\n' +
                '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this)" name="customerCapitalCustomer" id=\'' + opt + '\'><i class="flaticon-381-search-2"></i></a></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                   </li>'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-responsive-md" name="addOrderSecond">\n' +
                '                            <thead >\n' +
                '                            <tr>\n' +
                '                                <th class="width80">序号</th>\n' +
                '                                <th>单位/公司</th>\n' +
                '                                <th>姓名</th>\n' +
                '                                <th>联系电话</th>\n' +
                '                                <th>地区</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert("数据加载失败，请联系管理员");
        }
    },
    doError:function () {
        alert("数据加载失败，请联系管理员");
    }
}

/**
 * 获取所有库存信息页面
 */
function stockAll(){
    ajaxRequestGET("/GoodsOrders/2021/Stock/clothes?o_ptype=-1",stockNeedCallbackOperation);
    return;
}


/**
 * 获取全部外购库存页面
 */
function stockBuy(){
    ajaxRequestGET("/GoodsOrders/2021/Stock/clothes?o_ptype=2",stockNeedCallbackOperation);
    return;
}

/**
 * 获取全部敷料库存页面
 */
function stockFabric(){
    ajaxRequestGET("/GoodsOrders/2021/Stock/clothes?o_ptype=0",stockNeedCallbackOperation);
    return;
}



/**
 * 获取全部服饰库存页面
 */
function stockClothes(){
    ajaxRequestGET("/GoodsOrders/2021/Stock/clothes?o_ptype=1",stockNeedCallbackOperation);
    return;
}

var stockNeedCallbackOperation={
    doSuccess:function (respData) {
        var result  = JSON.parse(respData);
        if (result['status']==1){
            let datas="";
            for (let i=0;i<result['stocks'].length;i++) {
                datas+='<tr>\n' +
                    '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_name']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_specifications']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_count']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_unit']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_price']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_ocode']+'</td>\n' +
                    '                                <td>'+result['stocks'][i]['s_customer']+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">库存信息</h4>\n' +
                // '                    <li class="nav-item">\n' +
                // '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                // '                                <input type="text" class="form-control" maxlength="50" name="searchCustomers" id="searchInput" placeholder="输入单位名称...">\n' +
                // '                            <div class="input-group-append">\n' +
                // '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="clothesOrClothMesDarkSearch"><i class="flaticon-381-search-2"></i></a></span>\n' +
                // '                            </div>\n' +
                // '                        </div>\n' +
                // '                   </li>'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-bordered table-responsive-sm" id="big">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th style="font-size: 50%">序号</th>\n' +
                '                                <th style="font-size: 50%">物品名称</th>\n' +
                '                                <th style="font-size: 50%">规格</th>\n' +
                '                                <th style="font-size: 50%">数量</th>\n' +
                '                                <th style="font-size: 50%">单位</th>\n' +
                '                                <th style="font-size: 50%">单价</th>\n' +
                '                                <th style="font-size: 50%">订单号</th>\n' +
                '                                <th style="font-size: 50%">客户单位</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("库存为空");
        }
    },
    doError:function () {
        alert("请联系管理员");
    }
}

/**
 * 订单搜索
 */
function searchOrder(){
    var formObject = {};
    var formArray = $("#searchOrderForm").serializeArray();
    $("#submitBtn").html("搜索中...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    if (formObject['inputType']==1) {
        if (formObject['orderCodeOrCompany'].toString().length==0||formObject['orderCodeOrCompany'].toString().length>36)
            return ;
        ajaxRequestGET("/Customers/2021/customers/vccompany"+"?c_company="+formObject['orderCodeOrCompany'].toString(),searchOrderCompanyCallbackOperation);
        return;
    }else {
        if (formObject['orderCodeOrCompany'].toString().length==0||formObject['orderCodeOrCompany'].toString().length>36)
            return ;
        ajaxRequestGET("/GoodsOrders/2021/goodsorder/code/detail"+"?o_code="+formObject['orderCodeOrCompany'].toString(),getOrderDetailMesCallbackOperation);
        return;
    }
}


var searchOrderCompanyCallbackOperation = {
    doSuccess:function(respData) {
        let result = JSON.parse(respData);
        if (result['customers'].length==0){
            alert("不存在的客户");
            return ;
        }
        let datas="";
        for (let i=0;i<result['customers'].length;i++) {
            datas+='<tr value="c_id" onclick="goPageAndTransport(\'c_id\',\'searchCustomerOrderByCname\',this.id)" id='+result['customers'][i]['c_id']+' style="cursor:pointer">\n' +
                '                                    <td><strong>'+String(parseInt(i+1))+'</strong></td>\n' +
                '                                    <td>'+result['customers'][i]['c_company']+'</td>\n' +
                '                                    <td>'+result['customers'][i]['c_name']+'</td>\n' +
                '                                    <td>'+result['customers'][i]['c_phone']+'</td>\n' +
                '                                    <td>'+result['customers'][i]['c_region']+'</td>\n' +
                '                                </tr>';
        }

        let data='<div class="content-body">\n' +
            '    <div class="container-fluid">\n' +
            '        <div class="col-lg-12">\n' +
            '            <div class="card">\n' +
            '                <div class="card-header">\n' +
            '                    <h4 class="card-title">选择客户</h4>\n' +
            '                </div>\n' +
            '                <div class="card-body">\n' +
            '                    <div class="table-responsive">\n' +
            '                        <table class="table table-responsive-md" name="addOrderSecond">\n' +
            '                            <thead>\n' +
            '                            <tr>\n' +
            '                                <th class="width80">序号</th>\n' +
            '                                <th>单位/公司</th>\n' +
            '                                <th>姓名</th>\n' +
            '                                <th>联系电话</th>\n' +
            '                                <th>地区</th>\n' +
            '                            </tr>\n' +
            '                            </thead>\n' +
            '                            <tbody>\n' + datas+
            '                            </tbody>\n' +
            '                        </table>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
        $('#content-body').remove();
        var obj = document.getElementById("replace-html");
        obj.innerHTML = data;
    },
    doError:function () {
        alert("请联系管理员");
    }
}

/**
 * 通过选择客户单位添加订单第一步
 */
function addOrderFirstSearch(){
    if ($('#searchInput').val().toString().length==0)
        return ;
    let opt="";
    ajaxRequestNull("/Customers/2021/customers/vccompany"+"?c_company="+$('#searchInput').val().toString(),addOrderFirstCallbackOperation,opt);
    return;
}


/**
 * 跳转页面并且把客户id加入cookie
 * @param n
 * @param i
 */
function goPageAndTransport(t,n,i) {
    if (t.toString()=="c_id") {
        if (sessionStorage.getItem('c_id')!=null) {
            sessionStorage.removeItem('c_id');
        }
        sessionStorage.setItem('c_id',i.toString());
    }

    if (t.toString()=="a_id") {
        if (sessionStorage.getItem('a_id')!=null) {
            sessionStorage.removeItem('a_id');
        }
        sessionStorage.setItem('a_id',i.toString());
    }
    if (t.toString()=="o_id") {
        if (sessionStorage.getItem('o_id')!=null) {
            sessionStorage.removeItem('o_id');
        }
        sessionStorage.setItem('o_id',i.toString());
    }

    if (n=="addCustomerAddressMesDetail") {
        $('#content-body').remove();
        $("#replace-html").load("/"+n.toString());
    }
    if (n=="addCustomerConsignmentMesDetail") {
        $('#content-body').remove();
        $("#replace-html").load("/"+n.toString());
    }

    if (n=="getCustomerAds") {
        getCustomerAds(i);
        return ;
    }
    if (n=="getCustomerCos") {
        getCustomerCos(i);
        return;
    }
    if (n=="addOrderSecond") {
        addOrderSecond(i);
        return ;
    }
    if (n=="addOrderThird") {
        addOrderThird(i);
        return ;
    }
    if (n=="searchCustomerOrderByCname"){
        searchCustomerOrderByCname(i);
        return ;
    }
    if (n=="getOrderDetailMes"){
        getOrderDetailMes(i);
        return ;
    }

    if (n=="customerCapital") {
        searchCustomerBill(i);
        return ;
    }

    if (n=="customerCapitalInvoice") {
        customerCapitalInvoice(i);
        return ;
    }

    if (n=="month-input") {
        monthInput(i);
        return ;
    }

    if (n=="month-input-isinvoice") {
        monthInputIsinvoice(i);
        return ;
    }

    if (n=="delete-goods") {
        deleteGoods(t,i);
        return
    }

    if (n=="edit-goods-detail") {
        editGoodsDetail(i);
        return ;
    }

}

/**
 * 通过产品id搜索产品并跳转编辑页面
 * @param gid
 */
function editGoodsDetail(gid) {
    ajaxRequestGET("/GoodsOrders/2021/Goods/show/edit/gid/goods?g_id="+gid,editGoodsDetailCallbackOperation);
}

var editGoodsDetailCallbackOperation={
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1) {

            let data = '<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">编辑产品信息</h4>\n' +
                '                    </div>\n' +
                '                    <div class="card-body">\n' +
                '                        <div class="form-validation">\n' +
                '                            <form class="form-valide" target="iframe" id="edit-goods-detail-form">\n' +
                '                                <div class="row">\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_name">产品名称\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_name'] + '" class="form-control" id="val-g_name" required name="g_name" placeholder="请输入产品名称..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_size">产品尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_size'] + '" class="form-control" id="val-g_size" name="g_size" placeholder="请输入产品尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_csize">衣服尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_csize'] + '" class="form-control" id="val-g_csize" name="g_csize" placeholder="请输入衣服尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_psize">裤子尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_psize'] + '" class="form-control" id="val-g_psize" name="g_psize" placeholder="请输入裤子尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row" id="production-box">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_production">制作工艺\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <textarea class="form-control" id="val-g_production" name="g_production" rows="5" maxlength="256" placeholder="请输入制作工艺.."></textarea>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_type">产品类型\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + getOptype(result['goods']['g_type']) + '" disabled="disabled" maxlength="20" class="form-control" id="val-g_type" name="g_type">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_price">单价\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="Number" value="' + result['goods']['g_price'] + '" class="form-control" required maxlength="10" id="val-g_price" name="g_price" placeholder="￥21.60">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_unit">单位\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_unit'] + '" required maxlength="20" class="form-control" id="val-g_unit" name="g_unit" placeholder="请输入产品单位..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_specifications">产品规格\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="' + result['goods']['g_specifications'] + '" required maxlength="50" class="form-control" id="val-g_specifications" name="g_specifications" placeholder="请输入产品规格..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_code">产品货号\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" value="'+result['goods']['g_explain']+'" maxlength="50" class="form-control" id="val-g_code" name="g_explain">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp;</div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <div class="col-lg-8 ml-auto">\n' +
                '                                                <button type="submit" id="submitBtn" onclick="sendEditGoods(\''+result['goods']['g_id']+'\')" class="btn btn-primary">提交</button>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>'
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
            if (result['goods']['g_type']!=0&&result['goods']['g_type']!=1) {
                $('#production-box').hide();
                $('#c_company-box').hide();
            }else {
                $('#val-g_production').val(result['goods']['g_production']);
            }
        }
    },
    doError:function (){

    }
}

function sendEditGoods(gid) {
    $("#submitBtn").html("&nbsp");
    var formObject = {};
    var formArray = $("#edit-goods-detail-form").serializeArray();
    $("#submitBtn").html("提交中...");
    $("#submitBtn").attr("disabled", true);
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    if (formObject['g_csize'].length!=0&&formObject['g_csize'].length>32) {
        $("#reg_mes").html("衣服尺码填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_name'].length!=0&&formObject['g_name'].length>36) {
        $("#reg_mes").html("产品名称填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_price'].length!=0&&formObject['g_price']>12&&!regMoney(formObject['g_price'])) {
        $("#reg_mes").html("金额填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_production'].length!=0&&formObject['g_production'].length>512){
        $("#reg_mes").html("生产工艺字数超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_psize'].length!=0&&formObject['g_psize'].length>16) {
        $("#reg_mes").html("裤子尺码填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_size'].length!=0&&formObject['g_size'].length>16) {
        $("#reg_mes").html("尺码填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_specifications'].length!=0&&formObject['g_specifications'].length>128) {
        $("#reg_mes").html("产品规格填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_unit'].length!=0&&formObject['g_unit'].length>16) {
        $("#reg_mes").html("单位填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }

    if (formObject['g_explain'].length!=0&&formObject['g_explain'].length>16) {
        $("#reg_mes").html("产品货号填写有误或超出范围");
        $("#submitBtn").attr("disabled", false);
        $("#submitBtn").html("提交");
        return;
    }
    formObject['g_id'] = gid;

    ajaxRequest("/GoodsOrders/2021/Goods/edit/gid/goods",JSON.stringify(formObject),sendEditGoodsCallbackOperation);

    return;
}

var sendEditGoodsCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1) {
            $("#submitBtn").html("更新成功");
        }else {
            $("#submitBtn").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function () {
        alert("服务器出错请联系管理员");
    }
}


/**
 * 删除指定id的产品
 * @param gid
 */
function deleteGoods(td,gid) {
    ajaxRequestNull("/Goods/2021/delete/gid?g_id="+gid.toString(),deleteGoodsCallbackOperation,td)
}

var deleteGoodsCallbackOperation = {
    doSuccess:function (reqData,td){
        let result = JSON.parse(reqData);

        if (result['status']==1) {
            $(td).parent().parent().parent().remove();
        }else {
            alert(result['error_desc']);
        }
    },
    doError:function (){
        alert("订单删除失败请联系管理员");
    }
}

/**
 * 根据月度时间获取订单结算
 * @param data
 */
function monthInputIsinvoice(data) {
    let cId = sessionStorage.getItem("c_id");
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/ocid/times?o_cid="+cId+"&date="+data,monthInputIsinvoiceCallbackOperation);
}

/**
 * 根据月度时间获取订单结算开票与不开票
 *
 */
var monthInputIsinvoiceCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']!=0) {
            let datas='';
            let total = 0.00;
            let unsettled = 0.00;
            for (let i=0;i<result['goodsOrders'].length;i++) {
                if (result['goodsOrders'][i]['o_isinvoice']==0) {
                    let otype = 'o_id';
                    let oname = 'getOrderDetailMes';
                    if (getInvoiceStatus(result['goodsOrders'][i]['o_invoice'])=="已开票"){
                        total = Math.floor(parseFloat(total*100 + result['goodsOrders'][i]['o_price']*100))/100;
                    }
                    if (getInvoiceStatus(result['goodsOrders'][i]['o_invoice']=="未开票")){
                        unsettled = Math.floor(parseFloat(unsettled*100 + result['goodsOrders'][i]['o_price']*100))/100;
                    }
                    datas+='<tr>\n' +
                        '                                <td><a href="javascript:void(0)" onclick="goPageAndTransport(\'' +otype+'\',\'' +oname+'\',this.id)" id='+result['goodsOrders'][i]['o_id']+'>'+result['goodsOrders'][i]['o_code']+'</a>\n' +
                        '                                </td>\n' +
                        '                                <td>'+formatDateNYR(result['goodsOrders'][i]['o_deadline'])+'</td>\n' +
                        '                                <td><span class="text-muted">￥'+result['goodsOrders'][i]['o_price']+'</span>\n' +
                        '                                </td>\n' +
                        '                                <td><span class="badge badge-outline-secondary">'+getOReview(result['goodsOrders'][i]['o_review'])+'</span>\n' +
                        '                                </td>\n' +
                        '                                <td>'+getInvoiceStatus(result['goodsOrders'][i]['o_invoice'])+'</td>\n' +
                        '                            </tr>';
                }
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">订单统计</h4>\n' +
                '                    <h5>已开票金额：'+total+'元</h5>\n'+
                '                    <h5>未开票金额：'+unsettled+'元</h5>\n'+
                '                    <div class="col-xl-4 mb-3">\n' +
                '                        选择时间范围：<input onchange="goPageAndTransport(\'null\',this.name,this.value)" name="month-input-isinvoice" type="month">\n' +
                '                    </div>\n'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border table-responsive-sm">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>订单编号</th>\n' +
                '                                <th>截至日期</th>\n' +
                '                                <th>订单金额</th>\n' +
                '                                <th>订单状态</th>\n' +
                '                                <th>开票状态</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("暂无订单");
        }
    },
    doError:function () {
        alert("出错啦~请联系管理员！");
    }
}

function customerCapitalInvoice(o_cid) {
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/ocid"+"?o_cid="+o_cid.toString(),customerCapitalInvoiceCallbackOperation);
    return;
}

var customerCapitalInvoiceCallbackOperation ={
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']!=0) {
            let datas='';
            let total = 0.00;
            let unsettled = 0.00;
            for (let i=0;i<result['goodsOrders'].length;i++) {
                if (result['goodsOrders'][i]['o_isinvoice']==0) {
                    let otype = 'o_id';
                    let oname = 'getOrderDetailMes';
                    if (getInvoiceStatus(result['goodsOrders'][i]['o_invoice'])=="已开票"){
                        total = Math.floor(parseFloat(total*100 + result['goodsOrders'][i]['o_price']*100))/100;
                    }
                    if (getInvoiceStatus(result['goodsOrders'][i]['o_invoice']=="未开票")){
                        unsettled = Math.floor(parseFloat(unsettled*100 + result['goodsOrders'][i]['o_price']*100))/100;
                    }
                    datas+='<tr>\n' +
                        '                                <td><a href="javascript:void(0)" onclick="goPageAndTransport(\'' +otype+'\',\'' +oname+'\',this.id)" id='+result['goodsOrders'][i]['o_id']+'>'+result['goodsOrders'][i]['o_code']+'</a>\n' +
                        '                                </td>\n' +
                        '                                <td>'+formatDateNYR(result['goodsOrders'][i]['o_deadline'])+'</td>\n' +
                        '                                <td><span class="text-muted">￥'+result['goodsOrders'][i]['o_price']+'</span>\n' +
                        '                                </td>\n' +
                        '                                <td><span class="badge badge-outline-secondary">'+getOReview(result['goodsOrders'][i]['o_review'])+'</span>\n' +
                        '                                </td>\n' +
                        '                                <td>'+getInvoiceStatus(result['goodsOrders'][i]['o_invoice'])+'</td>\n' +
                        '                            </tr>';
                }
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">订单统计</h4>\n' +
                '                    <h5>全部已开票金额：'+total+'元</h5>\n'+
                '                    <h5>全部未开票金额：'+unsettled+'元</h5>\n'+
                '                    <div class="col-xl-4 mb-3">\n' +
                '                        选择时间范围：<input onchange="goPageAndTransport(\'null\',this.name,this.value)" name="month-input-isinvoice" type="month">\n' +
                '                    </div>\n'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border table-responsive-sm">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>订单编号</th>\n' +
                '                                <th>截至日期</th>\n' +
                '                                <th>订单金额</th>\n' +
                '                                <th>订单状态</th>\n' +
                '                                <th>开票状态</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("暂无订单");
        }
    },
    doError:function () {
        alert("出错啦~请联系管理员！");
    }
}

/**
 * 根据月度时间获取订单结算
 * @param data
 */
function monthInput(data) {
    let cId = sessionStorage.getItem("c_id");
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/ocid/times?o_cid="+cId+"&date="+data,monthInputCallbackOperation);
}

var monthInputCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']=="1") {
            let datas='';
            let total = 0.00;
            let unsettled = 0.00;
            for (let i=0;i<result['goodsOrders'].length;i++) {
                let otype = 'o_id';
                let oname = 'getOrderDetailMes';
                total = Math.floor(parseFloat(total*100 + result['goodsOrders'][i]['o_price']*100))/100;
                if (result['goodsOrders'][i]['o_review']!="6"){
                    unsettled = Math.floor(parseFloat(unsettled*100 + result['goodsOrders'][i]['o_price']*100))/100;
                }
                datas+='<tr>\n' +
                    '                                <td><a href="javascript:void(0)" onclick="goPageAndTransport(\'' +otype+'\',\'' +oname+'\',this.id)" id='+result['goodsOrders'][i]['o_id']+'>'+result['goodsOrders'][i]['o_code']+'</a>\n' +
                    '                                </td>\n' +
                    '                                <td>'+formatDateNYR(result['goodsOrders'][i]['o_deadline'])+'</td>\n' +
                    '                                <td><span class="text-muted">￥'+result['goodsOrders'][i]['o_price']+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td><span class="badge badge-outline-secondary">'+getOReview(result['goodsOrders'][i]['o_review'])+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td>'+getOptype(result['goodsOrders'][i]['o_ptype'])+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">订单统计</h4>\n' +
                '                    <h5>全部金额：'+total+'元</h5>\n'+
                '                    <h5>未结算金额：'+unsettled+'元</h5>\n'+
                '                    <div class="col-xl-4 mb-3">\n' +
                '                        选择时间范围：<input onchange="goPageAndTransport(\'null\',this.name,this.value)" name="month-input" type="month">\n' +
                '                    </div>\n'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border table-responsive-sm">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>订单编号</th>\n' +
                '                                <th>截至日期</th>\n' +
                '                                <th>订单金额</th>\n' +
                '                                <th>订单状态</th>\n' +
                '                                <th>订单类型</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("订单为空");
        }
    },
    doError:function () {
        alert("请联系管理员");
    }
}



/**
 * 获取订单详情页面
 * @param o_id
 */
function getOrderDetailMes(o_id){
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getOrderDetailMesCallbackOperation);
}

var getOrderDetailMesCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        console.log(result);
        //制单完成订单页面模板
        if (result['status']==1) {
            let data='';
            if (result['goodsOrders']['goodsOrder']['o_review']=="1"&&result['goodsOrders']['goodsOrder']['o_otype']=="0") {
                let goods='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r\'' +i+7+'\'\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_production']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_price']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_price']*result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+getDeliver(result['goodsOrders']['goodsOrder']['o_deliver'])+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+getIsinvoice(result['goodsOrders']['goodsOrder']['o_deliver'])+'</td>\n' +
                        '                            </tr>\n'+
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r10\'>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r11\'>\n' +
                        '                            </tr>\n';
                }
                data='<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单制作信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'1403\' class="table table-bordered table-responsive-sm" id="big" >\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <col width=\'73\' span=\'5\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
                    '                            <col width=\'72\' style=\'width:54pt\'>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'18\' class=\'x25\' width=\'360\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x25\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x25\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x25\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +

                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                    '                                <td colspan=\'2\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>名称</td>\n' +
                    '                                <td colspan=\'2\' class=\'x22\'>制作工艺</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>单位</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>单价</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>金额</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>发货状态</td>\n' +
                    '                                <td colspan=\'2\' class=\'x24\'>是否开具发票</td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r12\'>\n' +
                    '                                <td colspan=\'3\' height=\'18\' class=\'x25\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>总金额：'+result['goodsOrders']['goodsOrder']['o_price']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r14\'>\n' +
                    '                                <td colspan=\'4\' class=\'x25\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary" >撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="2"&&result['goodsOrders']['goodsOrder']['o_otype']=="0") {
                let goods = '' ;
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                 <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'4\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_production']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_size']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_csize']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_psize']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                        '                            </tr>\n';
                }
                data = '<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单制作信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'1331\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <col width=\'73\' span=\'5\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'18\' class=\'x22\' width=\'360\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                    '                                <td colspan=\'2\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>名称</td>\n' +
                    '                                <td colspan=\'4\' class=\'x23\'>制作工艺</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>衣服尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>裤子尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r9\'>\n' +
                    '                                <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>生产厂：'+result['goodsOrders']['workShop']['w_name']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_wtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>预计完成时间：'+formatDate(result['goodsOrders']['goodsOrder']['o_estimate'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r10\'>\n' +
                    '                                <td height=\'19\' colspan=\'12\' style=\'height:14.25pt;mso-ignore:colspan;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td colspan=\'5\' style=\'mso-ignore:colspan;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r11\'>\n' +
                    '                                <td height=\'18\' style=\'height:13.9pt;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }
            else if (result['goodsOrders']['goodsOrder']['o_review']=="3"&&result['goodsOrders']['goodsOrder']['o_otype']=="0") {
                let goods = '';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+= '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'4\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_production']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_size']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_csize']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_psize']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x23\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n'
                }
                data='<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单审核信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'18\' class=\'x22\' width=\'360\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                    '                                <td colspan=\'2\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>名称</td>\n' +
                    '                                <td colspan=\'4\' class=\'x23\'>制作工艺</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>衣服尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>裤子尺码</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                            </tr>\n' +goods +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r9\'>\n' +
                    '                                <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>生产厂：'+result['goodsOrders']['workShop']['w_name']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_wtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>实际完成时间：'+formatDate(result['goodsOrders']['goodsOrder']['o_wftime'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                </div>\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary">撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="4"&&result['goodsOrders']['goodsOrder']['o_otype']=="0") {
                let goods ='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+= '                        <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r6\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r7\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' ;
                }
                data = '<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单库存信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'19\' class=\'x22\' width=\'360\' style=\'height:14.25pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r4\'>\n' +
                    '                                <td colspan=\'2\' height=\'19\' class=\'x23\' style=\'height:14.25pt;\'>名称</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r9\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>后整理人员：'+result['goodsOrders']['goodsOrder']['o_auname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>整理日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_autime'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r10\'>\n' +
                    '                                <td height=\'19\' colspan=\'12\' style=\'height:14.25pt;mso-ignore:colspan;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r11\'>\n' +
                    '                                <td height=\'19\' style=\'height:14.25pt;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                </div>\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary">撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="3"&&result['goodsOrders']['goodsOrder']['o_otype']=="1"){
                let goods = '';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+= '                         <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r6\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r7\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' ;
                }
                data = '<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">未审核简易订单</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'19\' class=\'x22\' width=\'360\' style=\'height:14.25pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r4\'>\n' +
                    '                                <td colspan=\'2\' height=\'19\' class=\'x23\' style=\'height:14.25pt;\'>名称</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r10\'>\n' +
                    '                                <td height=\'19\' colspan=\'12\' style=\'height:14.25pt;mso-ignore:colspan;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r11\'>\n' +
                    '                                <td height=\'19\' style=\'height:14.25pt;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                </div>\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary">撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="4"&&result['goodsOrders']['goodsOrder']['o_otype']=="1") {
                let goods='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                         <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r6\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r7\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' ;
                }
                data = '<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单外购信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'19\' class=\'x22\' width=\'360\' style=\'height:14.25pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r3\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r4\'>\n' +
                    '                                <td colspan=\'2\' height=\'19\' class=\'x23\' style=\'height:14.25pt;\'>名称</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'订单备注：'+result['goodsOrders']['goodsOrder']['o_remakrs']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r9\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>外购人员：'+result['goodsOrders']['goodsOrder']['o_auname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>外购日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_autime'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r10\'>\n' +
                    '                                <td height=\'19\' colspan=\'12\' style=\'height:14.25pt;mso-ignore:colspan;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r11\'>\n' +
                    '                                <td height=\'19\' style=\'height:14.25pt;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                </div>\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary">撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="5") {
                console.log(result['goodsOrders']);
                let goods ='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r3\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r4\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r5\'>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' ;
                }
                data = '<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单出库信息</h4>\n' +
                    '                    </div>\n' +
                    '                    <div style="overflow: scroll">\n' +
                    '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r0\'>\n' +
                    '                                <td colspan=\'5\' height=\'19\' class=\'x22\' width=\'360\' style=\'height:14.25pt;\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r1\'>\n' +
                    '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r2\'>\n' +
                    '                                <td colspan=\'2\' height=\'19\' class=\'x23\' style=\'height:14.25pt;\'>名称</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                    '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +goods+
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r6\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_oname']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>送货日期：'+formatDateNYR(result['goodsOrders']['stocks'][0]['s_odate'])+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r7\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>收货人：'+result['goodsOrders']['customerAddress']['a_name']+'</td>\n' +
                    '                                <td colspan=\'4\' class=\'x22\'>送货人：'+result['goodsOrders']['goodsOrder']['o_courier']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r8\'>\n' +
                    '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>送货单位：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r9\'>\n' +
                    '                                <td height=\'19\' style=\'height:14.25pt;\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td class=\'x21\'></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <![if supportMisalignedColumns]>\n' +
                    '                            <tr height=\'0\' style=\'display:none\'>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                            </tr>\n' +
                    '                            <![endif]>\n' +
                    '                        </table>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                </div>\n' +
                    '                                <div class="clo-xl-6">\n' +
                    '                                    <button  onclick="revokeOrder()" id="submitBtn" class="btn btn-primary">撤销订单</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else if (result['goodsOrders']['goodsOrder']['o_review']=="6") {
                let goods='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                          <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r5\'>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                                <td colspan=\'2\' rowspan=\'3\' height=\'57\' class=\'x23\' style=\'height:42.75pt;\'>￥'+result['goodsOrders']['orderGoods'][i]['og_count']*result['goodsOrders']['goods'][i]['g_price']+'</td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r6\'>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r7\'>\n' +
                        '                            </tr>\n' ;
                }
                    data = '<div class="content-body">\n' +
                        '    <div class="container-fluid">\n' +
                        '        <!-- row -->\n' +
                        '        <div class="row">\n' +
                        '            <div class="col-lg-12">\n' +
                        '                <div class="card">\n' +
                        '                    <div class="card-header">\n' +
                        '                        <h4 class="card-title">订单结算信息</h4>\n' +
                        '                    </div>\n' +
                        '                    <div style="overflow: scroll">\n' +
                        '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'1185\' class="table table-bordered table-responsive-sm" id="big">\n' +
                        '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                        '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                        '                            <col width=\'73\' span=\'3\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r0\'>\n' +
                        '                                <td colspan=\'5\' height=\'19\' class=\'x22\' width=\'360\' style=\'height:14.25pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                        '                                <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                        '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r1\'>\n' +
                        '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                        '                                <td colspan=\'9\' class=\'x22\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r2\'>\n' +
                        '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                        '                                <td colspan=\'5\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r3\'>\n' +
                        '                                <td colspan=\'4\' height=\'19\' class=\'x24\' style=\'height:14.25pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r4\'>\n' +
                        '                                <td colspan=\'2\' height=\'19\' class=\'x23\' style=\'height:14.25pt;\'>名称</td>\n' +
                        '                                <td colspan=\'2\' class=\'x23\'>规格</td>\n' +
                        '                                <td colspan=\'2\' class=\'x23\'>数量</td>\n' +
                        '                                <td colspan=\'2\' class=\'x23\'>单位</td>\n' +
                        '                                <td colspan=\'2\' class=\'x23\'>金额</td>\n' +
                        '                            </tr>\n' +goods+
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r8\'>\n' +
                        '                                <td colspan=\'3\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>总金额：￥'+result['goodsOrders']['goodsOrder']['o_price']+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>是否发货：'+getDeliver(result['goodsOrders']['goodsOrder']['o_deliver'])+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r9\'>\n' +
                        '                                <td colspan=\'6\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>结算单创建日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_aetime'])+'</td>\n' +
                        '                                <td colspan=\'4\' class=\'x22\'>是否开具发票：'+getIsinvoice(result['goodsOrders']['goodsOrder']['o_isinvoice'])+'</td>\n' +
                        '                                <td colspan=\'6\' height=\'19\' class=\'x22\' style=\'height:14.25pt;\'>发票号：'+result['goodsOrders']['goodsOrder']['o_invoice']+'</td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r10\'>\n' +
                        '                                <td height=\'19\' colspan=\'12\' style=\'height:14.25pt;mso-ignore:colspan;\'></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td colspan=\'3\' style=\'mso-ignore:colspan;\'></td>\n' +
                        '                            </tr>\n' +
                        '                            <tr height=\'19\' style=\'mso-height-source:userset;height:14.25pt\' id=\'r11\'>\n' +
                        '                                <td height=\'19\' style=\'height:14.25pt;\'></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td class=\'x21\'></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                                <td></td>\n' +
                        '                            </tr>\n' +
                        '                            <![if supportMisalignedColumns]>\n' +
                        '                            <tr height=\'0\' style=\'display:none\'>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'72\' style=\'width:54pt\'></td>\n' +
                        '                                <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                        '                                <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                        '                            </tr>\n' +
                        '                            <![endif]>\n' +
                        '                        </table>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</div>';
            }else {
                alert("无此订单");
            }
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("无此订单");
        }
        return;
    },
    doError:function () {
        alert("请联系管理员");
        return;
    }

}

function searchCustomerOrderByCname(o_cid) {
    ajaxRequestGET("/GoodsOrders/2021/GoodsOrders/ocid"+"?o_cid="+o_cid.toString(),searchCustomerOrderByCnameCallbackOperation);
    return;
}

var searchCustomerOrderByCnameCallbackOperation={
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']!=0) {
            let datas='';
            for (let i=0;i<result['goodsOrders'].length;i++) {
                let otype = 'o_id';
                let oname = 'getOrderDetailMes';
                datas+='<tr>\n' +
                    '                                <td><a href="javascript:void(0)" onclick="goPageAndTransport(\'' +otype+'\',\'' +oname+'\',this.id)" id='+result['goodsOrders'][i]['o_id']+'>'+result['goodsOrders'][i]['o_code']+'</a>\n' +
                    '                                </td>\n' +
                    '                                <td>'+formatDateNYR(result['goodsOrders'][i]['o_date'])+'</td>\n' +
                    '                                <td><span class="text-muted">￥'+result['goodsOrders'][i]['o_price']+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td><span class="badge badge-outline-secondary">'+getOReview(result['goodsOrders'][i]['o_review'])+'</span>\n' +
                    '                                </td>\n' +
                    '                                <td>'+getOptype(result['goodsOrders'][i]['o_ptype'])+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">查询订单</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border table-responsive-sm">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>订单编号</th>\n' +
                '                                <th>下单日期</th>\n' +
                '                                <th>订单金额</th>\n' +
                '                                <th>订单状态</th>\n' +
                '                                <th>订单类型</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas +
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("暂无订单");
        }
    },
    doError:function (){
        alert("出错啦，请联系管理员");
    }
}


/**
 * 订单填写第三步，获取所有车间并且并且跳往下一步，获取同一个id的用户的所有产品
 * @param i
 */
function addOrderThird(i) {
    ajaxRequestGET("/WorkShop/2021/workshops",addOrderThirdCallbackOperation);
    return;
}

var addOrderThirdCallbackOperation={
    doSuccess:function (respData) {
        let result = JSON.parse(respData);
        if (result['status']==1) {
            ajaxRequestNull("/Goods/2021/goods/cid/buy"+"?c_id="+sessionStorage.getItem('c_id'),addOrderFourthCallbackOperation,result);
        }else{
            alert("数据加载失败，请联系管理员");
        }
        return ;
    },
    doError:function () {
        alert("数据加载失败，请联系管理员");
        return;
    }
}



var addOrderFourthCallbackOperation = {
    doSuccess:function (respData,workshops) {
        let goods = JSON.parse(respData);
        if (workshops['status']==1&&goods['status']==1){
            let g="";
            let w="<option value='-1'>无</option>";
            for (let i=0;i<goods['goods'].length;i++) {
                g+='<option value='+goods['goods'][i]['g_id']+'>'+goods['goods'][i]['g_explain']+'</option>\n';
            }
            let glength = goods['goods'].length;
            for (let i=0;i<workshops['workshop'].length;i++) {
                w+='<option value='+workshops['workshop'][i]['w_id']+'>'+workshops['workshop'][i]['w_name']+'</option>\n';
            }

            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">添加订单详细信息</h4>\n' +
                '                    </div>\n' +
                '                    <div class="card-body">\n' +
                '                        <div class="form-validation">\n' +
                '                            <form class="form-valide" target="iframe" id="setOrderDetail">\n' +
                '                                <div class="row">\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_ptype">产品类型\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="o_ptype" name="o_ptype">\n' +
                '                                                    <option value="0">敷料</option>\n' +
                '                                                    <option value="1">服饰</option>\n' +
                '                                                    <option value="2">其它</option>\n' +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_otype">订单类型\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="o_otype" name="o_otype">\n' +
                '                                                    <option value="0">制作</option>\n' +
                '                                                    <option value="1">外购</option>\n' +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_date">客户下单日期 <span\n' +
                '                                                    class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="date" class="form-control" id="o_date" name="o_date" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_pay_type">付款类型\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="o_pay_type" name="o_pay_type">\n' +
                '                                                    <option value="0">对公</option>\n' +
                '                                                    <option value="1">对私</option>\n' +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row" id="goodsGroup">\n' +
                '                                            <label class="col-lg-12 col-form-label" for="val-g_production">选择产品/数量\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="input-group col-xs-12" name="goodsbox">\n' +
                '                                                <div class="input-group-btn">\n' +
                '                                                    <div class="col-lg-4">\n' +
                '                                                        <select class="selectpicker" name="o_gid" title="请选择" data-width="auto" data-live-search="true">\n'
                                                                            +g+
                '                                                        </select>\n' +
                '                                                    </div>\n' +
                '                                                </div>\n' +
                '                                                <input type="number" class="form-control" name="goodsnumber" placeholder="请输入产品数量...">\n' +
                '                                                <span class="input-group-btn">\n' +
                '                                                    <input type="button" class="btn btn-default" name="add" value="+" onclick="addGoods(\'' + g.replaceAll("\n", "") + '\',\'' +glength+ '\')">\n' +
                '                                                </span>\n' +
                '                                            </div>\n' +
                '                                       <div class="form-group row">\n' +
                '                                         <input style="visibility: hidden">\n' +
                '                                      </div>\n'+
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_price">订单金额\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_price" required maxlength="10" name="o_price" placeholder="请输入金额...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_isinvoice">是否开具发票\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="o_isinvoice" name="o_isinvoice">\n' +
                '                                                    <option value="0">是</option>\n' +
                '                                                    <option value="1">否</option>\n' +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_wid">选择生产车间\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="o_wid" name="o_wid">\n' + w +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_mname">制单人姓名\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" required maxlength="20" id="o_mname" name="o_mname" placeholder="请输入姓名信息...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_deadline">截止日期 <span\n' +
                '                                                    class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="date" class="form-control" id="o_deadline" name="o_deadline" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_deadline">订单备注 <span\n' +
                '                                                    class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <textarea class="form-control" id="val-suggestions" required name="o_remarks" rows="5" placeholder="请输入订单备注..."></textarea>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <div class="col-lg-8 ml-auto">\n' +
                '                                                <button type="submit" id="submitBtn" onclick="addOrderDetial()" class="btn btn-primary">提交</button>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp;</div>\n' +
                '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
            $('.selectpicker').selectpicker({});
        }else {
            alert("请先添加产品");
        }
    },
    doError:function () {
        alert("数据出错");
    }
}


/**
 * 添加用户详细信息页面提交函数
 */
function addOrderDetial() {
    $("#submitBtn").html("&nbsp");
    let breakFlag = true;
    var formObject = {};
    var formArray = $("#setOrderDetail").serializeArray();
    $("#submitBtn").html("提交中...");
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    let gid = new Array();
    let gcount =  new Array();
    $(".selectpicker").each(function(i,item){
        if ($(this).val().toString().length!=0) {
            gid.push($(this).val());
        }
    });
    $('input[name="goodsnumber"]').each(function(i,item){
        if (!regNumber($(this).val().toString())||$(this).val().toString().length>7) {
            $("#reg_mes").html("数量填写有误或超出范围");
            breakFlag = false;
            return false;
        }
        if ($(this).val().toString().length!=0) {
            gcount.push($(this).val());
        }
    });

    if (breakFlag==false)
        return;

    if (gid.length!=gcount.length) {
        $("#reg_mes").html("产品数量或者产品选择有误");
        return ;
    }
    formObject['o_muid'] = sessionStorage.getItem('u_id');
    formObject['o_address'] = sessionStorage.getItem('a_id');
    formObject['o_cid'] = sessionStorage.getItem('c_id');
    formObject['o_date'] = new Date(String(formObject['o_date'])).getTime();
    formObject['o_deadline'] = new Date(String(formObject['o_deadline'])).getTime();
    formObject['o_gid'] = gid;
    formObject['o_count'] = gcount;
    if (formObject['o_date']>formObject['o_deadline'] ){
        $("#reg_mes").html("截止日期与下单日期冲突");
        $("#submitBtn").html("提交");
        return;
    }
    if (String(formObject["o_price"])==null||String(formObject["o_price"]).length>12||String(formObject["o_price"]).length==0||regMoney(formObject["o_price"])==false){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("订单金额有误");
        return;
    }
    if (String(formObject["o_mname"])==null||String(formObject["o_mname"]).length>20||String(formObject["o_mname"]).length==0){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("制单人姓名有误");
        return;
    }
    if (String(formObject["o_remarks"])==null||String(formObject["o_remarks"]).length>200||String(formObject["o_remarks"]).length==0){
        $("#submitBtn").html("提交");
        $("#reg_mes").html("订单备注应大于1小于200字");
        return;
    }
    $("#submitBtn").attr("disabled", true);
    ajaxRequest("/GoodsOrders/2021/goodsOrders",JSON.stringify(formObject),addOrderDetialCallbackOperation);
    return;
}


var addOrderDetialCallbackOperation={
    doSuccess:function (respData) {
        var result = JSON.parse(respData);
        if (result['status']==1) {
            $("#submitBtn").html("提交成功");
            $("#submitBtn").attr("disabled", true);
        }else {
            $("#submitBtn").attr("disabled", false);
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(String(result["error_desc"]));
        }
        return;
    },
    doError:function () {
        alert("提交失败请联系管理员");
        return;
    }

}


/**
 * 添加订单的第一步，选择用户
 */
function addOrderFirst() {
    let opt="";
    ajaxRequestNull("/Customers/2021/customers",addOrderFirstCallbackOperation,opt);
    return;
}



/**
 * 添加订单的第一步，选择用户回调函数
 */
var addOrderFirstCallbackOperation={
    doSuccess:function (respData,opt) {
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let datas="";
            for (let i=0;i<result['customers'].length;i++) {
                let type1 = "c_id";
                let myname = "addOrderSecond"
                datas+='<tr value="c_id" onclick="goPageAndTransport(\'' + type1 + '\',\'' + myname + '\',this.id)"  id='+result['customers'][i]['c_id']+' style="cursor:pointer"  >\n' +
                    '                                <td><strong>'+String(parseInt(i+1))+'</strong></td>\n' +
                    '                                <td>'+result['customers'][i]['c_company']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_name']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_phone']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_region']+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">选择客户</h4>\n' +
                '                    <li class="nav-item">\n' +
                '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                '                                <input type="text" class="form-control" maxlength="50" name="addOrderFirstSearch" id="searchInput" placeholder="输入单位名称...">\n' +
                '                            <div class="input-group-append">\n' +
                '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="addOrderFirstSearch"><i class="flaticon-381-search-2"></i></a></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                   </li>'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-responsive-md" name="addOrderSecond">\n' +
                '                            <thead >\n' +
                '                            <tr>\n' +
                '                                <th class="width80">序号</th>\n' +
                '                                <th>单位/公司</th>\n' +
                '                                <th>姓名</th>\n' +
                '                                <th>联系电话</th>\n' +
                '                                <th>地区</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert("数据加载失败，请联系管理员");
        }
    },
    doError:function () {
        alert("数据加载失败，请联系管理员");
    }
}


/**
 * 通过商品名称名称模糊搜索外购物品
 */
function buyMesDarkSearch() {
    if ($('#searchInput').val().toString().length==0)
        return ;
    ajaxRequestGET("/Goods/2021/VGname"+"?g_name="+$('#searchInput').val().toString(),getBuyMesCallbackOperation);
    return;
}


/**
 * 获取所有外购商品
 */
function getBuyMes(){
    ajaxRequestGET("/Goods/2021/AllbuyGoods",getBuyMesCallbackOperation);
}

var getBuyMesCallbackOperation={
    doSuccess:function (respData) {

        var result  = JSON.parse(respData);
        if (result['status']==1) {
            let datas = "";
            for (let i=0;i<result['goods'].length;i++) {
                datas+='<tr>\n' +
                    '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_name']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_size']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_csize']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_psize']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_specifications']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_explain']+'</td>\n' +
                    '                                <td>'+result['goods'][i]['g_unit']+'</td>\n' +
                    '                                <td>￥'+result['goods'][i]['g_price']+'</td>\n' +
                    '                            </tr>';
            }

            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">外购信息</h4>\n' +
                '                    <li class="nav-item">\n' +
                '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                '                                <input type="text" class="form-control" maxlength="50" name="searchCustomers" id="searchInput" placeholder="输入物品名称...">\n' +
                '                            <div class="input-group-append">\n' +
                '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="buyMesDarkSearch"><i class="flaticon-381-search-2"></i></a></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                   </li>'+
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-bordered table-responsive-sm" id="big">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th style="font-size: 50%">序号</th>\n' +
                '                                <th style="font-size: 50%">物品名称</th>\n' +
                '                                <th style="font-size: 50%">物品尺码</th>\n' +
                '                                <th style="font-size: 50%">衣服尺码</th>\n' +
                '                                <th style="font-size: 50%">裤子尺码</th>\n' +
                '                                <th style="font-size: 50%">产品规格</th>\n' +
                '                                <th style="font-size: 50%">产品货号</th>\n' +
                '                                <th style="font-size: 50%">单位</th>\n' +
                '                                <th style="font-size: 50%">单价</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
            return;
        }else {
            alert("数据为空");
            return ;
        }
    },
    doError:function () {
        alert("请联系管理员");
        return;
    }
}

/**
 * 获取全部服饰或者辅料页面
 */
function getClothesOrClothMes(){
    ajaxRequestGET("/Goods/2021/clothesorCclth",getClothesOrClothMesCallbackOperation);
}

var getClothesOrClothMesCallbackOperation={
    doSuccess:function (respData) {
      var result  = JSON.parse(respData);
      if (result['status']==1){
          let datas="";
          for (let i=0;i<result['goods'].length;i++) {
              datas+='<tr>\n' +
                  '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                  '                                <td>'+result['goods'][i]['c_company']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_name']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_production']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_size']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_csize']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_psize']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_specifications']+'</td>\n' +
                  '                                <td>'+result['goods'][i]['g_unit']+'</td>\n' +
                  '                                <td>￥'+result['goods'][i]['g_price']+'</td>\n' +
                  '                            </tr>';
          }
          let data='<div class="content-body">\n' +
              '    <div class="container-fluid">\n' +
              '        <div class="col-lg-12">\n' +
              '            <div class="card">\n' +
              '                <div class="card-header">\n' +
              '                    <h4 class="card-title">服饰/辅料信息</h4>\n' +
              '                    <li class="nav-item">\n' +
              '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
              '                                <input type="text" class="form-control" maxlength="50" name="searchCustomers" id="searchInput" placeholder="输入单位名称...">\n' +
              '                            <div class="input-group-append">\n' +
              '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="clothesOrClothMesDarkSearch"><i class="flaticon-381-search-2"></i></a></span>\n' +
              '                            </div>\n' +
              '                        </div>\n' +
              '                   </li>'+
              '                </div>\n' +
              '                <div class="card-body">\n' +
              '                    <div class="table-responsive">\n' +
              '                        <table class="table table-bordered table-responsive-sm" id="big">\n' +
              '                            <thead>\n' +
              '                            <tr>\n' +
              '                                <th style="font-size: 50%">序号</th>\n' +
              '                                <th style="font-size: 50%">公司名称</th>\n' +
              '                                <th style="font-size: 50%">名称</th>\n' +
              '                                <th style="font-size: 50%">制作工艺</th>\n' +
              '                                <th style="font-size: 50%">尺码</th>\n' +
              '                                <th style="font-size: 50%">衣服尺码</th>\n' +
              '                                <th style="font-size: 50%">裤子服尺码</th>\n' +
              '                                <th style="font-size: 50%">规格</th>\n' +
              '                                <th style="font-size: 50%">单位</th>\n' +
              '                                <th style="font-size: 50%">单价</th>\n' +
              '                            </tr>\n' +
              '                            </thead>\n' +
              '                            <tbody>\n' + datas+
              '                            </tbody>\n' +
              '                        </table>\n' +
              '                    </div>\n' +
              '                </div>\n' +
              '            </div>\n' +
              '        </div>\n' +
              '    </div>\n' +
              '</div>';
          $('#content-body').remove();
          var obj = document.getElementById("replace-html");
          obj.innerHTML = data;
      }else {
          alert("数据为空");
      }
    },
    doError:function () {
        alert("请联系管理员");
    }
}


/**
 * 获取所有客户信息并且跳转添加服饰或辅料页面
 */
function addClothesOrClothMes() {
    ajaxRequestGET("/Customers/2021/customers",addClothesOrClothMesCallbackOperation);
}

var addClothesOrClothMesCallbackOperation = {
    doSuccess:function (respData){
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let datas="";
            for(let i=0;i<result['customers'].length;i++) {
                datas+='<option value='+result['customers'][i]['c_id']+'>'+result['customers'][i]['c_company']+'</option>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">添加服饰/辅料</h4>\n' +
                '                    </div>\n' +
                '                    <div class="card-body">\n' +
                '                        <div class="form-validation">\n' +
                '                            <form class="form-valide"target="iframe" id="clothesOrClothOrBuyMesForm">\n' +
                '                                <div class="row">\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_name">产品名称\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="val-g_name" required name="g_name" placeholder="请输入产品名称..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_size">产品尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="val-g_size" name="g_size" placeholder="请输入产品尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_csize">衣服尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="val-g_csize" name="g_csize" placeholder="请输入衣服尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_psize">裤子尺码\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="val-g_psize" name="g_psize" placeholder="请输入裤子尺码..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_production">制作工艺 <span\n' +
                '                                                    class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <textarea class="form-control" id="val-g_production" name="g_production" rows="5" required maxlength="256" placeholder="请输入制作工艺.."></textarea>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_type">产品类型\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="val-g_type" name="g_type">\n' +
                '                                                    <option value="0">敷料</option>\n' +
                '                                                    <option value="1">服饰</option>\n' +
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_price">单价\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="tel" class="form-control" required maxlength="10" id="val-g_price" name="g_price" placeholder="请输入金额...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_unit">单位\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" required maxlength="20" class="form-control" id="val-g_unit" name="g_unit" placeholder="请输入产品单位..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_specifications">产品规格\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" required maxlength="50" class="form-control" id="val-g_specifications" name="g_specifications" placeholder="请输入产品规格..">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-g_explain">产品货号\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input class="form-control" id="val-g_explain" name="g_explain" rows="5" maxlength="32" required placeholder="请输入产品产品货号.."></input>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="val-customer">绑定客户\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <select class="form-control default-select" required id="val-customer" name="g_cid">\n' +
                                                                    datas+
                '                                                </select>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp;</div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <div class="col-lg-8 ml-auto">\n' +
                '                                                <button type="submit" id="submitBtn" onclick="addClothesOrCloth()" class="btn btn-primary">提交</button>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("加载失败请联系管理员");
        }
        return;
    },
    doError:function () {
        alert("获取失败");
        return;
    }
}


/**
 * 通过公司名称模糊搜索客户
 */
function getCustomerByDarkSearch() {
    if ($('#searchInput').val().toString().length==0)
        return ;
    ajaxRequestGET("/Customers/2021/customers/vccompany"+"?c_company="+$('#searchInput').val().toString(),showAllCustomerCallbackOperation);
    return;
}

/**
 * 通过公司名称模糊搜索服饰和辅料
 */

function clothesOrClothMesDarkSearch(){
    if ($('#searchInput').val().toString().length==0)
        return ;
    ajaxRequestGET("/Goods/2021/VCcompany"+"?c_company="+$('#searchInput').val().toString(),getClothesOrClothMesCallbackOperation);
    return;
}

/**
 * 添加订单第二步的页面选择选中id的客户的地址
 * @param i
 */
function addOrderSecond(i){
    ajaxRequestGET("/Customers/2021/customer/address/id"+"?c_id="+i.toString(),addOrderSecondCallbackOperation);
    return;
}

/**
 * 添加订单第二步的页面选择选中id的客户的地址的回调函数
 */
var addOrderSecondCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]==1) {
            if (result["customer_addresses"].length==0){
                alert("地址为空");
                return ;
            }

            let datas="";
            let type1 = "a_id"
            let myname = "addOrderThird"
            for (let i=0;i<result["customer_addresses"].length;i++) {
                datas+='<tr class="table-success" onclick="goPageAndTransport(\'' + type1 + '\',\'' + myname + '\',this.id)" name="addOrderThird" id= '+result['customer_addresses'][i]['a_id']+' style="cursor:pointer">\n' +
                    '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_name']+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_phone']+'</td>\n' +
                    '                                <td>'+formatDate(result['customer_addresses'][i]['a_date'])+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_address']+'</td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">选择地址</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>序号</th>\n' +
                '                                <th>地址联系人姓名</th>\n' +
                '                                <th>地址联系人电话</th>\n' +
                '                                <th>上一次使用此地址时间</th>\n' +
                '                                <th>详细地址</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' + datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }
        else{
            alert("加载失败");
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}


/**
 * 获取一个客户的所有托运部信息
 * @param i
 */
function getCustomerCos(i) {
    ajaxRequestGET("/Customers/2021/customer/consignment/id"+"?c_id="+i.toString(),getCustomerCosCallbackOperation);
    return;
}

var getCustomerCosCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]==1) {
            if (result["customer_consignment"].length==0){
                alert("地址为空");
                return ;
            }

            let datas="";
            for (let i=0;i<result["customer_consignment"].length;i++) {
                datas+='<tr class="table-success">\n' +
                    '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                <td>'+result['customer_consignment'][i]['co_name']+'</td>\n' +
                    '                                <td>'+result['customer_consignment'][i]['co_phone']+'</td>\n' +
                    '                                <td>'+formatDate(result['customer_consignment'][i]['co_date'])+'</td>\n' +
                    '                                <td>'+result['customer_consignment'][i]['co_department']+'</td>\n' +
                    '                            </tr>';
            }

            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">客户托运部</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>序号</th>\n' +
                '                                <th>托运部联系人</th>\n' +
                '                                <th>托运部联系人电话</th>\n' +
                '                                <th>上一次使用此托运部时间</th>\n' +
                '                                <th>托运部详细地址</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +
                datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }
        else{
            alert("加载失败");
        }
    },
    doError:function () {
        alert("error,请联系管理员");
    }
}


/**
 * 获取一个客户的所有地址
 */
function getCustomerAds(i) {
    ajaxRequestGET("/Customers/2021/customer/address/id"+"?c_id="+i.toString(),getCustomerAdsCallbackOperation);
    return;
}



/**
 * 获取选中客户地址并输出页面回调函数
 */
var getCustomerAdsCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]==1) {
            if (result["customer_addresses"].length==0){
                alert("地址为空");
                return ;
            }
            let datas="";
            for (let i=0;i<result["customer_addresses"].length;i++) {
                datas+='<tr class="table-success">\n' +
                    '                                <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_name']+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_phone']+'</td>\n' +
                    '                                <td>'+formatDate(result['customer_addresses'][i]['a_date'])+'</td>\n' +
                    '                                <td>'+result['customer_addresses'][i]['a_address']+'</td>\n' +
                    '                            </tr>';
            }

            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">客户地址</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table header-border">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th>序号</th>\n' +
                '                                <th>地址联系人姓名</th>\n' +
                '                                <th>地址联系人电话</th>\n' +
                '                                <th>上一次使用此地址时间</th>\n' +
                '                                <th>详细地址</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +
                                                        datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }
        else{
            alert("加载失败");
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}
/**
 * 获取所有用户并且加载展示页面，用于展示用户信息所用
 */
function showCustomerDetail() {
    let opt="";
    ajaxRequestNull("/Customers/2021/customers",showAllCustomerCallbackOperation,opt);
    return;
}

/**
 * 获取所有用户并且加载展示页面回调函数，用于展示用户信息所用
 */

var showAllCustomerCallbackOperation={
    doSuccess:function (respData,opt) {
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let datas="";
            let type1="c_id";
            for (let i=0;i<result['customers'].length;i++) {
                datas+='<tr>\n' +
                    '                                <td><strong>'+String(parseInt(i+1))+'</strong></td>\n' +
                    '                                <td>'+result['customers'][i]['c_company']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_name']+'</td>\n' +
                    '                                <td>'+result['customers'][i]['c_phone']+'</td>\n' +
                    '                                <td><span class="badge light badge-success">正常</span></td>\n' +
                    '                                <td>'+result['customers'][i]['c_region']+'</td>\n' +
                    '                                <td>\n' +
                    '                                    <div class="dropdown">\n' +
                    '                                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">\n' +
                    '                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>\n' +
                    '                                        </button>\n' +
                    '                                        <div class="dropdown-menu">\n' +
                    '                                            <a class="dropdown-item" href="javascript:void(0)" onclick="goPageAndTransport(\'' + type1 + '\',this.name,this.id)" name="getCustomerAds" id='+result['customers'][i]['c_id']+'>地址</a>\n' +
                    '                                            <a class="dropdown-item" href="javascript:void(0)"  onclick="goPageAndTransport(\'' + type1 + '\',this.name,this.id)" name="getCustomerCos" id='+result['customers'][i]['c_id']+'>托运部</a>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </td>\n' +
                    '                            </tr>';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">客户信息</h4>\n' +
                '                    <li class="nav-item">\n' +
                '                        <div class="input-group search-area d-xl-inline-flex d-none">\n' +
                '                                <input type="text" class="form-control" maxlength="50" name="searchCustomers" id="searchInput" placeholder="输入单位名称...">\n' +
                '                            <div class="input-group-append">\n' +
                '                                <span class="input-group-text"><a href="javascript:void(0)" onclick="goPage(this.name)" name="customerMesDarkSearch"><i class="flaticon-381-search-2"></i></a></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                 '                   </li>'+
                '                </div>\n' +
                '                <div class="card-body" style="clear:both;">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table class="table table-responsive-md">\n' +
                '                            <thead>\n' +
                '                            <tr>\n' +
                '                                <th class="width80">序号</th>\n' +
                '                                <th>单位/公司</th>\n' +
                '                                <th>姓名</th>\n' +
                '                                <th>联系电话</th>\n' +
                '                                <th>状态</th>\n' +
                '                                <th>地区</th>\n' +
                '                                <th>地址/托运部</th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody>\n' +datas+
                '                            </tbody>\n' +
                '                        </table>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert("数据加载失败，请联系管理员");
        }
    },
    doError:function () {
        alert("数据加载失败，请联系管理员");
    }
}

/**
 * 获取所有用户
 */
function editAllCustomer(opt){
    ajaxRequestNull("/Customers/2021/customers",editAllCustomerCallbackOperation,opt);
    return;
}

/**
 * 获取所有用户回调函数
 */
var editAllCustomerCallbackOperation={
    doSuccess:function(respData,opt){
        var result = JSON.parse(respData);
        if (result['status']==1) {
            let type="";
            if(opt=="addCustomerConsignmentMesDetail")
                type="添加托运部信息";
            else
                type="添加地址信息";
            let datas="";
            var type1="c_id";
            for (let i=0;i<result['customers'].length;i++) {
                datas+='<tr>\n' +
                    '                                    <td>'+String(parseInt(i+1))+'</td>\n' +
                    '                                    <td>'+result['customers'][i]['c_company']+'</td>\n' +
                    '                                    <td>'+result['customers'][i]['c_name']+'</td>\n' +
                    '                                    <td>'+result['customers'][i]['c_phone']+'</td>\n' +
                    '                                    <td>'+result['customers'][i]['c_region']+'</td>\n' +
                    '                                    <td>\n' +
                    '                                        <div class="d-flex">\n' +
                    '                                            <a href="javascript:void(0)"onclick="goPageAndTransport(\'' + type1 + '\',this.name,this.id)" name='+opt+' id='+result['customers'][i]['c_id']+'  class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>\n' +
                    '                                        </div>\n' +
                    '                                    </td>\n' +
                    '                                </tr>\n';
            }
            let data = '<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">客户列表</h4>\n' +
                '                    </div>\n' +
                '                    <div class="card-body" style="height:auto !important;">\n' +
                '                        <div class="table-responsive">\n' +
                '                            <table class="table table-responsive-md">\n' +
                '                                <thead>\n' +
                '                                <tr>\n' +
                '                                    <th>序号</th>\n' +
                '                                    <th>单位/公司</th>\n' +
                '                                    <th>姓名</th>\n' +
                '                                    <th>电话</th>\n' +
                '                                    <th>地区</th>\n' +
                '                                    <th>'+type+'</th>\n' +
                '                                </tr>\n' +
                '                                </thead>\n' +
                '                                <tbody >\n' +datas+
                '                                </tbody>\n' +
                '                            </table>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else{
            alert("数据加载失败，请联系管理员");
        }
    },
    doError:function(){
        alert("数据加载失败，请联系管理员");
    }
}