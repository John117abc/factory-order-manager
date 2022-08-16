function goWorkShopPages(n,i) {
    if (n=="getWillMakeOrders") {
        getWillMakeOrders();
        return ;
    }

    if(n=="getWillMakeOrderDetail") {
        getWillMakeOrderDetail(i);
        return ;
    }

    if (n=="updateOrderMakeTime") {
        updateOrderMakeTime();
        return ;
    }

    if (n=="getWillFinishMakeOrders") {
        getWillFinishMakeOrders();
        return ;
    }

    if (n=="getWillFinishMakeOrderDetail") {
        getWillFinishMakeOrderDetail(i);
        return ;
    }

    if (n=="updateOrderFinishTime") {
        updateOrderFinishTime();
        return ;
    }
}


function updateOrderFinishTime() {
    var o_wftime = new Date().valueOf();
    o_id = sessionStorage.getItem("o_id");
    ajaxRequestGET("/WorkShop/2021/workshop/fisnsh"+"?o_id="+o_id.toString()+"&o_wftime="+o_wftime.toString(),updateOrderFinishTimeCallbackOperation);
}

var updateOrderFinishTimeCallbackOperation = {
    doSuccess:function (reqData) {
        var result = JSON.parse(reqData);
        if (result['status']=="1"){
            $("#submitBtn").html("提交成功");
            $("#submitBtn").attr("disabled", true);
        }else{
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function () {
        alert("请联系管理员");
    }
}

function getWillFinishMakeOrderDetail(o_id) {
    if (sessionStorage.getItem("o_id")!=null) {
        sessionStorage.removeItem('o_id');
    }
    sessionStorage.setItem("o_id",o_id);
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getWillFinishMakeOrderDetailCallbackOperation);
}




var getWillFinishMakeOrderDetailCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        //制单完成订单页面模板
        if (result['status']==1) {
            let goods = '';
            for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                goods+= '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                    '                                <td colspan=\'6\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_production']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_size']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_csize']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_psize']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                    '                            </tr>\n' ;
            }
            let data='<div class="content-body">\n' +
                '    <div class="container-fluid">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header">\n' +
                '                    <h4 class="card-title">订单详情</h4>\n' +
                '                </div>\n' +
                '                <div class="card-body">\n' +
                '                    <div class="table-responsive">\n' +
                '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'2123\'class="table table-bordered table-responsive-sm" id="big">\n' +
                '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
                '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
                '                            <col width=\'73\' span=\'5\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
                '                            <col width=\'72\' span=\'11\' style=\'width:54pt\'>\n' +
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
                '                                <td colspan=\'4\' height=\'18\' class=\'x23\' width=\'288\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
                '                                <td colspan=\'5\' class=\'x23\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
                '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
                '                            </tr>\n' +
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
                '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
                '                                <td colspan=\'9\' class=\'x23\'>送货地址：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\t\t\t\t\t\t\t\t\t<td></td>\n' +
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
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
                '                                <td colspan=\'3\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>生产类别：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                '                                <td colspan=\'3\' class=\'x23\'>订单类别：'+getOpayType(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
                '                                <td colspan=\'4\' class=\'x23\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
                '                                <td class=\'x21\'></td>\n' +
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
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                            </tr>\n' +
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
                '                                <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
                '                                <td colspan=\'2\' class=\'x23\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
                '                                <td colspan=\'3\' class=\'x23\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
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
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                                <td></td>\n' +
                '                            </tr>\n' +
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
                '                                <td colspan=\'2\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>名称</td>\n' +
                '                                <td colspan=\'6\' class=\'x22\'>制作工艺</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>尺码</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>衣服尺码</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>裤子尺码</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>规格</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>数量</td>\n' +
                '                                <td colspan=\'2\' class=\'x22\'>单位</td>\n' +
                '                            </tr>\n' +goods+
                '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
                '                                <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
                '                                <td colspan=\'3\' class=\'x23\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
                '                                <td colspan=\'4\' class=\'x22\'>订单备注：'+result['goodsOrders']['goodsOrder']['o_remarks']+'</td>\n' +
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
                '                        <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r9\'>\n' +
                '                            <td colspan=\'3\' height=\'18\' class=\'x25\' style=\'height:13.9pt;\'>生产负责人:'+result['goodsOrders']['goodsOrder']['o_wname']+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x22\'>接单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_wtime'])+'</td>\n' +
                '                            <td colspan=\'4\' class=\'x22\'>预计完成时间：'+formatDate(result['goodsOrders']['goodsOrder']['o_estimate'])+'</td>\n' +
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
                '                        </tr>\n' +
                '                        <![endif]>\n' +
                '                    </table>\n' +
                '                    </div>\n' +
                '                    <div class="card-body">\n' +
                '                                <div class="form-validation">\n' +
                '                       <div class="row">\n' +
                '                      <div class="col-xl-6">\n' +
                '                      <button  onclick="goWorkShopPages(this.name,this.id)" name="updateOrderFinishTime" id="submitBtn" class="btn btn-primary">提交完成</button>\n' +
                '                            </div>\n' +
                '                                 </div>\n' +
                '                          <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
                '                                </div>\n' +
                '                            </div>'+
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

