<?php
 	header("content-type","text/html;charset=utf-8");
	
	$userName = $_GET['userName'];
	//建立连接
	$conn = mysql_connect("localhost","root","root");
	
	//2、选择数据库
	mysql_select_db("graduationproject",$conn);
	
	//3、执行语句（插入数据）
	$sqlstrOne = "select * from user where userName='".$userName."'";
	
	$resultOne = mysql_query($sqlstrOne,$conn);
	
	
	$rows1 = mysql_num_rows($resultOne);
	
	
	//关闭数据库
	mysql_close($conn);
	
	echo($rows1);
?>