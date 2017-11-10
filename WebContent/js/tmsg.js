/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
	initLayui();
	laodcity();
	clickSave();
	teamMag();
});

// 加载省市联动
function laodcity() {
	// 加载省市联动
	$("#city").citySelect();
}

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

// 表单验证
function validateForm() {
	var tname = $(".tname").val();
	var title = $(".title").val();
	var field = $(".field").val();
	var stage = $(".stage").val();
	var prov = $(".prov").val();
	var city = $(".city").val();
	var dist = $(".dist").val();
	var address = prov + city + dist;
	var iszc = $(".iszc").val();
	var ttime = $(".ttime").val();
	var oaddress = $(".oaddress").val();
	var zcode = $(".zcode").val();
	var hname = $(".hname").val();
	var hposition = $(".hposition").val();
	var hphone = $(".hphone").val();
	var hemail = $(".hemail").val();
	var ctype = $(".ctype").val();
	var id_card = $(".id_card").val();
	var purpose = $(".purpose").val();
	var number = $(".number").val();
	var outline = layedit.getContent(index);
	var rezcode = /\d{6}/;
	var reemail = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
	var renum = /^[1-9]\d*$/;
	var rephone = /0?(13|14|15|18)[0-9]{9}/;

	if (tname.length == 0) {
		layer.msg('团队名不能为空！');
		return;
	}
	if (title.length == 0) {
		layer.msg('项目名称不能为空！');
		return;
	}
	if (field == -1) {
		layer.msg('请选择参赛行业！');
		return;
	}
	if (stage == -1) {
		layer.msg('请选择项目阶段！');
		return;
	}
	if (city == null || city == "" || dist == "") {
		layer.msg('请选择行政领域！');
		return;
	}
	if (ttime.length == 0) {
		layer.msg('请设置团队成立时间！');
		return;
	}
	if (oaddress.length == 0) {
		layer.msg('办公地址不能为空！');
		return;
	}
	if (!rezcode.test(zcode)) {
		layer.msg('邮政编码格式不对！');
		return;
	}
	if (hname.length == 0) {
		layer.msg('联系人不能为空！');
		return;
	}
	if (hposition.length == 0) {
		layer.msg('联系人职位不能为空！');
		return;
	}
	if (!rephone.test(hphone)) {
		layer.msg('联系人电话格式不对！');
		return;
	}
	if (!reemail.test(hemail)) {
		layer.msg('联系人邮箱格式不正确！');
		return;
	}
	if (ctype == -1) {
		layer.msg('请选择证件类型！');
		return;
	}
	if (id_card.length == 0) {
		layer.msg('证件号码不能为空！');
		return;
	}
	if (purpose == -1) {
		layer.msg('请选择参赛目的！');
		return;
	}
	if (!renum.test(number)) {
		layer.msg('参赛人数格式格式不正确！');
		return;
	}
	if (outline.length == 0) {
		layer.msg('请编写项目简介！');
		return;
	}

	// 加载层
	layer.msg('正在保存，请稍等...', {
		icon : 16,
		shade : 0.01
	});

	$.post("../addTeamReativeMsg.do", {
		tname : tname,
		title : title,
		field : field,
		stage : stage,
		address : address,
		iszc : iszc,
		ttime : ttime,
		oaddress : oaddress,
		zcode : zcode,
		hname : hname,
		hposition : hposition,
		hphone : hphone,
		hemail : hemail,
		ctype : ctype,
		id_card : id_card,
		purpose : purpose,
		number : number,
		outline : outline
	}, function(data) {
		if (data.result == -1) {
			layer.msg('登录已过期，请重新登录！');
		} else if (data.result == 1) {
			layer.msg('保存成功！');
			teamMag();
		} else {
			layer.msg('保存失败！');
		}
	});

}

// 点击保存
function clickSave() {
	$("body").delegate(".clicksave", "click", function() {
		validateForm();
	});
}

// 查看团队信息
function teamMag() {
	$.post("../getTeamMsgByAccount.do", null, function(data) {
		if (data.t_id == null || data.t_id == 0 || data.t_id == ""
				|| data.t_id == undefined) {
			$(".saveTeamMsg").show();
			return;
		}
		$(".showTeamMsg").show();
		$(".saveTeamMsg").hide();
		var str1 = getTeamInfoStr(data);
		var str2 = getHeadInfoStr(data);
		$.post("../getProTitleOutLine.do",{account:data.c_account},function(d){
			showTeamMsg(str1, str2,d.outline);
		});
	});
}

