---
layout: post
title: ie6/7定位元素导致相邻元素的margin-top失效
tags: [ iebug ]
category: Frontend
description: 对于一个触发了haslayout的块级元素，且它的相邻元素是具有定位属性的，那么这个元素在IE6/7下的margin-top会失效。
---
[Demo]: /labs/iebug-mt/index.html
[normal]: /images/mt-normal.png
[bug]: /images/mt-bug.png

###问题描述：
对于一个触发了haslayout的块级元素，且它的相邻元素是具有定位属性的，那么这个元素在IE6/7下的margin-top会失效。<br>

	html代码：
	<div class="pos">定位元素</div>
    <div class="bug">margin-top失效元素</div>
	css代码：
    .pos { position: fixed; left: 0; top: 0; width: 100%; background: blue; height: 40px; line-height: 40px; }
    .bug { margin-top: 40px; background: red; height: 40px; line-height: 40px;  }
标准浏览器下输出的结果：<br>
![normal][normal]<br>
IE6/7下输出的产物：<br>
![bug][bug]<br>
具体可查看 [Demo]
#####WTF！
###分析原因：
一个块级元素，触发了hasLayout（比如设置了宽度高度），并且其前面紧挨着的同级的节点如果为absolute绝对定位或者是固定定位，就会导致这个块级元素在IE6/IE7下面的margin-top失效，看起来就像margin-top:0一样。<br>
<b>关键词：自身触发haslayout，同级相邻节点定位</b>
###解决方案：
1.不使用margin属性：使用padding来代替margin，比如设置其父元素的padding-top，或者设置这个块元素的padding-top，不过要注意padding对其背景的影响。

	.bug { padding-top: 40px; background: red; height: 40px; line-height: 40px;  }

2.避免两个元素相邻：在它们之间插入一个空div标签，或者交换这两个标签的前后位置。
	
	<div class="pos">定位元素</div>
    <div></div>
    <div class="bug">margin-top失效元素</div>
	或者（交换位置）：
    <div class="bug">margin-top失效元素</div>
    <div class="pos">定位元素</div>

3.去掉失效元素的haslayout属性（特殊场景可使用，一般不推荐）
	
	.bug { margin-top: 40px; background: red; line-height: 40px; }
######希望这篇文章能对你有用，和我一起交流~
