function goUserPages(n,i) {
    if (n=="checkOrder") {
        checkOrder();
        return ;
    }

    if (n=="getWillCheckOrderDetail") {
        getWillCheckOrderDetail(i);
        return ;
    }

    if (n=="updateOrderCheck") {
        updateOrderCheck();
        return ;
    }
    if (n=="outOrder") {
        outOrder();
        return;
    }

    if (n=="getWillOutOrderDetail") {
        getWillOutOrderDetail(i);
        return ;
    }

    if (n=="updateOrderOut") {
        updateOrderOut();
        return ;
    }

    if (n=="settlementOrder") {
        settlementOrder();
        return ;
    }

    if (n=="getWillSettlementOrderDetail") {
        getWillSettlementOrderDetail(i);
        return ;
    }

    if (n=="updateOrderSettlement") {
        updateOrderSettlement();
        return ;
    }
}

function updateOrderSettlement(){
    var formObject = {};
    var formArray = $("#settlementMessage").serializeArray();
    $("#submitBtn").html("提交中...");
    $("#submitBtn").attr("disabled", true);
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    formObject['o_aetime'] =new Date().valueOf();
    formObject['o_id'] = sessionStorage.getItem("o_id");
    formObject['o_aeid'] = sessionStorage.getItem("u_id");
    if (formObject['o_aename'].length==0||formObject['o_aename'].length>20){
        $("#reg_mes").html("姓名格式有误或太长");
        $("#submitBtn").html("提交");
        $("#submitBtn").attr("disabled", false);
        return ;
    }
    if (String(formObject['o_isinvoice'])=="0") {
        if (formObject['o_invoice'].length>12) {
            $("#reg_mes").html("发票号码格式有误");
            $("#submitBtn").html("提交");
            $("#submitBtn").attr("disabled", false);
            return ;
        }
    }
    ajaxRequest("/Users/2021/goodsorder/settlement",JSON.stringify(formObject),updateOrderSettlementCallbackOperation);
}

var updateOrderSettlementCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);

        if (result['status']==1) {
            $("#submitBtn").html("提交成功");
        }else{
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function (){
        alert("请联系管理员");
        $("#submitBtn").html("提交失败");
    }
}


function getWillSettlementOrderDetail(o_id) {
    if (sessionStorage.getItem("o_id")!=null) {
        sessionStorage.removeItem('o_id');
    }
    sessionStorage.setItem("o_id",o_id);
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getWillSettlementOrderDetailCallbackOperation);
}

var getWillSettlementOrderDetailCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        //制单完成订单页面模板
        if (result['status']==1) {
            let goods ='';
            for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                goods+='                     <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_price']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']*result['goodsOrders']['goods'][i]['g_price']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+getDeliver(result['goodsOrders']['goodsOrder']['o_deliver'])+'</td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r9\'>\n' +
                    '                        </tr>\n';
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">结算信息</h4>\n' +
                '                    </div>\n' +
                '                  <div style="overflow:scroll;">\n'+
                '                    <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'1403\' class="table table-bordered table-responsive-sm" >\n' +
                '                        <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                '                        <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                '                        <col width=\'73\' span=\'5\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
                '                        <col width=\'72\' style=\'width:54pt\'>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                '                            <td colspan=\'5\' height=\'18\' class=\'x25\' width=\'360\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                '                            <td colspan=\'5\' class=\'x25\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                '                            <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                '                            <td colspan=\'9\' class=\'x25\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                '                            <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>生产类型：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x25\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                '                            <td colspan=\'5\' class=\'x25\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                '                            <td colspan=\'4\' height=\'18\' class=\'x26\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x25\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x25\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                '                            <td colspan=\'2\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>名称</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>规格</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>数量</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>单位</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>单价</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>金额</td>\n' +
                '                            <td colspan=\'2\' class=\'x24\'>发货状态</td>\n' +
                '                        </tr>\n' +goods+
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r10\'>\n' +
                '                            <td colspan=\'3\' height=\'18\' class=\'x25\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x25\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                        </tr>\n' +
                '                        <![if supportMisalignedColumns]>\n' +
                '                        <tr height=\'0\' style=\'display:none\'>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                '                            <td width=\'73\' style=\'width:54.75pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                        </tr>\n' +
                '                        <![endif]>\n' +
                '                    </table>\n' +
                    '</div>\n'+
                '                    <div class="card-body">\n' +
                '                        <div class="form-validation">\n' +
                '                            <form class="form-valide" target="iframe" id="settlementMessage">\n' +
                '                                <div class="row">\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_aename">结算人\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_aename" required maxlength="10" name="o_aename" placeholder="请输入姓名信息...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="clo-xl-6">\n' +
                '                                        <div class="form-group">\n' +
                '                                            <label class="mb-1 text-black"><strong>是否开具发票</strong></label>\n' +
                '                                            <span class="text-danger">*</span>\n' +
                '                                            <label><input name="o_isinvoice" type="radio" checked="true" value="0" />是 </label>\n' +
                '                                            <label><input name="o_isinvoice" type="radio" value="1" />否 </label>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_invoice">发票号(开发票必填)\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_invoice" maxlength="12" name="o_invoice" >\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <div class="col-lg-8 ml-auto">\n' +
                '                                                <button  onclick="goUserPages(this.name,this.id)" name="updateOrderSettlement" id="submitBtn" class="btn btn-primary">提交</button>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
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
        }
    },
    doError:function (){
        alert("请联系管理员");
    }
}


