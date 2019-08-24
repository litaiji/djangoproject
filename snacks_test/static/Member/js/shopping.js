/* *
 * 改变收货地址
 */
function setDelivery(obj, id) {
	if ($(obj).hasClass("select")) {
		return false;
	};
	$("#addresslist").find("li").removeClass("select");
	$(obj).addClass("select");
	if (id > 0) {
		$("input[name='deliveryman']").val(id);
		$.getJSON(Cart_Path + '?step=change_delivery&deliveryman='+id+'&random'+Math.random(), function(json) {
			setDeliveryResponse(json);
		});
		$('#use_bonus').attr("checked", false);
		$('#bonus option:selected').attr('selected', false);
		$('#bonus option:first').attr('selected', 'selected');
	}
}
/* *
 * 改变收货地址回调函数
 */
function setDeliveryResponse (obj) {
	if (obj.support_cod != undefined && obj.support_cod == 1) {
		$("#cod").attr('disabled', false);
		$("#cod_pay").show();
	} else {
		$("#cod").attr('disabled', true);
		$("#cod_pay").hide();
	}
	orderSelectedResponse(obj);
}

/* *
 * 改变支付方式
 */
function selectPayment(obj) {
	if ($(obj).attr('id') === 'bank_pay') {
		$('#bank_tbl').show();
	}

	$.getJSON(Cart_Path + '?step=select_payment'+'&random'+Math.random(), {payment: obj.value}, function(json) {
			selectPaymentResponse(json);
	});
}

/**
 * 改变支付方式回调函数
 */
function selectPaymentResponse(obj) {
  // 无收货地址
  if (obj.error && obj.error == 100 && obj.content) {

	alertMsg({content:obj.content,ico:1});
  } else {
	orderSelectedResponse(obj);
  }
}

/* *
 * 改变祝福贺卡
 */
