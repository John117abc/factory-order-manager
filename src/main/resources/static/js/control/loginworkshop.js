/**
 * 车间登录
 */
function loginWorkshop(){

    var formObject = {};
    var formArray = $("#loginForm").serializeArray();

    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    $("#loginBtn").html("登陆中...");
    if (String(formObject["w_account"])==null||String(formObject["w_account"]).length>20||String(formObject["w_account"]).length==0)
        return;
    if (String(formObject["w_password"])==null||String(formObject["w_password"]).length>20||String(formObject["w_password"]).length==0)
        return;
    ajaxRequest("/WorkShop/2021/workshop/signin",JSON.stringify(formObject),workshoploginCallbackOperation);
    return;
}

/**
 * 车间登录回调函数
 */
var workshoploginCallbackOperation={
    doSuccess:function(respData){
        var result = JSON.parse(respData);
        if (result["status"]!=1){
            $("#reg_mes").html(String(result["error_desc"]));
        }
        else{
            if (sessionStorage.getItem('u_id')!=null) {
                sessionStorage.removeItem('u_id');
            }
            sessionStorage.setItem('u_id',result["WorkShop"]['w_id']);
            window.location.replace("/workshop");
        }
        return;
    },
    doError:function(){
        alert("error,请联系管理员");
        return;
    }
}
