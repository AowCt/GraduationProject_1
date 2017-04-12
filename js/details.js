$(function(){
	var details = {
		init:function(){
			this.load();
			this.changeLoad();
			this.stleSelect();
			this.numberChange();
			this.engine();
			this.addCart();
			
		},
		//加载头尾部分
		load:function(){
			$(".head").load("head.html",function(res){
				$(".bot_low").hide();
				
				$(".head_left").mouseenter(function(){
					$(".bot_low").show();
				});
				$(".head_left").mouseleave(function(){
					$(".bot_low").hide();
				});
			});
			$(".footer").load("footer.html");
			$(".side").load("suspension.html");
		},
		/**
		 * 改变详情页的内容
		 */
		changeLoad:function(){
//			console.log($(".smallimg li").attr("id"));
			var id = parseInt(JSON.parse(getCookie("newList")));
//			
			$.get('php/detail.php',{"goodsId":id},function(data){
//				console.log(data)
				var data = eval("("+data+")");
//				console.log(data)
//				console.log(data.goodsId)
				$(".dett_name").html(data["word"]);
				$(".detail_position a").last().html(data["word"]);
				$(".wb b").html(data.price_new);//现在价格
				$(".mkt").html(data.price_old);//打折前价格
				var img = [data.img1,data.img2,data.img3,data.img4,data.img5,data.img6];
				for(let key=0;key<img.length;key++){//创建放大镜下的小轮播
//					console.log(img.length)
					if(img[key]){
						let strLi = "<li><img src='"+img[key]+"'/></li>";
						$(".smallimg ul").append(strLi);
					}
					
				}
				
				
				$(".dett_ai dl:eq(0) dd").html(data.serialNumber);//型号
				$(".dett_ai dl:eq(1) dd").html(data.model);//编号
				$(".dett_ai dl:eq(2) dd").html(data.brand);//品牌
				$(".smallimg ul li").eq(0).attr('data-gid',data['goodsId']);
				$(".bshow img").attr("src",data.img1);//放大镜
				
				$(".bhide img").attr("src",data.img1);//放大后的图片
				var type = [data.type1,data.type2,data.type3,data.type4,data.type5,data.type6];
				for(let key=0;key<type.length;key++){//加载手表类型
					if(type[key]){
						let strA = "<a href='javascript:;'><i></i><img src='"+type[key]+"'/></a>";
						$(".st").append(strA);
					}
					
				}
				
				//小轮播的事件
				$(".smallimg ul li:eq(0)").addClass("li_hov");
				$(".smallimg ul").on("mouseenter","li",function(){
					$(".smallimg ul li:eq(0)").removeClass("li_hov");
					$(this).addClass("li_hov");
					$(this).siblings().removeClass("li_hov");
					
				});
				$(".smallimg ul").on("mouseleave","li",function(){
					if($(this).find("img").attr("src") == $(".bshow img").attr('src')){
						$(this).addClass("li_hov");
						$(this).siblings().removeClass("li_hov");
					}
//					$(this).removeClass("li_hov");
				});
//				
				$(".dett_type .st a:eq(0)").addClass("st_hover");//类型
				$(".dett_type .st a:eq(0) i").addClass("st_click");//类型
				$(".sell i").html(data.salse);//销售量
				var pimg = [data.pimg1,data.pimg2,data.pimg3,data.pimg4,data.pimg5,data.pimg6,data.pimg7,data.pimg8,data.pimg9,data.pimg10,data.pimg11,data.pimg12];
				for(let key=0;key<pimg.length;key++){//大图片
					if(pimg[key]){
						let strP = "<p><img src='"+pimg[key]+"'/></p>";
						$(".det_img").append(strP);
					}
				}
			});
		},
		//款式选择
		stleSelect:function(){
//			$(".dett_type .st a:eq(0)").addClass("st_hover");
//			console.log($(".dett_type .st a:eq(0) i"))
			$(".dett_type .st a:eq(0) i").addClass("st_click");
			$(".dett_type .st").on("click","a",function(){
				$(this).addClass("st_hover");
				$(this).siblings().removeClass("st_hover");
				$(this).find("i").addClass("st_click");
				$(this).siblings().find("i").removeClass("st_click");
//				console.log($(this))
			});
		},
		//数量加减
		numberChange:function(){
			//数量增加
			$("#plus").click(function(){
				var n = parseInt($("#goods_number").val());
				
				if(n<199 && n>0){
					$("#goods_number").val(n + 1);
//					console.log($("#goods_number").val())
					$("#minus").attr("disabled",false);//减号可以点击
					
					$("#minus").css("cursor","pointer");
					if(parseInt($("#goods_number").val())==199){
						$(this).attr("disabled",true);//加号不能点击
						$(this).css("cursor","not-allowed");
					}
				}else{
					$(this).attr("disabled",true);
					$(this).css("cursor","not-allowed");
				}
				
			});
			$("#minus").click(function(){
				var n = parseInt($("#goods_number").val());
				if(n>1 && n<200){
					$("#goods_number").val(n - 1);
					$("#plus").attr("disabled",false);//减号可以点击
					$("#plus").css("cursor","pointer");
					if(parseInt($("#goods_number").val())==1){
						$(this).attr("disabled",true);//减号不能点击
						$(this).css("cursor","not-allowed");
					}
				}else{
					$(this).attr("disabled",true);
					$(this).css("cursor","not-allowed");
				}
			});
			//文本框输入
			$("#goods_number").keyup(function(){
				var n = $(this).val();
				//n存在，非数字转换为空，n不存在，非数字转换为1
				n1 = n.replace(/\D/g,"")?n.replace(/\D/g,""):1;
				$(this).val(n1<200?n1:199);
//				console.log(parseInt($(this).val()))
				if(parseInt($(this).val())==1){
					$("#minus").attr("disabled",true);
					$("#minus").css("cursor","not-allowed");
				}else{
					$("#minus").attr("disabled",false);
					$("#minus").css("cursor","pointer");
				}
				if(parseInt($(this).val())==199){
					$("#plus").attr("disabled",true);
					$("#plus").css("cursor","not-allowed");
				}else{
					$("#plus").attr("disabled",false);
					$("#plus").css("cursor","pointer");
				}
					
			});
		},
		/**
		 * 添加购物车
		 */
		addCart:function(){
			var _self = this;
			$("#atOnceShop").click(function(){
				var that = this;
				var goodsId = $('.smallimg ul li').first().data('gid');//id
				var amount = parseInt($("#goods_number").val());//数量
				var shopName = $(".dett_name").html();//手表名字
				var model = $(".dett_ai dl:eq(0) dd").html();//型号
				var brand = $(".dett_ai dl:eq(2) dd").html();//品牌
				var img = $(".st").find(".st_hover img").attr("src");
//				console.log(img)
				var price = $(".wb b").html();//价格
				
				//得到cookie
				var user = getCookie("userName");
//				console.log(user)
				if(user){
					
//					
					$.get("php/addCart.php",{
						"userName":user,
						"goodsId":goodsId,
						"goodsAmount":amount,
						"userShopName":shopName,
						"goodsModel":model,
						"goodsBrand":brand,
						"userPrice":price,
						"goodsImg":img
					},function(data){});
					alert('添加成功');
				}else{
					alert("添加失败，请先登录");
					setTimeout(function(){
						location.href = "login.html";
					},2000);
				}
//				
				
				 
			});
		},
		/**
		 * 放大镜
		 */
		engine:function(){
			
			$(".bshow").mouseenter(function(){
				$(".jqzoom").show();
				$(".bhide").show();
			});
			$(".bshow").mouseleave(function(){
				$(".jqzoom").hide();
				$(".bhide").hide();
			});
			
			$(".jqzoom").mousemove(function(e){
				var l,t;
				
//				l = e.pageX - $(".bshow").offset().left - $(this).width()/2; 
//				t = e.pageY - $(".bshow").offset().top - $(this).height()/2; 
				/**
				 * 判断边界
				 */
				//左右
//				console.log($(".bshow").width() +$(".bshow").offset().left -$(this).width())
				if(e.pageX - $(".bshow").offset().left < $(this).width()/2){
					l = 0;
				}else if(e.pageX - $(".bshow").offset().left >$(".bshow").innerWidth() - $(this).width()/2){
					l = $(".bshow").innerWidth() - $(this).width()-3;
				}else{
					l = e.pageX - $(".bshow").offset().left - $(this).width()/2;
				}
				//上下
				if(e.pageY - $(".bshow").offset().top < $(this).height()/2){
					t = 0;
				}else if(e.pageY - $(".bshow").offset().top > $(".bshow").innerHeight() - $(this).height()/2){
					t = $(".bshow").innerHeight() - $(this).height()-3;
				}else{
					t = e.pageY - $(".bshow").offset().top - $(this).height()/2;
				}
				
				
				
				let imgLeft = (-1)*l*$(".bhide img").width()/$(".bshow img").innerWidth();
				let imgRight = (-1)*t*$(".bhide img").height()/$(".bshow img").innerHeight();
				
				$(this).css({"left":l+"px","top":t+"px"});
				$(".bhide img").css({"left":imgLeft+"px","top":imgRight+"px"})
			});
			
			
			/**
			 * 鼠标移入小图标，大图标换成相应的图片
			 */
			$(".smallimg ul").on("mouseenter",'li img',function(){
				$(".bshow img").attr("src",$(this).attr("src"));
				$(".bhide img").attr("src",$(this).attr("src"));
			});
			
			
		}
	};
	details.init();
//	setTimeout(function(){
////			console.log($(".bot_low"));
//	},1000)
});
