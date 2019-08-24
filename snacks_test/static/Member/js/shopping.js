/* *
 * �ı��ջ���ַ
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
 * �ı��ջ���ַ�ص�����
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
 * �ı�֧����ʽ
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
 * �ı�֧����ʽ�ص�����
 */
function selectPaymentResponse(obj) {
  // ���ջ���ַ
  if (obj.error && obj.error == 100 && obj.content) {

	alertMsg({content:obj.content,ico:1});
  } else {
	orderSelectedResponse(obj);
  }
}

/* *
 * �ı�ף���ؿ�
 */
function selectCard (obj) {
  $("#card_div").find("p").removeClass("fc");
  $(obj).parent().addClass("fc");
  Ajax.call(Cart_Path + '?step=select_card', 'card=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/**
 * ѡ��Ʊ
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
 * �ص�����
 */
function orderSelectedResponse(result) {
	if (result.prompt == 1) {
		alertMsg('��ܰ��ʾ��ʹ�ô���ȯ�޷�����ũҵ�����������');
	} else if (result.prompt == 2) {
		alertMsg('��ܰ��ʾ��ʹ�����֧���޷�����ũҵ�����������');
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
 *  �ı����
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
 * �ı����ص�����
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
 * �ı����ȯ
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
 * �ı����Ļص�����
 */
function changeBonusResponse(obj) {
	var alertMsg = '';
	if (obj.error) {
		switch (obj.error) {
			case 'unusable_inexistence' :
				alertMsg = '��ѡ��Ĵ���ȯ�������ڡ�';
				break;
			case 'unusable_beyong_area' :
				alertMsg = '�ô���ȯ���볬����ʹ������!';
				break;
			case 'unusable_used_today' :
				alertMsg = '�Բ����������Ѿ�ʹ�ù�����ȯ��';
				break;
			case 'unusable_expired' :
				alertMsg = '�ô���ȯ�ѹ���';
				break;
			case 'bonus_forbidden':
				alertMsg = obj.msg;
				break;
			case 'unusable_until_amount' :
				alertMsg = '���������ۼ���Ʒ�ܽ��δ�ﵽ' + obj.amount + 'Ԫ���޷�ʹ�ô���ȯ��';
				break;
			case 'no_goods_in_cart' :
				alertMsg = '���Ĺ��ﳵ��û����Ʒ��';
			case 'no_address':
				alertMsg = '��������ջ���ַ��';
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
 * ��֤������к�
 * @param string bonusSn ������к�
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
				alertMsg = '����ȯ�Ѽ���...';
				break;
			case 'unusable_expired' :
				alertMsg = '�ô���ȯ�Ѿ�����ʹ���ڣ�';
				break;
			case 'unusable_until_date' :
				alertMsg = '�ô���ȯʹ����ʼʱ�䣺' + obj.date;
				break;
			case 'unusable_until_amount' :
				alertMsg = '���������ۼ���Ʒ�ܽ��δ�ﵽ' + obj.amount + 'Ԫ���޷�ʹ�ô���ȯ��';
				break;
			case 'unusable_beyong_area' :
				alertMsg = '�ô���ȯ���볬����ʹ������!';
				break;
			case 'unusable_user_excess' :
				alertMsg = '���ѳ������ʹ�ô���!';
				break;
			case 'unusable_used_today' :
				alertMsg = '�Բ����������Ѿ�ʹ�ù�����ȯ��';
				break;
			case 'unusable_bonus_excess' :
				alertMsg = '�ô���ȯ�ѳ������ʹ�ô�����';
				break;
			case 'unusable_user_rate' :
				alertMsg = '��Ǹ��ÿλ��Ա' + obj.rate + '�����ʹ��һ�Ŵ���ȯ';
				break;
			case 'unusable_inexistence' :
				alertMsg = '����ȯ�����ڣ�' + obj.ext_error;
				break;
			case 'user_no_login' :
				alertMsg("����Ҫ��¼���ܽ��м��������");
				window.location = obj.content;
				break;
			case 'bonus_input_err' :
				alertMsg = obj.msg;
				break;
			case 'bonus_forbidden' :
				alertMsg = obj.msg;
			case 'no_goods_in_cart' :
				alertMsg = '���Ĺ��ﳵ��û����Ʒ��';
			case 'no_address':
				alertMsg = '��������ջ���ַ��';
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

			// ��ȯ ����ѡ���б�
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
				$('#bonus_num').html('��'+ obj.bonus_count +'��');

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
 * �ı䷢Ʊ�ķ�ʽ
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
 * �ı䷢Ʊ�ķ�ʽ
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
 * ����ύ�Ķ�����
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

	// ��ֹ�ظ��ύ
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
 * ����ջ���ַ��Ϣ������д������
 */
function checkConsignee(frm) {
	var err = false;
	var region_str = '';
	var mobi_str = '';

	var domId = {
		'region_notice':'',//����
		'consignee_notice':'',//�ջ�������
		'email_notice':'',//�ʼ�
		'address_notice':'',//��ϸ��ַ
		'zipcode_notice':'',//
		'mobile_notice':''//�ֻ��绰
	}


	if (frm.elements['country'] && frm.elements['country'].value == 0) {
	region_str += country_not_null+'��';
	}

	if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 0) {
		region_str += province_not_null+'��';
	}

	if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 0) {
	region_str += city_not_null+'��';
	}

	if (frm.elements['district'] && frm.elements['district'].length > 0) {
		if (frm.elements['district'].value == 0) {
			region_str += district_not_null;
		}
	}

	if (region_str != '') {
		domId.region_notice = '����ѡ���ջ�������'+region_str;
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
		mobi_str += '�ֻ�������̶��绰������д1�';
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

// ���������Ʒ����
function changeShoppingNumber(sign,recid,obj) {
  if (recid == '' || recid == null || obj =='' || obj == null) {
	return false;
  }

  var originalNumber = document.getElementById('original_'+recid).value;  // ԭʼ��Ʒ����
  var newNumber = 1;
  // �µ���Ʒ����
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
				'ȷ��':function(){
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
	// 			'�ر�':function(){
	// 				location.href = Cart_Path;
	// 			}
	// 		}
	// 	});
	// };
  });
}

// �ղ���Ʒ
function drop_to_collect (id) {
  // if (confirm('��ȷʵҪ�Ѹ���Ʒ�����ղؼ���')) {
	$.getJSON(Cart_Path + "?step=drop_to_collect&id=" + id+'&random'+Math.random(),function(json){
	  if (json.error == "") {
		showCollectDiv(document.getElementById('collect_'+id));
	  	document.getElementById('collect_'+id).innerHTML='�Ѿ��ղ�';
	  	document.getElementById('collect_'+id).onclick='';
	  } else if (json.error == "goods_is_not_exists") {
		alertMsg("��Ʒ�����ڣ�");
	  } else if (json.error == "no_login") {
	  	loginRegShow('login',window.location.href);
		// alertMsg("���ȵ�¼��");
	  }
	});
  // };
}

// �����Ʒ
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

// ��չ��ﳵ
function clear_cart () {
	alertMsg({
		content: 'ȷ����չ��ﳵ��',
		ico:1,
		type:2,
		buttons:{
			'ȷ��':function(){
				location.href = Cart_Path + "?step=clear";
			}
		}
	})
}

// ɾ��ѡ����Ʒ
function dropAll (name) {
	alertMsg({
		content: 'ȷ���ӹ��ﳵ��ɾ������ѡ����Ʒ��',
		ico:1,
		type:2,
		buttons:{
			'ȷ��':function(){
				if ($("input[name='"+name+"[]']").is (":checked")) {
					$("#formCart").submit();
				} else {
					alertMsg('������ѡ��һ����Ʒ��');
				}
			}
		}
	})
}

// ѡ��Ҫɾ������Ʒ
function selectGoods (obj) {
  if ($("input[name='dropgoods[]']:checked").length < $("input[name='dropgoods[]']").length) {
	$("input[name='selectall[]']").attr("checked", false);
  } else {
	$("input[name='selectall[]']").attr("checked", true);
  }
}
// ȫѡ
function selectAll (obj) {
  var is_checked = $(obj).prop("checked");
  $("input[name='dropgoods[]']").attr("checked", is_checked);
  $("input[name='selectall[]']").attr("checked", is_checked);
}


// ѡ��Ҫɾ���ļĴ���Ʒ
function selectStorageCart (obj) {
  if ($("input[name='drop_sto_cart_goods[]']:checked").length < $("input[name='drop_sto_cart_goods[]']").length) {
	$("input[name='selectscall[]']").attr("checked", false);
  } else {
	$("input[name='selectscall[]']").attr("checked", true);
  }
}

//ɾ�����ﳵ��Ʒ
function del_cart(type,obj){
	if(type=='drop_goods'){
		var content = '��ȷʵҪ�Ѹ���Ʒ�Ƴ����ﳵ��,';
	} else if (type=='drop_sto_cart') {
		var content = '��ȷʵҪ�Ѹ���Ʒ�Ƴ��Ĵ浥��,';
	}
	alertMsg({
			content: content,
			ico:1,
			type:2,
			buttons:{
				'ȷ��':function(){
					location.href=Cart_Path + '?step='+type+'&id='+obj;
				}
			}
		})
}

// ȫѡ
function selectScAll (obj) {
  var is_checked = $(obj).prop("checked");
  $("input[name='drop_sto_cart_goods[]']").attr("checked", is_checked);
  $("input[name='selectscall[]']").attr("checked", is_checked);
}



function checkBuy(input, allow, rid) {
  if (input>allow) {
	alertMsg("��Ǹ����Ŀǰ����ܹ���"+allow+"�ݸ���Ʒ");
	document.getElementById('goods_number_'+rid).value = allow;
	return false;
  }
}

function selectTag(showContent,selfObj) {
  // ������ǩ
  var tag = document.getElementById("tags").getElementsByTagName("li");
  var taglength = tag.length;
  for (i=0; i<taglength; i++) {
	tag[i].className = "";
  }
  selfObj.parentNode.className = "selectTag";
  // ��������
  for (i=0; j=document.getElementById("tagContent"+i); i++) {
	j.style.display = "none";
  }
  document.getElementById(showContent).style.display = "block";
}

// �л�����֧����ʾ
function togglePayOnline (obj) {
	toggleIcon(obj);
  // $(obj).children('.icon_reduce').toggleClass('icon_add');
  $('#pay_online_tbl').toggle();
}

// �л���Ʊ��ʾ
function toggleInv (obj) {
  toggleIcon(obj);
  $('#inv_div').toggle();
}

// �л��ؿ���ʾ
function toggleCard (obj) {
  toggleIcon(obj);
  $('#card_div').toggle();
}

// �л���ʾ��������
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

// ͼ����ʾ�л�
function toggleIcon (obj) {
  if ($(obj).children('.icon_add').length) {
	$(obj).children('.icon_add').removeClass('icon_add').addClass('icon_reduce');
  } else {
	$(obj).children('.icon_reduce').removeClass('icon_reduce').addClass('icon_add');
  }
}

/*����ȷ��ҳ�ײ��л�*/
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

// �޸�ԭ�й��ﳵ��Ʒ����
function editNum(sign,recid,obj) {
  if (recid == '' || recid == null || obj =='' || obj == null) {
	return false;
  }

  var originalNumber = $("#gnum_"+recid).val();
  var newNumber = 1;
  // �µ���Ʒ����
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
	if(event&&event.stopPropagation){//��IE
		event.stopPropagation();
	}
	else{//IE
		window.event.cancelBubble=true;
	}
	$.getJSON(Cart_Path+'?step=drop_consignee&callback=?&id='+addr_id+'&random'+Math.random(), function(json) {
		if (json.error == 1) {
			msg = 'ɾ���ջ���ַʧ�ܣ�';
			if (json.default_a) {
				msg = '����ָ������Ĭ�ϵ�ַ, ��ɾ���õ�ַ';
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

	// �л��µ�ַ
	$('.btn_confirm').click(function() {
		$(".table_info").toggle();
		$(".tag_01").toggleClass("tag_02");
	});

	$('.bank_close').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').hide();
		$(this).closest('tr').prev().children().find('.icon_reduce').removeClass('.icon_reduce').addClass('icon_add');
	});

	// ѡ��֧����ʽ
	$('input[name="payment"]').bind($.browser.msie ? 'click' : 'change', function() {
		selectPayment(this);
	});

	if ($.browser.msie) {
		$("label img").bind("click", function() {
			$("#" + $(this).parents("label").attr("for")).click();
		});
	}

	// ����֧����ʽ
	$('#pay_online').find(':submit').addClass('btn_uubmit2');
	$('#pay_online').find(':button').addClass('btn_uubmit2');

});