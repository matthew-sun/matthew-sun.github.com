---
layout: post
title: 前端代码架构
tags: [ 代码设计 ]
category: Frontend
description: 建造一座高楼不能从最高层开始建，要从打地基开始一层一层的往上建。代码架构就像是地基一样，它的稳定度决定了代码开发的质量，是不是方便维护，程序是否健壮，出bug的几率是不是小这些都与最初的代码架构息息相关。总之一句话，架构很重要。
---
## 前言
本文主要探讨的是js代码架构，关于html和css的设计可以参考我前面讲的两篇文章。

- [web前端规范系列---html规范]
- [web前端规范系列---css代码规范]

## 开光---js总架构
![代码架构思维脑图][architecture]<br>
如图是js的代码架构图，core层为底层库，widgets层为组件层，views是业务层。<br>
这里未标注的地方是整体结构采用seajs+grunt的方式进行模块化打包。seajs的学习可以直接去[官方网站]，grunt则推荐小钗同学写的这篇博文[grunt打包详解]。

## core层
### zepto
#### [Zepto]是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api。 如果你会用jquery，那么你也会用zepto。
#### 整个网站采用zepto框架作为底层库，方便对底层js的操控。zepto解决了一些移动端的bug，但是也制造了移动端的一些bug，比如说臭名昭著的Zepto点透bug。
### fastclick
### 干嘛用的？
百度搜一下，差不多就知道这货是解决移动端点透bug了哈
#### 怎么用：
	
	fastclick.attach(document.body);
### func
[func.js]是在zepto的基础上抽象的一层与业务无关的工具库，实现了一些非常实用的功能，在之后的组件层以及业务层将会被高度复用。比如新建实例的Class方法，自定义事件模块，cookie相关，判断mobile浏览器方法等等。
### itpl
#### 什么东西？
[itpl]是我自己编写的一套模板引擎。
#### 为什么要使用模板引擎？
	
    for(; i<len ; i++) {
        pushHtml += '<a href="'+ d.info[i]['url'] +'" class="item">' ;
        pushHtml += '<p class="img_wrap">' ;
        pushHtml += '<span class="notes_wrap">' ;
        pushHtml += '<span class="img_time">'+ d.info[i]['durationSecond'] +'</span>' ;
        pushHtml += '<img class="lazy" src="http://static.vas.pptv.com/vas/assets/app/1717wan/wap/'+ vers +'/css/gb/lazypic.jpg" lazyimg="'+ d.info[i]['sloturl'] +'" />' ;
        pushHtml += '</span></p>' ;
        pushHtml += '<h5>'+ d.info[i]['title'] +'</h5>' ;
        pushHtml += '<p class="info">' ;
        pushHtml += '<span class="tit">'+ d.info[i]['author'] +'</span>' ;
        pushHtml += '<span class="views">'+ d.info[i]['pv'] +'</span>' ;
        pushHtml += '</p></a>'
    }
    $video.append(pushHtml);

向上面这样多的js代码出现多了，可能你就会感到恶心、痛苦，想迫切的把数据和html字符串给分离开来，这时候使用模板引擎是最好的办法。
#### 怎么用？
[itpl]的项目地址上有使用方法。

## widgets层（组件层）
### common.js
在写业务层的时候发现，有一些js是很多业务层的代码所公用的，比如说登录相关，浏览器判断相关的等等功能。功能之间肯能彼此是没有任何关系的，所以抽离成一个组件，这不合理，但若是分散开来使用，这不方便。为此，我创建了common.js这个文件夹，在广义上的概念上看他不是任何一个功能抽离的组件，但是他聚合了很多需要跨页面使用的方法，为业务层提供方便调用的API。

### widgets
组件js，没什么好说的，就是抽离的一些组件，比如说wipe,dialog,lazyload等等。但是在编写组件层的时候，对这里的组件进行了一些规范，由其是在业务层调用组件代码时，都是直接运行方法名就好了，方便业务层直观简单的调用组件。

	组件js示例：
	define(function(require, exports, module){
	    var $ = require('../zepto/zepto');
	    var func = require('../core/func');
	
	    var defaults = {
	        type : 'none',
	        htype : 'hide'
	    }

		var Widget = func.Class({
			// 初始化
			init : function(option) {
			    var option = this.option = $.extend({},defaults,option);
			    this.bindEvent();
			},
			bindEvent : function() {},
			handler : function() {},
			destory : function() {}
		})
	
	    return Widget;
	
	})

	业务层代码调用：
	define(function(require, exports, module){
	    var widget = require('./widgets/widget');
		// 调用
		widget(option);
	})

