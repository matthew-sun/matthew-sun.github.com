---
layout: post
title: js事件委托
tags: [ Javascript ]
category: Frontend
description: 对“事件处理程序过多”问题的解决访问就是事件委托。
---
[Demo]: /labs/note/index.html
[hot_players]: /images/hot_players.png

####对“事件处理程序过多”问题的解决访问就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
最近在做的一个专题就应用到了这个效果:<br>
![example][hot_players]<br>
如上图所示，这里需要对多个li里的a标签，添加点击事件。如果对每一个a标签都添加事件侦听，无疑会对页面的性能造成很大的影响。这个时候咱们就回到文章的标题，可以利用事件委托来解决这个问题。<br>
<b>具体实现方案：</b>给父级元素添加绑定事件，当事件发生时，判断事件的活动源是否是需要绑定的元素，如果是则执行相关方法。<br>
	
	 $parent.on('click',function(event){ //给父元素添加click绑定事件
        var $this = $(event.target) ; // 活动响应源

        if($this.is($myTarget)) {	// 事件发生，判断是否是确切要执行函数的绑定
			foo();// 需执行的事件函数		
		}
	}
具体可查看 [Demo] ，或去我的github上扒取[源码](https://github.com/matthew-sun/matthew-sun.github.com/tree/master/labs/note)<br>
######希望这篇文章能对你有用，和我一起交流~