function selectCard (obj) {
  $("#card_div").find("p").removeClass("fc");
  $(obj).parent().addClass("fc");
  Ajax.call(Cart_Path + '?step=select_card', 'card=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/**
 * 选择发票
 */
function selectInv (obj) {
	if (!$('#need_inv').is(':checked')) {
		var val = 0;
	} else {
		var val = obj.value;
	}
	$.getJSON(Cart_Path + "?step=select_inv&need_inv=" + val+'&random'+Math.random(),function(json){

		if (json.error) {
			alertMsg(json.error);
		} else {
			if (json.need_inv == 1) {
				$('input[name="inv_type"]').removeAttr('disabled');
				$('input[name="inv_payee"]').removeAttr('disabled');
			} else {
				$('input[name="inv_type"]').attr('disabled', 'disabled');
				$('input[name="inv_payee"]').attr('disabled', 'disabled');
			}
		}
	});
}

/* *
 * 回调函数
 */
function orderSelectedResponse(result) {
	if (result.prompt == 1) {
		alertMsg('温馨提示：使用代金券无法享受农业银行满减活动！');
	} else if (result.prompt == 2) {
		alertMsg('温馨提示：使用余额支付无法享受农业银行满减活动！');
	}
  if (result.error) {
	alertMsg(result.error);
	location.href = './';
  }

  try {
	var layer = document.getElementById("ECS_ORDERTOTAL");
	if (layer != undefined || layer != null) {
	  layer.innerHTML = result.content;
	};

	var order_submit = document.getElementById('order_submit');
	if (order_submit != undefined || order_submit != null) {
		order_submit.innerHTML = result.order_submit;
	}

	if (result.total_amount !=undefined) {
	  document.getElementById('total_amount_info').innerHTML = result.total_amount;
	}
  } catch (ex) { }
}

/* *
 *  改变余额
 */
function changeSurplus(val) {
	if (!$('#surplus').is(':checked')) {
		val = 0;
	};
	$.getJSON(Cart_Path + '?step=change_surplus', 'surplus=' + val+'&random'+Math.random(), function(json) {
		changeSurplusResponse(json);
	});
}

/* *
 * 改变余额回调函数
 */
function changeSurplusResponse(obj) {
  if (obj.error) {
	try {
	  document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = obj.error;
	  document.getElementById('ECS_SURPLUS').value = '0';
	  document.getElementById('ECS_SURPLUS').focus();
	} catch (ex) { }
  } else {
	try {
	  document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = '';
	} catch (ex) { }
	delete obj.error;
	orderSelectedResponse(obj);
  }
}

/* *
 * 改变代金券
 */
function changeBonus() {
	var flag  = $('#use_bonus').is(":checked");
	var bonus = (flag && $('input[name="bonus"]:checked').val() != undefined) ? $('input[name="bonus"]:checked').val() : 0;
	if (flag) {
		$('input[name=bonus]').removeAttr("disabled");
	} else {
		$('input[name=bonus]').attr('disabled', 'disabled');
	}
	var deliveryman = $("input[name='deliveryman']").val();
	$.getJSON(Cart_Path + '?step=change_bonus', 'bonus=' + bonus + '&delivery='+deliveryman+'&random'+Math.random(), function(json) {
		changeBonusResponse(json);
	});
}

/* *
 * 改变红包的回调函数
 */
function changeBonusResponse(obj) {
	var alertMsg = '';
	if (obj.error) {
		switch (obj.error) {
			case 'unusable_inexistence' :
				alertMsg = '您选择的代金券并不存在。';
				break;
			case 'unusable_beyong_area' :
				alertMsg = '该代金券号码超出可使用区域!';
				break;
			case 'unusable_used_today' :
				alertMsg = '对不起，您今天已经使用过代金券！';
				break;
			case 'unusable_expired' :
				alertMsg = '该代金券已过期';
				break;
			case 'bonus_forbidden':
				alertMsg = obj.msg;
				break;
			case 'unusable_until_amount' :
				alertMsg = '订单中零售价商品总金额未达到' + obj.amount + '元，无法使用代金券！';
				break;
			case 'no_goods_in_cart' :
				alertMsg = '您的购物车中没有商品！';
			case 'no_address':
				alertMsg = '请先添加收货地址！';
		}
	}

	if (alertMsg !== '') {
		$('#bonus_msg').html(alertMsg);
		$('input[name="bonus"]:checked').removeAttr("checked");
		$('.bonus_msg').removeClass('hide');
	} else {
		$('.bonus_msg').addClass('hide');
	}

	delete obj.error;
	orderSelectedResponse(obj);
	if (obj.gift_notice) {
		alertMsg(obj.gift_notice);
	}
}

/**
 * 验证红包序列号
 * @param string bonusSn 红包序列号
 */
function validateBonus(bonusSn) {
	if (bonusSn == '') {
		return false;
	};

	var deliveryman = $("input[name='deliveryman']").val();
	$.getJSON(Cart_Path + '?step=validate_bonus', 'bonus_sn=' + bonusSn + '&delivery='+deliveryman+'&random'+Math.random(), function(json) {
		validateBonusResponse(json);
	});
}

function validateBonusResponse(obj) {
	if (obj.error) {
		var alertMsg = '';
		switch (obj.error) {
			case 'bonus_actived' :
				alertMsg = '代金券已激活...';
				break;
			case 'unusable_expired' :
				alertMsg = '该代金券已经过了使用期！';
				break;
			case 'unusable_until_date' :
				alertMsg = '该代金券使用起始时间：' + obj.date;
				break;
			case 'unusable_until_amount' :
				alertMsg = '订单中零售价商品总金额未达到' + obj.amount + '元，无法使用代金券！';
				break;
			case 'unusable_beyong_area' :
				alertMsg = '该代金券号码超出可使用区域!';
				break;
			case 'unusable_user_excess' :
				alertMsg = '您已超过最多使用次数!';
				break;
			case 'unusable_used_today' :
				alertMsg = '对不起，您今天已经使用过代金券！';
				break;
			case 'unusable_bonus_excess' :
				alertMsg = '该代金券已超过最多使用次数！';
				break;
			case 'unusable_user_rate' :
				alertMsg = '抱歉！每位会员' + obj.rate + '天仅可使用一张代金券';
				break;
			case 'unusable_inexistence' :
				alertMsg = '代金券不存在！' + obj.ext_error;
				break;
			case 'user_no_login' :
				alertMsg("您需要登录才能进行激活操作！");
				window.location = obj.content;
				break;
			case 'bonus_input_err' :
				alertMsg = obj.msg;
				break;
			case 'bonus_forbidden' :
				alertMsg = obj.msg;
			case 'no_goods_in_cart' :
				alertMsg = '您的购物车中没有商品！';
			case 'no_address':
				alertMsg = '请先添加收货地址！';
		}
		if (alertMsg != '') {
			$("#bonus_msg").html(alertMsg);
			$(".bonus_msg").removeClass('hide');
			if (obj.error == 'no_address') {
				return false;
			}
		}

		if (typeof(obj.bonusInfo) != "undefined" && obj.bonusInfo != undefined) {
			// $("#bonus").val(obj.bonusInfo.bonus_id);

			// 新券 插入选择列表
			$('input[name="bonus"]:checked').removeAttr("checked");
			var b = obj.bonusInfo;
			var d = '#bonus_' + obj.bonusInfo.bonus_id;
			if ($(d).length) {
				$(d).attr("checked",true);
			} else {
				// var bonus_content = '<option value="'+b.bonus_id+'" id="bonus_'+ b.bonus_id +'">'+b.type_name+'</option>';
				var flag  = $('#use_bonus').is(":checked");

				if (!flag) {
					$('#use_bonus').attr("checked",true);
					$('input[name=bonus]').removeAttr("disabled");
				}
				if (obj.bonus_count <= 1) {
					$('#change_bonus').removeAttr('style');
					$('#bonus_list').removeAttr('style');
				}
				$('#bonus_num').html('（'+ obj.bonus_count +'）');

				var bonus_content = '<p class="ticket"><input name="bonus" type="radio" value="'+b.bonus_id+'" id="bonus_'+ b.bonus_id +'" /><span>'+b.type_name+'</span><span class="date">'+ b.use_end_date +'</span></p>';
				$('#bonus_list').append(bonus_content);
				$(d).attr("checked",true);
			}
		}
		delete obj.error;
		orderSelectedResponse(obj);

		try {
			$("#bonus_sn").val('');
		} catch (e) {}
	} else {
		orderSelectedResponse(obj);
	}
}

/* *
 * 改变发票的方式
 */
function changeNeedInv() {
  var obj        = document.getElementById('ECS_NEEDINV');
  var objType    = document.getElementById('ECS_INVTYPE');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invType    = obj.checked ? (objType != undefined ? objType.value : '') : '';
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objPayee.disabled = objContent.disabled = ! obj.checked;
  if(objType != null) {
	objType.disabled = ! obj.checked;
  }

  Ajax.call(Cart_Path + '?step=change_needinv', 'need_inv=' + needInv + '&inv_type=' + encodeURIComponent(invType) + '&inv_payee=' + encodeURIComponent(invPayee) + '&inv_content=' + encodeURIComponent(invContent), orderSelectedResponse, 'GET');
}

/* *
 * 改变发票的方式
 */
function groupBuyChangeNeedInv() {
  var obj        = document.getElementById('ECS_NEEDINV');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objPayee.disabled = objContent.disabled = ! obj.checked;

  Ajax.call('group_buy.php?act=change_needinv', 'need_idv=' + needInv + '&amp;payee=' + invPayee + '&amp;content=' + invContent, null, 'GET');
}

/* *
 * 检查提交的订单表单
 */
function checkOrderForm(frm) {
	if ($('input[name="deliveryman"]').length && $('input[name="deliveryman"]').val() == 0) {
		alertMsg({content:flow_no_address,ico:1});
		return false;
	}

	if ($('input[name="payment"]').length && !$('input[name="payment"]').is(":checked") ||
		$('input[name="payment"]:checked').is(":disabled")) {
		if ($('input[name="surplus"]').length) {
			if (!$('input[name="surplus"]').is(":checked")) {
				alertMsg(payment_not_null);
				return false;
			}
		} else {
			alertMsg(payment_not_null);
			return false;
		}
	}

	// if ($('input[name="surplus"]').length > 0 && !$('input[name="surplus"]').is(":checked") &&
	// 	$('input[name="payment"]').length && !$('input[name="payment"]').is(":checked") ||
	// 	$('input[name="payment"]:checked').is(":disabled")) {
	// 	alertMsg(payment_not_null);
	// 	return false;
	// }

	if ($('input[name="need_inv"]').length && $('input[name="need_inv"]:checked').val() == 1) {
		if (!$('input[name="inv_type"]').is(":checked")) {
			alertMsg(flow_no_inv_type);
			return false;
		}
		var inv_payee = $('input[name="inv_type"]:checked').siblings('#inv_payee');
		if (inv_payee.length > 0 && inv_payee.val() == '') {
			alertMsg(flow_no_inv_payee);
			return false;
		}
	}

	// 防止重复提交
	var submitButton = $('#ordersubmit');
	submitButton.attr("disabled", true);
	submitButton.addClass('btn_submit1');
	submitButton.removeClass('btn_submit');

	setTimeout(function() {
		submitButton.attr("disabled", false);
		submitButton.removeClass('btn_submit1');
		submitButton.addClass('btn_submit');
	}, 5000);
	frm.action = frm.action + '?step=done';
	return true;
}

/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm) {
	var err = false;
	var region_str = '';
	var mobi_str = '';

	var domId = {
		'region_notice':'',//地区
		'consignee_notice':'',//收货人姓名
		'email_notice':'',//邮件
		'address_notice':'',//详细地址
		'zipcode_notice':'',//
		'mobile_notice':''//手机电话
	}


	if (frm.elements['country'] && frm.elements['country'].value == 0) {
	region_str += country_not_null+'、';
	}

	if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 0) {
		region_str += province_not_null+'、';
	}

	if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 0) {
	region_str += city_not_null+'、';
	}

	if (frm.elements['district'] && frm.elements['district'].length > 0) {
		if (frm.elements['district'].value == 0) {
			region_str += district_not_null;
		}
	}

	if (region_str != '') {
		domId.region_notice = '请您选择收货人所在'+region_str;
	}

	if (Utils.isEmpty(frm.elements['consignee'].value)) {
		domId.consignee_notice = consignee_not_null;
	}

	if (frm.elements['email'] && ! Utils.isEmpty(frm.elements['email'].value) && ! Utils.isEmail(frm.elements['email'].value)) {
		domId.email_notice = invalid_email;
	}

	if (frm.elements['address'] && Utils.isEmpty(frm.elements['address'].value)) {
		domId.address_notice = address_not_null;
	}

	if (frm.elements['zipcode'] && frm.elements['zipcode'].value.length > 0 && !Utils.isNumber(frm.elements['zipcode'].value)) {
		domId.zipcode_notice = zip_not_num;
	}

	if (Utils.isEmpty(frm.elements['mobile'].value) && Utils.isEmpty(frm.elements['tel'].value)) {
		mobi_str += '手机号码与固定电话至少填写1项！';
	}

	if (frm.elements['tel'] && frm.elements['tel'].value.length > 0 && !Utils.isTel(frm.elements['tel'].value)) {
		mobi_str += tele_invaild;
	}

	if (frm.elements['mobile'] && frm.elements['mobile'].value.length > 0 && !Utils.isMobile(frm.elements['mobile'].value)) {
		mobi_str += mobile_invaild;
	}

	if (mobi_str != '') {
		domId.mobile_notice = mobi_str;
	}

	for (i in domId) {
		if (domId.hasOwnProperty(i)) {
			$('#'+i).html(domId[i]);
			if (domId[i] != '') {
				err = true;
			}
		}
	}

	return ! err;
}

