
	//得到cookie
function getCookie(key){
	var str = decodeURIComponent(document.cookie).replace(/\s/g,"").split(";");
	for(var i =0; i< str.length; i++){
		if(str[i].split("=")[0] == key){
			return str[i].split("=")[1];
		}
	}
}

//设置cookie
function setCookie(key,value,n){
	document.cookie = encodeURIComponent(key)+"="+encodeURIComponent(value)+";expires="+setTime(n);
}

//删除cookie
function deleteCookie(key){
	setCookie(key,"",-1);
}

//封装时间函数
function setTime(n){
	var time = new Date();
	time.setDate(time.getDate()+n);
	return time;
}

