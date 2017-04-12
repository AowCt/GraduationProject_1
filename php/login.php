<?php
 	header("content-type","text/html;charset=utf-8");
	
	$userName = $_POST['userName'];
	$userPass = $_POST['userPass'];
	//建立连接
	$conn = mysql_connect("localhost","root","root");
	
	//2、选择数据库
	mysql_select_db("graduationproject",$conn);
	
	//3、执行语句（插入数据）
	$sqlstr = "select * from user where userName='".$userName."' && userPass='".$userPass."'";
	
	$result = mysql_query($sqlstr,$conn);
	
	$rows = mysql_num_rows($result);
	
	
	//关闭数据库
	mysql_close($conn);
	
	echo($rows);
?>