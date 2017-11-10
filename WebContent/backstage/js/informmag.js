/**
 * Created by Administrator on 2017/1/22.
 */
	$(function() {
		initSelectInput();
		//初始化
		initlayui();
		addInform();
	});

	//初始化
	function initlayui() {
		layui.use([ 'form', 'layedit', 'element', 'layer', 'laypage' ],
				function() {
					$ = layui.jquery, element = layui.element(), form = layui
							.form(), layer = layui.layer,
							layedit = layui.layedit, laypage = layui.laypage; //Tab的切换功能，切换事件监听等，需要依赖element模块

					layedit.set({
						uploadImage : {
							url : '' //接口url
							,
							type : 'post' //默认post
						}
					});

					//构建一个默认的编辑器
					index = layedit.build('bianjiqi', {
						tool : [ 'strong' //加粗
						, 'italic' //斜体
						, 'underline' //下划线
						, 'del' //删除线

						, '|' //分割线

						, 'left' //左对齐
						, 'center' //居中对齐
						, 'right' //右对齐
						, 'link' //超链接
						, 'unlink' //清除链接
						, 'face' //表情
						],
						height : 200
					})

					setpage();

				});
	}

	//显示信息
	function showcontent(id) {
		$.post("../getInformContentById.do", {
			iid : id
		}, function(data) {
			var str = '<div style="height:100%;" disabled="true">'
					+ data.content + '</div>';
			//自定页
			layer.open({
				type : 1,
				title : '通知查看',
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
		$.post("../getAllInform.do", {
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
			loadAllInformMsg(data);
		});
	}

	//加载通知信息
	function loadAllInformMsg(data) {
		$(".showInformMsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.personnelInfo.name + "</td>"
					str += "<td>" + contestent(v.contestantInfo.contacts)
							+ "</td>"
					str += "<td>" + v.time + "</td>"
					str += "<td>" + v.title + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:showcontent(" + v.in_id
							+ ");>查看</a>"
					str += " | "
					str += "<a href=" + "javascript:delInform(" + v.in_id
							+ ");>删除</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".showInformMsg").append(str);
	}

	//接受设置
	function contestent(c) {
		if (c == null) {
			return "所有人";
		} else {
			return c;
		}
	}

	// 点击删除
	function delInform(id) {
		// 询问框
		layer.confirm('是否删除通知？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			// 此处异步操作
			$.post("../delInformById.do", {
				iid : id
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

	//发布通知
	function addInform() {
		$("body").delegate(".addInform", "click", function() {
			var title = $(".informtitle").val();
			var caccount = $(".contestent").val();
			var content = layedit.getContent(index);
			if (title.length == 0) {
				layer.msg('题目不能为空！');
				return;
			}
			if (content.length == 0) {
				layer.msg('你还没编写通知！');
				return;
			}
			$.post("../addInformByPersonal.do", {
				title : title,
				caccount : caccount,
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

	//初始化下拉列表
	function initSelectInput() {
		$.post("../getAllContestantName.do", null, function(data) {
			var str = '<select class="contestent">';
			str += '<option value="000000" selected="true">所有人</option>'
			$(data).each(
					function(i, v) {
						str += '<option value="'+v.c_account+'">'
								+ ((v.cInfo.contacts == null) ? v.c_account
								: v.cInfo.contacts) + '</option>'
					});
			str += '</select>'
			$(".conselect").append(str);
		});
	}