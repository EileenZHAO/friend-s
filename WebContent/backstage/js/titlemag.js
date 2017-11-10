/**
 * Created by Administrator on 2017/1/22.
 */
	$(function() {
		//初始化
		initlayui();
	});

	//初始化
	function initlayui() {
		layui.use([ 'layer', 'laypage' ], function() {
			$ = layui.jquery, layer = layui.layer, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

			setpage();
		});
	}

	//显示信息
	function showcontent(id) {
		$.post("../getProTitleOutLine.do",{account:id},function(d){
			var str = '<div style="height:100%;" disabled="true">' + d.outline
			+ '</div>';
			//自定页
			layer.open({
				type : 1,
				title : '概要查看',
				skin : 'layui-layer-demo', //样式类名
				closeBtn : 0, //不显示关闭按钮
				anim : 2,
				shadeClose : true, //开启遮罩关闭
				area : [ '80%', '90%' ], // 宽高
				content : str
			});
		});
	}
	
	// 分页
	function setpage(curr) {
		$.post("../getAllTitleMsg.do", {
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
			loadAllTitleMsg(data);
		});
	}
	
	//加载参赛者题目信息
	function loadAllTitleMsg(data) {
		$(".showtitlemsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>"+v.contacts+"</td>"
					str += "<td>"+type(v)+"</td>"
					str += "<td>"+v.phone+"</td>"
					str += "<td>"+v.proTitle.time+"</td>"
					str += "<td>"+v.proTitle.title+"</td>"
					str += "<td>"
					str += "<a href=" + "javascript:showcontent('"
						+ v.c_account + "\');>项目简介</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".showtitlemsg").append(str);
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