// 检查输入商品数量
function changeShoppingNumber(sign,recid,obj) {
  if (recid == '' || recid == null || obj =='' || obj == null) {
	return false;
  }

  var originalNumber = document.getElementById('original_'+recid).value;  // 原始商品数量
  var newNumber = 1;
  // 新的商品数量
  if (sign == '-') {
	newNumber = Math.abs(parseInt(originalNumber) - 1);
  } else if (sign == '+'){
	newNumber = Math.abs(parseInt(originalNumber) + 1);
  }else {
	newNumber = Math.abs(parseInt(obj.value));
  }

  if (newNumber < 1 || isNaN(newNumber)) {
	newNumber = 1;
	document.getElementById('goods_number_'+recid).value = 1;
  }

  if (newNumber == originalNumber) {
	return false;
  }

  var goods = new Object();
  goods.recid = recid;
  goods.num   = newNumber;

  $.getJSON(Cart_Path + "?step=change_shopping_number&goods=" + $.toJSON(goods) + "&t=" + Math.random(),function(json){
	if (json.error == '1') {
		document.getElementById('goods_number_'+recid).value=originalNumber;
	  	if(sign == ''){
	  		obj.value = originalNumber;
	  	}else{
		  	document.getElementById('original_'+recid).value=originalNumber;
		}
	  	alertMsg({
	  	content:json.msg,
	  	buttons:{
				'确认':function(){
					document.getElementById('goods_number_'+recid).select();
				}
			}
	  	});
	  
	  return false;
	}

	document.getElementById('goods_number_'+recid).value   = json.new_goods_num;
	document.getElementById('original_'+recid).value       = json.new_goods_num;
	document.getElementById('subtotal_'+recid).innerHTML   = json.subtotal;
	document.getElementById('price_'+recid).innerHTML      = json.goods_price;
	document.getElementById('integral_'+recid).innerHTML   = json.give_integral;
	document.getElementById('total_goods_price').innerHTML = json.total_goods_price;
	document.getElementById('total_goods_price2').innerHTML = json.total_goods_price2;
	if (json.rec_id && json.num > 0) {
	  if (document.getElementById('goods_number_'+json.rec_id) != null) {
		document.getElementById('goods_number_'+json.rec_id).innerHTML = json.num;
	  }
	} else if (json.rec_id && json.num == 0) {
	  if(document.getElementById('goods_number_'+json.rec_id) != null) {
		$(obj).closest("tr").remove();
	  }
	}

	$(".weight").html('');
	$(".weight").html(json.settlement);
	$("#gift_goods_list").html('');
	$("#gift_goods_list").html(json.gift_goods);
	if (json.gift_goods == '') {
	  document.getElementById('gift_goods_list').style.display = "none";
	} else {
	  document.getElementById('gift_goods_list').style.display = "";
	}

	$('.huangou_goods').remove();
	$('#formCart').before(json.huangou_list);

	show_div_text = json.shopping_money;
	showdiv(document.getElementById('goods_number_'+recid),json.subtotal);

	$('.cart_goods').show();
	if (json.not_cart.length != 0) {
		$.each(json.not_cart, function(index, val) {
			$('#cart_goods_'+val).hide();
		});
	}

	// if (json.gift_notice) {
	// 	alertMsg({
	// 		content: json.gift_notice,
	// 		ico:1,
	// 		type:1,
	// 		buttons:{
	// 			'关闭':function(){
	// 				location.href = Cart_Path;
	// 			}
	// 		}
	// 	});
	// };
  });
}

