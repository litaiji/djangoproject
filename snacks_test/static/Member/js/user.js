/* *
 * 修改会员信息
 */
function userEdit()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var msg = '';
  var reg = null;
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 7; i < frm.elements.length - 2; i++)	// 从第七项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* 会员修改密码 */
function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += both_password_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对会员的留言输入作处理
 */
function submitMsg()
{
  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += msg_title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += msg_content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += msg_title_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对会员的投诉输入作处理
 */
function submitCom()
{
  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg = '';
  if (msg_title.length == 0)
  {
    msg += '投诉主题不能为空' + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += '投诉内容不能为空' + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += '投诉主题太长' + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  var user_name = frm.elements['user_name'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
  }

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      errorMsg += email_address_error + '\n';
    }
  }

  if (errorMsg.length > 0)
  {
    alertMsg({
      content:errorMsg,
      ico:1,
      height:164
      });
    return false;
  }

  return true;
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 处理会员提交的缺货登记
 */
function addBooking()
{
  var frm  = document.forms['formBooking'];
  var goods_id = frm.elements['id'].value;
  var rec_id  = frm.elements['rec_id'].value;
  var number  = frm.elements['number'].value;
  var desc  = frm.elements['desc'].value;
  var linkman  = frm.elements['linkman'].value;
  var email  = frm.elements['email'].value;
  var tel  = frm.elements['tel'].value;
  var msg = "";

  if (number.length == 0)
  {
    msg += booking_amount_empty + '\n';
  }
  else
  {
    var reg = /^[0-9]+/;
    if ( ! reg.test(number))
    {
      msg += booking_amount_error + '\n';
    }
  }

  if (desc.length == 0)
  {
    msg += describe_empty + '\n';
  }

  if (linkman.length == 0)
  {
    msg += contact_username_empty + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (tel.length == 0)
  {
    msg += contact_phone_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  return true;
}

/* *
 * 会员登录
 */
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';
  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

    if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }

}

function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}

/*
* 注册页面 检查密码
 */
