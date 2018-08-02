
function ajax( param ){
	var { method,url,data,callback,isjson } = param;
	var xhr = new XMLHttpRequest();
	if( method === "get" && data ){
		url += "?"+data;
	}
 	xhr.open( method,url,true );
 	
 	if( method === "post" && data ){
 		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
 		xhr.send( data );
 	}else{
 		xhr.send();
 	}
 	xhr.onreadystatechange = function(){
		if( xhr.readyState === 4 ){
			if( xhr.status === 200 ){
				if( isjson ){
					callback( JSON.parse( xhr.responseText ) );
				}else{
					callback( xhr.responseText )
				}
			}
		}
	}
}