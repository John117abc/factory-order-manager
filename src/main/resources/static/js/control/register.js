/**
 * 注册 管理端用户
 */
function register(){

    var formObject = {};
    var formArray = $("#registerForm").serializeArray();
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    ajaxRequest("/Users/2021/user",JSON.stringify(formObject),registerCallbackOperation);
    return;
}

/**
 * 注册车间用户
 */
function registerWorkshop(){

    var formObject = {};
    var formArray = $("#registerForm").serializeArray();
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });
    ajaxRequest("/WorkShop/2021/workshop",JSON.stringify(formObject),workshopRegisterCallbackOperation);
    return;
}


/**
 * 车间注册回调函数
 */
var workshopRegisterCallbackOperation={
    doSuccess:function(respData){
        console.log(respData);
        var result = JSON.parse(respData);
        if (result["status"]==1){
            $("#loginBtn").html("注册成功正在跳转...");
            window.location.replace("/workshop/login");
        }
        else{
            $("#reg_mes").html(String(result["error_desc"]));
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}


/**
 * 注册回调函数
 */
var registerCallbackOperation={
    doSuccess:function(respData){
        console.log(respData);
        var result = JSON.parse(respData);
        if (result["status"]==1){
            $("#loginBtn").html("注册成功正在跳转...");
            window.location.replace("/signin");
        }
        else{
            $("#reg_mes").html(String(result["error_desc"]));
        }

    },
    doError:function(){
        alert("error,请联系管理员");
    }
}
