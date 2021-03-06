window.onload = function() {
	// 临时用户按钮
	var shang = document.querySelector('.floor .shang');
	// 临时用户显示
	var xianshi = document.querySelector('.floor .xianshi');
	// 想要隐藏的内容
	var yincang = document.querySelector(".floor .ctr .xianshi .item3");

	//定义一个状态变量---判断是否已经点击了
	var flash = false;
	shang.onclick = function() {
		// color(ma, mad);
		if (flash) {
			//如果已经点击，则显示
			yincang.style.display = "block";
			flash = false;
		} else {
			// 如果没有点击，则隐藏
			yincang.style.display = "none";
			flash = true;
		}
	};
}

// 登录函数
// user是函数调用时传过来的参数
// users是用户的集合数组
function sign(user) {
	// 再次获取form,为清除表单等操作准备
	var form = document.querySelector('form');
	// 判断为空
	if (user.username == '' || user.password == '') {
		alert('账号与密码均不可为空');
		return;
	}
	// 若Cookie中有users则证明之前有注册过的新用户,此时更新users为Cookie中的users
	if (Cookies.get('users')) users = JSON.parse(Cookies.get('users'));
	// 查询此账号
	var trueUser = users.find(function(item) {
		return item.username == user.username;
	});
	// 无此账号
	if (trueUser == undefined) {
		alert('查无此人');
		form.user.value = '';
		form.pass.value = '';
		return;
	}

	if (user.password === trueUser.password) {
		// 是否勾选自动登录,如果勾选自动登录,则在Cookie中开辟一个存储字段,存储输入的账号密码
		//此用户的账号和密码在Cookie中的保存时间,若勾选自动登录则保存7天,不勾选则不存入Cookie(在Cookie存储时间为0)
		if (form.sign.checked) {
			var userCookie = {
				username: user.username,
				password: user.password
			};
			Cookies.set('userCookies', JSON.stringify(userCookie), {
				expires: 7
			});
		}
		// 无论哪种登录方式,都会在Cookie中留下username字段
		var userDL = user.username;
		Cookies.set('uName', user.username);
		// 跳转页面
		var target = '';
		if (Cookies.get('target')) target = Cookies.get('target');
		window.location.replace(target);
	} else {
		alert('密码错误');
		form.pass.value = '';
		return;
	}
}
