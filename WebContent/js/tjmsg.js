/**
 * Created by Administrator on 2017/1/22.
 */
$(function() {
	initlayui();
	uploadimg();
});

// 初始化
function initlayui() {
	layui.use([ 'layer', 'upload' ], function() {
		$ = layui.jquery, layer = layui.layer, upload = layui.upload;
	});
}

// 上传图片接口
function uploadimg() {
	layui.use('upload', function() {
		layui.upload({
			url : '../upLoadContestProduction.do',
			elem : "#upload",
			ext : 'pdf',
			success : function(res) {
				if (res.result == 0) {
					layer.msg('上传失败！');
				} else {
					layer.msg('上传成功！');
				}
			}
		});
	});
}