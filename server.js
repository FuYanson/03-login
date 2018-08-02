var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

app.use( "/static", express.static( __dirname+"/static" ) );

app.use(bodyParser.urlencoded({ extended: false }));

app.post( "/login",function(req,res){
//	res.end("hello login");
	var responseData = {
		code: 0,
		msg: ""
	}
//	code: 
//		0 ""
//		1 登录成功
//		2 用户不存在
//		3 密码错误
//		4 文件读取失败
	fs.readFile("./data.json",function(err,data){
		if( err ){
			console.log( "读取 文件失败" );
			responseData.code = 4;
			responseData.msg = "文件读取失败";
			res.send( responseData );
		}else{
//			console.log( data.toString() );
			var d = JSON.parse( data.toString() );
//			检测用户 名是否存在
			var {user,pass} = req.body;
			var temp = d.find( item=>item.name === user  );
			if( temp ){
				if( temp.pass === pass ){
					responseData.code = 1;
					responseData.msg = "登录成功";
					res.send( responseData );
				}else{
					responseData.code = 3;
					responseData.msg = "密码错误";
					res.send( responseData );
				}
			}else{// 用户名不存在
				responseData.code = 2;
				responseData.msg = "用户名不存在";
				res.send( responseData );
			}
			
		}
	})
} )
app.post("/postRegister",function(req,res){
	var responseData = {
		code: 0,
		msg: ""
	}
//	code: 
//		0 ""
//		1 注册成功
//		2 用户名存在
//		3 文件读取失败
//		4 文件写入失败
	fs.readFile("./data.json",function(err,data){
		if( err ){
			console.log( "读取 文件失败" );
			responseData.code = 3;
			responseData.msg = "文件读取失败";
			res.send( responseData );
		}else{
			var d = JSON.parse( data.toString() );
//			检测用户 名是否存在
			var {user,pass} = req.body;
			var temp = d.find( item=>item.name === user );
			if( temp ){//该用户名 已经被占用了
				responseData.code = 2;
				responseData.msg = "该用户名已经被占用了";
				res.send( responseData );
			}else{
				d.push( {
					"name":user,
					"pass":pass
				} );
				fs.writeFile( "./data.json",JSON.stringify(d),function(err){
					if( err ){
						responseData.code = 4;
						responseData.msg = "文件写入失败";
						res.send( responseData );
					}else{
						responseData.code = 1 ;
						responseData.msg = "注册成功";
						res.send( responseData );
					}
				} )
			}
		}
	})
})


app.get( "/index",function(req,res){
	res.sendFile( __dirname + "/index.html" );
} )
app.get( "/register",function(req,res){
	res.sendFile( __dirname + "/register.html" );
} )
app.get( "/form",function(req,res){
	res.sendFile( __dirname + "/form.html" );
} )

app.listen(8888,function(){
	console.log( "listen 8888..." );
});
