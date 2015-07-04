// app信息
var $CONFIG = {};
$CONFIG['version'] = '1.0.1';
$CONFIG['release_time'] = '2015.06.27 22:24';

// 全局模板信息
Template7.global = {
	os: 'iOS'
	,browser: 'Chrome'
	,username: 'johndoe'
	,email: 'john@doe.com'
};

// 初始化应用
var myApp = new Framework7({
	 modalTitle: '系统提示' // 弹框标题
	,cache: true // 缓存
	,cacheDuration: 1000*60*10 // 缓存时间
	,animateNavBackIcon: true // 返回动画
	,pushState: true // pjax
	,swipePanel: 'left' // 侧栏滑屏
	,swipePanelThreshold: 20 // 滑屏阈值
	,modalButtonOk: '确定'
	,modalButtonCancel: '取消'
	,modalPreloaderTitle: '加载中...'
	,modalUsernamePlaceholder: '请输入帐号'
	,modalPasswordPlaceholder: '请输入密码'
	,smartSelectBackText: '返回'
	,smartSelectPopupCloseText: '关闭'
	,hideNavbarOnPageScroll: false // 页面向下滚动时导航栏会自动隐藏
	,hideToolbarOnPageScroll: false // 页面向下滚动工具栏会自动隐
	,showBarsOnPageScrollEnd: true // 页面滚动到底时显示导航栏和工具栏
	,scrollTopOnNavbarClick: true // 点击导航栏中间返回顶部
	,scrollTopOnStatusbarClick: true // 点状态栏返回顶部
	,template7Pages: true // 支持template7模板渲染
	,fastClicks: true // 防止快速点击
	,fastClicksDelayBetweenClicks: 1000 // 快速点击最小间隔时间毫秒
	,fastClicksDistanceThreshold: 20 // 需要阻止tab事件的距离。当 tap/move 的距离超过这个值的时候，不会触发click事件。
	
	// 异步加载时显示loading
	,onAjaxStart: function (xhr) {
		myApp.showIndicator();
	}
	,onAjaxComplete: function (xhr) {
		myApp.hideIndicator();
	}
	
	// Handlebars模板预处理
	/*
	,preprocess: function (content, url, next) {
		if (url === 'people.html') {
			var template = Handlebars.compile(content);
			var resultContent = template({
				title: 'People',
				people: ['John', 'Ivan', 'Mary']
			});
			return resultContent;
		}
	}*/
});

// If need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true // 动态导航栏
	,domCache: true // 启用内联页面
});

// 页面加载总时间
var audio = undefined;
$$(document).on('pageInit', function (e) {
	// js加载页面
	//mainView.router.loadPage('about.html');
	
	// Get page data from event data
	var page = e.detail.page;
	// 列表页加载完毕
	if (page.name === 'list') {
		$$('.action-tip').on('click', function () {
			var buttons1 = [{
				text: '您可以分享到：', label: true }
				,{ text: '微信好友', bold: true }
				,{ text: '微信朋友圈', bold: true }
				,{ text: 'QQ好友', bold: true }
				,{ text: 'QQ空间', bold: true }
				,{ text: '新浪微博', bold: true }
				,{ text: '腾讯微博', bold: true
			}];
			var buttons2 = [{
				text: '取消', color: 'red'
			}];
			var groups = [buttons1, buttons2];
			myApp.actions(groups);
		});
	}
	// 播放页加载完毕
	if (page.name === 'view') {
		$$('#settings').on('click', function () {
			myApp.alert('开发中...');
		});
		$$('#fav').on('click', function () {
			myApp.alert('开发中...');
		});
		$$('#alarm').on('click', function () {
			myApp.alert('开发中...');
		});
		// 播放音乐
		var playbt = $$('#playbt');
		playbt.on('click', function () {
			if (audio.paused) {
				$$('#playbt i').attr('class', 'icon icon-ios-pause');
				audio.play();
			} else {
				$$('#playbt i').attr('class', 'icon icon-ios-play');
				audio.pause();
			}
		});
		if (audio == undefined) {
			audio = new Audio('http://fm.xinbaby.com/attached/media/20150609/1433902033427_.mp3');
			//audio = document.getElementById('audio');
			//audio.src = 'http://fm.xinbaby.com/attached/media/20150619/1434695140739_.mp3';
			if (audio.paused) {
				audio.play();
			}
		}
		setInterval(function() {
			showTime();
		}, 1000);
		// 定时更新进度
		var ctime;
		var dur;
		var $time = $$('#media-time');
		function showTime() {
			ctime = parseInt(audio.currentTime);// + 1
			dur = parseInt(audio.duration);
			$time.text(formate(ctime));
			$$('#progress_bar').css('width', (ctime / dur) * 100 + '%');
			if (audio.paused) {
				$$('#playbt i').attr('class', 'icon icon-ios-play');
			} else {
				$$('#playbt i').attr('class', 'icon icon-ios-pause');
			}
		}
		showTime();
		// 格式化时间
		var mm;
		var ss;
		function formate(time) {
			mm = 0;
			ss = 0;
			ss = parseInt(time);
			mm = parseInt(ss / 60);
			ss = ss % 60;
			if (ss < 10) {
				ss = '0' + ss;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			return mm + ':' + ss;
		}
	}
	console.log(page);
});
//$$(document).on('pageInit', '.page[data-page="list"]', function (e) {});

// 弹框
$$('.demo-alert').on('click', function () {
	myApp.alert('你好!');
});
$$('.demo-confirm').on('click', function () {
	myApp.confirm('今天过的很好吗?', function () {
		myApp.alert('真棒!');
	});
});
$$('.demo-prompt').on('click', function () {
	myApp.prompt('你叫什么名字?', function (data) {
		// @data contains input value
		myApp.confirm('你的名字是 ' + data + '?', function () {
			myApp.alert('好的， ' + data + ' ;)');
		});
	});
});
$$('.demo-login').on('click', function () {
	myApp.modalLogin('请输入帐号和密码', function (username, password) {
		myApp.alert('帐号: ' + username + ', 密码: ' + password);
	});
});
$$('.demo-password').on('click', function () {
	myApp.modalPassword('请输入新密码', function (password) {
		myApp.alert('您的新密码是: ' + password);
	});
});

// 幻灯片
var mySwiper1 = myApp.swiper('.swiper-container', {
	pagination:'.swiper .swiper-pagination' // 指示器
	,spaceBetween: 0 // 间隔像素px
	,autoplay: 5000 // 自动播放
	,autoplayDisableOnInteraction: false //当手滑动了幻灯片是否停止自动播放
	,effect: 'slide' // 动画效果"slide", "fade", "cube", "coverflow"
	,preloadImages: false //不预加载
	,lazyLoading: true // 懒加载
});

// 下拉刷新
$$('.pull-to-refresh-content').on('refresh', function (e) {
	setTimeout(function () {
		 /*myApp.addNotification({
			title: '操作提示',
			message: '已获取到最新数据'
		});*/
		myApp.pullToRefreshDone();
	}, 1000);
});
// 注册'infinite'事件处理函数
var loading = false;	// 加载flag
$$('.infinite-scroll').on('infinite', function () {
	// 如果正在加载，则退出
	if (loading) return;
	// 设置flag
	loading = true;
	setTimeout(function () {
		/*myApp.addNotification({
			title: '操作提示',
			message: '已滚动到底部'
		});*/
		myApp.detachInfiniteScroll($$('.infinite-scroll'));
		$$('.infinite-scroll-preloader').remove();
		loading = false;
	}, 1000);
});
