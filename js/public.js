//$(function(){
	function MoveImg(obj){
		this.boxId = obj.boxId;
		this.prev = obj.prev;
		this.next = obj.next;
		
		this.speed = obj.speed;
		this.timer = null;
		this.num = 0;
//		this.initUI();
	}
//	MoveImg.prototype.initUI = function(){
//	//	let strUl = $(this.boxId).find("ul");
//		console.log($(this.boxId+" ul:eq(0)"));
//		for(var i=0;i<this.imgs;i++){
//			var strLi = "<li><a href='javascript:;'><img src='"+this.imgs[i]+"'/></a></li>";
//			var ss = "<li></li>";
//			$(this.boxId+" ul:eq(0)").append(ss);
//		}
//		
//	}
	MoveImg.prototype.opacityImg = function(){
//		$(this.boxId+" ul:eq(0) li").first().css("opacity",1);
//		$(this.boxId+" ul:eq(0) li").first().siblings().css("opacity",0);
		var _self = this;
		
		//初始化小圆点
		$(this.boxId+" .circle li").eq(0).addClass("CirHover");
		
		this.timer = setInterval(function(){
			_self.Next()
		},this.speed);
		//下一张图片
		$(this.boxId).on("click","span:eq(1)",function(){
//			console.log($(this))
			_self.Next();
		});
		//上一张图片
		$(this.boxId).on("click","span:eq(0)",function(){
//			console.log($(this))
			_self.Prev();
		});
		
		//鼠标移入停止计算器
		$(this.boxId).mouseenter(function(){
			clearInterval(_self.timer);
		});
		//鼠标移入，开启计算器
		$(this.boxId).mouseleave(function(){
			var that = _self;
			_self.timer = setInterval(function(){
				that.Next()
			},_self.speed);
		});
		
		//小圆点点击事件
		this.ClickCircle();
	}
	
	MoveImg.prototype.Next = function(){
		this.num++;
    	if(this.num >= $(this.boxId+" ul:eq(0) li").length){
    		this.num = 0;
//	    		$(this.boxId+" ul:eq(0) li").css({"opacity":0});
    	}
//	    console.log(this.num)
		this.Public();
	}
	MoveImg.prototype.Prev = function(){
		this.num--;
    	if(this.num < 0){
    		this.num = $(this.boxId+" ul:eq(0) li").length-1;
//	    	$(this.boxId+" ul:eq(0) li").css({"opacity":0});
    	}
	   this.Public();
	}
	MoveImg.prototype.Public = function(){
		$(this.boxId+" ul:eq(0) li").eq(this.num).animate({"opacity":1},500);
		$(this.boxId+" ul:eq(0) li").eq(this.num).siblings().animate({"opacity":0},500);
		//小点变化
		$(this.boxId+" .circle li").eq(this.num).addClass("CirHover");
		$(this.boxId+" .circle li").eq(this.num).siblings().removeClass("CirHover");
		
		//图片放大缩小
		$(this.boxId+" ul:eq(0) li").eq(this.num).find("img").css({"transform":"scale(1,1)"});
		$(this.boxId+" ul:eq(0) li").eq(this.num).siblings().find("img").css({"transform":"scale(1.03,1.03)"});
	}
	MoveImg.prototype.ClickCircle = function(){
		var _self = this;
		$(this.boxId+" .circle").on("mouseenter","li",function(){
			_self.num = $(_self.boxId+" .circle li").index(this);
//			console.log(_self.num)
			$(this).addClass("CirHover");
			$(this).siblings().removeClass("CirHover");
			
			_self.Public();
		});
//		$(this.boxId+" .circle").on("mouseleave","li",function(){
//			$(this).removeClass("CirHover");
////			$(this).siblings().removeClass("CirHover");
//		});
	}
//});

