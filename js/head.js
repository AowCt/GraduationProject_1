$(function(){
//	console.log($(".low_box"))
	$(".bot_low").find("dl").last().css("border-bottom","2px solid #b01330");
	$(".bot_low").on("mouseenter","dl",function(){
		$(this).addClass("active");
		$(this).find("dt a").css("color","#000");
		$(this).find(".dd_one a").css("color","#352e2f");
		$(this).find(".dd_two").show();
//		console.log($(this))
	});
	$(".bot_low").on("mouseleave","dl",function(){
		$(this).removeClass("active");
		$(this).find("dt a").css("color","#fff");
		$(this).find(".dd_one a").css("color","#ccc");
		$(this).find(".dd_two").hide();
//		console.log($(this))
	});
	
	/**
	 * 登录的显示
	 */
	var userName = getCookie("userName");
	if(userName){
		$(".nav_left p:eq(0)").hide();
		$(".nav_left p:eq(1)").show();
		$(".nav_left p:eq(1) a:eq(0)").html(userName);
//		$(".nav_left p:eq(1) a:eq(0)").css("color","#B01330");
		$(".nav_left p:eq(1) a:eq(2)").click(function(){
			deleteCookie("userName");
			$(".nav_left p:eq(0)").show();
			$(".nav_left p:eq(1)").hide();
			$(".car_small em").html(0);//购物车数量
		});
	}else{
		$(".nav_left p:eq(0)").show();
	}
	
	
	/**
	 * 购物车按钮
	 * 
	 */
	if(userName){
		$.get("php/shopCart.php",{"userName":userName},function(data){
			
			var data = eval(data);
			console.log(data);
			var amount = 0;
			for(var key=0;key<data.length;key++){
				console.log(data[key].goodsAmount)
				amount += parseInt(data[key].goodsAmount);
			}
			$(".car_small em").html(amount);
		});
		
		$(".car_small").click(function(){
			window.location = "cart.html";
		});
		
	}else{
		$(".car_small").click(function(){
			window.location = "login.html";
		});
	}
	
	
})
