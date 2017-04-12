$(function(){
	var homepage = {
		init:function(){
			this.load();
			this.trans();
			this.exchange();
			this.bigImg();
			this.onTimePg();
			this.fifth();
		},
		/**
		 * 添加网页
		 */
		load:function(){
//			$.ajaxsetup ({
//		        cache: false
//		    });
			$(".head").load("head.html");//添加head.html
			$(".footer").load("footer.html");//添加footer.html
			$(".side").load("suspension.html");//侧边栏
		},
		/**
		 * 鼠标移入移出，图片上下移动
		 */
		trans:function(){
			$(".zoonRightUl").on("mouseenter","img",function(){
				$(this).animate({"bottom":"0"},500);
			});
			$(".zoonRightUl").on("mouseleave","img",function(){
				$(this).animate({"bottom":"-15px"},500);
			});
		},
		/**
		 * 鼠标移入移出，图片文字交换
		 */
		exchange:function(){
			/**
				 * 专区图文交换
				 */
			$(".zoonBtRoot").on("mouseenter","li",function(){
//				console.log($(this).find("img"))
				$(this).find("img").css("display","none");
				$(this).find("i").css("display","inline-block");
			});
			$(".zoonBtRoot").on("mouseleave","li",function(){
				
				$(this).find("img").css("display","inline-block");
				$(this).find("i").css("display","none");
			});
			
			/**
			 * 热门品牌图文交换及线条变化
			 */
			$(".fifavBot").on("mouseenter",".hotBrand",function(){
//				$(this).find(".exchangeImg").css("filter","alpha(opacity = 1)");
				$(this).find(".exchangeImg").css("opacity",1);
//				$(this).find("img").css("filter","alpha(opacity = 0)");
				$(this).find("img").css("opacity",0);
				$(this).find(".hotTop").animate({"width":"166px"},500);
				$(this).find(".hotBottom").animate({"width":"166px"},500);
				$(this).find(".hotLeft").animate({"height":"85px"},500);
				$(this).find(".hotRight").animate({"height":"85px"},500);
			});
			$(".fifavBot").on("mouseleave",".hotBrand",function(){
//				$(this).find(".exchangeImg").css("filter","alpha(opacity = 0)");
				$(this).find(".exchangeImg").css("opacity",0);
//				$(this).find("img").css("filter","alpha(opacity = 1)");
				$(this).find("img").css("opacity",1);
				$(this).find(".hotTop").animate({"width":"0"},500);
				$(this).find(".hotBottom").animate({"width":"0"},500);
				$(this).find(".hotLeft").animate({"height":"0"},500);
				$(this).find(".hotRight").animate({"height":"0"},500);
				
			});
		},
		//图片放大
		bigImg:function(){
			
			$(".p1").on("mouseenter","img",function(){
				$(this).animate({"width":"103%","height":"103%"},500);
				
			});
			$(".p1").on("mouseleave","img",function(){
				$(this).animate({"width":"100%","height":"100%"},500);
			});
		},
		//整点抢购
		onTimePg:function(){
			/*疯抢倒计时*/
				
			var  flag=8;//最大不能超过8
			//	function time(){
			setInterval(function (){
				var now_date=new Date();//获得当前时间
				var h=now_date.getHours();//当前小时
		        var index=Math.floor((h-8)/2);//（8:00~22:00）-->0~8,即：0<index<8
		        if(index>=0&&index<=7){//表示在区域内，即白天
		        	if(index!=flag){
		        	change(index);
		        	flag=index;
		        	};
		        }else{//即，时间在22:00~8:00之间
		        	if(index!=flag&&flag>=0){
		        		change1();
		        		flag=index;
		        	}
		        	index=index+1;
		        	return;
		        }
		        var next_h=(index+1)*2+8;//表示整点抢购后面的时间
		        var future_date=new Date();//当前时间
		        future_date.setHours(next_h,0,0);//设置时分秒：把当前时间下一个整点抢购的小时作为目标小时
		        /**
		         * 时间差，进行倒计时
		         */
		        var ms=future_date-now_date;//毫秒数
		        var s=Math.floor(ms/1000);//秒数
		        
		        var h=Math.floor(s/3600);//时
		        var m=Math.floor((s-h*3600)/60);//分
		        var last_s=s%60;//秒
		        
		        var str1="0"+h+":"+(m>9?m:"0"+m)+":"+(last_s>9?last_s:"0"+last_s);
		        var value=(2*index+8)+":00  疯抢中";
		        var pre_index=(index-1)*2+8;//
				$(".timer_group ul li").eq(index).find(".time_point").css("border-color","#ffb033");
//				$(".timer_group ul li").eq(index).find(".time_point").find("p").css("_background","#ffb033");
				$(".timer_group ul li").eq(index).find(".time_point").find("p").css("background","#ffb033");
				$(".timer_group ul li").eq(index).find(".time_tip").css({"opacity":"1","transform":"translate3d(0,0,0)"});
				$(".timer_group ul li").eq(index).find(".time_tip").find("span").text();
				$(".timer_group ul li").eq(index).find(".time_list").css("color","#999999");
				$(".timer_group ul li").eq(index).find(".time_list").text("距结束");
				$(".timer_group ul li").eq(index).find(".time_font").html(str1);
				$(".timer_group ul li").eq(index).find(".time_font").css("display","block");
				$(".timer_group ul li").eq(index).hover(
					function () {
						$(this).find(".time_tip").css({"opacity":"1","transform":"translate3d(0,0,0)"});
					}
				);
				$(".timer_group ul li:eq("+index+")").prevAll().find(".time_past").css("color","#ededed");
				$(".timer_group ul li:eq("+index+")").prevAll().find(".time_tip").css("opacity","0");
				$(".timer_group ul li:eq("+index+")").prevAll().find(".time_point").css("border-color","#ededed");
				$(".timer_group ul li:eq("+index+")").prevAll().find(".time_point").find("p").css("background","#ededed");
				$(".timer_group ul li:eq("+index+")").prevAll().find(".time_past").css("color","#ededed");
				$(".timer_group ul li:eq("+index+")").prev().find(".time_tip").find("span").text(pre_index+":00 开始");
				$(".timer_group ul li:eq("+index+")").prev().find(".time_list").text(pre_index+":00");
				$(".timer_group ul li:eq("+index+")").prev().find(".time_font").css("display","none");
				$(".timer_group ul li:eq("+index+")").prevAll().hover(
					function () {
						$(this).find(".time_tip").css({"opacity":"0","transform":"translate3d(0,0,0)"})
					}
				);
				//
				$(".timer_group ul li:eq("+index+")").nextAll().find(".time_past").css("color","#000");
				
			},1000);
			function change (index){
				//找到此li后面所有的li，使其能够滑到固定位置隐藏
				$(".timer_group ul li:eq("+index+")").nextAll().find(".time_tip").css({"opacity":"0","transform":"translate3d(0,-50%,0)"});
				//找到此li后面所有的li，，
				$(".timer_group ul li:eq("+index+")").nextAll().hover(
				function (){//移动到上面，出现，下滑
					$(this).find(".time_tip").css({"opacity":"1","transform":"translate3d(0,0,0)"});
				},
				function (){////移出，隐藏，回到原来位置
					$(this).find(".time_tip").css({"opacity":"0","transform":"translate3d(0,-50%,0)"});
				});
			};
			function change1 (){
				$(".timer_group ul li:eq(7)").find(".time_tip").css({"opacity":"0","transform":"translate3d(0,0,0)"});
				$(".timer_group ul li:eq(7)").find(".time_point").css("border-color","#ededed");
				$(".timer_group ul li:eq(7)").find(".time_point").find("p").css("background","#ededed");
				$(".timer_group ul li:eq(7)").find(".time_list").text("22:00");
				$(".timer_group ul li:eq(7)").find(".time_tip").find("span").text("22:00 开始");
				$(".timer_group ul li").eq(7).find(".time_font").css("display","none");
				$(".timer_group ul li").find(".time_past").css("color","#000");
				$(".timer_group ul li").hover(
					function (){
						$(this).find(".time_tip").css({"opacity":"1","transform":"translate3d(0,0,0)"});
					},
					function (){
						$(this).find(".time_tip").css({"opacity":"0","transform":"translate3d(0,-50%,0)"});
					}
				);
			}
		},
		//第五大道(点击，ul移动)
		fifth:function(){
			console.log(111)
			var widthLi = parseInt($(".fifthAvenue ul li:eq(0)").css("width"))//一个li的宽度
			var widthUl = ($(".fifthAvenue ul li").size())*widthLi;//一个ul的宽度
			var left = parseInt($(".fifthAvenue ul").offset().left);
			var m = 0;
			
			$(".fifthAvenue").on('click',".hot_prev",function(){//点击向前
				m--;
					if(m==-1){
						$(".fifthAvenue ul").css({"left":0});
						m=0;
					}
					$(".fifthAvenue ul").animate({"left":(-1)*m*widthLi+"px"},1000);
			});
			$(".fifthAvenue").on('click',".hot_next",function(){//点击向后
				m++;
					if(m==$(".fifthAvenue ul li").size()){
						$(".fifthAvenue ul").css({"left":(-1)*($(".fifthAvenue ul li").size()-1)*widthLi+"px"});
						m=$(".fifthAvenue ul li").size()-1;
					}
					$(".fifthAvenue ul").animate({"left":(-1)*m*widthLi+"px"},1000);	
			});
//			console.log($(".fifthAvenue ul").offset().left);
			
			//点击hotBrand，进入列表页
			$(".fifavBot ul li").on("click",".hotBrand",function(){
				window.location = "list.html";
			});
		}
		
		
	}
	homepage.init();
})
