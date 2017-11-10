/**
 * Created by Administrator on 2017/1/22.
 */
  $(function(){
		initlayui();
		initCMsg();
		back();
   });
   
	//初始化
	function initlayui(){
	    layui.use('layer', function () {
	    	 $ = layui.jquery, layer = layui.layer; 
	    });
	}
	
	//返回
	function back() {
		$("body").delegate(".back", "click", function() {
			window.history.back()
		});
	}
	
	//初始化信息
	function initCMsg() {
		$.post("../getContestantBySession.do", null, function(data) {
			$(".account").text(data.c_account);
			$(".email").text(data.email);
			$(".type").text((data.cInfo.type==1)?"团队组":"企业组");
		});
	}
	
	//修改密码
	function midifyPwd(){
		var account=$(".account").text();
		var oldpwd=$(".oldpwd").val();
		var newpwd=$(".newpwd").val();
		var rnewpwd=$(".rnewpwd").val();
		if(oldpwd.length==0||newpwd.length==0||rnewpwd.length==0){
			layer.msg('请输入完整！');
			return;
		}
		if(newpwd!=rnewpwd){
			layer.msg('新密码不一致！');
			return;
		}
		
		//加载层
		layer.msg('修改中...', {
			icon : 16,
			shade : 0.01
		});
		
		$.post("../updateContestantPwd.do", {
			account : account,
			oldpwd : oldpwd,
			newpwd : newpwd
		}, function(data) {
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
	}