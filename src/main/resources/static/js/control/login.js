/**
 * 登录
 */
function login(){

    var formObject = {};
    var formArray = $("#loginForm").serializeArray();

    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });

    if (String(formObject["u_name"])==null||String(formObject["u_name"]).length>20||String(formObject["u_name"]).length==0)
        return;
    if (String(formObject["u_password"])==null||String(formObject["u_password"]).length>20||String(formObject["u_password"]).length==0)
        return;

    ajaxRequest("/Users/2021/user/signin",JSON.stringify(formObject),loginCallbackOperation);
    return;
}

/**
 * 注册回调函数
 */
var loginCallbackOperation={
    doSuccess:function(respData){
        console.log(respData);
        var result = JSON.parse(respData);
        if (result["status"]!=1)
            $("#reg_mes").html(String(result["error_desc"]));
        else{
            if (sessionStorage.getItem('u_id')!=null) {
                sessionStorage.removeItem('u_id');
            }
            sessionStorage.setItem('u_id',result["user"]["u_id"]);
            $("#loginBtn").html("登陆中...");
            window.location.replace("/index");
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}