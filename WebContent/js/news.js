/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
	var strurl = location.href;
	var start = strurl.indexOf("?id=");
	var end = strurl.indexOf("&type=");
	var id = strurl.slice(start + 4, end);
	var type = strurl.slice(end + 6);
	if (type == 1) {
		openDynamic(id);
		$(".contd").show();
	} else if (type == 2) {
		loadNotice(id);
		$(".contd").show();
	} else if (type == 3) {
		openNews(id);
		$(".contd").show();
	} else if (type == 4) {
		loadProduction();
		$(".procontd").show();
	}
});

// 初始化
function initlayui() {
	layui.use([ 'layer', 'laypage' ], function() {
		$ = layui.jquery, layer = layui.layer, laypage = layui.laypage; // Tab的切换功能，切换事件监听等，需要依赖element模块

		setpage();
	});
}

// 加载所有作品
function loadProduction() {
	initlayui();
}

// 加载某条新闻信息
function openNews(id) {
	$.post("getNewsById.do", {
		nid : id
	}, function(data) {
		$("#cp1").text(data.title);
		$(".msgcontent").html(data.content);
	});
}

// 加载某条动态信息
function openDynamic(id) {
	$.post("getDynamicById.do", {
		did : id
	}, function(data) {
		$("#cp1").text(data.title);
		$(".msgcontent").html(data.content);
	});
}

// 加载公告
function loadNotice(id) {
	var file = '<embed width="100%" height="700" name="plugin" id="plugin" src="getNoticeFile.do?nid='
			+ id + '" type="application/pdf" internalinstanceid="43">';
	$(".msgcontent").html(file);
}

// 分页
function setpage(curr) {
	$.post("getAllCheckProductionMsg.do", {
		page : curr || 1,
		rows : 1000000
	}, function(data) {
		laypage({
			cont : 'page',
			pages : data.pages,
			curr : curr || 1,
			skip : true,
			skin : '#c0eebd',
			jump : function(obj, first) {
				if (!first) {
					setpage(obj.curr);
				}
			}
		});
		loadAllCheckProductionMsg(data);
	});
}

// 加载已审核参赛者作品信息
function loadAllCheckProductionMsg(data) {
	var str = "";
	$(data.rows).each(
			function(i, v) {
				str += "<tr>"
				str += "<td>" + type(v) + "</td>"
				str += "<td>" + v.proTitle.production.time + "</td>"
				str += "<td>" + v.proTitle.title + "</td>"
				str += "<td>" + v.proTitle.production.score + "</td>"
				str += "<td>" + hounerTo(v.proTitle.houner) + "</td>"
				str += "<td>"
				str += "<a href='downloadProduction.do?pid="+v.proTitle.production.pro_id+"'>下载查看</a>"
				str += "</td>"
				str += "</tr>"
			});
	$(".tproductionmsg").append(str);
}

// 赛事组别转换
function type(v) {
	if (v.type == 1) {
		return '团队组';
	} else if (v.type == 2) {
		return '企业组';
	} else {
		return '未录入';
	}
}

// 奖项转换
function hounerTo(state) {
	if (state == 1) {
		return "一等奖";
	} else if (state == 2) {
		return "二等奖";
	} else if (state == 3) {
		return "三等奖";
	} else if (state == 4) {
		return "优秀奖";
	} else {
		return "未获奖";
	}
}