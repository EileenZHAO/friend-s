/**
 * Created by Administrator on 2017/1/22.
 */
	$(function() {
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
			$(".type option").each(function(i, v) {
				if ($(v).attr("value") == data.cInfo.type) {
					$(v).attr("selected", "true");
				}
			});
			$(".email").val(data.email);
			$(".contacts").val(data.cInfo.contacts);
			$(".position").val(data.cInfo.position);
			$(".phone").val(data.cInfo.phone);
			$(".qq").val(data.cInfo.qq);
		});
	}

	//点击保存
	function saveInfo() {
		var account=$(".account").text();
		var type=$(".type").val();
		var email=$(".email").val();
		var contacts=$(".contacts").val();
		var position=$(".position").val();
		var phone=$(".phone").val();
		var qq=$(".qq").val();
		var rephone=/0?(13|14|15|18)[0-9]{9}/;
		var reemail=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
		var reqq=/^[1-9]*[1-9][0-9]*$/;
		if (!reemail.test(email)) {
			layer.msg('邮箱格式不正确！');
			return;
		}
		if (contacts.length == 0) {
			layer.msg('联系人不能为空！'); 
			return;
		}
		if (position.length == 0) {
			layer.msg('职位不能为空！'); 
			return;
		}
		if (!rephone.test(phone)) {
			layer.msg('电话格式不正确！');
			return;
		}
		if (!reqq.test(qq)) {
			layer.msg('qq格式不正确！');
			return;
		}
		//加载层
		layer.msg('保存中...', {
			icon : 16,
			shade : 0.01
		});
		
		$.post("../updateContestantInfoByAccount.do", {
			account : account,
			type : type,
			email : email,
			contacts : contacts,
			position : position,
			phone : phone,
			qq : qq
		}, function(data) {
			if (data.result == 1) {
				layer.msg('保存成功！');
			} else {
				layer.msg('保存失败！');
			}
		});
		
	}