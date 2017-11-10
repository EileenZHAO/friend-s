/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
	initLayui();
	isBaoMing();
	saveTMemberMsg();
	tjTeamMember();
});

// 初始化layui
function initLayui() {
	layui.use([ 'layer', 'form', 'element', 'laydate', 'layedit' ], function() {
		$ = layui.jquery, laydate = layui.laydate, form = layui.form(),
				layer = layui.layer, layedit = layui.layedit, element = layui
						.element();

		// 构建一个默认的编辑器
		index = layedit.build('bianjiqi', {
			tool : [ 'strong' // 加粗
			, 'italic' // 斜体
			, 'underline' // 下划线
			, 'del' // 删除线
			, '|' // 分割线
			, 'left' // 左对齐
			, 'center' // 居中对齐
			, 'right' // 右对齐
			, 'link' // 超链接
			, 'unlink' // 清除链接
			, 'face' // 表情
			],
			height : 150
		});
	});
}

// 点击保存团队成员信息
function saveTMemberMsg() {
	$("body")
			.delegate(
					".savebtn",
					"click",
					function() {
						var mname = $(".mname").val();
						var mage = $(".mage").val();
						var msex = $(".msex").val();
						var mposition = $(".mposition").val();
						var meducation = $(".meducation").val();
						var mphone = $(".mphone").val();
						var memail = $(".memail").val();
						var moverseas = $(".moverseas").val();
						var mrxqrjh = $(".mrxqrjh").val();
						var resume = layedit.getContent(index);
						var rephone = /0?(13|14|15|18)[0-9]{9}/;
						var reemail = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
						var reage = /^[1-9]\d*$/;

						if (mname.length == 0) {
							layer.msg('姓名不能为空！');
							return;
						}
						if (!reage.test(mage)) {
							layer.msg('年龄格式不对！');
							return;
						}
						if (mage > 200 || mage < 1) {
							layer.msg('请输入1到200之间的数字！');
							return;
						}
						if (mposition.length == 0) {
							layer.msg('职位不能为空！');
							return;
						}
						if (meducation == -1) {
							layer.msg('请选择教育经历！');
							return;
						}
						if (!rephone.test(mphone)) {
							layer.msg('电话格式不对！');
							return;
						}
						if (!reemail.test(memail)) {
							layer.msg('邮箱格式不对！');
							return;
						}
						if (resume.length == 0) {
							layer.msg('请编写个人简介！');
							return;
						}

						// 加载层
						layer.msg('正在保存，请稍等...', {
							icon : 16,
							shade : 0.01
						});

						$.post("../cacheTMemberMsg.do", {
							mname : mname,
							mage : mage,
							msex : msex,
							mposition : mposition,
							meducation : meducation,
							mphone : mphone,
							memail : memail,
							moverseas : moverseas,
							mrxqrjh : mrxqrjh,
							resume : resume
						}, function(data) {
							if (data.result == 1) {
								layer.msg('保存成功！');
								loadCacheMember(data.members);
							} else if (data.result == -1) {
								layer.msg('登录已过期，请从新登录！');
							} else if (data.result == -2) {
								layer.msg('你的团队基本信息还未完成，先去完成再来吧！');
							} else {
								layer.msg('保存失败！');
							}
						});
					});
}

// 加载已缓存的数据
function loadCacheMember(data) {
	var str = getMemberInfoStr(data);
	var strmsg = showTeamMsg(str);
	$(".tableTeamMsg").children().remove();
	$(".tableTeamMsg").append(strmsg);
	$(".baomingbox").show();
}

// 获取成员人信息
function getMemberInfoStr(data) {
	var str = '';
	$(data).each(function(i, v) {
		str += '<tr>'
		str += '<td>' + v.mname + '</td>'
		str += '<td>' + sexTo(v.msex) + '</td>'
		str += '<td>' + v.mage + '</td>'
		str += '<td>' + educationTo(v.meducation) + '</td>'
		str += '<td>' + v.mposition + '</td>'
		str += '<td>' + v.mphone + '</td>'
		str += '<td>' + v.memail + '</td>'
		str += '<td>' + isTo(v.moverseas) + '</td>'
		str += '<td>' + isTo(v.mrxqrjh) + '</td>'
		str += '<td>'
		str += '<a href= "javascript:void(0);" onclick="presum(this)">个人简历</a>'
		str += '<div class="ycr" style="display:none">'+v.resume+'</div>'
		str += '</td>'
		str += '</tr>'
	});
	return str;
}

