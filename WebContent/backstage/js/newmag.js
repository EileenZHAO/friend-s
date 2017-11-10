/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		//初始化
		initlayui();
		addnews();
	});

	//初始化
	function initlayui() {
		layui
				.use(
						[ 'form', 'layedit', 'element', 'layer', 'laypage' ],
						function() {
							$ = layui.jquery, element = layui.element(), form = layui
									.form(), layer = layui.layer, layedit = layui.layedit, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

							layedit.set({
								uploadImage : {
									url : '../addNewsPic.do' //接口url
									,
									type : 'post' //默认post
								}
							});

							//构建一个默认的编辑器
							index = layedit.build('bianjiqi');
							setpage();
						});
	}
	
	//显示信息
	function showcontent(id) {
		$.post("../getNewsById.do", {
			nid : id
		}, function(data) {
		var str = '<div style="height:100%;" disabled="true">'
			+ data.content + '</div>';
		//自定页
		layer.open({
			type : 1,
			title : '新闻内容',
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
		$.post("../getAllNews.do", {
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
			loadAllNewsMsg(data);
		});
	}

	//加载动态信息
	function loadAllNewsMsg(data) {
		$(".showNewsMsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.account + "</td>"
					str += "<td>" + v.time + "</td>"
					str += "<td>" + v.title + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:showcontent('" + v.ns_id
							+ "');>查看</a>"
					str += " | "
					str += "<a href=" + "javascript:delNews('" + v.ns_id
							+ "');>删除</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".showNewsMsg").append(str);
	}
	
	// 点击删除
	function delNews(id) {
		// 询问框
		layer.confirm('是否删除新闻？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			// 此处异步操作
			$.post("../delNewsById.do", {
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
	
	//点击发布
	function addnews(){
		$("body").delegate(".addnews","click",function(){
			var title=$(".title").val();
			var content=layedit.getContent(index);
			if (title.length == 0) {
				layer.msg('标题题不能为空！');
				return;
			}
			if (content.length == 0) {
				layer.msg('你还没编辑新闻！');
				return;
			}
			$.post("../addNews.do", {
				title : title,
				content : content
			}, function(data) {
				if (data.result == 0) {
					layer.msg('发布失败', {
						icon : 1,
						time : 2000
					});
				} else {
					layer.msg('发布成功', {
						icon : 1,
						time : 2000
					});
					setpage();
				}
			});
		});
	}