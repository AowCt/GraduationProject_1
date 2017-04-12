$(function(){
	var login = {
		init:function(){
			this.flag = 0;			
			this.blur();
			this.loginClick();
			
		},
		blur:function(){
			var _self = this;
//			var flag = 0;
			$("#userName").blur(function(){//用户名验证
				$.get("php/userNameVerify.php",{"userName":$("#userName").val()},function(data){
//					console.log(data)
					if(data.indexOf("1")>-1){
						$('.error_tips').css("display","none");	
//						flag = 1;
						_self.flag = 1;
					}else{
						$('.error_tips span').text("该用户名不存在！请重新输入！");
						$('.error_tips').css("display","block");
					}
				});
			});
			console.log(this.flag)
			$("#password").blur(function(){//密码验证
				if(_self.flag){
					$.post("php/login.php",{"userName":$("#userName").val(),"userPass":$("#password").val()},function(data){
					
						console.log(data)
						if(data.indexOf("1")>-1){
							$('.error_tips').css("display","none");							
						}else{
							$('.error_tips span').text("密码错误！请重新输入！");
							$('.error_tips').css("display","block");
//							flag = 0;
							_self.flag = 0;
						}
					});
				}
			});
			$("#password").focus(function(){//密码得焦
				_self.flag = 1;
			});
		},
		//登录验证
		loginClick:function(){
			var _self = this;
			$("#btnLogin").click(function(){
				var userName = $("#userName").val();
				var userPass = $("#password").val();
				console.log(userPass)
				if(_self.flag){
					if(userPass != ""){
						setCookie("userName",userName,1)
						window.location = "index.html";
					}else{
						$('.error_tips span').text("请输入密码！！");
						$('.error_tips').css("display","block");
					}
				}
			});
		}
//		
	};
	login.init();
});
