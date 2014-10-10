---
layout: post
title: 前端代码架构
tags: [ 代码设计 ]
category: Frontend
description: 建造一座高楼不能从最高层开始建，要从打地基开始一层一层的往上建。代码架构就像是地基一样，它的稳定度决定了代码开发的质量，是不是方便维护，程序是否健壮，出bug的几率是不是小这些都与最初的代码架构息息相关。总之一句话，架构很重要。
---
##前言
本文主要探讨的是js代码架构，关于html和css的设计可以参考我前面讲的两篇文章。

- [web前端规范系列---html规范]
- [web前端规范系列---css代码规范]

##开光---js总架构
![代码架构思维脑图][architecture]<br>
如图是js的代码架构图，core层为底层库，widgets层为组件层，views是业务层。<br>
这里未标注的地方是整体结构采用seajs+grunt的方式进行模块化打包。seajs的学习可以直接去[官方网站]，grunt则推荐小钗同学写的这篇博文[grunt打包详解]。

##core层
###zepto
####[Zepto]是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api。 如果你会用jquery，那么你也会用zepto。
####整个网站采用zepto框架作为底层库，方便对底层js的操控。zepto解决了一些移动端的bug，但是也制造了移动端的一些bug，比如说臭名昭著的Zepto点透bug。
###fastclick
####使用示例：
	
	fastclick.attach(document.body);
###func
func.js是在zepto的基础上抽象的一层与业务无关的工具库，实现了一些非常实用的功能，在之后的组件层以及业务层将会被高度复用。比如新建实例的Class方法，自定义事件模块，cookie相关，判断mobile浏览器方法等等。
###itpl
####[itpl]是我自己编写的一套模板引擎，项目地址上有使用方法。
####为什么要使用模板引擎？
	
    for(; i<len ; i++) {
        if( d.info[i]['author'] === '') {
            d.info[i]['author'] = '天才小熊猫' ;
        }
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


[web前端规范系列---html规范]: http://www.fehouse.com/index.php/archives/7/
[web前端规范系列---css代码规范]: http://www.fehouse.com/index.php/archives/8/
[官方网站]:http://seajs.org/docs/
[itpl]:https://github.com/matthew-sun/itpl
[grunt打包详解]:http://www.cnblogs.com/yexiaochai/p/3603389.html
[Zepto]:http://www.html-5.cn/Manual/Zepto/
[architecture]: http://www.fehouse.com/usr/themes/fe/img/postimg/architecture/architecture.png