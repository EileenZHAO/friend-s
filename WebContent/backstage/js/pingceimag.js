/**
 * Created by Administrator on 2017/1/22.
 */
	$(function() {
		//初始化
		initlayui();
		updateProductionHouner();
	});

	//初始化
	function initlayui() {
		layui.use([ 'layer', 'laypage' ], function() {
			$ = layui.jquery, layer = layui.layer, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

			setpage();
		});
	}

	// 分页
	function setpage(curr) {
		$.post("../getAllCheckProductionMsg.do", {
			page : curr || 1,
			rows : 5
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

	//加载已审核参赛者作品信息
	function loadAllCheckProductionMsg(data) {
		$(".showproductionmsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.contacts + "</td>"
					str += "<td>" + type(v) + "</td>"
					str += "<td>" + v.phone + "</td>"
					str += "<td>" + v.proTitle.production.time + "</td>"
					str += "<td>" + v.proTitle.title + "</td>"
					str += "<td>" + proTypeTo(v.proTitle.state) + "</td>"
					str += "<td>" + v.proTitle.production.score + "</td>"
					str += "<td>" + hounerTo(v.proTitle.houner) + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:setHouner('"
							+ v.proTitle.pr_id + "\');>设置奖项</a>"
					str += " | "
					str += "<a href=" + "javascript:informHim(" + v.c_account
							+ "," + v.proTitle.houner + ");>通知他</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".showproductionmsg").append(str);
	}

	//赛事组别转换
	function type(v) {
		if (v.type == 1) {
			return '团队组';
		} else if (v.type == 2) {
			return '企业组';
		} else {
			return '未录入';
		}
	}

	//作品状态转化
	function proTypeTo(state) {
		if (state == 0) {
			return "未审核";
		} else if (state == 1) {
			return "已审核";
		}
	}

	//奖项转换
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

	//设置奖项
	function setHouner(id) {
		layer
				.open({
					type : 1,
					title : "奖项设置",
					skin : 'layui-layer-rim', // 加上边框
					area : [ '420px', '250px' ], // 宽高
					content : '<form class="layui-form" action="">'
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">奖项选择</label>'
							+ '<div class="layui-input-block">'
							+ '<input class="tid" type="hidden" value='+id+'>'
							+ '<select class="houner" lay-verify="required" style="width: 250px;height: 40px;margin-top: 20px;display: block;border-color: gainsboro">'
							+ '<option value="0">未获奖</option>'
							+ '<option value="1">一等奖</option>'
							+ '<option value="2">二等奖</option>'
							+ '<option value="3">三等奖</option>'
							+ '<option value="4">优秀奖</option>'
							+ '</select>'
							+ '</div>'
							+ '</div>'
							+ '<div style="text-align: center;margin-top: 40px"">'
							+ '<button class="layui-btn layui-btn-radius sethounerbtn" lay-submit="" style="width: 100px">颁布奖项</button>'
							+ '</div>' + '</form>'
				});
	}

	//提交奖项设置
	function updateProductionHouner() {
		$("body").delegate(".sethounerbtn", "click", function(e) {
			e.preventDefault();
			var tid = $(".tid").val();
			var houner = $(".houner").val();
			// 加载层
			layer.msg('正在设置，请稍等...', {
				icon : 16,
				shade : 0.01
			});
			$.post("../updateProductionHouner.do", {
				tid : tid,
				houner : houner
			}, function(data) {
				if (data.result == 1) {
					layer.msg('设置成功！');
					setpage();
				} else {
					layer.msg('设置失败！');
				}
			});
		});
	}

	//通知获奖人
	function informHim(id,houner) {
		$.post("../addInform.do",{caccount:id,houner:houner},function(data){
			if (data.result == 1) {
				layer.msg('通知已发送！');
			} else {
				layer.msg('发送失败！');
			}
		});
	}