// JavaScript Document

var Validate = new Object();

// 纯数字检测函数
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
			document.getElementById(id).innerHTML = "输入不合法，只能输入数字！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
		
	}
	
	return Validate.isInt;
}

//纯中文姓名检测函数
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
			document.getElementById(id).innerHTML = "请输入您的真实姓名(2-6个汉字)！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isName;
}

//邮编号码检测函数
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
			document.getElementById(id).innerHTML = "请输入正确的邮编号码！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isZipcode;
}

//邮箱地址检测函数
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
			document.getElementById(id).innerHTML = "请输入正确的邮箱地址！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isEmail;
}

//电话号码检测函数
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
			document.getElementById(id).innerHTML = "请输入正确的电话号码！示例：020-87654321";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isPhone;
}

//手机号码检测函数
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
			document.getElementById(id).innerHTML = "请输入正确的手机号码！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isMobile;
}

//字符串检测函数
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
			document.getElementById(id).innerHTML = "请输入合法的字符串！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isChar;
}

//生日字串格式检测函数 （yyyy-mm-dd）
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
			document.getElementById(id).innerHTML = "请输入正确的生日格式！";
		}
		else
		{
			document.getElementById(id).innerHTML = "";
		}
	}
	return Validate.isBirthday;
}
