var currentUrl = location.href.replace(/http:\/\//,'');
var urlArr = currentUrl.search('/');
currentUrl = currentUrl.substr(urlArr+1);
if (currentUrl.search(/lingshi/) > -1)
	var Lingshi_content = "我喜欢@中国零食网的"+goodsName+"，这是我最喜欢吃的零食，馋的我口水都快流出来了。还有更多#美味零食#邀你一起分享，快来这儿看看吧："+location.href;
else if (currentUrl.search(/topics\/lottery/) > -1)
	var Lingshi_content = "亲，龙年行大运啦，中国零食网抽奖100%中，免单、50元无限制券、免费零食等转出来，好运转个不停！http://www.lingshi.com ";
else if (currentUrl.search(/topics\/MayLottery/) > -1)
	var Lingshi_content = "激情季节，中国零食网幸运大转盘抽奖，100%中奖，免单、免费零食、代金券轻松拿 http://www.lingshi.com/topics/MayLottery/";
else if (currentUrl.search(/topics\/20120315/) > -1)
	var Lingshi_content = "中国零食网315在行动，八款秒杀全部0元，仅一天零食免费抢，2012年3月15日11点准时开秒！"+location.href;
else if (currentUrl.search(/topics\/2012mothersDay/) > -1)
	var Lingshi_content = "中国零食网感恩母亲节，来就送100元代金券！让我们一起感恩吧！将心灵深处最纯洁的爱送给天底下最无私最伟大的母亲吧！"+location.href;
else if (currentUrl.search(/topics\/2012friends/) > -1)
	var Lingshi_content = "#中国零食网 邀请好友送好礼#呼朋唤友来拿奖，记得在注册时，邀请人处填上我的登陆账号哦！赶紧加入吧！"+location.href;
else
	var Lingshi_content = "刚发现了一个买零食很划算的网站，品种又多，价格又优惠，每天有八款零食秒杀，周末连续两天还有0元秒杀，我已经秒过几次，很不错，可以去看看！ http://www.lingshi.com";

var Lingshi_title = "中国零食网";
var Lingshi_url = "http://www.lingshi.com/?r="+userid;
var Lingshi_pic = "http://www.lingshi.com/images/appimg.jpg";
var Lingshi_appkey = "1493335026";

// 分享
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
			param[2] = 'content=' + encodeURIComponent(Lingshi_content + '注册链接: ' + Lingshi_url);
			var url = shareweb[sharetourl] + param.join("&");
			break;
		case 'kaixin001' :
			param[0] = 'rurl=' + encodeURIComponent(Lingshi_url);
			param[1] = 'rtitle=' + encodeURIComponent(Lingshi_title);
			param[2] = 'rcontent=' + encodeURIComponent(Lingshi_content + '注册链接: ' + Lingshi_url);
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
		alert('复制成功！')
	}catch(e)
	{
		alert('您的浏览器FIREFOX不支持复制，请手动选择复制！');
	}
}


function submitInfo()
{
    	var jsqqname = document.getElementById("qqname");
	var jsqqpwd = document.getElementById("qqpwd");

	if (jsqqname.value == '') {
		alert ("提示：\n\n请输入您的QQ帐号！！");
		jsqqname.focus ();
		return false;
	}


	if (jsqqpwd.value == '') {
		alert ("提示：\n\n请输入您的QQ密码！！");
		jsqqpwd.focus ();
		return false;
	}
}

function submitInfoEmail()
{
    var jsemailuser   = document.getElementById("emailuser");
	var jsemailpwd = document.getElementById("emailpwd");

	if (jsemailuser.value == '') {
		alert ("提示：\n\n请输入您的邮箱帐号！");
		jsemailuser.focus ();
		return false;
	}


	if (jsemailpwd.value == '') {
		alert ("提示：\n\n请输入您的邮箱密码！！");
		jsemailpwd.focus ();
		return false;
	}
}




function submitInfoMSN()
{
    var jsmsnname   = document.getElementById("msnname");
	var jsmsnpwd = document.getElementById("msnpwd");

	if (jsmsnname.value == '') {
		alert ("提示：\n\n请输入您的MSN帐号！");
		jsmsnname.focus ();
		return false;
	}


	if (jsmsnpwd.value == '') {
		alert ("提示：\n\n请输入您的MSN密码！");
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
		alert ("提示：\n\n请输入您的QQ帐号！！");
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