function settlementOrder() {
    var o_muid = sessionStorage.getItem("u_id");
    ajaxRequestGET("/Users/2021/arrangement?o_muid="+o_muid.toString()+"&o_review=5",settlementOrderCallbackOperation);
}

var settlementOrderCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1){
            let datas='';
            for (let i=0;i<result['goodsOrder'].length;i++) {
                datas+='                                    <tr>\n' +
                    '                                            <td><a href="javascript:void(0)" onclick="goUserPages(this.name,this.id)" name="getWillSettlementOrderDetail" id='+result['goodsOrder'][i]['o_id']+'  >'+result['goodsOrder'][i]['o_code']+'</a>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+formatDateNYR(result['goodsOrder'][i]['o_deadline'])+'</td>\n' +
                    '                                            <td><span class="text-muted">'+getOptype(result['goodsOrder'][i]['g_type'])+'</span>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_price']+'</td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_count']+'</td>\n' +
                    '                                            <td><span class="badge border-success">待结算</span>\n' +
                    '                                            </td>\n' +
                    '                                        </tr>';
            }
            let data = ' <div class="content-body">\n' +
                '                        <div class="container-fluid">\n' +
                '                            <!-- Add Order -->\n' +
                '                            <div class="row">\n' +
                '                                <div class="col-lg-12">\n' +
                '                                    <div class="card">\n' +
                '                                        <div class="card-header">\n' +
                '                                            <h4 class="card-title">待结算订单</h4>\n' +
                '                                        </div>\n' +
                '                                        <div class="card-body">\n' +
                '                                            <div class="table-responsive">\n' +
                '                                                <table class="table header-border table-responsive-sm">\n' +
                '                                                    <thead>\n' +
                '                                                    <tr>\n' +
                '                                                        <th>订单编号</th>\n' +
                '                                                        <th>截止日期</th>\n' +
                '                                                        <th>订单类型</th>\n' +
                '                                                        <th>订单总价</th>\n' +
                '                                                        <th>订单数量</th>\n' +
                '                                                        <th>订单状态</th>\n' +
                '                                                    </tr>\n' +
                '                                                    </thead>\n' +
                '                                                    <tbody>\n' + datas+
                '                                                    </tbody>\n' +
                '                                                </table>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("订单为空");
        }
    },
    doError:function () {
        alert("查询失败请联系管理员");
    }
}


