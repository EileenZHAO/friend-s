/**
 * Created by Administrator on 2017/1/20.
 */
$(function(){
	initlayui();
	
    $(".index_nav_lr").delegate(".inrl","click",function(){
        $.post("isLogin.do",{type:$(".ltype").val(),account:$(".laccount").val(),pwd:$(".lpwd").val(),validate:$(".lvalidate").val()},function(data){
    		if(data.result==1){
    			if(data.type==0){
    				location.href="backstage/index.html";
    			}else if(data.type==1){
    				location.href="personal/personal.html";
    			}
    		}else{
    		    location.href="login.html";
    		}
    	});
    });
    
    $(".index_nav_lr").delegate(".inrr","click",function(){
        location.href="regist.html";
    });
    
    $(".index_nav_lr").delegate(".backindex","click",function(){
        location.href="index.html";
    });
});

//初始化
function initlayui(){
    layui.use('layer', function () {
    	 $ = layui.jquery, layer = layui.layer; 
    });
}

//改变验证码
function change(){
	  var im=document.getElementById("vimg");
	  im.src="getVarlidate.do?t="+new Date();
}

//登录方法
function login(){
	var type=$(".ltype").val();
	var account=$(".laccount").val();
	var pwd=$(".lpwd").val();
	var validate=$(".lvalidate").val();
	if(account.length==0){
		layer.msg('账号不能为空！');
		return;
	}
	if(pwd.length==0){
		layer.msg('密码不能为空！');
		return;
	}
	if(validate.length==0){
		layer.msg('验证码不能为空！');
		return;
	}
	//加载层
	layer.msg('登录中...', {
	  icon: 16
	  ,shade: 0.01
	});
	$.post("login.do",{type:type,account:account,pwd:pwd,validate:validate},function(data){
		if(data.result==1){
			layer.msg('验证码不正确！');
		}else if(data.result==2){
			layer.msg('登录成功！');
			if(data.type==0){
				location.href="backstage/index.html";
			}else if(data.type==1){
				location.href="personal/personal.html";
			}
		}else if(data.result==3){
			layer.msg('该账号未注册！');
		}else{
			layer.msg('登录失败！');
		}
	});
}

//注册方法
function regist(){
	var account=$(".raccount").val();
	var pwd=$(".rpwd").val();
	var rpwd=$(".rrpwd").val();
	var remail=$(".remail").val();
	var resouce=$(".rresouce").val();
	if(account.length<6||account.length>30){
		layer.msg('账号长度在6到30个字符之间！');
		return;
	}
	
	if(pwd.length<6||pwd.length>30){
		layer.msg('密码长度在6到30个字符之间！');
		return;
	}
	
	if(pwd!=rpwd){
		layer.msg('密码不一致！');
		return;
	}
	
	var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!emailreg.test(remail)){
		layer.msg('邮箱格式不正确！');
		return;
	}
	
	if(resouce==-1){
		layer.msg('请选择信息来源！');
		return;
	}
	
	//加载层
	layer.msg('正在注册...', {
	  icon: 16
	  ,shade: 0.01
	});
	
	$.post("regist.do",{account:account,pwd:pwd,rpwd:rpwd,remail:remail,resouce:resouce},function(data){
		if(data.result==1){
			layer.msg('注册成功！');
			location.href="login.html";
		}else if(data.result==2){
			layer.msg('该账号已注册！');
		}else{
			layer.msg('注册失败！');
		}
	});
}