function check_password2( password )
{
  var frm  = document.forms['formUser'];
  var password_style = frm.elements['password'].style;
    if ( password.length < 6 )
    {
        $("#password_notice").addClass("notice");
        document.getElementById('password_notice').style.display = "block";
        document.getElementById('password_notice').innerHTML = password_shorter;
        password_style.border = "solid 1px #e33a3d";
        return false;
    }
    else
    {
        document.getElementById('password_notice').style.display = "block";
        $("#password_notice").removeClass("notice");
        document.getElementById('password_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
        password_style.border = "1px solid #e2e2e2";
        return true;
    }
}

/*
* 注册框 检查密码
 */
function check_password( password )
{
    if ( password.length < 6 )
    {
        document.getElementById('password_notice').innerHTML = password_shorter;
        return false;
    }
    else
    {
        document.getElementById('password_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
        return true;
    }
}

function check_conform_password( conform_password )
{
    password = document.getElementById('password1').value;

    if ( conform_password.length < 6 )
    {
        document.getElementById('conform_password_notice').innerHTML = password_shorter;
        return false;
    }
    if ( conform_password != password )
    {
        document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
    }
    else
    {
        document.getElementById('conform_password_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
    }
}

function web_conform_password( conform_password )
{
    var frm  = document.forms['formUser'];
    var conform_password_style = frm.elements['conform_password'].style;
    password = document.getElementById('password1').value;

    if ( conform_password.length < 6 )
    {
        $("#conform_password_notice").addClass("notice");
        document.getElementById('conform_password_notice').style.display = "block";
        document.getElementById('conform_password_notice').innerHTML = password_shorter;
        conform_password_style.border = "solid 1px #e33a3d";
        return false;
    }
    if ( conform_password != password )
    {
        $("#conform_password_notice").addClass("notice");
        document.getElementById('conform_password_notice').style.display = "block";
        document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
        conform_password_style.border = "solid 1px #e33a3d";
        return false;
    }
    else
    {
         $("#conform_password_notice").removeClass("notice");
        document.getElementById('conform_password_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
        conform_password_style.border = "1px solid #e2e2e2";
        return true;
    }
}

function check_login_password( password )
{
  var frm  = document.forms['formLogin'];

  var password_style = frm.elements['password'].style;
    if ( password.length < 6 )
    {
        document.getElementById('password_notice').style.display = "block";
        document.getElementById('password_notice').innerHTML = password_shorter;
        password_style.border = "solid 1px #e33a3d";
        return false;
    }
    else
    {
        document.getElementById('password_notice').style.display = "none";
        password_style.border = "1px solid #ccc";
        return true;
    }
}

function check_captcha( captcha )
{
  var frm  = document.forms['formUser'];

  var captcha_style = frm.elements['captcha'].style;
    if ( captcha.length == 0 )
    {
        document.getElementById('conform_captcha_notice').style.display = "block";
        document.getElementById('conform_captcha_notice').innerHTML = '验证码不得为空！';
        captcha_style.border = "solid 1px #e33a3d";
        return false;
    }
    else if ( captcha.length != 4 )
    {
        document.getElementById('conform_captcha_notice').style.display = "block";
        document.getElementById('conform_captcha_notice').innerHTML = '验证码为四位字符！';
        captcha_style.border = "solid 1px #e33a3d";
        return false;
    }

}

function is_registered(username)
{
	var frm  = document.forms['formUser'];
  var submit_disabled = false;
	var unlen = username.replace(/[^\x00-\xff]/g, "**").length;

    if (username == '') {
        document.getElementById('username_notice').innerHTML = msg_un_blank;
        submit_disabled = true;
    }

    if (username != '' && unlen < 3) {
        document.getElementById('username_notice').innerHTML = username_shorter;
        submit_disabled = true;
    }
    if (unlen > 60) {
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if (unlen >= 3) {
      var f1 = false,
          f2 = false;
      if (Utils.isMobile(username)) {
        f1 = true;
      }
      if (Utils.isEmail(username)) {
        f2 = true;
      }

      if (!f1 && !f2) {
        document.getElementById('username_notice').innerHTML = '- 格式错误';
        submit_disabled = true;
      }
    }
    if (submit_disabled) {
    	document.getElementById('username').warning = 'no';
      document.forms['formUser'].elements['Submit'].disabled = 'disabled';
      return false;
    }
    //Ajax.call( Customer_Path+'?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );
    $.getJSON(Customer_Path + '?act=is_registered&callback=?&username=' + username, function(json){
      registed_callback(json);
    });
}

function registed_callback(result)
{
  if ( result.message == "true" )
  {
    document.getElementById('username').warning = '';
    document.getElementById('username_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    if (result.message == 2) {
      var msg_registered = '您访问的速度太快，如果您不是机器人的话，请告诉我们！';
    } else {
      var msg_registered = msg_un_registered;
    }
    document.getElementById('username').warning = 'no';
    document.getElementById('username_notice').innerHTML = msg_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function web_registered(username)
{
  var frm  = document.forms['formUser'];
  var submit_disabled = false;
  var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
  var username_style = frm.elements['username'].style;

    if (username == '') {
        $("#username_notice").addClass("notice");
        document.getElementById('username_notice').style.display = "block";
        document.getElementById('username_notice').innerHTML = msg_un_blank;
        username_style.border = "solid 1px #e33a3d";

        submit_disabled = true;
    }

    if (username != '' && unlen < 3) {
        $("#username_notice").addClass("notice");
        document.getElementById('username_notice').style.display = "block";
        document.getElementById('username_notice').innerHTML = username_shorter;
        username_style.border = "solid 1px #e33a3d";
        submit_disabled = true;
    }
    if (unlen > 60) {
        $("#username_notice").addClass("notice");
        document.getElementById('username_notice').style.display = "block";
        document.getElementById('username_notice').innerHTML = msg_un_length;
        username_style.border = "solid 1px #e33a3d";
        var submit_disabled = true;
    }
    if (unlen >= 3) {
      var f1 = false,
          f2 = false;
      if (Utils.isMobile(username)) {
        f1 = true;
      }
      if (Utils.isEmail(username)) {
        f2 = true;
      }

      if (!f1 && !f2) {
        $("#username_notice").addClass("notice");
        document.getElementById('username_notice').style.display = "block";
        document.getElementById('username_notice').innerHTML = '- 格式错误';
        username_style.border = "solid 1px #e33a3d";
        submit_disabled = true;
      }
    }
    if (submit_disabled) {
      document.getElementById('username').warning = 'no';
      document.forms['formUser'].elements['Submit'].disabled = 'disabled';
      return false;
    }
    //Ajax.call( Customer_Path+'?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );
    $.getJSON(Customer_Path + '?act=is_registered&callback=?&username=' + username, function(json){
      web_callback(json);
    });
}

function web_callback(result)
{
  var frm  = document.forms['formUser'];
  var username_style = frm.elements['username'].style;
  if ( result.message == "true" )
  {
    document.getElementById('username').warning = '';
    document.getElementById('username_notice').style.display = "block";
     $("#username_notice").removeClass("notice");
    document.getElementById('username_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
    username_style.border = "1px solid #e2e2e2";
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    if (result.message == 2) {
      alertMsg('您访问的速度太快，如果您不是机器人的话，请告诉我们！');
    }
    $("#username_notice").addClass("notice");
    document.getElementById('username_notice').style.display = "block";
    username_style.border = "solid 1px #e33a3d";
    document.getElementById('username').warning = 'no';
    document.getElementById('username_notice').innerHTML = msg_un_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function is_login(username)
{
  var frm  = document.forms['formUser'];
  var submit_disabled = false;
  var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
  var username_notice = document.getElementById('username_notice');
  if (username == '') {
        username_notice.innerHTML = msg_un_blank;
        return false;
    } else {
      username_notice.innerHTML = '';
      return true;
    }
}

function web_login(username)
{
  var frm  = document.forms['formLogin'];
  var submit_disabled = false;
  var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
  var username_notice = document.getElementById('username_notice');
  var username_style = frm.elements['username'].style;
  if (username == '') {
        username_notice.style.display = "block";
        username_notice.innerHTML = msg_un_blank;
        username_style.border = "solid 1px #e33a3d";
        return false;
  }else {
      username_notice.style.display = "none";
      // username_notice.innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
      username_notice.innerHTML = '';
      username_style.border = "1px solid #ccc";
      return true;
  }

}

function checkEmail(email)
{
  var submit_disabled = false;

  if (email == '')
  {
    document.getElementById('email_notice').innerHTML = msg_email_blank;
    submit_disabled = true;
  }
  else if (!Utils.isEmail(email))
  {
    document.getElementById('email_notice').innerHTML = msg_email_format;
    submit_disabled = true;
  }

  if( submit_disabled )
  {
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
    return false;
  }
  Ajax.call( Customer_Path+'?act=check_email', 'email=' + email, check_email_callback , 'GET', 'TEXT', true, true );
}

function check_email_callback(result)
{
  if ( result == 'ok' )
  {
    document.getElementById('email_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
    //document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
    document.getElementById('email_notice').innerHTML = msg_email_registered;
    //document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function checkInvite(username)
{
	var uilen = username.replace(/[^\x00-\xff]/g, "**").length;

    if ( uilen > 0 ) {
	    //Ajax.call( Customer_Path+'?act=is_registered', 'username=' + username, check_invite_callback , 'GET', 'TEXT', true, true );
	    $.getJSON(Customer_Path + '?act=is_registered&callback=?&username=' + username, function(json){
	  		check_invite_callback(json);
	});
    } else {
		document.getElementById('invite_notice').innerHTML = '';
	  	document.getElementById('invite_name').warning = '';
	  	if (document.getElementById('username').warning != 'no') document.forms['formUser'].elements['Submit'].disabled = '';
	    return false;
	}
}

function check_invite_callback(result)
{
  if ( result.message == 'false' )
  {
  	document.getElementById('invite_name').warning = '';
    document.getElementById('invite_notice').innerHTML = '<img src="'+domain+'templates/default/images/login/right.gif">';
    if (document.getElementById('username').warning != 'no') document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
  	document.getElementById('invite_name').warning = 'no';
    document.getElementById('invite_notice').innerHTML = invite_invalid;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

/* *
 * 注册页面 处理注册用户
 */
function register_web()
{
  var frm               = document.forms['formUser'];
  var username          = Utils.trim(frm.elements['username'].value);
  var password          = Utils.trim(frm.elements['password'].value);
  var confirm_password  = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var passwd_answer     = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question      = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
  var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
  var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
  var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
  var captcha = Utils.trim(frm.elements['captcha'].value);
  var username_style = frm.elements['username'].style;
  var password_style = frm.elements['password'].style;
  var captcha_style = frm.elements['captcha'].style;
  var msg = {};

  // 检查输入
  if (username.length == 0) {
    msg.username_notice = username_empty;
    document.getElementById('username_notice').style.display = "block";
    username_style.border = "solid 1px #e33a3d";

  } else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)) {
    msg.username_notice = username_invalid;
    document.getElementById('username_notice').style.display = "block";
    username_style.border = "solid 1px #e33a3d";

  } else if (username.length < 3) {
    msg.username_notice = username_shorter;
    document.getElementById('username_notice').style.display = "block";
    username_style.border = "solid 1px #e33a3d";

  }


  if (username.length >= 3) {
    var f1 = false,
        f2 = false;
    if (Utils.isMobile(username)) {
      f1 = true;
    }
    if (Utils.isEmail(username)) {
      f2 = true;
    }
    if (!f1 && !f2) {
      msg.username_notice = '用户名格式错误';
      document.getElementById('username_notice').style.display = "block";
      password_style.border = "solid 1px #e33a3d";

    }
  }

  if (password.length == 0) {
    msg.password_notice = password_empty;
    document.getElementById('password_notice').style.display = "block";
    password_style.border = "solid 1px #e33a3d";

  } else if (password.length < 6) {
    msg.password_notice = password_shorter;
     document.getElementById('password_notice').style.display = "block";
    password_style.border = "solid 1px #e33a3d";

  }
  if (/ /.test(password) == true) {
    if (msg.password_notice) {
      msg.password_notice += '；'+passwd_balnk;
    } else {
      msg.password_notice = passwd_balnk;
    }
  }
  if (confirm_password != password ) {
     document.getElementById('conform_password_notice').style.display = "block";
    msg.conform_password_notice = confirm_password_invalid;

  }

  if (Utils.isEmpty(captcha)) {
    msg.conform_captcha_notice = '- 验证码不得为空！';
     document.getElementById('conform_captcha_notice').style.display = "block";
    captcha_style.border = "solid 1px #e33a3d";
  } else if (captcha.length != 4) {
    msg.conform_captcha_notice = '- 验证码为四位字符！';
     document.getElementById('conform_captcha_notice').style.display = "block";
    captcha_style.border = "solid 1px #e33a3d";
  }

  if (checked_agreement != true) {
    if (msg.conform_captcha_notice) {
      msg.conform_captcha_notice += agreement;
    } else {
      msg.conform_captcha_notice = agreement;
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
    msg += no_select_question + '\n';
  }

  for (i = 6; i < frm.elements.length - 6; i++) {	// 从第五项开始循环检查是否为必填项

    needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';
    if (needinput != '' && frm.elements[i].value.length == 0){
      msg += '- ' + needinput.innerHTML + msg_blank + '\n';
    }
  }
  if ($.toJSON(msg).length > 2) {
    for (i in msg) {
      if (msg.hasOwnProperty(i)) {
        $('#'+i).html(msg[i]);
      }
    }
    return false;
  } else {
    return true;
  }
}
/*
* 注册框 处理注册用户
 */
function register()
{
  var frm               = document.forms['formUser'];
  var username          = Utils.trim(frm.elements['username'].value);
  var password          = Utils.trim(frm.elements['password'].value);
  var confirm_password  = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var passwd_answer     = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question      = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
  var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
  var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
  var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
  var captcha = Utils.trim(frm.elements['captcha'].value);


  var msg = {};

  // 检查输入
  if (username.length == 0) {
    msg.username_notice = username_empty;
  } else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)) {
    msg.username_notice = username_invalid;
  } else if (username.length < 3) {
    msg.username_notice = username_shorter;
  }

  if (username.length >= 3) {
    var f1 = false,
        f2 = false;
    if (Utils.isMobile(username)) {
      f1 = true;
    }
    if (Utils.isEmail(username)) {
      f2 = true;
    }
    if (!f1 && !f2) {
      msg.username_notice = '用户名格式错误';
    }
  }

  if (password.length == 0) {
    msg.password_notice = password_empty;
  } else if (password.length < 6) {
    msg.password_notice = password_shorter;
  }
  if (/ /.test(password) == true) {
    if (msg.password_notice) {
      msg.password_notice += '；'+passwd_balnk;
    } else {
      msg.password_notice = passwd_balnk;
    }
  }
  if (confirm_password != password ) {
    msg.conform_password_notice = confirm_password_invalid;
  }

  if (Utils.isEmpty(captcha)) {
    msg.conform_captcha_notice = '验证码不得为空！';
  } else if (captcha.length != 4) {
    msg.conform_captcha_notice = '验证码为四位字符！';
  }

  if (checked_agreement != true) {
    if (msg.conform_captcha_notice) {
      msg.conform_captcha_notice += agreement;
    } else {
      msg.conform_captcha_notice = agreement;
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
    msg += no_select_question + '\n';
  }

  for (i = 6; i < frm.elements.length - 6; i++) { // 从第五项开始循环检查是否为必填项

    needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';
    if (needinput != '' && frm.elements[i].value.length == 0){
      msg += '- ' + needinput.innerHTML + msg_blank + '\n';
    }
  }

  if ($.toJSON(msg).length > 2) {
    for (i in msg) {
      if (msg.hasOwnProperty(i)) {
        $('#'+i).html(msg[i]);
      }
    }
    return false;
  } else {
    return true;
  }
}
/* *
 * 用户中心订单保存地址信息
 */
function saveOrderAddress(id)
{
  var frm           = document.forms['formAddress'];
  var consignee     = frm.elements['consignee'].value;
  var email         = frm.elements['email'].value;
  var address       = frm.elements['address'].value;
  var zipcode       = frm.elements['zipcode'].value;
  var tel           = frm.elements['tel'].value;
  var mobile        = frm.elements['mobile'].value;
  var sign_building = frm.elements['sign_building'].value;
  var best_time     = frm.elements['best_time'].value;

  if (id == 0)
  {
    alert(current_ss_not_unshipped);
    return false;
  }
  var msg = '';
  if (address.length == 0)
  {
    msg += address_name_not_null + "\n";
  }
  if (consignee.length == 0)
  {
    msg += consignee_not_null + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员余额申请
 */
function submitSurplus()
{
  var frm            = document.forms['formSurplus'];
  var surplus_type   = frm.elements['surplus_type'].value;
  var surplus_amount = frm.elements['amount'].value;
  var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (process_notic.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      alert(payment_empty);
      return false;
    }
  }

  return true;
}

/* *
 *  处理用户添加一个红包 2011-12-05 11:49 cuifc 改写成ajax方式处理
 */
function addBonus()
{
  var frm      = document.forms['addBouns'];
  var bonus_sn = frm.elements['bonus_sn'].value;
  if (bonus_sn.length == 0) {
    alertMsg(bonus_sn_empty);
    return false;
  }
  else {
    $.post(Customer_Path+'?act=act_add_bonus', {bonus_sn: bonus_sn}, function(data) {
      returnToAddBonusResponse(data);
    },'json');
  	// Ajax.call(Customer_Path+'?act=act_add_bonus', 'bonus_sn=' + bonus_sn, returnToAddBonusResponse, 'POST', 'JSON');
    return true;
  }

// 代金券号码不走检验流程了？？那怎么不注释掉以下的代码呢？？？2011-12-03 11:30 由cuifc注释
/*
  if (bonus_sn.length == 0)
  {
    alert(bonus_sn_empty);
    return false;
  }
  else
  {
    var bonus_num = "";
    for (var i=bonus_sn.length-1; i>=0; i--) {
        if (isNaN(parseInt(bonus_sn.charAt(i)))) {
            bonus_num = bonus_sn.substr(i+1);
            break;
        }
    }
    var reg = /^[0-9]{10}|[0-9]{11}|[0-9]{12}|[0-9]{13}|[0-9]{14}|[0-9]{15}$/;
    if ( ! reg.test(bonus_num) )
    {
      alert(bonus_sn_error);
      return false;
    }
  }

  return true;
 */
}

/*
 * 添加红包返回结果处理函数
 */
function returnToAddBonusResponse(result)
{
	document.getElementById('bonus_msg').style.display = '';
	document.getElementById('bonus_msg').style.color = '#FF0000';
	document.getElementById('bonus_msg').innerHTML = result.msg;
	if(result.success === true)
	{
		window.location = Customer_Path+"?act=bonus";
	}
}

/* *
 *  合并订单检查
 */
function mergeOrder()
{
  if (!confirm(confirm_merge))
  {
    return false;
  }

  var frm        = document.forms['formOrder'];
  var from_order = frm.elements['from_order'].value;
  var to_order   = frm.elements['to_order'].value;
  var msg = '';

  if (from_order == 0)
  {
    msg += from_order_empty + '\n';
  }
  if (to_order == 0)
  {
    msg += to_order_empty + '\n';
  }
  else if (to_order == from_order)
  {
    msg += order_same + '\n';
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 订单中的商品返回购物车
 * @param       int     orderId     订单号
 */
function returnToCart(orderId)
{
  $.post(Customer_Path, {act:return_to_cart,order_id:orderId}, function(data, textStatus, xhr) {
    returnToCartResponse(data)
  },'json');
  // Ajax.call(Customer_Path+'?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');
}

function returnToCartResponse(result)
{
  alert(result.message);
}

/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++) {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57) { // 数字
      charType = 1;
    } else if (t>=65 && t <=90) { // 大写
      charType = 2;
    } else if (t>=97 && t <=122) { // 小写
      charType = 4;
    } else {
      charType = 4;
    }
    Modes |= charType;
  }

  for (i=0;i<4;i++) {
    if (Modes & 1) {
      m++;
    }
    Modes >>>= 1;
  }

  if (pwd.length<=4) {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  if (document.getElementById("pwd_lower"))
  {
    document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
    document.getElementById("pwd_middle").style.borderBottom = Mcolor;
    document.getElementById("pwd_high").style.borderBottom   = Hcolor;
  }


}

function changeType(obj)
{
  if (obj.getAttribute("min") && document.getElementById("ECS_AMOUNT"))
  {
    document.getElementById("ECS_AMOUNT").disabled = false;
    document.getElementById("ECS_AMOUNT").value = obj.getAttribute("min");
    if (document.getElementById("ECS_NOTICE") && obj.getAttribute("to") && obj.getAttribute('fee'))
    {
      var fee = parseInt(obj.getAttribute("fee"));
      var to = parseInt(obj.getAttribute("to"));
      if (fee < 0)
      {
        to = to + fee * 2;
      }
      document.getElementById("ECS_NOTICE").innerHTML = notice_result + to;
    }
  }
}

function calResult()
{
  var amount = document.getElementById("ECS_AMOUNT").value;
  var notice = document.getElementById("ECS_NOTICE");

  reg = /^\d+$/;
  if (!reg.test(amount))
  {
    notice.innerHTML = notice_not_int;
    return;
  }
  amount = parseInt(amount);
  var frm = document.forms['transform'];
  for(i=0; i < frm.elements['type'].length; i++)
  {
    if (frm.elements['type'][i].checked)
    {
      var min = parseInt(frm.elements['type'][i].getAttribute("min"));
      var to = parseInt(frm.elements['type'][i].getAttribute("to"));
      var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
      var result = 0;
      if (amount < min)
      {
        notice.innerHTML = notice_overflow + min;
        return;
      }

      if (fee > 0)
      {
        result = (amount - fee) * to / (min -fee);
      }
      else
      {
        //result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
        result = amount * (to + fee) / min + fee;
      }

      notice.innerHTML = notice_result + parseInt(result + 0.5);
    }
  }
}

function getCheckedValue(radioObj) {
	if (!radioObj) return "email";
	var radioLength = radioObj.length;
	for(var i = 0; i < radioLength; i++) {
		if (radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "email";
}

$(function(){
  $(".cap_resend").click(function(e){
    e.preventDefault();
    $("#cap_img").attr('src', domain + 'captcha.php?'+Math.random());
  });

  $(".dismiss").click(function(e){
    e.preventDefault();
    $(this).parent().hide();
  });

  var input_label = function(c, d) {
      if ("placeholder" in document.createElement("input")) {
          return false;
      }
      if (!d) {
        d = 'inp_label';
      }
      a = c.parent();
      var b = $('<label class="'+ d +'">' + c.attr("placeholder") + "</label>").prependTo(c.parent());
      c.attr("placeholder", "");
      b.click(function() {
          c.focus();
      });
      if (c.val()) {
          a.addClass("input-focus");
      }
      c.focus(function() {
        a.addClass('input-focus');
      });
      c.blur(function() {
        if (this.value == '') {
          a.removeClass('input-focus');
        };
      });
  };
  if ($(".inp_t13").length) {
    input_label($(".inp_t13"), 'inp_label t13');
  };
  if ($(".inp").length) {
    input_label($(".inp"));
  };

  jQuery(".inputs").each(function(){
    var $this = jQuery(this),
      $label = $this.find("label"),
      $input = $this.find("input");
    if( $input.val() && $input.val().length ){
      $label.addClass("hide");
    }
    $input.focus(function(){
      $label.addClass("hide");
    })
    $input.blur(function(){
      if( $input.val() && $input.val().length ){
        $label.addClass("hide");
      }else{
        $label.removeClass("hide");
      }
    });
    $label.click(function(){
      $input.focus();
    });
  });

});