// 身份转换
function sexTo(s) {
	if (s == 1) {
		return '男';
	} else {
		return '女';
	}
}

// 学历转换
function educationTo(f) {
	if (f == 1) {
		return '初中';
	} else if (f == 2) {
		return '高中';
	} else if (f == 3) {
		return '中技';
	} else if (f == 4) {
		return '中专';
	} else if (f == 5) {
		return '专科';
	} else if (f == 6) {
		return '本科';
	} else if (f == 7) {
		return '硕士';
	} else if (f == 8) {
		return '博士';
	} else {
		return '其他';
	}
}

// 是否转换
function isTo(s) {
	if (s == 1) {
		return '是';
	} else {
		return '否';
	}
}

// 显示学生信息
function showTeamMsg(msg) {
	var str = '';
	str += '<fieldset class="layui-elem-field layui-field-title">'
	str += '<legend>成员信息</legend>'
	str += '<div class="layui-field-box">'
	str += '<table class="layui-table csz" lay-even="" lay-skin="nob">'
	str += '<colgroup>'
	str += '</colgroup>'
	str += '<thead>'
	str += '<tr>'
	str += '<th>名字</th>'
	str += '<th>性别</th>'
	str += '<th>年龄</th>'
	str += '<th>学历</th>'
	str += '<th>职位</th>'
	str += '<th>电话</th>'
	str += '<th>邮箱</th>'
	str += '<th>留学</th>'
	str += '<th>入选千人计划</th>'
	str += '<th>操作</th>'
	str += '</tr>'
	str += '</thead>'
	str += '<tbody>'
	str += msg
	str += '</tbody>'
	str += '</table> '
	str += '</div>'
	str += '</fieldset>'
	return str;
}

// 查看简历
function presum(o) {
	var str = '<div style="height:100%;" disabled="true">' + $(o).parent().find(".ycr").html()
			+ '</div>';
	layer.open({
		type : 1,
		title : "个人简历",
		skin : 'layui-layer-rim', // 加上边框
		area : [ '1000px', '400px' ], // 宽高
		content : str
	});
}

// 点击提交报名
function tjTeamMember() {
	$("body").delegate(".tijiaobaoming", "click", function() {

		// 加载层
		layer.msg('正在报名，请稍等...', {
			icon : 16,
			shade : 0.01
		});

		$.post("../addTeamMembersMsg.do", null, function(data) {
			if (data.result == 1) {
				layer.msg('报名成功！');
				isBaoMing();
			} else if (data.result == -1) {
				layer.msg('登录已过期，请从新登录！');
			} else {
				ayer.msg('报名失败！');
			}
		});
	});
}

// 判断是否报名
function isBaoMing() {
	$.post("../getTeamMsgByAccount.do", null, function(data) {
		if (data==""||data.tMembers=="undefined"||data.tMembers[0].m_id == 0) {
			$(".tableinput").show();
			return;
		}
		$(".tableinput").hide();
		var str = getBmMemberInfoStr(data);
		var strmsg = showTeamMsg(str);
		$(".tableshow").append(strmsg);
		$(".tableshow").show();
	});
}

// 获取成员人信息
function getBmMemberInfoStr(data) {
	var str = '';
	$(data).each(function(i, v) {
		$(v.tMembers).each(function(ii, vv) {
			if (vv.m_id == 0) {
				return;
			}
			str += '<tr>'
			str += '<td>' + vv.name + '</td>'
			str += '<td>' + sexTo(vv.sex) + '</td>'
			str += '<td>' + vv.age + '</td>'
			str += '<td>' + educationTo(vv.education) + '</td>'
			str += '<td>' + vv.position + '</td>'
			str += '<td>' + vv.phone + '</td>'
			str += '<td>' + vv.email + '</td>'
			str += '<td>' + isTo(vv.overseas_study) + '</td>'
			str += '<td>' + isTo(vv.rxqrjh) + '</td>'
			str += '<td>'
			str += '<a href= "javascript:void(0);" onclick="presum(this)">个人简历</a>'
			str += '<div class="ycr" style="display:none">'+vv.resume+'</div>'
			str += '</td>'
			str += '</tr>'
		});
	});
	return str;
}
