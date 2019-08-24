var _encoder = function(Str) {
	if (Str == null || Str == "") {
		return ""
	}
	var newStr = "";
	function toCase(sStr) {
		return sStr.toString(16).toUpperCase()
	}
	for (var i = 0, icode, len = Str.length; i < len; i++) {
		icode = Str.charCodeAt(i);
		if (icode < 0x10) {
			newStr += "%0" + icode.toString(16).toUpperCase()
		} else if (icode < 0x80) {
			if (icode == 0x20) {
				newStr += "+"
			} else if ((icode >= 0x30 && icode <= 0x39) || (icode >= 0x41 && icode <= 0x5A) || (icode >= 0x61 && icode <= 0x7A)) {
				newStr += Str.charAt(i)
			} else {
				newStr += "%" + toCase(icode)
			}
		} else if (icode < 0x800) {
			newStr += "%" + toCase(0xC0 + (icode >> 6));
			newStr += "%" + toCase(0x80 + icode % 0x40)
		} else {
			newStr += "%" + toCase(0xE0 + (icode >> 12));
			newStr += "%" + toCase(0x80 + (icode >> 6) % 0x40);
			newStr += "%" + toCase(0x80 + icode % 0x40)
		}
	}
	return newStr
};
function openchat(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://chat.53kf.com/webCompany.php?arg=lingshi1426290914&style=1&kf=kf30,kf21,kf82,kf80,kf79,kf77,kf38,kf15,kf74,kf67';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	wnd = window.open(url,name,attr);
	wnd.focus();
    return wnd
	
}
function openChat1(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://chat.53kf.com/webCompany.php?arg=lingshi1426290914&style=1&kf=kf01,kf78,kf76';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	wnd = window.open(url,name,attr);
	wnd.focus();
    return wnd
}
function openChat2(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://chat.53kf.com/webCompany.php?arg=lingshi1426290914&style=1&kf=kf02';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	wnd = window.open(url,name,attr);
	wnd.focus();
    return wnd
}

function openChat3(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://www41.53kf.com/webCompany.php?arg=lingshi1426290914&style=1&kf=kf21&timeStamp=1406102395037';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	wnd = window.open(url,name,attr);
	wnd.focus();
    return wnd
}
function openChat4(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://chat.53kf.com/webCompany.php?arg=lingshi1426290914&style=1&kf=kf76';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	wnd = window.open(url,name,attr);
	wnd.focus();
    return wnd
}

function openchats(){
	try {
		parent.closeMini()
    } catch(e) {}
	var url = 'http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=140038&jid=3464247380&skillId=2263';
	var name = '140038chatbox';
	var attr = 'left=380,top=230,toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	var wnd,link = document.getElementById("live800:link");
	if (document.all && false){	
		try {
			wnd = window.open(url, name, attr);
			link.target = name;
			link.href = url;
			link.click()
		} catch(e) {}
	}else{
		 wnd = window.open(url,name,attr);
	}
	wnd.focus();
    return wnd
	
}

window.openChat12=function(el){
	try{parent.closeMini()}catch(e){}

	var protocol=((document.location.protocol=="https:")?"https://":"http://");
	live800_companyID="140038";
	var enterurl = null;
	var isOldSkin=false;
	var server_prefix_list=['http://st.live800.com/live800','http://st16.live800.com/live800','http://st8.live800.com/live800','http://st10.live800.com/live800'];
	var isNeedCheckDomainBinding=false;
	var globalWindowAttribute='toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	jid="3464247380";
	var live800_baseUrl="chat32.live800.com";
	var live800_baseHtmlUrl="chat32.live800.com";
	var live800_baseWebApp="/live800";
	var live800_baseChatHtmlDir="/chatClient";
	live800_configID="33994";
	live800_configContent="live800_float=1&live800_online=http%3A%2F%2Fwww.lingshi.com%2Fimages%2Fkf_online.gif&live800_offline=http%3A%2F%2Fwww.lingshi.com%2Fimages%2Fkf_upline.gif&live800_floatToRight=1&live800_floatTop=150&live800_floatSide=5&live800_switch=1&live800_closeIcon=0&live800_operator=15513";
	var skillId="2264";

	var openUrl = protocol + live800_baseUrl + live800_baseWebApp + live800_baseChatHtmlDir + "/chatbox.jsp?";
	openUrl += "companyID=" + live800_companyID;

	if(typeof jid!="undefined"){
		openUrl+="&jid="+jid;
	}
    openUrl +="&skillId=" + skillId;

	var winAttr = globalWindowAttribute;
	window.open(openUrl,live800_companyID+"chatbox",winAttr)
};

