$(function(){
	var cart = {
		init:function(){
			this.check = $(".check_select, .cart_chekall input[type='checkbox']");
			
			this.cart = null;
			this.payCart = {};
			this.mouse();
			this.numberChange();
			this.initGoods();
			this.checkboxChange();
			this.selectAll();
			this.delete();
			this.deleteCheck();
			this.deleteAll();
			this.userName();
			this.cartSubmitbtn();
			this.load();
		},
		//首行移入移出事件
		mouse:function(){
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
		/**
		 * 初始化购物车数据
		 */
		initGoods:function(){
			var _self = this;
//			this.getCookie();
//			var cart = getCookie("cart") || "{}";
//			cart = JSON.parse(cart);
//			console.log(typeof cart)
//			$.get("")
			var userName = getCookie("userName");
			if(userName){
				$.get("php/shopCart.php",{"userName":userName},function(data){
					var data = eval("("+data+")");
//					console.log(data);
					for(var key=0;key<data.length;key++){
//						console.log(data[key].goodsId)
						let goods = "<li class='cart_goods_items' data-id='"+data[key].goodsId+"'><span style='width: 476px;display: inline-block;vertical-align: middle;'><span class='cart_iblock check_select'><label style='margin: 0 20px 0 28px;'><input type='checkbox' name='' id=''></label><a href='javascript:;' class='cart_iblock cart_gdimg'><img src='"+data[key].goodsImg+"' alt='' width='72' height='72'></a></span><span class='cart_iblock'><span class='cart_godd_wod'><a href='details.html' target='_blank'>"+data[key].goodsShopName+"</a></span></span></span><div class='goods_edit' style='text-align: left;padding-left: 10px;min-height: 60px;margin: 10px 0;'><div class='good_address'>品牌：<span>"+data[key].goodsBrand+"</span></div><div class='good_size'>型号：<span>"+data[key].goodsModel+"</span></div></div><span class='cart_items good_price'><span>￥</span><span>"+data[key].goodsPrice+"</span><br></span><span class='cart_items amount'><div class='cart_num'><input type='button' id='minus' class='minus' value='-'/><input type='text' value='"+data[key].goodsAmount+"' class='num' id='goods_number'/><input type='button' id='plus' class='plus' value='+' /></div></span><span class='cart_items goods_priceAmount' style='font-weight: bold;'><span>￥</span><span id='cart_addNum'>"+data[key].goodsAmount * data[key].goodsPrice+"</span><br></span><span class='cart_items cart_cut'><a href='javascript:;' style='margin-left: 3px;' class='delete_good'>删除</a><br><a href='javascript:;'>收藏</a></span></li>";
						
						$(".cart_goods_ul").append(goods);
					}
					
				})
			}
			
		},
		//数量加减
		numberChange:function(){
			var _self = this;
			//数量增加
			$(".cart_goods_ul").on("click","#plus",function(){
				var n = parseInt($(this).prev().val());
//				console.log(n)
				if(n<199 && n>0){
					$(this).prev().val(n + 1);
//					console.log($("#goods_number").val())
					$(this).prevAll().find("#minus").attr("disabled",false);//减号可以点击
					
					$(this).prevAll().find("#minus").css("cursor","pointer");
					if(parseInt($(this).prev().val())==199){
						$(this).attr("disabled",true);//加号不能点击
						$(this).css("cursor","not-allowed");
					}
				}else{
					$(this).attr("disabled",true);
					$(this).css("cursor","not-allowed");
				}
				
				_self.moneyHandle($(this),parseInt($(this).prev().val()));
			});
			$(".cart_goods_ul").on("click","#minus",function(){
				var n = parseInt($(this).next().val());
				if(n>1 && n<200){
					$(this).next().val(n - 1);
					$(this).nextAll().find("#plus").attr("disabled",false);//减号可以点击
					$(this).nextAll().find("#plus").css("cursor","pointer");
					if(parseInt($(this).next().val())==1){
						$(this).attr("disabled",true);//减号不能点击
						$(this).css("cursor","not-allowed");
					}
				}else{
					$(this).attr("disabled",true);
					$(this).css("cursor","not-allowed");
				}
				_self.moneyHandle($(this),parseInt($(this).next().val()));
			});
			//文本框输入
			$(".cart_goods_ul").on("keyup","#goods_number",function(){
				var n = $(this).val();
				//n存在，非数字转换为空，n不存在，非数字转换为1
				n1 = n.replace(/\D/g,"")?n.replace(/\D/g,""):1;
				$(this).val(n1<200?n1:199);
				console.log(parseInt($(this).val()))
				if(parseInt($(this).val())==1){
					$(this).nextAll().find("#minus").attr("disabled",true);
					$(this).nextAll().find("#minus").css("cursor","not-allowed");
				}else{
					$(this).nextAll().find("#minus").attr("disabled",false);
					$(this).nextAll().find("#minus").css("cursor","pointer");
				}
				if(parseInt($(this).val())==199){
					$(this).prevAll().find("#plus").attr("disabled",true);
					$(this).prevAll().find("#plus").css("cursor","not-allowed");
				}else{
					$(this).prevAll().find("#plus").attr("disabled",false);
					$(this).prevAll().find("#plus").css("cursor","pointer");
				}
					
			});
		},
		/**
		 * 处理每个商品的总价
		 */
		moneyHandle:function(obj,amount){
			//得到要处理的商品的id号
			var goodsId = obj.parents('.cart_goods_items').data("id");
			var goodsAmount = obj.parent(".cart_num").find("#goods_number").val();
			console.log(goodsAmount);
			var userName = getCookie("userName");
			if(userName){
				$.get("php/updateCart.php",{"userName":userName,"goodsAmount":goodsAmount,"goodsId":goodsId},function(data){});
				
			}
		},
		/**
		 * 复选框点击事件
		 */
		checkboxChange: function(){
			var _self = this;
			$('.add_goods').on('change','.check_select input',function(){
				//获取点击对象所在li的id号
				var id = $(this).parents(".cart_goods_items").data("id");
				console.log(id)
				//复选框被选中
				if($(this).prop('checked')){
					var payCart = {
						id:id,
						amount: parseInt($(this).parents('.cart_goods_items').find('#goods_number').val()),
						totalPrice:parseInt($(this).parents(".cart_goods_items").find("#cart_addNum").html())
					};
					_self.payCart[id] = payCart;
				}else{//否则，删除payCart里此数据
					delete _self.payCart[id];
				}
				
				//遍历payCart,
				var count = 0;//数量
				var totalPrice = 0;
				for(let key in _self.payCart){
					count += _self.payCart[key].amount;
					totalPrice += _self.payCart[key].totalPrice;
				}
				console.log(totalPrice)
				$("#good_number").html(count);//被选中的商品数
				$("#goods_SumAmount span:eq(1)").html(totalPrice);

			});
		},
		/**
		 * 全选
		 */
		selectAll:function(){
//			$(".check_select, .cart_chekall input[type="checkbox"]")
//			console.log(this.check)
			this.check.click(function(){
				if($(this).prop("checked")){//如果有一个全选框被选中，所有的复选框全选中
					$(".cart_goods_items input[type='checkbox'").prop("checked",true);
				}
				else{
					$(".cart_goods_items input[type='checkbox'").prop("checked",false);
				}
				//checkbox用change()事件，触发input的change事件，点击全选，商品复选框被选中，商品总数和总价发生改变
				$(".cart_goods_items input[type='checkbox'").change();
			});
		},
		/**
		 * 删除单行商品
		 */
		delete:function(){
			var _self = this;
//			console.log($(".delete_good"))
			$('.add_goods').on('click','.delete_good',function(){//点击商品后面的删除按钮
				//找到父元素li的id
				var id = $(this).parents(".cart_goods_items").data("id");
				var userName = getCookie("userName");
				if(confirm("确定删除此宝贝吗？")){
					if(userName){
						$.get("php/deleteCart.php",{"userName":userName,"goodsId":id},function(){})
					}
					
					//再删除页面上的此商品
					$(this).parents(".cart_goods_items").remove();
				}
			});
		},
		/**
		 * 删除被选中的商品
		 */
		deleteCheck:function(){
			var _self = this;
			$(".cart_delCheck span").click(function(){
				//遍历每个li
				$(".cart_goods_items").each(function(){
					//找到被选中的li
					if($(this).find('input[type="checkbox"]').prop('checked')){
						//找到此li的id
						var id = $(this).data('id');
						var userName = getCookie("userName");
						if(userName){
							$.get("php/deleteCart.php",{"userName":userName,"goodsId":id},function(){})
						}
						$(this).remove();
					}
				});
			});
		},
		/**
		 * 清空购物车
		 */
		deleteAll:function(){
			var _self = this;
//			console.log($(".cart_goods_item"))
			$(".cart_delAll").click(function(){
				var li = $(this).parents(".cart_fboxall").prev().find(".cart_goods_items");
				var userName = getCookie("userName");
				console.log(li);
				if(userName){
					for(var i=0;i<li.length;i++){
						var id = $(li[i]).attr("data-id");
						$.get("php/deleteCart.php",{"userName":userName,"goodsId":id},function(){})
					}
					$(".add_goods .cart_goods_ul").empty();
				}
			});
		},
		/**
		 * 购物车上部用户名的设置
		 */
		userName:function(){
//			console.log(getCookie("userName"))
			this.username = getCookie('userName');
			this.username = this.username.substring(0,3)+"****"+this.username.substring(7);
			$(".login_boxs").find("a").first().text(this.username);
		},
		
		/**
		 * 结算按钮
		 * 
		 */
		cartSubmitbtn:function(){

			$(".cart_submitbtn").mouseenter(function(){
				$(this).css({"background":"#ff8a00"});
			});
			$(".cart_submitbtn").mouseleave(function(){
				$(this).css({"background":"#b01330"});
			});

			$(".cart_submitbtn").on("click",function(){
				window.open("payment.html");
			});
			
		},
		load:function(){
			$(".side").load("suspension.html");
		}
	};
	cart.init();
});
