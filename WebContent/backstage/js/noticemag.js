/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		initlayui();
		uploadnotice();
	});

	//初始化
	function initlayui() {
		layui.use([ 'layer', 'laypage', 'upload' ], function() {
			$ = layui.jquery, layer = layui.layer, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

			setpage();
		});
	}

	//显示信息
	function showcontent(id) {
		//自定页
		layer.open({
			type : 2,
			title : '公告查看',
			skin : 'layui-layer-demo', //样式类名
			closeBtn : 1, //不显示关闭按钮
			anim : 2,
			shadeClose : true, //开启遮罩关闭
			area : [ '100%', '100%' ], // 宽高
			content : '../getNoticeFile.do?nid=' + id
		});
	}

	// 上传图片接口
	function uploadnotice() {
		layui.use('upload', function() {
			layui.upload({
				url : '../upLoadNotice.do',
				elem : "#uploadgg",
				ext : 'pdf',
				success : function(res) {
					if (res.result == 0) {
						layer.msg('上传失败！');
					} else {
						layer.msg('上传成功！');
						setpage();
					}
				}
			});
		});
	}
	
	// 分页
	function setpage(curr) {
		$.post("../getAllNotice.do", {
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
			loadAllNoticeMsg(data);
		});
	}

	//加载公告信息
	function loadAllNoticeMsg(data) {
		$(".showNoticeMsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.account + "</td>"
					str += "<td>" + v.time + "</td>"
					str += "<td>" + v.title + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:showcontent(" + v.n_id
							+ ");>查看</a>"
					str += " | "
					str += "<a href=" + "javascript:delNotice(" + v.n_id
							+ ");>删除</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".showNoticeMsg").append(str);
	}
	
	// 点击删除
	function delNotice(id) {
		// 询问框
		layer.confirm('是否删除公告？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			// 此处异步操作
			$.post("../delNoticeById.do", {
				nid : id
			}, function(data) {
				if (data.result == 0) {
					layer.msg('删除失败', {
						icon : 1,
						time : 2000
					});
				} else {
					layer.msg('删除成功', {
						icon : 1,
						time : 2000
					});
					setpage();
				}
			});
		}, function() {
		});
	}