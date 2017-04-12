<?php
 	header("content-type","text/html;charset=utf-8");
	
	$userName = $_POST['userName'];
	$userPass = $_POST['userPass'];
	
	//echo($userName.$userPass);


	//建立连接
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		echo("连接成功");
	}else{
		echo("连接失败");
	}
	
	//2、选择数据库
	mysql_select_db("graduationproject",$conn);
	
	//3、执行语句（插入数据）
	$sqlStr = "insert into user(userName,userPass)
 values('".$userName."','".$userPass."')";
 
 
 	echo($sqlStr);
	mysql_query($sqlStr,$conn);
	
	//关闭数据库
	mysql_close($conn);
	
	
?>