function  getWillFinishMakeOrders(){
    ajaxRequestGET("/WorkShop/2021/goodsorder/oreview/wid?o_wid="+String(sessionStorage.getItem('u_id'))+"&o_review=2",getWillFinishMakeOrdersCallbackOperation);
}

var getWillFinishMakeOrdersCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1){
            let datas='';
            for (let i=0;i<result['goodsOrder'].length;i++) {
                datas+='<tr>\n' +
                    '                                            <td><a href="javascript:void(0)" onclick="goWorkShopPages(this.name,this.id)" name="getWillFinishMakeOrderDetail" id='+result['goodsOrder'][i]['o_id']+'  >'+result['goodsOrder'][i]['o_code']+'</a>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+formatDateNYR(result['goodsOrder'][i]['o_deadline'])+'</td>\n' +
                    '                                            <td><span class="text-muted">'+getOptype(result['goodsOrder'][i]['g_type'])+'</span>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_count']+'</td>\n' +
                    '                                            <td><span class="badge badge-warning">制作中</span>\n' +
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
                '                                            <h4 class="card-title">待接订单</h4>\n' +
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

function getWillMakeOrderDetail(o_id) {
    if (sessionStorage.getItem("o_id")!=null) {
        sessionStorage.removeItem('o_id');
    }
    sessionStorage.setItem("o_id",o_id);
    ajaxRequestGET("/GoodsOrders/2021/goodsorder/detail"+"?o_id="+o_id.toString(),getWillMakeOrderDetailCallbackOperation);
}

var getWillMakeOrderDetailCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        console.log(result);
        //制单完成订单页面模板
        if (result['status']==1) {
            let goods = '';
            for (let i=0;i<result['goodsOrders']['goods'].length;i++) {
                goods+='                          <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r5\'>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_name']+'</td>\n' +
                    '                                <td colspan=\'6\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_production']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_size']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_csize']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_psize']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_specifications']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['orderGoods'][i]['og_count']+'</td>\n' +
                    '                                <td colspan=\'2\' rowspan=\'3\' height=\'55\' class=\'x22\' style=\'height:41.7pt;\'>'+result['goodsOrders']['goods'][i]['g_unit']+'</td>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r6\'>\n' +
                    '                            </tr>\n' +
                    '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r7\'>\n' +
                    '                            </tr>\n'
            }
           let data='<div class="content-body">\n' +
               '    <div class="container-fluid">\n' +
               '        <div class="col-lg-12">\n' +
               '            <div class="card">\n' +
               '                <div class="card-header">\n' +
               '                    <h4 class="card-title">订单详情</h4>\n' +
               '                </div>\n' +
               '                <div class="card-body">\n' +
               '                    <div class="table-responsive">\n' +
               '                        <table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'2123\'class="table table-bordered table-responsive-sm" id="big">\n' +
               '                            <col width=\'72\' span=\'12\' style=\'width:54pt\'>\n' +
               '                            <col width=\'102\' style=\'mso-width-source:userset;width:76.5pt\'>\n' +
               '                            <col width=\'73\' span=\'5\' style=\'mso-width-source:userset;width:54.75pt\'>\n' +
               '                            <col width=\'72\' span=\'11\' style=\'width:54pt\'>\n' +
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r0\'>\n' +
               '                                <td colspan=\'4\' height=\'18\' class=\'x23\' width=\'288\' style=\'height:13.9pt;\'>下单日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_date'])+'</td>\n' +
               '                                <td colspan=\'5\' class=\'x23\' width=\'360\'>订单编码：'+result['goodsOrders']['goodsOrder']['o_code']+'</td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'102\' style=\'width:76.5pt;\'></td>\n' +
               '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
               '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
               '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
               '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
               '                                <td width=\'73\' style=\'width:54.75pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                                <td width=\'72\' style=\'width:54pt;\'></td>\n' +
               '                            </tr>\n' +
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r1\'>\n' +
               '                                <td colspan=\'4\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>客户名称：'+result['goodsOrders']['customer']['c_company']+'</td>\n' +
               '                                <td colspan=\'9\' class=\'x23\'>送货地址：'+result['goodsOrders']['customerAddress']['a_address']+'</td>\t\t\t\t\t\t\t\t\t<td></td>\n' +
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
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r2\'>\n' +
               '                                <td colspan=\'3\' height=\'18\' class=\'x24\' style=\'height:13.9pt;\'>生产类别：'+getOotype(result['goodsOrders']['goodsOrder']['o_otype'])+'</td>\n' +
               '                                <td colspan=\'3\' class=\'x23\'>订单类别：'+getOptype(result['goodsOrders']['goodsOrder']['o_ptype'])+'</td>\n' +
               '                                <td colspan=\'4\' class=\'x23\'>要求完成日期：'+formatDateNYR(result['goodsOrders']['goodsOrder']['o_deadline'])+'</td>\n' +
               '                                <td class=\'x21\'></td>\n' +
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
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                            </tr>\n' +
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r3\'>\n' +
               '                                <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>付款类型：'+getOpayType(result['goodsOrders']['goodsOrder']['o_pay_type'])+'</td>\n' +
               '                                <td colspan=\'2\' class=\'x23\'>打印次数：'+result['goodsOrders']['goodsOrder']['o_print_count']+'</td>\n' +
               '                                <td colspan=\'3\' class=\'x23\'>审核状态：'+getOReview(result['goodsOrders']['goodsOrder']['o_review'])+'</td>\n' +
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
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                                <td></td>\n' +
               '                            </tr>\n' +
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r4\'>\n' +
               '                                <td colspan=\'2\' height=\'18\' class=\'x22\' style=\'height:13.9pt;\'>名称</td>\n' +
               '                                <td colspan=\'6\' class=\'x22\'>制作工艺</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>尺码</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>衣服尺码</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>裤子尺码</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>规格</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>数量</td>\n' +
               '                                <td colspan=\'2\' class=\'x22\'>单位</td>\n' +
               '                            </tr>\n' +goods+
               '                            <tr height=\'18\' style=\'mso-height-source:userset;height:13.9pt\' id=\'r8\'>\n' +
               '                                <td colspan=\'3\' height=\'18\' class=\'x23\' style=\'height:13.9pt;\'>制单人：'+result['goodsOrders']['goodsOrder']['o_mname']+'</td>\n' +
               '                                <td colspan=\'3\' class=\'x23\'>制单日期：'+formatDate(result['goodsOrders']['goodsOrder']['o_mtime'])+'</td>\n' +
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
               '                            </tr>\n' +
               '                            <![endif]>\n' +
               '                        </table>\n' +
               '                    </div>\n' +
               '                    <div class="card-body">\n' +
               '                        <div class="form-validation">\n' +
               '                            <form class="form-valide" target="iframe" id="makeTimeAndName">\n' +
               '                                <div class="row">\n' +
               '                                    <div class="col-xl-6">\n' +
               '                                        <div class="form-group row">\n' +
               '                                            <label class="col-lg-4 col-form-label" for="o_estimate">预计完成时间 <span\n' +
               '                                                    class="text-danger">*</span>\n' +
               '                                            </label>\n' +
               '                                            <div class="col-lg-6">\n' +
               '                                                <input type="datetime-local" class="form-control" id="o_estimate" name="o_estimate" required>\n' +
               '                                            </div>\n' +
               '                                        </div>\n' +
               '                                    </div>\n' +
               '                                    <div class="col-xl-6">\n' +
               '                                        <div class="form-group row">\n' +
               '                                            <label class="col-lg-4 col-form-label" for="o_wname">生产负责人\n' +
               '                                                <span class="text-danger">*</span>\n' +
               '                                            </label>\n' +
               '                                            <div class="col-lg-6">\n' +
               '                                                <input type="text" class="form-control" id="o_wname" required maxlength="10" name="o_wname" placeholder="请输入负责人姓名">\n' +
               '                                            </div>\n' +
               '                                        </div>\n' +
               '                                        <div class="form-group row">\n' +
               '                                            <div class="col-lg-8 ml-auto">\n' +
               '                                                <button  onclick="goWorkShopPages(this.name,this.id)" name="updateOrderMakeTime" id="submitBtn" class="btn btn-primary">提交</button>\n' +
               '                                            </div>\n' +
               '                                        </div>\n' +
               '                                    </div>\n' +
               '                                </div>\n' +
               '                            </form>\n' +
               '                            <div id="reg_mes" class="col-xs-12 col-sm-12 col-pl-no text-error">&nbsp</div>\n' +
               '                            <iframe id="iframe" name="iframe" style="display:none;"></iframe>\n' +
               '                        </div>\n' +
               '                    </div>'+
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

