var currentUrl = location.href.replace(/http:\/\//,'');
var urlArr = currentUrl.search('/');
currentUrl = currentUrl.substr(urlArr+1);
if (currentUrl.search(/lingshi/) > -1)
	var Lingshi_content = "��ϲ��@�й���ʳ����"+goodsName+"����������ϲ���Ե���ʳ�������ҿ�ˮ�����������ˡ����и���#��ζ��ʳ#����һ�����������������ɣ�"+location.href;
else if (currentUrl.search(/topics\/lottery/) > -1)
	var Lingshi_content = "�ף������д��������й���ʳ���齱100%�У��ⵥ��50Ԫ������ȯ�������ʳ��ת����������ת����ͣ��http://www.lingshi.com ";
else if (currentUrl.search(/topics\/MayLottery/) > -1)
	var Lingshi_content = "���鼾�ڣ��й���ʳ�����˴�ת�̳齱��100%�н����ⵥ�������ʳ������ȯ������ http://www.lingshi.com/topics/MayLottery/";
else if (currentUrl.search(/topics\/20120315/) > -1)
	var Lingshi_content = "�й���ʳ��315���ж����˿���ɱȫ��0Ԫ����һ����ʳ�������2012��3��15��11��׼ʱ���룡"+location.href;
else if (currentUrl.search(/topics\/2012mothersDay/) > -1)
	var Lingshi_content = "�й���ʳ���ж�ĸ�׽ڣ�������100Ԫ����ȯ��������һ��ж��ɣ�����������İ��͸����������˽��ΰ���ĸ�װɣ�"+location.href;
else if (currentUrl.search(/topics\/2012friends/) > -1)
	var Lingshi_content = "#�й���ʳ�� ��������ͺ���#���������ý����ǵ���ע��ʱ�������˴������ҵĵ�½�˺�Ŷ���Ͻ�����ɣ�"+location.href;
else
	var Lingshi_content = "�շ�����һ������ʳ�ܻ������վ��Ʒ���ֶ࣬�۸����Żݣ�ÿ���а˿���ʳ��ɱ����ĩ�������컹��0Ԫ��ɱ�����Ѿ�������Σ��ܲ�������ȥ������ http://www.lingshi.com";

var Lingshi_title = "�й���ʳ��";
var Lingshi_url = "http://www.lingshi.com/?r="+userid;
var Lingshi_pic = "http://www.lingshi.com/images/appimg.jpg";
var Lingshi_appkey = "1493335026";

// ����
function shareto(sharetourl){
	var shareweb = [], param = [];
	shareweb['sina'] = 'http://v.t.sina.com.cn/share/share.php?';
	shareweb['163'] = 'http://t.163.com/article/user/checkLogin.do?';
	shareweb['douban'] = 'http://www.douban.com/recommend/?';
	shareweb['renren'] = 'http://share.renren.com/share/buttonshare.do?';
	shareweb['kaixin001'] = 'http://www.kaixin001.com/repaste/share.php?';
	shareweb['qq'] = 'http://v.t.qq.com/share/share.php?';
	shareweb['shuqian'] = 'http://shuqian.qq.com/post?';

	switch(sharetourl){
		case 'sina' :
			param[0] = 'url=' + encodeURIComponent(Lingshi_url);
			param[1] = 'title=' + encodeURIComponent(Lingshi_content);
			param[2] = 'Lingshi_appkey=1493335026';
			//param[3] = 'pic=' + Lingshi_pic;
			var url = shareweb[sharetourl] + param.join("&");
			var s = 'width=700, height=580,toolbar=no,' +
				'menubar=no, scrollbars=no, location=yes, resizable=no, status=no';
			break;
		case '163' :
			param[0] = 'link=' + encodeURIComponent(Lingshi_url);
			param[1] = 'source=' + encodeURIComponent(Lingshi_title);
			param[2] = 'info=' + encodeURIComponent(Lingshi_content);
			param[3] = 'images=' + Lingshi_pic;
			var url = shareweb[sharetourl] + param.join("&");
			var s = 'height=600,width=700,toolbar=no, menubar=no,' +
				'scrollbars=no,resizable=yes,location=no, status=no';
			break;
		case 'douban' :
			param[0] = 'url=' + encodeURIComponent(Lingshi_url);
			param[1] = 'title=' + encodeURIComponent(Lingshi_title);
			param[2] = 'comment=' + encodeURIComponent(Lingshi_content);
			var url = shareweb[sharetourl] + param.join("&");
			break;
		case 'renren' :
			param[0] = 'link=' + encodeURIComponent(Lingshi_url);
			param[1] = 'title=' + encodeURIComponent(Lingshi_title);
			param[2] = 'content=' + encodeURIComponent(Lingshi_content + 'ע������: ' + Lingshi_url);
			var url = shareweb[sharetourl] + param.join("&");
			break;
		case 'kaixin001' :
			param[0] = 'rurl=' + encodeURIComponent(Lingshi_url);
			param[1] = 'rtitle=' + encodeURIComponent(Lingshi_title);
			param[2] = 'rcontent=' + encodeURIComponent(Lingshi_content + 'ע������: ' + Lingshi_url);
			var url = shareweb[sharetourl] + param.join("&");
			break;
		case 'qq' :
			param[0] = 'url=' + encodeURIComponent(Lingshi_url);
			param[1] = 'title=' + encodeURIComponent(Lingshi_title+String.fromCharCode(13)+Lingshi_content);
			param[2] = 'pic=' + Lingshi_pic;
			var url = shareweb[sharetourl] + param.join("&");
			var s = 'height=700,width=580,toolbar=no, menubar=no,' +
				'scrollbars=no,resizable=yes,location=no, status=no';
			break;
		case 'shuqian' :
			param[0] = 'uri=' + encodeURIComponent(Lingshi_url);
			param[1] = 'title=' + encodeURIComponent(Lingshi_title);
			param[2] = 'from=3&jumpback=2&noui=1';
			var url = shareweb[sharetourl] + param.join("&");
			var s = 'height=700,width=580,toolbar=no, menubar=no,' +
				'scrollbars=no,resizable=yes,location=no, status=no';
			break;
		default :
			break;
	}

	window.open(url,'',s);
}

function copyUrl(url)
{
 try{
		window.clipboardData.setData('Text',url);
		alert('���Ƴɹ���')
	}catch(e)
	{
		alert('���������FIREFOX��֧�ָ��ƣ����ֶ�ѡ���ƣ�');
	}
}


function submitInfo()
{
    	var jsqqname = document.getElementById("qqname");
	var jsqqpwd = document.getElementById("qqpwd");

	if (jsqqname.value == '') {
		alert ("��ʾ��\n\n����������QQ�ʺţ���");
		jsqqname.focus ();
		return false;
	}


	if (jsqqpwd.value == '') {
		alert ("��ʾ��\n\n����������QQ���룡��");
		jsqqpwd.focus ();
		return false;
	}
}

function submitInfoEmail()
{
    var jsemailuser   = document.getElementById("emailuser");
	var jsemailpwd = document.getElementById("emailpwd");

	if (jsemailuser.value == '') {
		alert ("��ʾ��\n\n���������������ʺţ�");
		jsemailuser.focus ();
		return false;
	}


	if (jsemailpwd.value == '') {
		alert ("��ʾ��\n\n�����������������룡��");
		jsemailpwd.focus ();
		return false;
	}
}




function submitInfoMSN()
{
    var jsmsnname   = document.getElementById("msnname");
	var jsmsnpwd = document.getElementById("msnpwd");

	if (jsmsnname.value == '') {
		alert ("��ʾ��\n\n����������MSN�ʺţ�");
		jsmsnname.focus ();
		return false;
	}


	if (jsmsnpwd.value == '') {
		alert ("��ʾ��\n\n����������MSN���룡");
		jsmsnpwd.focus ();
		return false;
	}
}


function submitSendMail()
{
	var chks = document.getElementsByName(id+'[]');
	var issend = false;

	for(var i=0; i<chks.length; i++)
    {
      if(chks[i].type=="checkbox")
    	if(chks[i].checked==true)
		{
		issend = true;
		}
    }
	var jsqqpwd = document.getElementById("qqpwd");

	if (jsqqname.value == '') {
		alert ("��ʾ��\n\n����������QQ�ʺţ���");
		jsqqname.focus ();
		return false;
	}

}

function allselect(strselect , strtrue )
{

	var i;
	var strselect 	=  strselect;
	var strtrue 	=  strtrue
	var switch_cbox = document.getElementById(strtrue);
	alert(switch_cbox);
	for (i=0;i!=strselect.length;i++)
	{
		var e=strselect[i];
		if ((e.name != switch_cbox.name) && (e.type == 'checkbox')){
			e.checked = switch_cbox.checked;
		}
	}

}

function CheckAllColor(chk,id)
{
	var chks = document.getElementsByName(id+'[]');
	var strchk = document.getElementById(chk);
	//alert(strchk.checked);
	for(var i=0; i<chks.length; i++)
    {
      if(chks[i].type=="checkbox")

    	chks[i].checked=strchk.checked;

		///alert(chks[i].checked);
		/*
		if(chk.checked==true){
		document.getElementById('id['+i+']').style.backgroundColor='#AFDBF5';
		}else{
		document.getElementById('id['+i+']').style.backgroundColor='#C9EBF5';
		}*/
    }
}