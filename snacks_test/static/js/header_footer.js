$(function () {
	//���ﳵ��ʾ������
	$('.cart_num').click(function(event) {
		event.stopPropagation();
		//�жϹ��ﳵ�Ƿ��
		if ($(".cart").is(':hidden')) {
			$(".cart").show();
			//ҳ������¼��رչ��ﳵ
			$(document).bind('click.hidecart',function (event) {
				 // e.stopPropagation();
				$(".cart").hide();
				$(document).unbind(".hidecart");
			});
			//�����ﳵ��ʱ������ﳵ���ر�
			$('#cart1').click(function(event) {
				event.stopPropagation();
			});
			//ȡ�ù��ﳵ��Ϣ
			$.ajax({
				url: domain+'static_state.php',
				type: 'GET',
				dataType: 'jsonp',
				data: {act: 'cartInfo',type: 'update'},
				success: function (result) {
					//���¹��ﳵ
					updateCart(result);
				}
			});

		} else {
			//�رչ��ﳵ��ע���¼�,����ҳ��ر��¼�
			$(document).unbind(".hidecart");
			$(".cart").hide();
		}
		//���������ʱ�����������ر�
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	});
	//���������ʱ�������ϵ�ͷ��ر�
	$('#kefu').click(function(){
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	})
	//���������ʱ�����Ͷ�߹ر�
	$('#tousu').click(function(){
		if($(".view_wrap").css('display','block')) {
			$(".view_wrap").hide();
		}
	})
	//�������ʾ������
	$('#objection').click(function(event) {
		if(userid == ''){
			loginRegShow('login',window.location.href);
			return false;
	}
		event.stopPropagation();
		//�ж�������Ƿ��
		if ($(".view_wrap").is(':hidden')) {
			$('.view_wrap').show(300);
		} else {
			//�ر��������ע���¼�,����ҳ��ر��¼�
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

	//	����ҳ���������˵�
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
 * �Ի�Ա��Ͷ������������(�����)
    ���Ͷ������
 */
function submitCom_view(msg_title)
{
  var frm         = document.forms['formMsg2'];
  var content_notice = document.getElementById('content_notice');
  if (msg_title == '')
  {
    content_notice.innerHTML = 'Ͷ�����ⲻ��Ϊ��';
    return false;
  }else{
    content_notice.innerHTML = '';
    return true;
  }
  if (msg_title.length > 200)
  {
    content_notice.innerHTML = 'Ͷ������̫��';
    return false;
  }

}

/* *
 * �Ի�Ա��Ͷ������������(�����)
    ���Ͷ������
 */
function submitCom_view2(msg_content)
{
  var frm         = document.forms['formMsg2'];
  var content_notice = document.getElementById('content_notice');
  if (msg_content == '')
  {
    content_notice.innerHTML = 'Ͷ�����ݲ���Ϊ��';
    return false;
  }else{
    content_notice.innerHTML = '';
    return true;
  }

}

/*
���ù��ӿں���,ֻ֧��һ�����λһ�����
����obj {aid:123,num:����,dom:�ڵ����,act:'append',fn,fun}
���obj [����obj,����obj]������{aid:'123,345',fn,fun}
 */
function create_ads (obj,url) {
	if (typeof(domain) != "undefined") {
		url = domain;
	}
	// �������
	var adarr = [];
	if (!$.isArray(obj)) {
		adarr.push(obj);
	} else {
		adarr = obj;
	}

	//��������
	$.each(adarr, function(index, val) {
		if (val.num == undefined) {
			val.num = 1;
		}
		if (val.act == undefined) {
			val.act = 'append';
		}
		//jsonp��������
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
