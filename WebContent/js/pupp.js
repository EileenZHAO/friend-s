/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
		initlayui();
		showUser();
		uploadimg();
	});

	//初始化
	function initlayui() {
		layui.use([ 'layer', 'upload' ], function() {
			$ = layui.jquery, layer = layui.layer, upload = layui.upload;
		});
	}

	//用户显示
	function showUser() {
		$.post("../getContestantBySession.do", null, function(data) {
			$(".protrait").attr("src", data.portrait);
		});
	}

	//上传图片接口
	function uploadimg() {
		layui.use('upload', function() {
			layui.upload({
				url : '../upLoadContesttantPortrait.do',
				elem : "#upload",
				ext : 'jpg|png|gif',
				success : function(res) {
					if (res.result == 0) {
						layer.msg('上传失败！');
					} else {
						$(".protrait").attr("src", res.url);
						parent.showUser();
						layer.msg('设置成功！');
					}
				}
			});
		});
	}