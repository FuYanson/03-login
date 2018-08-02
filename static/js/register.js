var registerBtn = document.getElementById("registerBtn");

var user = document.getElementById("user");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword")
var tip = document.getElementById("tip");

registerBtn.onclick = function(){
	if( user.value.trim() === "" ){
		alert("请输入用户名");
		return;
	}
	if( password.value.trim() === "" ){
		alert("请输入密码");
		return;
	}
	if( confirmPassword.value.trim() === "" ){
		alert("请确认密码");
		return;
	}
	if( password.value.trim() !== confirmPassword.value.trim() ){
		alert("两次密码输入不一致!!");
		return;
	}
	
	this.disabled = true;
	ajax({
		method: "post",
		url: "http://localhost:8888/postRegister",
		data: "user="+ user.value+"&"+"pass="+password.value,
		isjson: true,
		callback: function(res){
			console.log( res );
			tip.style.display = "block";
			tip.innerHTML = res.msg;
			if( res.code !== 1 ){
				tip.className = "error"
			}else{
				tip.className = "success";
				setTimeout(function(){
					window.location.href = "http://localhost:8888/index"
				},1000)
			}
			registerBtn.disabled = false;
		}
	})
}
