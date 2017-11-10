/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		//初始化
		initlayui();
		searchContestant();
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
		$.post("../getAllContestant.do", {
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
			loadContestantMsg(data);
		});
	}

	//加载参赛者信息
	function loadContestantMsg(data) {
		$(".ContestantMsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr>"
					str += "<td>" + v.c_account + "</td>"
					str += "<td>"
							+ (v.cInfo.contacts != null ? v.cInfo.contacts
									: '未录入') + "</td>"
					str += "<td>" + type(v) + "</td>"
					str += "<td>"
							+ (v.cInfo.phone != null ? v.cInfo.phone : '未录入')
							+ "</td>"
					str += "<td>" + v.retime + "</td>"
					str += "<td>" + (v.cInfo.qq != null ? v.cInfo.qq : '未录入')
							+ "</td>"
					str += "<td>" + v.email + "</td>"
					str += "<td>"
							+ (v.cInfo.position != null ? v.cInfo.position
									: '未录入') + "</td>"
					str += "<td>" + source(v) + "</td>"
					str += "<td>"
					str += "<a href=" + "javascript:teamMag('"
						+ v.c_account + "\');>团队信息</a>"
						str += " | "
					str += "<a href=" + "javascript:delContestant('"
							+ v.c_account + "\');>删除</a>"
					str += "</td>"
					str += "</tr>"
				});
		$(".ContestantMsg").append(str);
	}

	//赛事组别转换
	function type(v) {
		if (v.cInfo.type == 1) {
			return '团队组';
		} else if (v.cInfo.type == 2) {
			return '企业组';
		} else {
			return '未录入';
		}
	}

	//资源转换
	function source(v) {
		if (v.source == 0) {
			return '其他';
		} else if (v.source == 1) {
			return '杂志';
		} else if (v.source == 2) {
			return '报纸';
		} else if (v.source == 3) {
			return '宣传册';
		} else if (v.source == 4) {
			return '宣传海报';
		} else if (v.source == 5) {
			return '信件';
		} else if (v.source == 6) {
			return '他人告知';
		} else if (v.source == 7) {
			return '网络';
		}
	}
	
	// 点击删除
	function delContestant(id) {
		// 询问框
		layer.confirm('是否删除参赛者和他的团队？', {
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			// 此处异步操作
			$.post("../delContestantByAccount.do", {
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
	
	//查看团队信息
	function teamMag(id){
		$.post("../getTeamMsg.do", {
			account : id
		}, function(data) {
			var str = getTeamInfoStr(data);
			var str1 = getHeadInfoStr(data);
			var str2 = getMemberInfoStr(data);
			 
			showTeamMsg(str,str1,str2);
		});
	}
	
	//获取团队基本信息
	function getTeamInfoStr(data){
		var str = '';
		$(data).each(function(i, v) {
			 str+='<tr>'
			 str+='<td>团队账号：</td><td class="tms">'+v.c_account+'</td>'
			 str+='<td>团队名字：</td><td class="tms">'+v.t_name+'</td>'
			 str+='<td>作品题目：</td><td class="tms">'+v.pr_name+'</td>'
			 str+='<td>项目阶段：</td><td class="tms">'+stateTo(v.stage)+'</td>'
			 str+='</tr>'
			 str+='<tr>'
			 str+='<td>行业领域：</td><td class="tms">'+filedTo(v.field)+'</td>'
			 str+='<td>行政区域：</td><td class="tms">'+v.position+'</td>'		
			 str+='<td>成立时间：</td><td class="tms">'+v.t_time+'</td>'
			 str+='<td>办公地址：</td><td class="tms">'+v.o_address+'</td>'
			 str+='</tr>'
		     str+='<tr>'
			 str+='<td>邮  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp编：</td><td class="tms">'+v.z_code+'</td>'
			 str+='<td>参赛人数：</td><td class="tms">'+v.number+'</td>'
			 str+='<td>参赛目的：</td><td class="tms">'+purposeTo(v.purpose)+'</td>'
			 str+='<td>众创团队：</td><td class="tms">'+iszcTo(v.iszc)+'</td>'
			 str+='</tr>'
		}); 
		return str;
	}
	
	//获取联系人信息
	function getHeadInfoStr(data){
		var str = '';
		$(data).each(function(i, v) {
			 str+='<tr>'
			 str+='<td>证件类型：</td><td class="tms">'+idcardTo(v.head.c_type)+'</td>'
			 str+='<td>名字：</td><td class="tms">'+v.head.name+'</td>'
			 str+='<td>职位：</td><td class="tms">'+v.head.position+'</td>'
			 str+='<td>电话：</td><td class="tms">'+v.head.phone+'</td>'
			 str+='</tr>'
			 str+='<tr>'
			 str+='<td>证件号码：</td><td class="tms">'+v.head.id_card+'</td>'
			 str+='<td>邮箱：</td><td class="tms">'+v.head.email+'</td>'
			 str+='</tr>'		 
		}); 
		return str;
	}
	
	//获取成员人信息
	function getMemberInfoStr(data){
		var str = '';
		$(data).each(function(i, v) {
			$(v.tMembers).each(function(ii, vv) {
				if(vv.m_id==0){
					return;
				}
				 str += '<tr>'
						str += '<td>'+vv.name+'</td>'
						str += '<td>'+sexTo(vv.sex)+'</td>'
						str += '<td>'+vv.age+'</td>'
						str += '<td>'+educationTo(vv.education)+'</td>'
						str += '<td>'+vv.position+'</td>'
						str += '<td>'+vv.phone+'</td>'
						str += '<td>'+vv.email+'</td>'
						str += '<td>'+isTo(vv.overseas_study)+'</td>'
						str += '<td>'+isTo(vv.rxqrjh)+'</td>'
						str += '<td>'
						str += '<a href= javascript:presum('+ vv.m_id + ');>个人简历</a>'
						str += '</td>'
						str += '</tr>'
			});
		}); 
		return str;
	}
	
	//显示学生信息
	function showTeamMsg(str,str1,str2){
		layer
		.open({
			type : 1,
			title : "团队信息",
			skin : 'layui-layer-rim', // 加上边框
			area : [ '950px', '500px' ], // 宽高
			content : '<fieldset class="layui-elem-field layui-field-title">'
				    +'<legend>团队基本信息</legend>'
				    +'<div class="layui-field-box">'
				    +'<table class="teambasemsg">'
				    +str
				    +'</table>'
				    +'</div>'
				    +'</fieldset>'
				    +'<fieldset class="layui-elem-field layui-field-title">'
				    +'<legend>负责人人信息</legend>'
				    +'<div class="layui-field-box">'
				    +'<table class="teambasemsg">'
				    +str1
				    +'</table>'
				    +'</div>'
				    +'</fieldset>'
				    +'<fieldset class="layui-elem-field layui-field-title">'
				    +'<legend>成员信息</legend>'
				    +'<div class="layui-field-box">'
				    +'<table class="layui-table csz" lay-even="" lay-skin="nob">'
					+ '<colgroup>'
					+ '</colgroup>'
					+ '<thead>'
					+ '<tr>'
					+ '<th>名字</th>'
					+ '<th>性别</th>'
					+ '<th>年龄</th>'
					+ '<th>学历</th>'
					+ '<th>职位</th>'
					+ '<th>电话</th>'
					+ '<th>邮箱</th>'
					+ '<th>留学</th>'
					+ '<th>入选千人计划</th>'
					+ '<th>操作</th>'
					+ '</tr>'
					+ '</thead>'
					+ '<tbody>'
					+ str2
					+ '</tbody>'
					+ '</table> '
				    +'</div>'
				    +'</fieldset>'
		});
	}
	
	//查看简历
	function presum(id){
		$.post("../getResumeByMid.do",{mid:id},function(data){
			var str='<div style="height:100%;" disabled="true">'+data.resume+'</div>';
		     layer.open({
					type : 1,
					title : "个人简历",
					skin : 'layui-layer-rim', // 加上边框
					area : [ '620px', '400px' ], // 宽高
					content : str
				});				
		});
	}
	
	//项目阶段转换
	function stateTo(s){
		if(s==1){
			return '创意';
		}else if(s==2){
			return '研发';
		}else if(s==3){
			return '产品开发';
		}else if(s==4){
			return '试运营';
		}else if(s==5){
			return '市场扩展';
		}else{
			return '其他';
		}
	}
	
	//行业领域转换
	function filedTo(f){
		if(f==1){
			return '电子信息';
		}else if(f==2){
			return '互联网和移动互联网';
		}else if(f==3){
			return '生物医药';
		}else if(f==4){
			return '先进制造';
		}else if(f==5){
			return '新能源和节能环保';
		}else if(f==6){
			return '新材料';
		}else{
			return '其他';
		}
	}
	
	//目的转换
	function purposeTo(p){
		if(p==1){
			return '竞争大赛优胜荣誉';
		}else if(p==2){
			return '寻求股权融资机会';
		}else if(p==3){
			return '寻求债权融资机会';
		}else if(p==4){
			return '寻求学习、体验、广泛交流机会';
		}else if(p==5){
			return '寻求政府政策支持';
		}else if(p==6){
			return '自我宣传展示机会';
		}else{
			return '其他';
		}
	}
	
	//是否转换
	function iszcTo(s){
		if(s==1){
			return '是';
		}else{
			return '否';
		}
	}
	
	//身份转换
	function idcardTo(s){
		if(s==1){
			return '身份证';
		}else if(s==2){
			return '军官证';
		}else if(s==3){
			return '护照';
		}
	}
	
	//身份转换
	function sexTo(s){
		if(s==1){
			return '男';
		}else {
			return '女';
		}
	}
	
	//学历转换
	function educationTo(f){
		if(f==1){
			return '初中';
		}else if(f==2){
			return '高中';
		}else if(f==3){
			return '中技';
		}else if(f==4){
			return '中专';
		}else if(f==5){
			return '专科';
		}else if(f==6){
			return '本科';
		}else if(f==7){
			return '硕士';
		}else if(f==8){
			return '博士';
		}else{
			return '其他';
		}
	}
	
	//是否转换
	function isTo(s){
		if(s==1){
			return '是';
		}else{
			return '否';
		}
	}
	
	//查找参赛者
	function searchContestant(){
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
		$.post("../getContestantByLike.do", {
			page : curr || 1,
			rows : 5,
			tj:tj
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
			});
			loadContestantMsg(data);
		});
	}