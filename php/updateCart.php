<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$userName   = $_REQUEST['userName'];
	$goodsId   = $_REQUEST['goodsId'];
	$goodsAmount = $_REQUEST['goodsAmount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	mysql_select_db("graduationproject",$conn);
	
	//3）、传输数据（过桥）
	//insert语句
	$sqlstr = "update shopcart set goodsAmount='".$goodsAmount."' where userName='".$userName."' and goodsId='".$goodsId."'";
	//echo($sqlstr);
	
	$result=true;
	if(!mysql_query($sqlstr,$conn)){
		$result=false;
	}
	
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	echo $result;
?>