function updateOrderMakeTime(){
    var formObject = {};
    var formArray = $("#makeTimeAndName").serializeArray();
    $("#submitBtn").html("提交中...");
    $("#submitBtn").attr("disabled", true);
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    formObject['o_estimate'] =(new Date(String(formObject['o_estimate']))).valueOf();
    formObject['o_id'] = sessionStorage.getItem("o_id");
    formObject['o_wid'] = sessionStorage.getItem("u_id");
    if (formObject['o_wname'].length==0||formObject['o_wname'].length>20){
        $("#submitBtn").html("提交失败");
        $("#reg_mes").html("姓名格式有误或太长");
        $("#submitBtn").attr("disabled", false);
        return ;
    }
    ajaxRequest("/GoodsOrders/2021/goodsOreder/workshop",JSON.stringify(formObject),updateOrderMakeTimeCallbackOperation);
}

var updateOrderMakeTimeCallbackOperation = {
    doSuccess:function (reqData) {
        var result = JSON.parse(reqData);
        if (result['status']=="1"){
            $("#submitBtn").html("提交成功");
        }else{
            $("#submitBtn").html("提交失败");
            $("#reg_mes").html(result['error_desc']);
            $("#submitBtn").attr("disabled", false);
        }
    },
    doError:function () {
        alert("请联系管理员");
    }
}

