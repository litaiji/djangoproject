function submitInfo(){

	var frm = document.forms['dingform'];
	var oOrder = frm.orderid;
	var oName = frm.name;
	var oPhone = frm.phone;

    var vOrder = oOrder.value.replace(/^\s+|\s+$/g,"");
	var vName = oName.value.replace(/^\s+|\s+$/g,"");
	var vPhone = oPhone.value.replace(/^\s+|\s+$/g,"");

	if (vOrder.length < 1 &&  vName.length < 1)
	{
		if (document.getElementById('returnMsg') != null)
			document.getElementById('returnMsg').innerHTML = '������д�����Ż����ջ���������';
		oOrder.select ();
		return false;
	}

	if (vOrder.length > 1 && (vOrder.length < 13 || isNaN(vOrder.length))){
		if (document.getElementById('returnMsg') != null)
			document.getElementById('returnMsg').innerHTML = '������д��ȷ�Ķ����ţ�';
		oOrder.select();
		return false;
	}

	if (vPhone == '')
	{
		if (document.getElementById('returnMsg') != null)
			document.getElementById('returnMsg').innerHTML = '����������ϵ��ʽ��';
		oPhone.select ();
		return false;
	}else{
		patn = /(^(\d{2,4}[-_����]?)?\d{3,8}([-_����]?\d{3,8})?([-_����]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
		if (!patn.test(vPhone) )
		{
			if (document.getElementById('returnMsg') != null)
				document.getElementById('returnMsg').innerHTML = '����������ȷ����ϵ��ʽ��';
			oPhone.select ();
			return false;
		}
	}
}