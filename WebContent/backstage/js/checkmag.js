/**
 * Created by Administrator on 2017/1/22.
 */
	$(function() {
		//初始化
		initlayui();
		updateProductionScore();
	});

	//初始化
	function initlayui() {
		layui.use([ 'layer', 'laypage' ], function() {
			$ = layui.jquery, layer = layui.layer, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

			setpage();
		});
	}

	//显示信息
	function showProduction(id) {
		//自定页
		layer.open({
			type : 2,
			title : '作品审核',
			skin : 'layui-layer-demo', //样式类名
			closeBtn : 1, //不显示关闭按钮
			anim : 2,
			shadeClose : true, //开启遮罩关闭
			area : [ '100%', '100%' ], // 宽高
			content : '../getProductionFile.do?pid=' + id
		});
	}

	// 分页
	function setpage(curr) {
		$.post("../getAllProductionMsg.do", {
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
			loadAllProductionMsg(data);
		});
	}

	//加载参赛者作品信息
	function loadAllProductionMsg(data) {
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
					str += "<td>"
					str += "<a href=" + "javascript:showProduction('"
							+ v.proTitle.production.pro_id + "\');>查看作品</a>"
					str += " | "
					str += "<a href=" + "javascript:setProScore("
							+ v.proTitle.production.pro_id+","+v.proTitle.pr_id + ");>作品打分</a>"
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
		} else if (state == 2) {
			return "一等奖";
		} else if (state == 3) {
			return "二等奖";
		} else if (state == 4) {
			return "三等奖";
		} else if (state == 5) {
			return "优秀奖";
		}
	}
	
	//作品打分
	function setProScore(pid,tid){
		layer
		.open({
			type : 1,
			title : "作品打分",
			skin : 'layui-layer-rim', // 加上边框
			area : [ '420px', '200px' ], // 宽高
			content : '<form class="layui-form" action="">'					
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">评审打分</label>'
					+ '<div class="layui-input-block">'
					+'<input class="pid" type="hidden" value='+pid+'>'
					+'<input class="tid" type="hidden" value='+tid+'>'
					+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请输入分数..." class="layui-input pscore" style="width: 250px;margin-top: 20px">'
					+ '</div>'
					+ '</div>'
					+ '<div style="text-align: center;margin-top: 40px"">'
					+ '<button class="layui-btn layui-btn-radius pscorebtn" lay-submit="" style="width: 100px">确定打分</button>'
					+ '</div>' + '</form>'
		});
	}
	
	//提交作品分数
	function updateProductionScore(){
		$("body").delegate(".pscorebtn","click",function(e){
			e.preventDefault();
			var pid=$(".pid").val();
			var tid=$(".tid").val();
			var score=$(".pscore").val();
			var rescore = /^[1-9]\d*$/;
			if (!rescore.test(score)) {
				layer.msg('请输入数字！');
				return;
			}
			if(score<1||score>100){
				layer.msg('请输入1-100之间的数字！');
				return;
			}
			// 加载层
			layer.msg('正在打分，请稍等...', {
				icon : 16,
				shade : 0.01
			});
			$.post("../updateProductionScore.do",{pid:pid,tid:tid,score:score},function(data){
				if (data.result == 1) {
					layer.msg('打分成功！');
					setpage();
				}else {
					layer.msg('打分失败！');
				}
			});
		});
	}