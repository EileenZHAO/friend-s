/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		//初始化
		initlayui();
		//增加管理者
		addmanager();
		pAddtj();
		modifyPmsg();
		searchPersonnel();
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
		$.post("../getAllPersonnel.do", {
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
			loadPersonnelMsg(data);
		});
	}

	//加载工作者信息
	function loadPersonnelMsg(data) {
		$(".PersonnelMsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.account + "</td>"
					str += "<td>"+v.pInfo.name+"</td>"
					str += "<td>" + v.pInfo.phone + "</td>"
					str += "<td>"+ v.retime + "</td>"
					str += "<td>" + v.email + "</td>"
					str += "<td>" + v.boss + "</td>"
					str += "<td>" + v.department + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:modifypxx('"
						+ v.account + "\');>修改</a>"
						str += " | "
					str += "<a href=" + "javascript:delPersonnel('"
							+ v.account + "\');>删除</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".PersonnelMsg").append(str);
	}
	
	// 点击删除
	function delPersonnel(id) {
		// 询问框
		layer.confirm('是否删除工作者？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			// 此处异步操作
			$.post("../delPersonnelByAccount.do", {
				account : id
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

	//增加管理者
	function addmanager() {
		$("body")
				.delegate(
						".addmanagerbtn",
						"click",
						function() {
							layer
									.open({
										type : 1,
										title : "增加工作者",
										skin : 'layui-layer-rim', // 加上边框
										area : [ '420px', '400px' ], // 宽高
										content : '<form class="layui-form" action="">'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">名字</label>'
												+ '<div class="layui-input-block">'
												+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请设名字..." class="layui-input pname" style="width: 250px;margin-top: 20px">'
												+ '</div>'
												+ '</div>'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">电话</label>'
												+ '<div class="layui-input-block">'
												+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请设联系方式..." class="layui-input pphone" style="width: 250px;margin-top: 20px">'
												+ '</div>'
												+ '</div>'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">权限</label>'
												+ '<div class="layui-input-block">'
												+ '<select class="proot" lay-verify="required" style="width: 250px;height: 40px;margin-top: 20px;display: block;border-color: gainsboro">'
												+ '<option value="1">超级管理员</option>'
												+ '<option value="2">普通员工</option>'
												+ '</select>'
												+ '</div>'
												+ '</div>'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">部门</label>'
												+ '<div class="layui-input-block">'
												+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请设置部门..." class="layui-input pdepartment" style="width: 250px;margin-top: 20px">'
												+ '</div>'
												+ '</div>'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">邮箱</label>'
												+ '<div class="layui-input-block">'
												+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请设置邮箱..." class="layui-input pemail" style="width: 250px;margin-top: 20px">'
												+ '</div>'
												+ '</div>'
												+ '<div class="layui-form-item">'
												+ '<label class="layui-form-label">领导</label>'
												+ '<div class="layui-input-block">'
												+ '<input type="text" lay-verify="required" autocomplete="off" placeholder="请输入上级领导..." class="layui-input pboss" style="width: 250px;margin-top: 20px">'
												+ '</div>'
												+ '</div>'
												+ '<div style="text-align: center;margin-top: 40px"">'
												+ '<button class="layui-btn layui-btn-radius padd" lay-submit="" style="width: 100px">增加</button>'
												+ '</div>' + '</form>'
									});
						});
	}

	//修改
	function modifypxx(id) {
		$.post("../getPersonnelByAccount.do",{account:id},function(data){
			layer
			.open({
				type : 1,
				skin : 'layui-layer-rim', // 加上边框
				area : [ '420px', '450px' ], // 宽高
				content : '<form class="layui-form" action="">'
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">姓名</label>'
						+ '<div class="layui-input-block">'
						+ '<label class="layui-form-label"'+data.pInfo.name+'</label>'
						+ '</div>'
						+ '</div>'
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">联系方式</label>'
						+ '<div class="layui-input-block">'
						+'<input class="pid" type="hidden" value='+id+'>'
						+ '<input type="text" lay-verify="required" value="'+data.pInfo.phone+'" autocomplete="off" placeholder="请设置电话..." class="layui-input pphone" style="width: 250px;margin-top: 20px">'
						+ '</div>'
						+ '</div>'
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">邮箱</label>'
						+ '<div class="layui-input-block">'
						+ '<input type="text" lay-verify="required" value="'+data.email+'" autocomplete="off" placeholder="请设置邮箱..." class="layui-input pemail" style="width: 250px;margin-top: 20px">'
						+ '</div>'
						+ '</div>'
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">部门</label>'
						+ '<div class="layui-input-block">'
						+ '<input type="text" lay-verify="required" value="'+data.department+'" autocomplete="off" placeholder="请设置部门..." class="layui-input pdepartment" style="width: 250px;margin-top: 20px">'
						+ '</div>'
						+ '</div>'
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">领导</label>'
						+ '<div class="layui-input-block">'
						+ '<input type="text" lay-verify="required" value="'+data.boss+'" autocomplete="off" placeholder="请再设置领导..." class="layui-input pboss" style="width: 250px;margin-top: 20px">'
						+ '</div>'
						+ '</div>'
						+ '<div style="text-align: center;margin-top: 40px"">'
						+ '<button class="layui-btn layui-btn-radius pmodify" lay-submit="" style="width: 100px">修改</button>'
						+ '</div>' + '</form>'
			});
		});
	}
	
	//增加提交
	function pAddtj(){
		$("body").delegate(".padd", "click", function(e) {
			e.preventDefault();
			var pname = $(".pname").val();
			var pphone = $(".pphone").val();
			var proot = $(".proot").val();
			var pdepartment = $(".pdepartment").val();
			var pemail = $(".pemail").val();
			var pboss = $(".pboss").val();
			var rephone=/0?(13|14|15|18)[0-9]{9}/;
			var reemail=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
			if (pname.length == 0) {
				layer.msg('名字不能为空！'); 
				return;
			}
			if (!rephone.test(pphone)) {
				layer.msg('电话格式不正确！');
				return;
			}
			if (pdepartment.length == 0) {
				layer.msg('请设置部门！');
				return;
			}
			if (!reemail.test(pemail)) {
				layer.msg('邮箱格式不正确！');
				return;
			}
			if (pboss.length == 0) {
				layer.msg('请选择领导！');
				return;
			}
			
			//加载层
			layer.msg('录入中...', {
				icon : 16,
				shade : 0.01
			});
			$.post("../addPersonnel.do", {
				pname : pname,
				pphone : pphone,
				proot : proot,
				pdepartment : pdepartment,
				pemail : pemail,
				pboss : pboss
			}, function(data) {
				if (data.result == 1) {
					layer.msg('增加成功！');
					setpage();
				}else if (data.result == 2) {
					layer.msg('改手机已注册！');
				} else {
					layer.msg('增加失败！');
				}
			});

		});
	}
	
	//修改工作者
	function modifyPmsg() {
		$("body").delegate(".pmodify", "click", function(e) {
			e.preventDefault();
			var pid=$(".pid").val();
			var pphone=$(".pphone").val();
			var pemail = $(".pemail").val();
			var pdepartment = $(".pdepartment").val();
			var pboss = $(".pboss").val();
			var rephone=/0?(13|14|15|18)[0-9]{9}/;
			var reemail=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
			var is=(pid==pphone)?1:0
			if (!rephone.test(pphone)) {
				layer.msg('电话格式不正确！');
				return;
			}
			if (!reemail.test(pemail)) {
				layer.msg('邮箱格式不正确！');
				return;
			}
			if (pdepartment.length == 0) {
				layer.msg('请设置部门！');
				return;
			}
			if (pboss.length == 0) {
				layer.msg('请选择领导！');
				return;
			}
			//加载层
			layer.msg('修改中...', {
				icon : 16,
				shade : 0.01
			});
			$.post("../updatePersonnelByAccount.do", {
				pphone : pphone,
				account : pid,
				pdepartment : pdepartment,
				pemail : pemail,
				pboss : pboss,
				is:is
			}, function(data) {
				if (data.result == 1) {
					layer.msg('修改成功！');
					setpage();
				} else if (data.result == 2) {
					layer.msg('该电话已注册！');
				} else {
					layer.msg('修改失败！');
				}
			});
		});
	}
	
	//查找参赛者
	function searchPersonnel(){
		$("body").delegate(".btnsearch","click",function(e){
			e.preventDefault();
			var tj=$(".tj").val();
			if(tj.length == 0){
				layer.msg('请输入查询条件！');
				return;
			}
			ssetpage(1,tj);
		});
	}
	
	// 分页
	function ssetpage(curr,tj) {
		$.post("../getPersonnelByLike.do", {
			page : curr || 1,
			rows : 5,
			msg:tj
		}, function(data) {
			laypage({
				cont : 'page',
				pages : data.pages,
				curr : curr || 1,
				skip : true,
				skin : '#c0eebd',
				jump : function(obj, first) {
					if (!first) {
						setpage(obj.curr,tj);
					}
				}
			});console.log(data)
			loadPersonnelMsg(data);
		});
	}