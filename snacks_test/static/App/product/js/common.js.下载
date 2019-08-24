//购物车变量用于保存购物车滚动条对象(全局变量)
var cart_goods = undefined;
var toCartlock = false;

/* *
 * 添加商品到购物车
 event firefox要传event才能识别事件，event用于获取鼠标点击位置
 */
function addToCart(goodsId, event, parentId, number, notice,confirm_type)
{
	var elem = event || window.event;
	var evt = elem.srcElement || elem.target;
	// if(evt&&evt.stopPropagation){//非IE
	// 	evt.stopPropagation();
	// }
	// else{//IE
	// 	window.event.cancelBubble=true;
	// }
	if (toCartlock) {return false;}
	toCartlock = true;
	if (typeof(goodsId) == 'undefined' || goodsId < 1)
		return false;
	var goods        = new Object();
	var spec_arr     = new Array();
	var fittings_arr = new Array();
	var number       = (typeof(number) == "undefined") ? 1 : Math.abs(number);
	var notice       = (typeof(notice) == "undefined") ? 0 : notice;
	var formBuy      = document.forms['ECS_FORMBUY'];
	var quick		   = 0;
	var format_id    = 0;

	// 检查是否有商品规格
	if (formBuy)
	{
		spec_arr = getSelectedAttributes(formBuy);

		if (formBuy.elements['number'])
		{
			number = formBuy.elements['number'].value;
		}

	quick = 1;
	}
	if (formBuy)
	{
	var len = formBuy.elements['goods_format'].length;
	if(typeof(len) == "undefined")
	{
		format_id = formBuy.elements['goods_format'].value;
	}
	else
	{
		for(var i=0;i<len;i++){
			if(formBuy.elements['goods_format'][i].checked){
				format_id = formBuy.elements['goods_format'][i].value;
			}
		}
	}
	}
	goods.quick    = quick;
	goods.spec     = spec_arr;
	goods.goods_id = goodsId;
	goods.number   = number;
	goods.format_id = format_id;
	if (confirm_type) {
		goods.confirm_type = confirm_type;
	}

	if(parentId=='collect')
	{
		goods.collect = 'collect';
	}
	else
	{
		goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
	}

	if (formBuy && formBuy.elements['favourable_id'].value > 0 && formBuy.elements['favourable_code'].value == 'Taste') {
			goods.favourable_id = formBuy.elements['favourable_id'].value;
		$.getJSON(Cart_Path + "?step=add_Taste&callback=?&goods=" + $.toJSON(goods), function(json){if(notice=='1'){json.one_step_buy=1;}
			addToCartResponse(json,evt);
		});
	} else {
		$.getJSON(Cart_Path + "?step=add_to_cart&callback=?&goods=" + $.toJSON(goods), function(json){
			if (notice == '1') {
				json.one_step_buy = 1;
			} else if (typeof(notice) == "string" && notice.indexOf("del") != -1) {
				json.one_step_buy  = 1;
				json.drop_sto_cart = notice;
			}
			addToCartResponse(json,evt);
		});
	}
}

/* *
 * 处理添加商品到购物车的反馈信息
 */
