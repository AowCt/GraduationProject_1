<?php
	header("Content-Type:text/html;charset=utf-8");
	
	$goodsId = $_GET['goodsId'];	
//	$goodsId = 10001;
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	mysql_select_db("graduationproject",$conn);
	
	//3）、传输数据（过桥）
	$sqlstr = "select * from shopcenter where goodsId='".$goodsId."'";
	$result = mysql_query($sqlstr,$conn);//执行查询的sql语句后，有返回值，返回的是查询结果
			
	//查询列数
	 $query_cols = mysql_num_fields($result);
	 //echo "列数：".$query_cols;
	//查询行数
    $query_num =mysql_num_rows($result);
    //echo "行数：".$query_num;
	
	$str="";
	
	$query_row = mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
	if($query_row){
		$str = $str."{ 'goodsId':'".$query_row[0]."','images':'".$query_row[1]."'
		,'word':'".$query_row[2]."','serialNumber':'".$query_row[3]."'
		,'model':'".$query_row[4]."','brand':'".$query_row[5]."'
		,'price_new':'".$query_row[6]."','price_old':'".$query_row[7]."'
		,'discount':'".$query_row[8]."','salse':'".$query_row[9]."'
		,'type1':'".$query_row[10]."','type2':'".$query_row[11]."'
		,'type3':'".$query_row[12]."','type4':'".$query_row[13]."'
		,'type5':'".$query_row[14]."','type6':'".$query_row[15]."'
		,'img1':'".$query_row[16]."','img2':'".$query_row[17]."'
		,'img3':'".$query_row[18]."','img4':'".$query_row[19]."'
		,'img5':'".$query_row[20]."','img6':'".$query_row[21]."'
		,'pimg1':'".$query_row[22]."','pimg2':'".$query_row[23]."'
		,'pimg3':'".$query_row[24]."','pimg4':'".$query_row[25]."'
		,'pimg5':'".$query_row[26]."','pimg6':'".$query_row[27]."'
		,'pimg7':'".$query_row[28]."','pimg8':'".$query_row[29]."'
		,'pimg9':'".$query_row[30]."','pimg10':'".$query_row[31]."'
		,'pimg11':'".$query_row[31]."','pimg12':'".$query_row[33]."'
		}";			
	}
	//4、关闭数据库
	mysql_close($conn);
	
	//3、给客户端返回商品的json数组！
	echo $str;
?>
