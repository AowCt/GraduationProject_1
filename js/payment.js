var payment = {
	init:function(){
		this.userName();
		this.mouse();
		this.payWay();
	},
	/**
	 * 支付中心上部用户名的设置
	 */
	userName:function(){
		
		this.username = getCookie('userName');
		if(this.username){
			this.username = this.username.substring(0,3)+"****"+this.username.substring(7);
			$(".login_boxs").find("a").first().text(this.username);
		}
		
	},
	//首行移入移出事件
	mouse:function(){
		$(".li_box").on("mouseenter","a",function(){
			$(this).css("color","#b01330");
		});
		$(".li_box").on("mouseleave","a",function(){
			$(this).css("color","#666");
		});
		//表佰
		$(".myBiaobai").mouseenter(function(){
			$(".user_con").show();
		});
		$(".myBiaobai").mouseleave(function(){
			$(".user_con").hide();
		});
		//手机端
		$(".app_biaobai").mouseenter(function(){
			$(".app_con").show();
		});
		$(".app_biaobai").mouseleave(function(){
			$(".app_con").hide();
		});
		//客户服务
		$(".serv_biaobai").mouseenter(function(){
			$(".service_con").show();
		});
		$(".serv_biaobai").mouseleave(function(){
			$(".service_con").hide();
		});
	},
	// 发票点击事件
	payWay:function(){
		$(".bill_select").on("click","span",function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
		});
	}
};

$(function(){
	payment.init();
});