function addToCartResponse(result,evt)
{
	if (result.error > 0)
	{
		// 如果需要缺货登记，跳转
		if (result.error == 2)
		{
			alertMsg({
				content: result.message,
				type:2,
				buttons: {
					'确认':function () {
						location.href = Customer_Path+'?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
					}
				}
			});
		}
		// 没选规格，弹出属性选择框
		else if (result.error == 6)
		{
			openSpeDiv(result.message, result.goods_id, result.parent);
		}
		else if (result.error > 10) {	//add by Summer
			alertMsg({
				content:result.message,
				type:2,
				buttons:{
					'确认':function () {
						var drop_sto_cart = result.drop_sto_cart ? '&drop_sto_cart='+result.drop_sto_cart : '';
						if (drop_sto_cart || result.confirm_type == 3) {
							location.href = domain + 'op_goods.php?act=add_goods&goods_id=' + result.goods_id + '&number=' + result.number +drop_sto_cart;
						} else {
							$.getJSON(domain + 'op_goods.php?act=add_goods&act_type=ajax&goods_id=' + result.goods_id + '&number=' + result.number, function(json){
								addToCartResponse(json,evt);
							});
						}
					}
				}
			});

			return false;
		}
		else
		{

			if ($.isArray(result.message)) {
				var msg = '';
				$.each(result.message, function(index, val) {
					msg += val + '<br>';
				});
				msg = msg.replace(/\<br\>$/, "");
				alertMsg(msg);
			} else {
				alertMsg(result.message);
			}

		}
	}
	else
	{
		var cartInfo = document.getElementById('ECS_CARTINFO');
		var cart_url = Cart_Path + '?step=cart';
		if (cartInfo)
		{
			cartInfo.innerHTML = result.content;
		}

		if (result.one_step_buy == '1')
		{
			if (typeof(result.drop_sto_cart) != 'undefined' && result.drop_sto_cart.indexOf("del") != -1) {
				var d = result.drop_sto_cart;
				var gid = Math.abs(d.substr(4, d.length));
				location.href = Cart_Path + "?step=drop_sto_cart&id=" + gid;
			} else {
				location.href = cart_url;
			}
		}
		else
		{
			var h = 150;
			var other_msg = '';
			if(result.other_msg != '')
			{
				h = 196;
				other_msg = '<div class="other_msg"><div class="div_msg">温馨提示：' + result.other_msg + '</div></div><span><img src="'+domain+'templates/default/images/line.png" width="226" height="1" /></span>';
			}

			var htmls = '<div class="success_cart"><div class="success_cart1"><img src="'+domain+'templates/default/images/cart_icon.png" width="30" height="30" />'+
					'<a>商品已放入购物车</a></div><span><img src="'+domain+'templates/default/images/line.png" width="226" height="1" /></span>'+ other_msg +
					'<div class="success_cart_btn"><a href="'+Cart_Path+'" class="btnA">马上结算</a><a onclick="Shadowbox.close()" class="btnB">继续购物</a></div></div>';
			switch(result.confirm_type)
			{
				case '1' :
					var goodElem=$(evt);
					var goodsImg = goodElem.attr('data');
					var cartElem = $('#cart_num');
					var x = goodElem.offset().left,
					y = goodElem.offset().top - $(window).scrollTop(),
					tx = cartElem.offset().left,
					ty = cartElem.offset().top - $(window).scrollTop();
					if ($('#floatcart').length <= 0) {
							$('body').append('<div id="floatcart"><img src="'+goodsImg+'" width="80" height="80" /></div>');
					};
					var floatobj=$('#floatcart');
					//预动画效果
					if(!floatobj.is(':animated')){
					// cartElem.find('div').addClass('cart_num_bg');
						floatobj.css({'left': x,'top': y}).animate({'left': tx-140,'top': ty},800,function() {
							floatobj.animate({'left': tx,'opacity':0},500,function(){
								floatobj.remove();
								toCartlock = false;
								// cartElem.find('div').removeClass('cart_num_bg');
							});
						});
					};
					//更新购物车
					updateCart(result);

					break;
				case '2' :
					//if (!confirm(result.message)) location.href = cart_url;
					Shadowbox.open({
					content:    htmls,
					player:     "html",
					title:      "",
					height:     h,
					width:      400,
					options: {modal: true}
				});

					break;
				case '3' :
					location.href = cart_url;
					break;
				default :
					break;
			}
		}
	}
}

/*
*更新购物车滚动条方法
*/
function updateCart (result) {
	if (result.list) {
		if ($('#no_cart').size()) {
			$('#no_cart').remove();
		}
		if ($("#goodsList").size()) {
			$("#goodsList").html(result.list);
		} else {
			$("#cart1").append('<div class="cart_list_wrap"><div id="goodsList"></div></div>');
				$("#cart1").append('<div class="go_buy"><div class="total"><span style="text-align:left;">已选购<b id="goodsCount2"></b>件商品</span><span style="text-align:right;"><b id="goodsAmount">￥</b></span></div><a href="'+Cart_Path+'" class="btn_account" rel="nofollow">去购物车结算</a></div>');
				$("#goodsList").html(result.list);
		}
		if ($("#goodsCount").size()) {$("#goodsCount").html(result.goodsCount)};
		if ($("#goodsCount2").size()) {$("#goodsCount2").html(result.goodsCount3)};
		if ($("#goodsAmount").size()) {$("#goodsAmount").html('￥' + result.goodsAmount)};
	}

	var oList=document.getElementById('goodsList');
	if (oList) {
		cartObj = {container:oList,rollScale:142};
		// 商品总高度大于滚动区域高度则更新滚动条
		var cart_height = $('.cart').height() - $('.go_buy').height() - $('.goto_cart').height();
		$('.cart_list_wrap').height(cart_height);
		if ($('#goodsList').height() > cart_height && cart_goods == undefined) {
			cart_goods= new ttScrollBar(cartObj);
		} else if (cart_goods != undefined) {
			cart_goods.resetLayout();
		}
	}
}