function updateOrderOut(gids){
    var formObject = {};
    var formArray = $("#outMessage").serializeArray();
    $("#submitBtn").html("提交中...");
    $("#submitBtn").attr("disabled", true);
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    formObject['o_otime'] =new Date().valueOf();
    formObject['o_id'] = sessionStorage.getItem("o_id");
    formObject['o_oid'] = sessionStorage.getItem("u_id");
    formObject['s_odate'] = (new Date(String(formObject['s_odate']))).valueOf();
    if (formObject['o_oname'].length==0||formObject['o_oname'].length>20){
        $("#reg_mes").html("姓名格式有误或太长");
        $("#submitBtn").html("提交");
        $("#submitBtn").attr("disabled", false);
        return ;
    }
    if (formObject['o_price'].length!=0) {
        if (!regMoney(formObject['o_price'])||formObject['o_price'].length>12) {
            $("#reg_mes").html("金额格式有误");
            $("#submitBtn").html("提交");
            $("#submitBtn").attr("disabled", false);
            return ;
        }
    }
    ajaxRequest("/Users/2021/goodsorder/outorder",JSON.stringify(formObject),updateOrderOutCallbackOperation);
}

var updateOrderOutCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);

        if (result['status']==1) {
            $("#submitBtn").html("提交成功");
        }else{
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function (){
        alert("请联系管理员");
        $("#submitBtn").html("提交失败");
    }
}


function getWillOutOrderDetail(o_id){
    if (sessionStorage.getItem("o_id")!=null) {
        sessionStorage.removeItem('o_id');
    }
    sessionStorage.setItem("o_id",o_id);
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getWillOutOrderDetailCallbackOperation);
}

var getWillOutOrderDetailCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        //制单完成订单页面模板
        if (result['status']==1) {
            let goods ='';
            for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                goods+='                     <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                    '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>￥'+result['goodsOrders']['goods'][i]['g_price']+'</td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                    '                        </tr>\n' ;
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <!-- row -->\n' +
                '        <div class="row">\n' +
                '            <div class="col-lg-12">\n' +
                '                <div class="card">\n' +
                '                    <div class="card-header">\n' +
                '                        <h4 class="card-title">出库信息</h4>\n' +
                '                    </div>\n' +
                '                    <div style="overflow:scroll;">\n'+
                '                    <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm">\n' +
                '                        <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                '                        <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                '                            <td colspan=\'5\' height=\'18\' class=\'x23\' width=\'360\' style=\'height:13.9pt;\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                '                            <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                '                            <td colspan=\'9\' class=\'x23\'>送货接收地：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                '                        </tr>\n' +
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                '                            <td colspan=\'2\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>名称</td>\n' +
                '                            <td colspan=\'2\' class=\'x22\'>规格</td>\n' +
                '                            <td colspan=\'2\' class=\'x22\'>数量</td>\n' +
                '                            <td colspan=\'2\' class=\'x22\'>单位</td>\n' +
                '                            <td colspan=\'2\' class=\'x22\'>单价</td>\n' +
                '                        </tr>\n' +goods+
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                '                            <td colspan=\'2\' class=\'x22\'>总金额：￥'+result['goodsOrders']['goodsOrder']['o_price']+'</td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                            <td class=\'x21\'></td>\n' +
                '                            <td></td>\n' +
                '                            <td></td>\n' +
                '                        </tr>\n' +
                '                        <![if supportMisalignedColumns]>\n' +
                '                        <tr height=\'0\' style=\'display:none\'>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                '                            <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                '                        </tr>\n' +
                '                        <![endif]>\n' +
                '                    </table>\n' +
                '                     </div>\n'+
                '                    <div class="card-body">\n' +
                '                        <div class="form-validation">\n' +
                '                            <form class="form-valide" target="iframe" id="outMessage">\n' +
                '                                <div class="row">\n' +
                '                                    <div class="col-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_oname">出库制单人\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_oname" required maxlength="10" name="o_oname" placeholder="请输入姓名信息...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_courier">送货人\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_courier" required maxlength="10" name="o_courier" placeholder="请输入送货人姓名...">\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="s_odate">送货日期\n' +
                '                                                <span class="text-danger">*</span>\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="date" class="form-control" id="s_odate" required name="s_odate" >\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="clo-xl-6">\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <label class="col-lg-4 col-form-label" for="o_price">总金额(如果需要修改)\n' +
                '                                            </label>\n' +
                '                                            <div class="col-lg-6">\n' +
                '                                                <input type="text" class="form-control" id="o_price" maxlength="11" name="o_price" >\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group row">\n' +
                '                                            <div class="col-lg-8 ml-auto">\n' +
                '                                                <button  onclick="goUserPages(this.name,this.id)" name="updateOrderOut" id="submitBtn" class="btn btn-primary">提交</button>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
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
        }
    },
    doError:function (){
        alert("请联系管理员");
    }
}


