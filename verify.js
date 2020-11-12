/*
	说明：2020年11月12日 由 LWK 所封装
	参数：以对象的形式传参
			* el : 表示所需要挂载的元素
			- width : 表示画布的 宽度  默认为 120 px
			- height : 表示画布的 高度  默认为 35 px
			- usual : 表示鼠标是否变为手 默认为是
			- lineNumber ： 表示干扰线的条数 默认为 4 条
			- textNumber ： 表示验证码字数个数 默认为4个
			+ success : 可选项【表示绘制成功后会携带生成的参数与正则表达式以对象的形式返回出去】
	版本： 1.0.0
*/
let getVerification = config => {
	// 查找元素
	let c = window.document.querySelector(config.el);
	// 设置再次自调用事件
	c.onclick = () => {
		getVerification(config);
	};
	// 设置鼠标样式
	config.usual ? "" : c.style.cursor = "pointer";
	// 设置宽高
	c.width = config.width || 120;
	c.height = config.height || 35;
	// 设置画笔
	let ctx = c.getContext("2d");
	// 设置颜色
	let text = "0123456789ABCDEF";
	// 数组
	let lists = text.split("");
	// 随机返回颜色
	let colors = () => {
		let color = "#";
		for(let i = 0; i < 6; i++){
			color += lists[~~(Math.random() * lists.length)];
		};
		return color;
	};
	// 返回小于宽度的随机值
	let getWidthNums = () => ~~(Math.random() * c.width);
	// 返回小于高度的随机值
	let getHeightNums = () => ~~(Math.random() * c.height);
	// 返回随机乘三
	let getNums = () => ~~(Math.random() * 3);
	// 返回随机值
	let returnNum = (min,max) => ~~(Math.random() * (max - min) + min);
	// 设置存储信息
	let message = "";
	// 清除整个画布
	ctx.clearRect(0, 0, c.width, c.height);
	// 设置干扰线条
	let lineNumber = config.lineNumber || 4;
	for(let q = 0; q < lineNumber; q++){
		// 开始一个新的路径
		ctx.beginPath();
		// 设置线宽
		ctx.lineWidth = getNums()+1;
		// 设置线的颜色
		ctx.strokeStyle = colors(); // Green path
		// 设置线的起点
		ctx.moveTo(3 - getNums(), getHeightNums());
		// 设置线的终点
		ctx.lineTo(c.width - getNums(), getHeightNums());
		// 绘制出路径
		ctx.stroke(); 
		// 关闭该路径
		ctx.closePath();
	}
	// 设置验证码字数个数
	let textNumber = config.textNumber || 4;
	let isGap = c.width / textNumber;
	for(let a = 0; a < textNumber; a++){
		text = lists[~~(Math.random() * lists.length)];
		message += text;
		// 开始一个新的路径
		ctx.beginPath();
		// 设置一个字体大小
		ctx.font = returnNum(20, 35) + "px Simhei";
		// 设置字体排列方式
		ctx.textBaseline = "top";
		// 设置文字颜色
		ctx.fillStyle = colors();
		// 设置保存栈
		ctx.save();
		// 在某个位置进行重新绘制
		ctx.translate(isGap * a + 15, 15);
		// 设置文字旋转
		ctx.rotate(returnNum(-30, 30) * Math.PI/180);
		// 绘制文字
		ctx.fillText(text, -15+5, -15); 
		ctx.restore();
		// 关闭该路径
		ctx.closePath();
	}
	// 设置正则表达式忽略大小写
	let str = new RegExp("^" + message + "$", "img");
	// 设置返回和传递的参数
	let returnMessage = {message, str};
	config.success && config.success(returnMessage);
	return returnMessage;
};