/*
*弹窗提示函数
* obj为对象类型 不传对象可直接窗口提示
* content 提示内容
* ico css图标 1为警告(图标样式) 默认为提示图标
* type 默认为1（默认自带确认按钮），2为confirm提示，(可以只传一个按钮，会默认添加一个取消按钮)
* buttons {'按钮文字':func} '按钮文字'可为中文；func为执行回调函数
* width 宽度
* height高度
*/
function alertMsg (obj) {
	toCartlock = false;
	//函数默认对象
	// btnhtml按钮html
	// typeclass类型样式
	// content提示内容
	// type 类型
	// btnf 生成按钮html函数
	me = {
		btnhtml: '',
		btnobj: $('<div class="btn_wrap"></div>'),
		icoclass : 'icon_02',
		content: '',
		type: 1,
		width: 318,
		height: 156,
		htmls: '',
		btnf: function (i,v,f) {
			var i = (typeof(i) != "undefined") ? i : '';
			var v = (typeof(v) != "undefined") ? v : '确认';
			btnclass = i == 'off' ? 'btn_cancel' : 'btn_ok';
			// this.btnhtml += '<a href="javascript:;" class="btn_ok" id="msgbtn'+i+'">'+v+'</a>';
			this.btnobj.append('<a href="javascript:;" class="' + btnclass + '" id="msgbtn'+i+'">'+v+'</a>');
			$('#msgbtn'+i).die('click').live('click', function(event) {
				if (typeof f == 'function') {
					Shadowbox.close();
					f();
				} else {
					Shadowbox.close();
				}
			});
		}
	};

	//判断是否为对象传值
	if (typeof obj == 'object') {
		me.content = obj.content;
		me.type = obj.type;
		if (obj.width) me.width = obj.width;
		if (obj.height) me.height = obj.height;
		//
		if (typeof obj.buttons == 'object') {
			var j = 1;
			$.each(obj.buttons, function(i, fun) {
				me.btnf(j,i,fun);
				j++;
			});
		} else {
			me.btnf();
		}
		if (obj.ico == 1) {
			me.icoclass='icon_01';
		}
		if (obj.type == 2) {
			//confirm默认添加取消按钮
			me.btnf('off','取消');
		}
	} else {
		me.content = obj;
		me.btnf();
	}
	me.htmls = '<div class="title_warn">提示</div><div class="warn"><p class="warn_txt"><span class="'+me.icoclass+'"></span>'+me.content+'</p>'+me.btnobj.prop("outerHTML")+'</div>';
	Shadowbox.open({
		content: me.htmls,
		player: "html",
		title: "",
		height: me.height,
		width: me.width,
		options: {
			modal: true
		}
	});
}

/*
* 登录注册弹出
* type login:登录 ,uplogin更新弹窗登录,reg：注册,upreg更新弹窗到注册
* back_act 返回url
* width 弹窗宽度
* height 弹窗高度
*/
function loginRegShow (type,back_act,width,height) {
	var back_act = (typeof(back_act) != "undefined") ? encodeURIComponent(back_act) : '';
	back_act = '&back_act=' + back_act;
	if (type == 'login' || type == 'uplogin') {
		var url = Cart_Path+'?step=login&logintype=ajax' + back_act;
		var width = (typeof(width) != "undefined") ? width : '375';
	var height = (typeof(height) != "undefined") ? height : '450';
	} else if (type == 'reg' || type == 'upreg') {
		var url = Cart_Path+'?step=login&logintype=regajax' + back_act;
		var width = (typeof(width) != "undefined") ? width : '375';
		var height = (typeof(height) != "undefined") ? height : '580';
	}
	var obj = {
		content: '<iframe name="iframe" id="iframe" src="' + url + '" height="100%" width="100%" scrolling="no" border="0" frameborder="0">您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。</iframe>',
		player: "html",
		title: "",
		height: height,
		width: width,
		options: {
			modal: true
		}
	};

	if (type.indexOf('up') < 0) {//更新弹窗
		Shadowbox.open(obj);
	} else {//新弹窗
		parent.Shadowbox.reopen(obj);
	}

	//取消ajax
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'jsonp',
	// 	success: function (data) {
	// 		var obj = {
	// 			content: data.html,
	// 			player: "html",
	// 			title: "",
	// 			height: height,
	// 			width: width,
	// 			options: {
	// 				modal: true
	// 			}
	// 		};

	// 		if (type.indexOf('up') < 0) {//更新弹窗
	// 			Shadowbox.open(obj);
	// 		} else {//新弹窗
	// 			Shadowbox.reopen(obj);
	// 		}

	// 	}
	// });
}