// 获取团队基本信息
function getTeamInfoStr(data) {
	var str = '';
	$(data)
			.each(
					function(i, v) {
						str += '<tr>'
						str += '<td>团队账号：</td><td class="tms">' + v.c_account
								+ '</td>'
						str += '<td>团队名字：</td><td class="tms">' + v.t_name
								+ '</td>'
						str += '<td>作品题目：</td><td class="tms">' + v.pr_name
								+ '</td>'
						str += '<td>项目阶段：</td><td class="tms">'
								+ stateTo(v.stage) + '</td>'
						str += '</tr>'
						str += '<tr>'
						str += '<td>行业领域：</td><td class="tms">'
								+ filedTo(v.field) + '</td>'
						str += '<td>行政区域：</td><td class="tms">' + v.position
								+ '</td>'
						str += '<td>成立时间：</td><td class="tms">' + v.t_time
								+ '</td>'
						str += '<td>办公地址：</td><td class="tms">' + v.o_address
								+ '</td>'
						str += '</tr>'
						str += '<tr>'
						str += '<td>邮  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp编：</td><td class="tms">'
								+ v.z_code + '</td>'
						str += '<td>参赛人数：</td><td class="tms">' + v.number
								+ '</td>'
						str += '<td>参赛目的：</td><td class="tms">'
								+ purposeTo(v.purpose) + '</td>'
						str += '<td>众创团队：</td><td class="tms">'
								+ iszcTo(v.iszc) + '</td>'
						str += '</tr>'
					});
	return str;
}

// 获取联系人信息
function getHeadInfoStr(data) {
	var str = '';
	$(data).each(
			function(i, v) {
				str += '<tr>'
				str += '<td>证件类型：</td><td class="tms">'
						+ idcardTo(v.head.c_type) + '</td>'
				str += '<td>名字：</td><td class="tms">' + v.head.name + '</td>'
				str += '<td>职位：</td><td class="tms">' + v.head.position
						+ '</td>'
				str += '<td>电话：</td><td class="tms">' + v.head.phone + '</td>'
				str += '</tr>'
				str += '<tr>'
				str += '<td>证件号码：</td><td class="tms">' + v.head.id_card
						+ '</td>'
				str += '<td>邮箱：</td><td class="tms">' + v.head.email + '</td>'
				str += '</tr>'
			});
	return str;
}

// 显示团队基本信息信息
function showTeamMsg(str1, str2,outline) {
	var str = "";
	str += '<fieldset class="layui-elem-field layui-field-title">'
	str += '<legend>团队基本信息</legend>'
	str += '<div class="layui-field-box">'
	str += '<table class="teambasemsg">'
	str += str1
	str += '</table>'
	str += '</div>'
	str += '</fieldset>'
	str += '<fieldset class="layui-elem-field layui-field-title">'
	str += '<legend>负责人人信息</legend>'
	str += '<div class="layui-field-box">'
	str += '<table class="teambasemsg">' + str2
	str += '</table>'
	str += '</div>'
	str += '</fieldset>'
	str += '<fieldset class="layui-elem-field layui-field-title">'
	str += '<legend>项目简介</legend>'
	str += '<div class="layui-field-box">'
	str += '<div class="fontcolor">' + outline
	str += '</div>'
	str += '</div>'
	str += '</fieldset>'
	$(".showTeamMsg").append(str);
}

// 项目阶段转换
function stateTo(s) {
	if (s == 1) {
		return '创意';
	} else if (s == 2) {
		return '研发';
	} else if (s == 3) {
		return '产品开发';
	} else if (s == 4) {
		return '试运营';
	} else if (s == 5) {
		return '市场扩展';
	} else {
		return '其他';
	}
}

// 行业领域转换
function filedTo(f) {
	if (f == 1) {
		return '电子信息';
	} else if (f == 2) {
		return '互联网和移动互联网';
	} else if (f == 3) {
		return '生物医药';
	} else if (f == 4) {
		return '先进制造';
	} else if (f == 5) {
		return '新能源和节能环保';
	} else if (f == 6) {
		return '新材料';
	} else {
		return '其他';
	}
}

// 目的转换
function purposeTo(p) {
	if (p == 1) {
		return '竞争大赛优胜荣誉';
	} else if (p == 2) {
		return '寻求股权融资机会';
	} else if (p == 3) {
		return '寻求债权融资机会';
	} else if (p == 4) {
		return '寻求学习、体验、广泛交流机会';
	} else if (p == 5) {
		return '寻求政府政策支持';
	} else if (p == 6) {
		return '自我宣传展示机会';
	} else {
		return '其他';
	}
}

// 是否转换
function iszcTo(s) {
	if (s == 1) {
		return '是';
	} else {
		return '否';
	}
}

// 身份转换
function idcardTo(s) {
	if (s == 1) {
		return '身份证';
	} else if (s == 2) {
		return '军官证';
	} else if (s == 3) {
		return '护照';
	}
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