function outOrder() {
    var o_muid = sessionStorage.getItem("u_id");
    ajaxRequestGET("/Users/2021/arrangement?o_muid="+o_muid.toString()+"&o_review=4",outOrderCallbackOperation);
}


var outOrderCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1){
            let datas='';
            for (let i=0;i<result['goodsOrder'].length;i++) {
                datas+='<tr>\n' +
                    '                                            <td><a href="javascript:void(0)" onclick="goUserPages(this.name,this.id)" name="getWillOutOrderDetail" id='+result['goodsOrder'][i]['o_id']+'  >'+result['goodsOrder'][i]['o_code']+'</a>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+formatDateNYR(result['goodsOrder'][i]['o_deadline'])+'</td>\n' +
                    '                                            <td><span class="text-muted">'+getOptype(result['goodsOrder'][i]['g_type'])+'</span>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_count']+'</td>\n' +
                    '                                            <td><span class="badge badge-outline-light">待出库</span>\n' +
                    '                                            </td>\n' +
                    '                                        </tr>';
            }
            let data = ' <div class="content-body">\n' +
                '                        <div class="container-fluid">\n' +
                '                            <!-- Add Order -->\n' +
                '                            <div class="row">\n' +
                '                                <div class="col-lg-12">\n' +
                '                                    <div class="card">\n' +
                '                                        <div class="card-header">\n' +
                '                                            <h4 class="card-title">待审出库订单</h4>\n' +
                '                                        </div>\n' +
                '                                        <div class="card-body">\n' +
                '                                            <div class="table-responsive">\n' +
                '                                                <table class="table header-border table-responsive-sm">\n' +
                '                                                    <thead>\n' +
                '                                                    <tr>\n' +
                '                                                        <th>订单编号</th>\n' +
                '                                                        <th>截止日期</th>\n' +
                '                                                        <th>订单类型</th>\n' +
                '                                                        <th>订单数量</th>\n' +
                '                                                        <th>订单状态</th>\n' +
                '                                                    </tr>\n' +
                '                                                    </thead>\n' +
                '                                                    <tbody>\n' + datas+
                '                                                    </tbody>\n' +
                '                                                </table>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("订单为空");
        }
    },
    doError:function () {
        alert("查询失败请联系管理员");
    }
}


function updateOrderCheck(){
    var formObject = {};
    var formArray = $("#checkName").serializeArray();
    $("#submitBtn").html("提交中...");
    $("#submitBtn").attr("disabled", true);
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    formObject['o_autime'] =new Date().valueOf();
    formObject['o_id'] = sessionStorage.getItem("o_id");
    formObject['o_auid'] = sessionStorage.getItem("u_id");
    if (formObject['o_auname'].length==0||formObject['o_auname'].length>20){
        $("#reg_mes").html("姓名格式有误或太长");
        $("#submitBtn").attr("disabled", false);
        return ;
    }
    ajaxRequest("/Users/2021/goodsorder/arrangement/check/finish",JSON.stringify(formObject),updateOrderCheckCallbackOperation);
}

var updateOrderCheckCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);

        if (result['status']==1) {
            $("#submitBtn").html("提交成功");
        }else{
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function (){
        alert("请联系管理员");
    }
}

function getWillCheckOrderDetail(o_id){
    if (sessionStorage.getItem("o_id")!=null) {
        sessionStorage.removeItem('o_id');
    }
    sessionStorage.setItem("o_id",o_id);
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getWillCheckOrderDetailCallbackOperation);
}

var getWillCheckOrderDetailCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        //制单完成订单页面模板
        if (result['status']==1) {
            let data ='';
            if (result['goodsOrders']['goodsOrder']['o_otype']=="0") {
                let goods = '';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++){
                    goods+='                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' +
                        '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' +
                        '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' ;
                }
                data='<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单整理</h4>\n' +
                    '                    </div>\n' +
                    '                  <div style="overflow:scroll;">\n'+
                    '                    <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                        <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                        <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                    '                            <td colspan=\'4\' height=\'18\' class=\'x22\' width=\'288\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                            <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                    '                            <td colspan=\'4\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                            <td colspan=\'6\' class=\'x22\'>送货地址：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>生产类别：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                            <td colspan=\'3\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                            <td class=\'x21\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                            <td colspan=\'2\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                            <td colspan=\'3\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                    '                            <td colspan=\'2\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>名称</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>规格</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>数量</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>单位</td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +goods+
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r9\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>生产负责人：'+result['goodsOrders']['goodsOrder']['o_wname']+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>接单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_wtime'])+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>完成日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_wftime'])+'</td>\n' +
                    '                        </tr>\n' +
                    '                        <![if supportMisalignedColumns]>\n' +
                    '                        <tr height=\'0\' style=\'display:none\'>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <![endif]>\n' +
                    '                    </table>\n' +
                    '                   </div>\n'+
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <form class="form-valide" target="iframe" id="checkName">\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-xl-6">\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <label class="col-lg-4 col-form-label" for="o_auname">审查负责人\n' +
                    '                                                <span class="text-danger">*</span>\n' +
                    '                                            </label>\n' +
                    '                                            <div class="col-lg-6">\n' +
                    '                                                <input type="text" class="form-control" id="o_auname" required maxlength="10" name="o_auname" placeholder="请输入姓名信息...">\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-xl-6">\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <label class="col-lg-4 col-form-label" for="o_review">是否合格\n' +
                    '                                                <span class="text-danger">*</span>\n' +
                    '                                            </label>\n' +
                    '                                            <div class="col-lg-6">\n' +
                    '                                                <select class="form-control default-select" required id="o_review" name="o_review">\n' +
                    '                                                    <option value="4">是</option>\n' +
                    '                                                    <option value="1">否</option>\n' +
                    '                                                </select>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <div class="col-lg-8 ml-auto">\n' +
                    '                                                <button  onclick="goUserPages(this.name,this.id)" name="updateOrderCheck"  id="submitBtn" class="btn btn-primary">提交入库</button>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </form>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }else {
                let goods ='';
                for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                    goods+='                     <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                        '                            <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x24\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' +
                        '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' +
                        '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                            <td></td>\n' +
                        '                        </tr>\n' ;
                }
                data='<div class="content-body">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <!-- row -->\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-lg-12">\n' +
                    '                <div class="card">\n' +
                    '                    <div class="card-header">\n' +
                    '                        <h4 class="card-title">订单整理</h4>\n' +
                    '                    </div>\n' +
                    '<div style="overflow:scroll;">\n'+
                    '                    <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'966\' class="table table-bordered table-responsive-sm" id="big">\n' +
                    '                        <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                    '                        <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                    '                            <td colspan=\'4\' height=\'18\' class=\'x22\' width=\'288\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                    '                            <td colspan=\'5\' class=\'x22\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                    '                            <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                    '                            <td colspan=\'4\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                    '                            <td colspan=\'9\' class=\'x22\'>送货地址：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>生产类别：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                    '                            <td colspan=\'3\' class=\'x22\'>订单类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                    '                            <td class=\'x21\'></td>\n' +
                    '                            <td class=\'x21\'></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                    '                            <td colspan=\'2\' class=\'x22\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                    '                            <td colspan=\'3\' class=\'x22\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                    '                            <td colspan=\'2\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>名称</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>规格</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>数量</td>\n' +
                    '                            <td colspan=\'2\' class=\'x24\'>单位</td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +goods+
                    '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                    '                            <td colspan=\'3\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                    '                            <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                            <td></td>\n' +
                    '                        </tr>\n' +
                    '                        <![if supportMisalignedColumns]>\n' +
                    '                        <tr height=\'0\' style=\'display:none\'>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'72\' style=\'width:54pt\'></td>\n' +
                    '                            <td width=\'102\' style=\'width:76.5pt\'></td>\n' +
                    '                        </tr>\n' +
                    '                        <![endif]>\n' +
                    '                    </table>\n' +
                    '</div>\n'+
                    '                    <div class="card-body">\n' +
                    '                        <div class="form-validation">\n' +
                    '                            <form class="form-valide" target="iframe" id="checkName">\n' +
                    '                                <div class="row">\n' +
                    '                                    <div class="col-xl-6">\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <label class="col-lg-4 col-form-label" for="o_auname">外购人员\n' +
                    '                                                <span class="text-danger">*</span>\n' +
                    '                                            </label>\n' +
                    '                                            <div class="col-lg-6">\n' +
                    '                                                <input type="text" class="form-control" id="o_auname" required maxlength="10" name="o_auname" placeholder="请输入姓名信息...">\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-xl-6">\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <label class="col-lg-4 col-form-label" for="o_review">是否已经外购\n' +
                    '                                                <span class="text-danger">*</span>\n' +
                    '                                            </label>\n' +
                    '                                            <div class="col-lg-6">\n' +
                    '                                                <select class="form-control default-select" required id="o_review" name="o_review">\n' +
                    '                                                    <option value="4">是</option>\n' +
                    '                                                    <option value="1">否</option>\n' +
                    '                                                </select>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="form-group row">\n' +
                    '                                            <div class="col-lg-8 ml-auto">\n' +
                    '                                                <button  onclick="goUserPages(this.name,this.id)" name="updateOrderCheck"  id="submitBtn" class="btn btn-primary">提交</button>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </form>\n' +
                    '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                    '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
            }

            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }
    },
    doError:function (){
        alert("请联系管理员");
    }
}