// 收藏商品
function drop_to_collect (id) {
  // if (confirm('您确实要把该商品加入收藏夹吗？')) {
	$.getJSON(Cart_Path + "?step=drop_to_collect&id=" + id+'&random'+Math.random(),function(json){
	  if (json.error == "") {
		showCollectDiv(document.getElementById('collect_'+id));
	  	document.getElementById('collect_'+id).innerHTML='已经收藏';
	  	document.getElementById('collect_'+id).onclick='';
	  } else if (json.error == "goods_is_not_exists") {
		alertMsg("商品不存在！");
	  } else if (json.error == "no_login") {
	  	loginRegShow('login',window.location.href);
		// alertMsg("请先登录！");
	  }
	});
  // };
}

// 添加赠品
function addGift (giftId) {
	if (typeof(giftId) == 'undefined' || giftId < 1) {
		return false;
	}

	$.getJSON(Cart_Path + "?step=add_gift_to_cart&callback=?&gift_id=" + giftId+'&random'+Math.random(), function(json){
		if (json.error > 0) {
			alertMsg(json.message);
		} else {
			var cart_url = Cart_Path + '?step=cart';
			location.href = cart_url;
		}
	});
}

// 清空购物车
function clear_cart () {
	alertMsg({
		content: '确定清空购物车吗？',
		ico:1,
		type:2,
		buttons:{
			'确定':function(){
				location.href = Cart_Path + "?step=clear";
			}
		}
	})
}

