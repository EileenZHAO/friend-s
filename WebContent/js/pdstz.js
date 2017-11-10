/**
 * Created by Administrator on 2017/1/22.
 */
$(function () {
	initLayui();
	id=-1;
});

//初始化layui
function initLayui(){
	 layui.use(['laypage', 'layer'], function () {
	        laypage = layui.laypage
	            ,layer = layui.layer;

	        setpage();
	    });
}

//分页
function setpage(curr) {
	$.post("../getAllInform.do", {
		page : curr || 1,
		rows : 10
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
		loadAllMsg(data);
	});
}

//加载通知信息
function loadAllMsg(data) {
	$(".showMsg tr").remove();
	var str = "";
	$(data.rows).each(
			function(i, v) {
				str += "<tr onclick='seeform("+v.in_id+")'>"
				str+="<td class='tpimg'><img src='../images/icon3.gif'></td>"
				str+="<td class='dstzxxt dstztt'>【大赛通知】</td>"
				str += "<td class='dstzxxt dstztr'>" + v.title + "</td>"
				str += "<td class='dstzxxt dstztime'>" + v.time + "</td>"
				str += "</tr>"
			});
	$(".showMsg").append(str);
}

//打开页面显示通知
function seeform(iid){
	id=iid;
	if(id==-1){
		layer.msg('打开失败啦！', {
			icon : 1,
			time : 2000
		});
		return;
	}
	parent.openMsgPage(id,2);
}