/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy)
{
	var spec_arr = new Array();
	var j = 0;

	for (i = 0; i < formBuy.elements.length; i ++ )
	{
		var prefix = formBuy.elements[i].name.substr(0, 5);

		if (prefix == 'spec_' && (
			((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
			formBuy.elements[i].tagName == 'SELECT'))
		{
			spec_arr[j] = formBuy.elements[i].value;
			j++ ;
		}
	}

	return spec_arr;
}
/* *
 * 添加商品到收藏夹
 */
function collect(goodsId)
{
	$.getJSON(Customer_Path + "?act=collect&callback=?&id=" + goodsId, function(json){
		collectResponse(json);
	});
}

/* *
 * 处理收藏商品的反馈信息
 */
function collectResponse(result)
{
	if(result.error == 2){
		alertMsg({
			content:result.message,
			ico:1,
			type:2,
			buttons:{
				'立即登录':function(){
					loginRegShow('login',window.location.href);
				}
			}
		})
	}else{
		alertMsg(result.message)
	}
}

/* *
 * 处理会员登录的反馈信息
 */
function signInResponse(result)
{
	toggleLoader(false);

	var done    = result.substr(0, 1);
	var content = result.substr(2);

	if (done == 1)
	{
		document.getElementById('member-zone').innerHTML = content;
	}
	else
	{
		alert(content);
	}
}

/* *
 * 评论的翻页函数
 */
function gotoPage(page, id, type)
{
	$.getJSON(domain + "comment.php?action=list&callback=?&id=" + id + "&page=" + page, function(json){
		gotoPageResponse(json);
	});
}

function gotoPageResponse(result)
{
	document.getElementById("tabCot_1").innerHTML = result.content;
}

/* *
 * 商品购买记录的翻页函数
 */
function gotoBuyPage(page, id)
{
	$.getJSON(domain + "lingshi.php?act=gotopage&callback=?&page=" + page + '&id=' + id, function(json){
		gotoBuyPageResponse(json);
	});
}

function gotoBuyPageResponse(result)
{
	document.getElementById("ECS_BOUGHT").innerHTML = result.result;
}

/* *
 * 取得格式化后的价格
 * @param : float price
 */
function getFormatedPrice(price)
{
	if (currencyFormat.indexOf("%s") > - 1)
	{
		return currencyFormat.replace('%s', advFormatNumber(price, 2));
	}
	else if (currencyFormat.indexOf("%d") > - 1)
	{
		return currencyFormat.replace('%d', advFormatNumber(price, 0));
	}
	else
	{
		return price;
	}
}

/* *
 * 夺宝奇兵会员出价
 */

function bid(step)
{
	var price = '';
	var msg   = '';
	if (step != - 1)
	{
		var frm = document.forms['formBid'];
		price   = frm.elements['price'].value;
		id = frm.elements['snatch_id'].value;
		if (price.length == 0)
		{
			msg += price_not_null + '\n';
		}
		else
		{
			var reg = /^[\.0-9]+/;
			if ( ! reg.test(price))
			{
				msg += price_not_number + '\n';
			}
		}
	}
	else
	{
		price = step;
	}

	if (msg.length > 0)
	{
		alert(msg);
		return;
	}

	Ajax.call('snatch.php?act=bid&id=' + id, 'price=' + price, bidResponse, 'POST', 'JSON')
}

/* *
 * 夺宝奇兵会员出价反馈
 */

function bidResponse(result)
{
	if (result.error == 0)
	{
		document.getElementById('ECS_SNATCH').innerHTML = result.content;
		if (document.forms['formBid'])
		{
			document.forms['formBid'].elements['price'].focus();
		}
		newPrice(); //刷新价格列表
	}
	else
	{
		alert(result.content);
	}
}

/* *
 * 夺宝奇兵最新出价
 */

function newPrice(id)
{
	Ajax.call('snatch.php?act=new_price_list&id=' + id, '', newPriceResponse, 'GET', 'TEXT');
}

/* *
 * 夺宝奇兵最新出价反馈
 */

function newPriceResponse(result)
{
	document.getElementById('ECS_PRICE_LIST').innerHTML = result;
}

/* *
 *  返回属性列表
 */
function getAttr(cat_id)
{
	var tbodies = document.getElementsByTagName('tbody');
	for (i = 0; i < tbodies.length; i ++ )
	{
		if (tbodies[i].id.substr(0, 10) == 'goods_type')tbodies[i].style.display = 'none';
	}

	var type_body = 'goods_type_' + cat_id;
	try
	{
		document.getElementById(type_body).style.display = '';
	}
	catch (e)
	{
	}
}

/* *
 * 截取小数位数
 */
function advFormatNumber(value, num) // 四舍五入
{
	var a_str = formatNumber(value, num);
	var a_int = parseFloat(a_str);
	if (value.toString().length > a_str.length)
	{
		var b_str = value.toString().substring(a_str.length, a_str.length + 1);
		var b_int = parseFloat(b_str);
		if (b_int < 5)
		{
			return a_str;
		}
		else
		{
			var bonus_str, bonus_int;
			if (num == 0)
			{
				bonus_int = 1;
			}
			else
			{
				bonus_str = "0."
				for (var i = 1; i < num; i ++ )
				bonus_str += "0";
				bonus_str += "1";
				bonus_int = parseFloat(bonus_str);
			}
			a_str = formatNumber(a_int + bonus_int, num)
		}
	}
	return a_str;
}

function formatNumber(value, num) // 直接去尾
{
	var a, b, c, i;
	a = value.toString();
	b = a.indexOf('.');
	c = a.length;
	if (num == 0)
	{
		if (b != - 1)
		{
			a = a.substring(0, b);
		}
	}
	else
	{
		if (b == - 1)
		{
			a = a + ".";
			for (i = 1; i <= num; i ++ )
			{
				a = a + "0";
			}
		}
		else
		{
			a = a.substring(0, b + num + 1);
			for (i = c; i <= b + num; i ++ )
			{
				a = a + "0";
			}
		}
	}
	return a;
}

/* *
 * 根据当前shiping_id设置当前配送的的保价费用，如果保价费用为0，则隐藏保价费用
 *
 * return       void
 */
function set_insure_status()
{
	// 取得保价费用，取不到默认为0
	var shippingId = getRadioValue('shipping');
	var insure_fee = 0;
	if (shippingId > 0)
	{
		if (document.forms['theForm'].elements['insure_' + shippingId])
		{
			insure_fee = document.forms['theForm'].elements['insure_' + shippingId].value;
		}
		// 每次取消保价选择
		if (document.forms['theForm'].elements['need_insure'])
		{
			document.forms['theForm'].elements['need_insure'].checked = false;
		}

		// 设置配送保价，为0隐藏
		if (document.getElementById("ecs_insure_cell"))
		{
			if (insure_fee > 0)
			{
				document.getElementById("ecs_insure_cell").style.display = '';
				setValue(document.getElementById("ecs_insure_fee_cell"), getFormatedPrice(insure_fee));
			}
			else
			{
				document.getElementById("ecs_insure_cell").style.display = "none";
				setValue(document.getElementById("ecs_insure_fee_cell"), '');
			}
		}
	}
}

/* *
 * 当支付方式改变时出发该事件
 * @param       pay_id      支付方式的id
 * return       void
 */
function changePayment(pay_id)
{
	// 计算订单费用
	calculateOrderFee();
}

function getCoordinate(obj)
{
	var pos =
	{
		"x" : 0, "y" : 0
	}

	pos.x = document.body.offsetLeft;
	pos.y = document.body.offsetTop;

	do
	{
		pos.x += obj.offsetLeft;
		pos.y += obj.offsetTop;

		obj = obj.offsetParent;
	}
	while (obj.tagName.toUpperCase() != 'BODY')

	return pos;
}

function showCatalog(obj)
{
	var pos = getCoordinate(obj);
	var div = document.getElementById('ECS_CATALOG');

	if (div && div.style.display != 'block')
	{
		div.style.display = 'block';
		div.style.left = pos.x + "px";
		div.style.top = (pos.y + obj.offsetHeight - 1) + "px";
	}
}

function hideCatalog(obj)
{
	var div = document.getElementById('ECS_CATALOG');

	if (div && div.style.display != 'none') div.style.display = "none";
}

function sendHashMail()
{
	$.getJSON(Customer_Path, {act: 'send_hash_mail'}, function(json, textStatus) {
			sendHashMailResponse(json)
	});
	// Ajax.call(Customer_Path+'?act=send_hash_mail', '', sendHashMailResponse, 'GET', 'JSON', '', true);
}

function sendHashMailResponse(result)
{
	alert(result.message);
}

/* 订单查询 */
function orderQuery()
{
	var order_sn = document.forms['ecsOrderQuery']['order_sn'].value;

	var reg = /^[\.0-9]+/;
	if (order_sn.length < 10 || ! reg.test(order_sn))
	{
		alert(invalid_order_sn);
		return;
	}
	$.getJSON(Customer_Path, {act: 'order_query',order_sn: 's'+order_sn}, function(json, textStatus) {
			orderQueryResponse(json);
	});
	// Ajax.call(Customer_Path+'?act=order_query&order_sn=s' + order_sn, '', orderQueryResponse, 'GET', 'JSON');
}

function orderQueryResponse(result)
{
	if (result.message.length > 0)
	{
		alert(result.message);
	}
	if (result.error == 0)
	{
		var div = document.getElementById('ECS_ORDER_QUERY');
		div.innerHTML = result.content;
	}
}

function display_mode(str)
{
		document.getElementById('display').value = str;
		setTimeout(doSubmit, 0);
		function doSubmit() {document.forms['listform'].submit();}
}

function display_mode_wholesale(str)
{
		document.getElementById('display').value = str;
		setTimeout(doSubmit, 0);
		function doSubmit()
		{
				document.forms['wholesale_goods'].action = "wholesale.php";
				document.forms['wholesale_goods'].submit();
		}
}

/* 修复IE6以下版本PNG图片Alpha */
function fixpng()
{
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])

	if ((version >= 5.5) && (document.body.filters))
	{
		 for(var i=0; i<document.images.length; i++)
		 {
				var img = document.images[i]
				var imgName = img.src.toUpperCase()
				if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
				{
					 var imgID = (img.id) ? "id='" + img.id + "' " : ""
					 var imgClass = (img.className) ? "class='" + img.className + "' " : ""
					 var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
					 var imgStyle = "display:inline-block;" + img.style.cssText
					 if (img.align == "left") imgStyle = "float:left;" + imgStyle
					 if (img.align == "right") imgStyle = "float:right;" + imgStyle
					 if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
					 var strNewHTML = "<span " + imgID + imgClass + imgTitle
					 + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
					 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
					 + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
					 img.outerHTML = strNewHTML
					 i = i-1
				}
		 }
	}
}