// 删除选中商品
function dropAll (name) {
	alertMsg({
		content: '确定从购物车中删除所有选中商品？',
		ico:1,
		type:2,
		buttons:{
			'确定':function(){
				if ($("input[name='"+name+"[]']").is (":checked")) {
					$("#formCart").submit();
				} else {
					alertMsg('请至少选中一件商品！');
				}
			}
		}
	})
}

// 选择要删除的商品
function selectGoods (obj) {
  if ($("input[name='dropgoods[]']:checked").length < $("input[name='dropgoods[]']").length) {
	$("input[name='selectall[]']").attr("checked", false);
  } else {
	$("input[name='selectall[]']").attr("checked", true);
  }
}
// 全选
function selectAll (obj) {
  var is_checked = $(obj).prop("checked");
  $("input[name='dropgoods[]']").attr("checked", is_checked);
  $("input[name='selectall[]']").attr("checked", is_checked);
}


// 选择要删除的寄存商品
function selectStorageCart (obj) {
  if ($("input[name='drop_sto_cart_goods[]']:checked").length < $("input[name='drop_sto_cart_goods[]']").length) {
	$("input[name='selectscall[]']").attr("checked", false);
  } else {
	$("input[name='selectscall[]']").attr("checked", true);
  }
}

//删除购物车商品
function del_cart(type,obj){
	if(type=='drop_goods'){
		var content = '您确实要把该商品移出购物车吗,';
	} else if (type=='drop_sto_cart') {
		var content = '您确实要把该商品移出寄存单吗,';
	}
	alertMsg({
			content: content,
			ico:1,
			type:2,
			buttons:{
				'确定':function(){
					location.href=Cart_Path + '?step='+type+'&id='+obj;
				}
			}
		})
}

