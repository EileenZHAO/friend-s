/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		mid = -1;
		mtype = -1;
		curr=1;
		pages=1;
		initLayui();
		loadDynamic();
		loadNotice();
		loadNews(curr);
		getMoreNews();
	});
	//初始化layui
	function initLayui() {
		layui.use('layer', function() {
			var $ = layui.jquery, layer = layui.layer;
		});
	}

	//加载动态
	function loadDynamic(page) {
		$.post("getIndexDynamic.do", {
			page : page || 1,
			rows : 10
		}, function(data) {
			loadAllMsg(data);
		});
	}

	//加载信息
	function loadAllMsg(data) {
		$(".dynamicmsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr onclick=seeform(\'" + v.dy_id + "\','1')>"
					str += "<td class='tftd'><img src='images/ico4.png'></td>"
					str += "<td class='dstzxxt dstztt'><span>" + v.title
							+ "</span></td>"
					str += "<td class='dytime'>" + v.time + "</td>"
					str += "</tr>"
				});
		$(".dynamicmsg").append(str);
	}

	//加载公告
	function loadNotice(page) {
		$.post("getAllNotice.do", {
			page : page || 1,
			rows : 10
		}, function(data) {
			loadAllMsg2(data);
		});
	}

	//加载信息
	function loadAllMsg2(data) {
		$(".noticemsg tr").remove();
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str += "<tr onclick=seeform(\'" + v.n_id + "\','2')>"
					str += "<td class='tftd'><img src='images/ico4.png'></td>"
					str += "<td class='dstzxxt dstztt'><span>"
							+ v.title.slice(v.title.indexOf("-") + 1, v.title
									.indexOf(".pdf")) + "</span></td>"
					str += "<td class='dytime'>" + v.time + "</td>"
					str += "</tr>"
				});
		$(".noticemsg").append(str);
	}

	//加载新闻
	function loadNews(page) {
		$.post("getIndexNews.do", {
			page : page || 1,
			rows : 10
		}, function(data) {
			pages=data.pages;
			loadAllMsg3(data);
		});
	}

	//加载信息
	function loadAllMsg3(data) {
		var str = "";
		$(data.rows).each(
				function(i, v) {
					str+="<div class='newitem'>";
					str+="<div class='newimg'>";
					str+="<img src='"+v.nPicture.picture+"'>";
					str+="</div>";
					str+="<div class='newcontent'>";
					str+="<p class='newtitle' onclick=seeform(\'" + v.ns_id + "\','3')>"+v.title+"</p>";
					str+="<span>发布时间：<span><span>"+v.time+"<span><br>";
					str+="<span>"+v.content.slice(0,200)+"</span>";
					str+="</div>";
					str+="<hr style='clear: both; margin: auto;'>";
					str+="</div>";					
				});
		$("#inews").append(str);
	}

	//点击查看
	function seeform(id, type) {
		mid = id;
		mtype = type;
		if (mid == -1) {
			layer.msg('打开失败啦！', {
				icon : 1,
				time : 2000
			});
			return;
		}
		window.open("news.html?id=" + mid + "&type=" + mtype);
	}
	
	//获取更多新闻
	function getMoreNews(){
		$("body").delegate(".getmoreimg","click",function(){
			if(curr>=pages){
				layer.msg('加载完了哦！', {
					icon : 1,
					time : 2000
				});
				return;
			}
			curr++;
			loadNews(curr);
		});
	}