function checkOrder() {
    var o_muid = sessionStorage.getItem("u_id");
    ajaxRequestGET("/Users/2021/arrangement?o_muid="+o_muid.toString()+"&o_review=3",checkOrderCallbackOperation);
}


var checkOrderCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1){
            let datas='';
            for (let i=0;i<result['goodsOrder'].length;i++) {
                datas+='<tr>\n' +
                    '                                            <td><a href="javascript:void(0)" onclick="goUserPages(this.name,this.id)" name="getWillCheckOrderDetail" id='+result['goodsOrder'][i]['o_id']+'  >'+result['goodsOrder'][i]['o_code']+'</a>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+formatDateNYR(result['goodsOrder'][i]['o_deadline'])+'</td>\n' +
                    '                                            <td><span class="text-muted">'+getOotype(result['goodsOrder'][i]['o_otype'])+'</span>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_wname']+'</td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_count']+'</td>\n' +
                    '                                            <td><span class="badge badge-info">待审核</span>\n' +
                    '                                            </td>\n' +
                    '                                        </tr>';
            }
            let data = ' <div class="content-body">\n' +
                '                        <div class="container-fluid">\n' +
                '                            <!-- Add Order -->\n' +
                '                            <div class="row">\n' +
                '                                <div class="col-lg-12">\n' +
                '                                    <div class="card">\n' +
                '                                        <div class="card-header">\n' +
                '                                            <h4 class="card-title">待审核订单</h4>\n' +
                '                                        </div>\n' +
                '                                        <div class="card-body">\n' +
                '                                            <div class="table-responsive">\n' +
                '                                                <table class="table header-border table-responsive-sm">\n' +
                '                                                    <thead>\n' +
                '                                                    <tr>\n' +
                '                                                        <th>订单编号</th>\n' +
                '                                                        <th>截止日期</th>\n' +
                '                                                        <th>订单类型</th>\n' +
                '                                                        <th>生产车间</th>\n' +
                '                                                        <th>订单数量</th>\n' +
                '                                                        <th>订单状态</th>\n' +
                '                                                    </tr>\n' +
                '                                                    </thead>\n' +
                '                                                    <tbody>\n' + datas+
                '                                                    </tbody>\n' +
                '                                                </table>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            $('#content-body').remove();
            var obj = document.getElementById("replace-html");
            obj.innerHTML = data;
        }else {
            alert("订单为空");
        }
    },
    doError:function () {
        alert("查询失败请联系管理员");
    }
}
