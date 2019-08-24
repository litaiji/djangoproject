// JavaScript Document

var Validate = new Object();

// �����ּ�⺯��
Validate.isInt = true;
Validate.checkInt = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isInt = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\d+$/;
	Validate.isInt = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isInt === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "���벻�Ϸ���ֻ���������֣�";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
		
	}
	
	return Validate.isInt;
}

//������������⺯��
Validate.isName = true;
Validate.checkName = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isName = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^[\u4E00-\u9FA5]{2,6}$/;
	Validate.isName = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isName === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "������������ʵ����(2-6������)��";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isName;
}

//�ʱ�����⺯��
Validate.isZipcode = true;
Validate.checkZipcode = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isZipcode = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\d{6}$/;
	Validate.isZipcode = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isZipcode === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "��������ȷ���ʱ���룡";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isZipcode;
}

//�����ַ��⺯��
Validate.isEmail = true;
Validate.checkEmail = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isEmail = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	Validate.isEmail = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isEmail === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "��������ȷ�������ַ��";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isEmail;
}

//�绰�����⺯��
Validate.isPhone = true;
Validate.checkPhone = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isPhone = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\d{3,4}-\d{7,8}$/;
	Validate.isPhone = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isPhone === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "��������ȷ�ĵ绰���룡ʾ����020-87654321";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isPhone;
}

//�ֻ������⺯��
Validate.isMobile = true;
Validate.checkMobile = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isMobile = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^1(3|5|7|8)\d{9}$/;
	Validate.isMobile = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isMobile === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "��������ȷ���ֻ����룡";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isMobile;
}

//�ַ�����⺯��
Validate.isChar = true;
Validate.checkChar = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isChar = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\w{10}$/;
	Validate.isChar = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isChar === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "������Ϸ����ַ�����";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isChar;
}

//�����ִ���ʽ��⺯�� ��yyyy-mm-dd��
Validate.isBirthday = true;
Validate.checkBirthday = function (obj, id, request)
{
	if(request == 0 && obj.value == "")
	{
		Validate.isBirthday = true;
		document.getElementById(id).innerHTML = "";
		return true;
	}
	
	var reg = /^\d{4}-\d{2}-\d{2}$/;
	Validate.isBirthday = obj.value.match(reg);
	if(typeof(id) == "string")
	{
		if(Validate.isBirthday === null)
		{
			document.getElementById(id).style.color="#FF0000";
			document.getElementById(id).innerHTML = "��������ȷ�����ո�ʽ��";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isBirthday;
}
