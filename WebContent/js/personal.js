/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
	id=-1;
	type=-1;
	initlayui();
	showUser();
	// 点击用户资料
	$(".xb").delegate(".first", "click", function() {
		var i = $(".first").attr("value");
		if (i == 0) {
			$(".plbtmff").css("height", "125px");
			$(".first").attr("value", "1");
		} else {
			$(".plbtmff").css("height", "30px");
			$(".first").attr("value", "0");
		}
	});
	// 点击大赛
	$(".xb").delegate(".second", "click", function() {
		var i = $(".second").attr("value");
		if (i == 0) {
			$(".plbtmss").css("height", "130px");
			$(".second").attr("value", "1");
		} else {
			$(".plbtmss").css("height", "30px");
			$(".second").attr("value", "0");
		}
	});
	// 点击用户信息
	$("body").delegate(".plbtzl", "click", function() {
		$(".center_iframe").attr("src", "pmsg.html");
	});
	// 点击修改密码
	$("body").delegate(".plbpwd", "click", function() {
		$(".center_iframe").attr("src", "ppwd.html");
	});
	// 点击修改头像
	$("body").delegate(".plbpro", "click", function() {
		$(".center_iframe").attr("src", "pupp.html");
	});
	// 点击官网首页
	$("body").delegate(".goindex", "click", function() {
		location.href = "../index.html";
	});
	// 点击团队基本信息
	$("body").delegate(".tjbxx", "click", function() {
		$(".center_iframe").attr("src", "tmsg.html");
	});
	// 点击团队成员信息
	$("body").delegate(".tmcyx", "click", function() {
		$(".center_iframe").attr("src", "tmermsg.html");
	});
	// 点击提交报名
	$("body").delegate(".tibm", "click", function() {
		messageIsTrue();
	});
	// 点击大赛通知
	$("body").delegate(".pdstz", "click", function() {
		$(".center_iframe").attr("src", "pdstz.html");
	});
	// 点击动态
	$("body").delegate(".pdsdt", "click", function() {
		$(".center_iframe").attr("src", "pdsdt.html");
	});
	// 点击退出
	$("body").delegate(".pexit", "click", function() {
		$.post("../exitLogin.do", null, function(data) {
			if (data.result == 1) {
				layer.msg('退出成功！');
				location.href = "../index.html";
			} else {
				layer.msg('退出失败！');
			}
		});
	});
});

// 初始化
function initlayui() {
	layui.use('layer', function() {
		var $ = layui.jquery, layer = layui.layer;
	});
}

// 用户显示
function showUser() {
	$.post("../getContestantBySession.do", null, function(data) {
		$(".account").text(data.c_account);
		$(".uimg").attr("src", data.portrait);
		$(".type").text((data.cInfo.type == 1) ? "团队组" : "企业组");
	});
}

// 判断信息是否完善
function messageIsTrue() {
	$.post("../getTeamMsgByAccount.do", null, function(data) {
		if (data.t_id == null || data.t_id == 0 || data.t_id == ""
				|| data.t_id == undefined) {
			layer.msg('你的团队基本信息不完整，快去完善！');
			return;
		}

		if (data == "" || data.tMembers == "undefined"
				|| data.tMembers[0].m_id == 0) {
			layer.msg('你的团队信息不完整，快去完善！');
			return;
		}
		$(".center_iframe").attr("src", "tjmsg.html");

	});
}

//打开信息展示页面
function openMsgPage(iid,t){
	id=iid;
	type=t;
	if(id==-1||t==-1){
		layer.msg('打开失败啦！', {
			icon : 1,
			time : 2000
		});
		return;
	}
	$(".center_iframe").attr("src", "message.html");
}