window.openChat22=function(){
	try{parent.closeMini()}
	catch(e){}

	var protocol=((document.location.protocol=="https:")?"https://":"http://");
	live800_companyID="140038";
	var enterurl = null;
	var isOldSkin=false;
	var server_prefix_list=['http://st.live800.com/live800','http://st16.live800.com/live800','http://st8.live800.com/live800','http://st10.live800.com/live800'];
	var isNeedCheckDomainBinding=false;
	var globalWindowAttribute='toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=720,height=500';
	jid="3464247380";
	var live800_baseUrl="chat32.live800.com";
	var live800_baseHtmlUrl="chat32.live800.com";
	var live800_baseWebApp="/live800";
	var live800_baseChatHtmlDir="/chatClient";
	live800_configID="33995";
	live800_configContent="live800_float=1&live800_online=http%3A%2F%2Fwww.lingshi.com%2Fimages%2Fkf_online.gif&live800_offline=http%3A%2F%2Fwww.lingshi.com%2Fimages%2Fkf_upline.gif&live800_floatToRight=1&live800_floatTop=150&live800_floatSide=5&live800_switch=1&live800_closeIcon=0&live800_operator=15514";
	var skillId="2265";

	var openUrl = protocol + live800_baseUrl + live800_baseWebApp + live800_baseChatHtmlDir + "/chatbox.jsp?";
	openUrl += "companyID=" + live800_companyID;

	if(	typeof jid!="undefined"){
		openUrl+="&jid="+jid
	}

	openUrl +="&skillId=" + skillId;

	var winAttr = globalWindowAttribute;
	window.open(openUrl, live800_companyID + "chatbox", winAttr);
};

function min(){
	document.getElementById('rightDiv_kf').style.display="none";
}
function yuan_div(){
	document.getElementById('rightDiv_kf').style.display="block";
}
function closes_kf(){
	document.getElementById('rightDiv').style.display="none";
}

lastScrollY = 0;
function heartBeat(){
	var diffY;
	if (document.documentElement && document.documentElement.scrollTop)
		diffY = document.documentElement.scrollTop;
	else if (document.body)
		diffY = document.body.scrollTop
	else{}

	percent=.1*(diffY-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	document.getElementById("rightDiv").style.top = parseInt(document.getElementById("rightDiv").style.top)+percent+"px";
	document.getElementById("flDiv").style.top = parseInt(document.getElementById("pifaDiv").style.top)+percent+"px";
	document.getElementById("frDiv").style.top = parseInt(document.getElementById("tuangouDiv").style.top)+percent+"px";

	lastScrollY=lastScrollY+percent;
}
if(navigator.appName == "Microsoft Internet Explorer" &&!window.XMLHttpRequest)window.setInterval("heartBeat()",1);

document.writeln('<style type="text/css">#rightDiv{position: fixed; z-index: 100000000; overflow: hidden;}</style>');
document.writeln('<!--[if IE 6]><style type="text/css">#rightDiv{position: absolute;Z-INDEX: 100000000;  OVERFLOW: hidden;}</style><![endif]-->');

document.writeln('<style type="text/css">#flDiv{position: fixed; z-index: 100000000; overflow: hidden; width:110px;height:282px;}</style>');
document.writeln('<!--[if IE 6]><style type="text/css">#pifaDiv{position: absolute;Z-INDEX: 100000000;  OVERFLOW: hidden; width:110px;height:282px;}</style><![endif]-->');

document.writeln('<style type="text/css">#frDiv{position: fixed; z-index: 100000000; overflow: hidden; width:110px;height:282px;}</style>');
document.writeln('<!--[if IE 6]><style type="text/css">#tuangouDiv{position: absolute;Z-INDEX: 100000000;  OVERFLOW: hidden; width:110px;height:282px;}</style><![endif]-->');