function getWillMakeOrders() {
    ajaxRequestGET("/WorkShop/2021/goodsorder/oreview/wid?o_wid="+String(sessionStorage.getItem('u_id'))+"&o_review=1",workshopindexCallbackOperation);
}

var workshopindexCallbackOperation = {
    doSuccess:function (reqData) {
        let result = JSON.parse(reqData);
        if (result['status']==1){
            let datas='';
            for (let i=0;i<result['goodsOrder'].length;i++) {
                datas+='<tr>\n' +
                    '                                            <td><a href="javascript:void(0)" onclick="goWorkShopPages(this.name,this.id)" name="getWillMakeOrderDetail" id='+result['goodsOrder'][i]['o_id']+'  >'+result['goodsOrder'][i]['o_code']+'</a>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+formatDateNYR(result['goodsOrder'][i]['o_deadline'])+'</td>\n' +
                    '                                            <td><span class="text-muted">'+getOptype(result['goodsOrder'][i]['g_type'])+'</span>\n' +
                    '                                            </td>\n' +
                    '                                            <td>'+result['goodsOrder'][i]['o_count']+'</td>\n' +
                    '                                            <td><span class="badge badge-danger">未制作</span>\n' +
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
                '                                            <h4 class="card-title">待接订单</h4>\n' +
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
