$(function(){
	var regist = {
		init: function(){
		
			this.arr = ["EPRD","LBEC","YEJK","2LBC","HNNQ","SEP5","NEWM"];
			this.random;
			this.str_code;
			this.blur();
			this.click();
			this.isClickImg();
			this.isRandomImage();
			this.mobcode();
		},
		//用户名
		isNameTrue:function(obj){
			var acco1 = /^((13\d)|(14\d)|(15\d)|(18\d)|(17\d))(\d{8})$/;
			var acco2 = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})$/;
			var telnumrel = obj.val();
			console.log(telnumrel)
			if(acco1.test(telnumrel) || acco2.test(telnumrel)){
				$('.error_tips').css("display","none");
//			    $.cookie("UserName",obj.val(),{expires:14});     
			}
			else{
				$('.error_tips span').text("请输入正确的邮箱或手机号码");
				$('.error_tips').css("display","block");
			}
			return acco1.test(telnumrel) || acco2.test(telnumrel);
		},
		//密码
		isPasswordTrue:function(obj){
			var passWord = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			if(passWord.test(obj.val())){
					$('.error_tips').css("display","none");
//					$.cookie("PassWord",obj.val(),{expires:14}); 
			}else{
				$('.error_tips span').text("密码为6-16位字符且必须包含数字字母");
				$('.error_tips').css("display","block");
			}
			return passWord.test(obj.val());
		},
		//图片验证
		isRandomImage:function (){
			this.random = Math.floor(Math.random()*6);
//			console.log(this.random)
			$("#code_total img").attr("src","img/styleImg/"+(this.random+1)+".html.png");
		},
		isClickImg:function(){//点击图片，换图片
			var that = this;
			$("#code_total img").click(function(){
				that.isRandomImage();
			});
		},
		
		isImgTrue:function(obj){//输入图片验证码，与图片文字匹配
//			console.log(this.random)
//			console.log(this.arr[this.random])
			if(obj.val() == this.arr[this.random]){
				$('.error_tips').css("display","none");	
			}else{
    		//	alert("gyurtfuyfvh")
    			$('.error_tips span').text("请输入与右图相匹配的字符");
				$('.error_tips').css("display","block");
    		}
			return obj.val() == this.arr[this.random];
		},
		mobcode:function(){//点击验证码，随机出现一个6位数字
			var that = this;
			$("#btn_getcode").click(function(){
//				console.log($("#btn_getcode"))
				that.str_code = "";
				for(var i=0 ;i<6; i++){
					var random_code = Math.floor(Math.random()*10);
					that.str_code+=random_code;
				}
				alert(that.str_code);
			});
		},
		isMobCode:function(obj){//验证输入框里的数字是否与验证码相同
			
			if(obj.prev().val() == this.str_code){
				$('.error_tips').css("display","none");	
			}else{
				$('.error_tips span').text("随即验证码填写错误！");
				$('.error_tips').css("display","block");
			}
			return obj.prev().val() == this.str_code;
		},
		/**
		 * 点击注册
		 */
		click:function(){
			var that = this;
			$("#btnLogin").click(function(){
				if(that.isNameTrue($("#account")) && that.isPasswordTrue($("#password")) && that.isImgTrue($("#yzm")) && that.isMobCode($("#btn_getcode"))){
					$.post("php/regist.php",
							{
								"userName":$("#account").val(),
								"userPass":$("#password").val()
							},
							function(){
								window.location.href="login.html";
							});
					
				}
			});
		},
		/**
		 * 用户名验证
		 */
		blur:function(){
			$("#account").blur(function(){
				$.get("php/userNameVerify.php",{"userName":$("#account").val()},function(data){
					console.log(data)
					if(data.indexOf("1")>-1){
						$('.error_tips span').text("该用户名已存在！请重新输入！");
						$('.error_tips').css("display","block");
					}else{
						$('.error_tips').css("display","none");	
					}
				});
			});
		}
	};
	regist.init();
});