// 全选
function selectScAll (obj) {
  var is_checked = $(obj).prop("checked");
  $("input[name='drop_sto_cart_goods[]']").attr("checked", is_checked);
  $("input[name='selectscall[]']").attr("checked", is_checked);
}



function checkBuy(input, allow, rid) {
  if (input>allow) {
	alertMsg("抱歉，您目前最多能购买"+allow+"份该商品");
	document.getElementById('goods_number_'+rid).value = allow;
	return false;
  }
}

function selectTag(showContent,selfObj) {
  // 操作标签
  var tag = document.getElementById("tags").getElementsByTagName("li");
  var taglength = tag.length;
  for (i=0; i<taglength; i++) {
	tag[i].className = "";
  }
  selfObj.parentNode.className = "selectTag";
  // 操作内容
  for (i=0; j=document.getElementById("tagContent"+i); i++) {
	j.style.display = "none";
  }
  document.getElementById(showContent).style.display = "block";
}

// 切换在线支付显示
function togglePayOnline (obj) {
	toggleIcon(obj);
  // $(obj).children('.icon_reduce').toggleClass('icon_add');
  $('#pay_online_tbl').toggle();
}

// 切换发票显示
function toggleInv (obj) {
  toggleIcon(obj);
  $('#inv_div').toggle();
}

// 切换贺卡显示
function toggleCard (obj) {
  toggleIcon(obj);
  $('#card_div').toggle();
}

