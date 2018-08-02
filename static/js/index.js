var loginBtn = document.getElementById("loginBtn");

var user = document.getElementById("user");
var pass = document.getElementById("pass");
var tip = document.getElementById("tip");


loginBtn.onclick = function () {
	if (user.value.trim() === "") {
		alert("请输入用户名");
		return;
	}
	if (pass.value.trim() === "") {
		alert("请输入密码");
		return;
	}
	this.disabled = true;
	var xhr = new XMLHttpRequest();
	xhr.open("post", "http://localhost:8888/login", true);
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
	xhr.send("user="+ user.value+"&"+"pass="+pass.value);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// console.log( xhr.responseText );
				// console.log(JSON.parse(xhr.responseText));
				const res = JSON.parse(xhr.responseText)
				tip.style.display = "block";
				tip.innerHTML = res.msg;
				if (res.code !== 1) {
					tip.className = "error"
				} else {
					tip.className = "success"
				}
				loginBtn.disabled = false;
			}
		}
	}
	// ajax({
	// 	method: "post",
	// 	url: "http://localhost:8888/login",
	// 	data: "user="+ user.value+"&"+"pass="+pass.value,
	// 	isjson: true,
	// 	callback: function(res){
	// 		console.log( res );
	// 		tip.style.display = "block";
	// 		tip.innerHTML = res.msg;
	// 		if( res.code !== 1 ){
	// 			tip.className = "error"
	// 		}else{
	// 			tip.className = "success"
	// 		}
	// 		loginBtn.disabled = false;
	// 	}
	// })
}