function hash(string, length)
{
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for(i = 0; i < filllen; i++)
	{
		string += "0";
	}
	while(start < string.length)
	{
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2)
{
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for(var i=0; i<max; i++)
	{
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}

var evalscripts = new Array();
function evalscript(s)
{
	if(s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/ig;
	var arr = new Array();
	while(arr = p.exec(s)) appendscript(arr[1], '', arr[2], arr[3]);
	return s;
}

function $$(id)
{
		return document.getElementById(id);
}

function appendscript(src, text, reload, charset)
{
	var id = hash(src + text);
	if(!reload && in_array(id, evalscripts)) return;
	if(reload && $$(id))
	{
		$$(id).parentNode.removeChild($$(id));
	}
	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	//scriptNode.charset = charset;
	try
	{
		if(src)
		{
			scriptNode.src = src;
		}
		else if(text)
		{
			scriptNode.text = text;
		}
		$$('append_parent').appendChild(scriptNode);
	}
	catch(e)
	{}
}

function in_array(needle, haystack)
{
	if(typeof needle == 'string' || typeof needle == 'number')
	{
		for(var i in haystack)
		{
			if(haystack[i] == needle)
			{
				return true;
			}
		}
	}
	return false;
}

var pmwinposition = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
function pmwin(action, param)
{
	var objs = document.getElementsByTagName("OBJECT");
	if(action == 'open')
	{
		for(i = 0;i < objs.length; i ++)
		{
			if(objs[i].style.visibility != 'hidden')
			{
				objs[i].setAttribute("oldvisibility", objs[i].style.visibility);
				objs[i].style.visibility = 'hidden';
			}
		}
		var clientWidth = document.body.clientWidth;
		var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
		var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
		var pmwidth = 800;
		var pmheight = clientHeight * 0.9;
		if(!$$('pmlayer'))
		{
			div = document.createElement('div');div.id = 'pmlayer';
			div.style.width = pmwidth + 'px';
			div.style.height = pmheight + 'px';
			div.style.left = ((clientWidth - pmwidth) / 2) + 'px';
			div.style.position = 'absolute';
			div.style.zIndex = '999';
			$$('append_parent').appendChild(div);
			$$('pmlayer').innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left">' +
				'<div style="width: 800px; height: ' + pmheight + 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px">' +
				'<div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div>' +
				'<a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="关闭" /></a>' +
				'<iframe id="pmframe" name="pmframe" style="width:' + pmwidth + 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>';
		}
		$$('pmlayer').style.display = '';
		$$('pmlayer').style.top = ((clientHeight - pmheight) / 2 + scrollTop) + 'px';
		if(!param)
		{
				pmframe.location = 'pm.php';
		}
		else
		{
				pmframe.location = 'pm.php?' + param;
		}
	}
	else if(action == 'close')
	{
		for(i = 0;i < objs.length; i ++)
		{
			if(objs[i].attributes['oldvisibility'])
			{
				objs[i].style.visibility = objs[i].attributes['oldvisibility'].nodeValue;
				objs[i].removeAttribute('oldvisibility');
			}
		}
		hiddenobj = new Array();
		$$('pmlayer').style.display = 'none';
	}
}

var pmwindragstart = new Array();
function pmwindrag(e, op)
{
	if(op == 1)
	{
		pmwindragstart = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
		pmwindragstart[2] = parseInt($$('pmlayer').style.left);
		pmwindragstart[3] = parseInt($$('pmlayer').style.top);
		doane(e);
	}
	else if(op == 2 && pmwindragstart[0])
	{
		var pmwindragnow = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
		$$('pmlayer').style.left = (pmwindragstart[2] + pmwindragnow[0] - pmwindragstart[0]) + 'px';
		$$('pmlayer').style.top = (pmwindragstart[3] + pmwindragnow[1] - pmwindragstart[1]) + 'px';
		doane(e);
	}
	else if(op == 3)
	{
		pmwindragstart = [];
		doane(e);
	}
}

function doane(event)
{
	e = event ? event : window.event;
	if(is_ie)
	{
		e.returnValue = false;
		e.cancelBubble = true;
	}
	else if(e)
	{
		e.stopPropagation();
		e.preventDefault();
	}
}

/* *
 * 添加礼包到购物车
 */
function addPackageToCart(packageId)
{
	var package_info = new Object();
	var number       = 1;

	package_info.package_id = packageId
	package_info.number     = number;

	//Ajax.call(Cart_Path + '?step=add_package_to_cart', 'package_info=' + $.toJSON(package_info), addPackageToCartResponse, 'POST', 'JSON');
	$.getJSON(Cart_Path + "?step=add_package_to_cart&callback=?&package_info=" + $.toJSON(package_info), function(json){
		addPackageToCartResponse(json);
	});
}

/* *
 * 处理添加礼包到购物车的反馈信息
 */
function addPackageToCartResponse(result)
{
	if (result.error > 0)
	{
		if (result.error == 2)
		{
			if (confirm(result.message))
			{
				location.href = Customer_Path+'?act=add_booking&id=' + result.goods_id;
			}
		}
		else
		{
			alert(result.message);
		}
	}
	else
	{
		var cartInfo = document.getElementById('ECS_CARTINFO');
		var cart_url = Cart_Path + '?step=cart';
		if (cartInfo)
		{
			cartInfo.innerHTML = result.content;
		}

		if (result.one_step_buy == '1')
		{
			location.href = cart_url;
		}
		else
		{
			switch(result.confirm_type)
			{
				case '1' :
					if (confirm(result.message)) location.href = cart_url;
					break;
				case '2' :
					if (!confirm(result.message)) location.href = cart_url;
					break;
				case '3' :
					location.href = cart_url;
					break;
				default :
					break;
			}
		}
	}
}

function setSuitShow(suitId)
{
		var suit    = document.getElementById('suit_'+suitId);

		if(suit == null)
		{
				return;
		}
		if(suit.style.display=='none')
		{
				suit.style.display='';
		}
		else
		{
				suit.style.display='none';
		}
}

function setToggle(suitId, img)
{
		var obj = document.getElementById(suitId);
		if(obj == null) {
				return;
		}
		if(obj.style.display=='none')
		{
			if (img != null) img.src = domain + 'templates/default/images/pic/hide_product.gif';
				obj.style.display='';
		} else {
			if (img != null) img.src = domain + 'templates/default/images/pic/view_product.gif';
				obj.style.display='none';
		}
}

/* 以下四个函数为属性选择弹出框的功能函数部分 */
//检测层是否已经存在
function docEle()
{
	return document.getElementById(arguments[0]) || false;
}

//生成属性选择层
function openSpeDiv(message, goods_id, parent)
{
	var _id = "speDiv";
	var m = "mask";
	if (docEle(_id)) document.removeChild(docEle(_id));
	if (docEle(m)) document.removeChild(docEle(m));
	//计算上卷元素值
	var scrollPos;
	if (typeof window.pageYOffset != 'undefined')
	{
		scrollPos = window.pageYOffset;
	}
	else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')
	{
		scrollPos = document.documentElement.scrollTop;
	}
	else if (typeof document.body != 'undefined')
	{
		scrollPos = document.body.scrollTop;
	}

	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while (sel_obj[i])
	{
		sel_obj[i].style.visibility = "hidden";
		i++;
	}

	// 新激活图层
	var newDiv = document.createElement("div");
	newDiv.id = _id;
	newDiv.style.position = "absolute";
	newDiv.style.zIndex = "10000";
	newDiv.style.width = "300px";
	newDiv.style.height = "260px";
	newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
	newDiv.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px"; // 屏幕居中
	newDiv.style.overflow = "auto";
	newDiv.style.background = "#FFF";
	newDiv.style.border = "3px solid #59B0FF";
	newDiv.style.padding = "5px";

	//生成层内内容
	newDiv.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">' + select_spe + "</h4>";

	for (var spec = 0; spec < message.length; spec++)
	{
			newDiv.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">' +  message[spec]['name'] + '</h6>';

			if (message[spec]['attr_type'] == 1)
			{
				for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
				{
					if (val_arr == 0)
					{
						newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' checked /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
					}
					else
					{
						newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
					}
				}
				newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
			}
			else
			{
				for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
				{
					newDiv.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + ' [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';
				}
				newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
			}
	}
	newDiv.innerHTML += "<br /><center>[<a href='javascript:submit_div(" + goods_id + "," + parent + ")' class='f6' >" + btn_buy + "</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >" + is_cancel + "</a>]</center>";
	document.body.appendChild(newDiv);


	// mask图层
	var newMask = document.createElement("div");
	newMask.id = m;
	newMask.style.position = "absolute";
	newMask.style.zIndex = "9999";
	newMask.style.width = document.body.scrollWidth + "px";
	newMask.style.height = document.body.scrollHeight + "px";
	newMask.style.top = "0px";
	newMask.style.left = "0px";
	newMask.style.background = "#FFF";
	newMask.style.filter = "alpha(opacity=30)";
	newMask.style.opacity = "0.40";
	document.body.appendChild(newMask);
}

//获取选择属性后，再次提交到购物车
function submit_div(goods_id, parentId)
{
	var goods        = new Object();
	var spec_arr     = new Array();
	var fittings_arr = new Array();
	var number       = 1;
	var input_arr      = document.getElementsByTagName('input');
	var quick		   = 1;

	var spec_arr = new Array();
	var j = 0;

	for (i = 0; i < input_arr.length; i ++ )
	{
		var prefix = input_arr[i].name.substr(0, 5);

		if (prefix == 'spec_' && (
			((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked)))
		{
			spec_arr[j] = input_arr[i].value;
			j++ ;
		}
	}

	goods.quick    = quick;
	goods.spec     = spec_arr;
	goods.goods_id = goods_id;
	goods.number   = number;
	goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

	$.getJSON(Cart_Path + "?step=add_to_cart&callback=?&goods=" + $.toJSON(goods), function(json){
		addToCartResponse(json);
	});

	document.body.removeChild(docEle('speDiv'));
	document.body.removeChild(docEle('mask'));

	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while (sel_obj[i])
	{
		sel_obj[i].style.visibility = "";
		i++;
	}

}

// 关闭mask和新图层
function cancel_div()
{
	document.body.removeChild(docEle('speDiv'));
	document.body.removeChild(docEle('mask'));

	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while (sel_obj[i])
	{
		sel_obj[i].style.visibility = "";
		i++;
	}
}

/**
 * 特殊商品添加到购物车 cuifc 2012-07-07
 */
function special_buy(id,aid)
{
	$.getJSON(Cart_Path + "?step=add_special_goods&callback=?&id=" + id+"&aid="+aid, function(json){
		special_buyResponse(json);
	});
}
function special_buyResponse(result)
{
	if (result.error > 0) {
		alertMsg(result.msg);
		return false;
	} else {
		alertMsg({
			content: result.msg,
			type:1,
			buttons: {
				'确认':function () {
					location.href = Cart_Path;
				}
			}
		});
	}
}

if (!window.JSON) {
	window.JSON = {
		parse: function (sJSON) { return eval("(" + sJSON + ")"); },
		stringify: function (vContent) {
			if (vContent instanceof Object) {
				var sOutput = "";
				if (vContent.constructor === Array) {
					for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
					return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
				}
				if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
				for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
				return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
			}
			return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
		}
	};
}