$(function () {
	//购物车显示、隐藏
	$('.cart_num').click(function(event) {
		event.stopPropagation();
		//判断购物车是否打开
		if ($(".cart").is(':hidden')) {
			$(".cart").show();
			//页面添加事件关闭购物车
			$(document).bind('click.hidecart',function (event) {
				 // e.stopPropagation();
				$(".cart").hide();
				$(document).unbind(".hidecart");
			});
			//当购物车打开时点击购物车不关闭
			$('#cart1').click(function(event) {
				event.stopPropagation();
			});
			//取得购物车信息
			$.ajax({
				url: domain+'static_state.php',
				type: 'GET',
				dataType: 'jsonp',
				data: {act: 'cartInfo',type: 'update'},
				success: function (result) {
					//更新购物车
					updateCart(result);
				}
			});

		} else {
			//关闭购物车，注销事件,整个页面关闭事件
			$(document).unbind(".hidecart");
			$(".cart").hide();
		}
		//当意见栏打开时，点击购物袋关闭
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	});
	//当意见栏打开时，点击联系客服关闭
	$('#kefu').click(function(){
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	})
	//当意见栏打开时，点击投诉关闭
	$('#tousu').click(function(){
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	})
	//意见栏显示、隐藏
	$('#objection').click(function(event) {
		if(userid == ''){
			loginRegShow('login',window.location.href);
			return false;
	}
		event.stopPropagation();
		//判断意见栏是否打开
		if ($(".view_wrap").is(':hidden')) {
			$('.view_wrap').show(300);
		} else {
			//关闭意见栏，注销事件,整个页面关闭事件
			$('.view_wrap').hide(300);
		}
	});
	$('.btn_close').click(function() {
		$('.view_wrap').hide(300);
	});

	$('.menu_list').mousemove(function(){
		$(this).find('.i-list').show();
		$(this).find('h3').addClass('hover');
	});
	$('.menu_list').mouseleave(function(){
		$(this).find('.i-list').hide();
		$(this).find('h3').removeClass('hover');
	});

	//	非首页弹出下拉菜单
	$('.No_index').mousemove(function(){
		$('.menu').show();
	});
	$('.No_index').mouseleave(function(){
		$('.menu').hide();
	});

	$('.r_bar .qrjs').mousemove(function(){
		$(this).find('.qrcimgjs').show();
	});
	$('.r_bar .qrjs').mouseleave(function(){
		$(this).find('.qrcimgjs').hide();
	});

	$("#gototop").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
	});

});

function youqinglinkshow (_this) {
	$(_this).hide().siblings('a').show();
	youqinglink = $('#youqinglink');
	if (youqinglink.height() > 30) {
		youqinglink.height(30);
	} else {
		youqinglink.height($('#youqinglink ul').height());

	}

}



/* *
 * 对会员的投诉输入作处理(侧边栏)
    检查投诉主题
 */
function submitCom_view(msg_title)
{
  var frm         = document.forms['formMsg2'];
  var content_notice = document.getElementById('content_notice');
  if (msg_title == '')
  {
    content_notice.innerHTML = '投诉主题不能为空';
    return false;
  }else{
    content_notice.innerHTML = '';
    return true;
  }
  if (msg_title.length > 200)
  {
    content_notice.innerHTML = '投诉主题太长';
    return false;
  }

}

/* *
 * 对会员的投诉输入作处理(侧边栏)
    检查投诉内容
 */
function submitCom_view2(msg_content)
{
  var frm         = document.forms['formMsg2'];
  var content_notice = document.getElementById('content_notice');
  if (msg_content == '')
  {
    content_notice.innerHTML = '投诉内容不能为空';
    return false;
  }else{
    content_notice.innerHTML = '';
    return true;
  }

}

/*
调用广告接口函数,只支持一个广告位一个广告
单个obj {aid:123,num:数量,dom:节点对像,act:'append',fn,fun}
多个obj [单个obj,单个obj]，或者{aid:'123,345',fn,fun}
 */
function create_ads (obj,url) {
	if (typeof(domain) != "undefined") {
		url = domain;
	}
	// 广告数组
	var adarr = [];
	if (!$.isArray(obj)) {
		adarr.push(obj);
	} else {
		adarr = obj;
	}

	//遍历数组
	$.each(adarr, function(index, val) {
		if (val.num == undefined) {
			val.num = 1;
		}
		if (val.act == undefined) {
			val.act = 'append';
		}
		//jsonp请求数据
		$.getJSON(url+'static_state.php?callback=?', {act: 'ads_list',aids:val.aid,num:val.num}, function(json) {
			if (json.length != 0) {
				data = json['ad_'+val.aid];
				$.each(data, function(index, ads) {
					ads.ad_link = 'http://ad.lingshi.com/index.php/ad/ads/to_link/'+ads.ad_id;
					html = val.fn(ads,index);
					if (html) $(val.dom)[val.act](html);
				});
				$(val.dom).show();
			}
		});
	});
}