### ajax_api.js
这个是把后台提供的接口聚合的js，特别方便对接口进行统一管理。

	/**
	 * @author : matthewsun
	 * @mail : matthew-sun@foxmail.com
	 * @description : API 聚合地址页 ( json 数据格式 )
	 */
	define(function(require, exports, module){
	    var APIDOMAIN = apiUrl ;
	    var API = { 
	        loginPPTV : 'http://user.vas.pptv.com/api/ajax/loginCms.php?app=1717wan', // 登录检测接口 对 PPTV主站     
	        indexVideoData : 'http://m.1717wan.cn/?ajax=1&page=', // 首页精彩视频数据      
	        scheduleListData : 'http://m.1717wan.cn/match/?ajax=1&page=', // 赛程页赛程列表数据       
	        gamesListLiveData : 'http://m.1717wan.cn/game/list/?ajax_1=1&', // 游戏列表页直播视频数据      
	        gamesListVideoData : 'http://m.1717wan.cn/game/list/?ajax=1&', // 游戏列表页精彩视频数据      
	        recordsListData : 'http://m.1717wan.cn/mylottery/order?ajax=1&p=', // 赛程页赛程列表数据      
	        quizzeFuncData : APIDOMAIN + '/lottery/bet?&platform=2&', // 竞猜投注页     
	        reserveData : APIDOMAIN + '/user/follow?uid=', // 订阅页 => 订阅      
	        unReserveData : APIDOMAIN + '/user/unfollow?uid=', // 订阅页 => 取消订阅      
	        exchangeMoneyData : APIDOMAIN + '/user/exchange?amount=', // 猜币兑换接口
	        playerHomeList : 'http://m.1717wan.cn/player/detail/?ajax=1&room_id=', // 主播主页列表数据
	        starHomeList : 'http://m.1717wan.cn/player/detail_star/?ajax=1&author=', // 伪主播列表数据
	        WATCHPLAY : "http://apicdn.liveplatform.pptv.com/media/v3/1717wan/program/{pid}/watch" // 普通用户获取播放地址
	    }
	
	    return API ;
	
	});


### require_map.js
这个记录的是seajs的依赖关系，方便组件代码在重构时，api改变，可以不影响业务层。
	
	var map = {
	    libs : {
	        'zepto' : [],
	        'swipe' : []
	    },
	    utils : {
	        'func' : ['zepto'],
	        'ajax_api' : []
	    },
	    widget : {
	        'common' : ['zepto','func','ajax_api'],
	        'lazyload' : ['zepto'],
	        'loader' : ['zepto'],
	        'dialog' : ['zepto'],
	        'share' : ['zepto'],
	        'itpl' : []
	    },
	    ui : {
	         'index' : ['zepto','common','swipe','ajax_api','loader','lazyload'],
	         'details' : ['zepto','common'],
	         'exchange' : ['zepto','common','ajax_api'],
	         'forget' : ['zepto'],
	         'games' : ['zepto','common'],
	         'games_list' : ['zepto','common','ajax_api','loader','lazyload'],
	         'home' : ['zepto','common','ajax_api','loader','lazyload'],
	         'instruct' : ['zepto','common'],
	         'live' : ['zepto','common','ajax_api','loader','lazyload'],
	         'login' : ['zepto'],
	         'personal' : ['zepto','common'],
	         'players' : ['zepto','common'],
	         'quizze' : ['zepto','common','ajax_api'],
	         'records' : ['zepto','common','ajax_api','loader'],
	         'reg' : ['zepto'],
	         'reserve' : ['zepto','common','ajax_api'],
	         'schedule' : ['zepto','common','ajax_api','loader'],
	         'star_home' : ['zepto','common','ajax_api','loader','lazyload'],
	         'strategy' : ['zepto','common'],
	         'vlive' : ['zepto','lazyload'],
	         'weixin_share' : ['zepto','share'],
	         '404' : ['zepto','common']
	    }
	}

### mock.js
[Mock.js] 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。提供了以下模拟功能：

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

这款高云写的数据生成器工具在做测试的时候也是非常好用，推荐在项目中使用。

## views
### 业务
业务层是一个非常麻烦的地方，推荐几种形式的写法，供参考：
	
	单业务（不复杂）：
	var view = (function(){
	    return {
	        login : function() {
	            ...
	        },
	        dialog : function() {
	            ...
	        },
	        tab : function() {
	            ...
	        },
	        play : function() {
	            ...
	        },
	        ...
	    }
	})();

	多业务（较复杂）：
	define(function(require, exports, module){
	    var $ = require("jquery");
	    var login = require("./login");
	    var dialog = require("./dialog");
	    var tab = require("./tab");
	    var play = require("./play");
	
	    $(function(){
	        login();
	        dialog();
	        tab();
	        play();
	    })
	})

	多业务（复杂）：
	在业务粒子和业务模块之间架一层区域模块
	区域模块：
	define(function(require, exports, module){
	    var $ = require("jquery");
	    var login = require("./login");
	    var dialog = require("./dialog");
	
	    function loginArea() {
	        login();
	        dialog();
	    }
	    return loginArea;
	})
	业务模块：   
	define(function(require, exports, module){
	    var $ = require("jquery");
	    var loginArea = require("./loginArea");
	    var tab = require("./tab");
	    var play = require("./play");
	
	    $(function(){
	        loginArea();
	        tab();
	        play();
	    })
	})



[web前端规范系列---html规范]: http://www.fehouse.com/index.php/archives/7/
[web前端规范系列---css代码规范]: http://www.fehouse.com/index.php/archives/8/
[官方网站]:http://seajs.org/docs/
[itpl]:https://github.com/matthew-sun/itpl
[Mock.js]:http://mockjs.com/
[func.js]:https://github.com/matthew-sun/MUI/blob/master/src/js/core/func.js
[grunt打包详解]:http://www.cnblogs.com/yexiaochai/p/3603389.html
[Zepto]:http://www.html-5.cn/Manual/Zepto/
[architecture]: http://www.fehouse.com/usr/themes/fe/img/postimg/architecture/architecture.png