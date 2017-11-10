/**
 * Created by Administrator on 2017/1/31.
 */
	$(function(){
		modifyPwd();
		initlayui();
	});
	
	//初始化
	function initlayui(){
	    layui.use(['layer'], function () {
	        var layer = layui.layer;
	    });
	}
	
	function modifyPwd(){
		$("body").delegate(".btn_modifypwd","click",function(){
			var oldPwd=$(".oldPwd").val();
			var pwd=$(".pwd").val();
			var rpwd=$(".rpwd").val();
			if(oldPwd.length==0){
				layer.msg('请输入旧密码！');
				return;
			}
			if(pwd.length==0){
				layer.msg('请输入新密码！');
				return;
			}
			if(rpwd.length==0){
				layer.msg('请再次输入新密码！');
				return;
			}
			if(rpwd!=pwd){
				layer.msg('新密码不一致！');
				return;
			}
			//加载层
			layer.msg('修改中...', {
			  icon: 16
			  ,shade: 0.01
			});
			$.post("../updatePwdByAccount.do",{oldPwd:oldPwd,rpwd:rpwd},function(data){
				if(data.result==1){
					layer.msg('修改成功，请退出重新登录！');
				}else if(data.result==2){
					layer.msg('旧密码不正确！');
				}else if(data.result==3){
					layer.msg('登录已超时，请重新登录！');
				}else{
					layer.msg('修改失败！');
				}
			});
		});
	}