// 切换显示留言区块
function togglePostscript (obj) {
  toggleIcon(obj);
  $('#post_div').toggle();
}

function toggleKuaiqian (obj) {
  toggleIcon(obj);
  $('#kuaiqian_item').toggle();
}

function toggleCe9 (obj) {
  toggleIcon(obj);
  $('#ce9_item').toggle();
}

// 图标显示切换
function toggleIcon (obj) {
  if ($(obj).children('.icon_add').length) {
	$(obj).children('.icon_add').removeClass('icon_add').addClass('icon_reduce');
  } else {
	$(obj).children('.icon_reduce').removeClass('icon_reduce').addClass('icon_add');
  }
}

/*订单确认页底部切换*/
function togglebox (obj) {
	var _this = $(obj);
	if (_this.children('.icon_open').length) {
		_this.children('.icon_open').removeClass('icon_open').addClass('icon_close');
	} else {
		_this.children('.icon_close').removeClass('icon_close').addClass('icon_open');
	}

	var objId = $(obj).attr("id");
	objId += 'box';
	$('#'+objId).toggle();
}

// 修改原有购物车商品数量
function editNum(sign,recid,obj) {
  if (recid == '' || recid == null || obj =='' || obj == null) {
	return false;
  }

  var originalNumber = $("#gnum_"+recid).val();
  var newNumber = 1;
  // 新的商品数量
  if (sign == '-') {
	newNumber = Math.abs(parseInt(originalNumber) - 1);
  } else if (sign == '+'){
	newNumber = Math.abs(parseInt(originalNumber) + 1);
  }else {
	newNumber = Math.abs(parseInt(obj.value));
  }

  if (newNumber < 1 || isNaN(newNumber)) {
	newNumber = 1;
  }

  $("#gnum_"+recid).val(newNumber);
  var p = parseFloat($("#p_"+recid).html());
  var total = p * newNumber;
  $("#t_"+recid).html(total.toFixed(2));
  $("#i_"+recid).html(Math.floor(total));
}

function addCart (gid, rid,event) {
  var gnum = document.getElementById('gnum_'+rid).value;
  addToCart(gid,event,0,gnum,'del_'+rid);
}

function addEditAddress (address_id) {
	showbox(window.location.href,Cart_Path+'?step=consignee&address_id='+address_id,840,380);
}

function delAddress(addr_id,event)
{
	if(event&&event.stopPropagation){//非IE
		event.stopPropagation();
	}
	else{//IE
		window.event.cancelBubble=true;
	}
	$.getJSON(Cart_Path+'?step=drop_consignee&callback=?&id='+addr_id+'&random'+Math.random(), function(json) {
		if (json.error == 1) {
			msg = '删除收货地址失败！';
			if (json.default_a) {
				msg = '请先指定其他默认地址, 再删除该地址';
			}
			alertMsg({content:msg,ico:1,height:150});
		} else {
			$('#address_'+addr_id).remove();
			if (json.set_default) {
				setDelivery(document.getElementById('address_'+json.set_default),json.set_default);
			}
		}
	});
	// location.href=Customer_Path+'?act=drop_consignee&id='+addr_id+back_act;

}

$(function(){

	// 切换新地址
	$('.btn_confirm').click(function() {
		$(".table_info").toggle();
		$(".tag_01").toggleClass("tag_02");
	});

	$('.bank_close').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').hide();
		$(this).closest('tr').prev().children().find('.icon_reduce').removeClass('.icon_reduce').addClass('icon_add');
	});

	// 选择支付方式
	$('input[name="payment"]').bind($.browser.msie ? 'click' : 'change', function() {
		selectPayment(this);
	});

	if ($.browser.msie) {
		$("label img").bind("click", function() {
			$("#" + $(this).parents("label").attr("for")).click();
		});
	}

	// 在线支付样式
	$('#pay_online').find(':submit').addClass('btn_uubmit2');
	$('#pay_online').find(':button').addClass('btn_uubmit2');

});