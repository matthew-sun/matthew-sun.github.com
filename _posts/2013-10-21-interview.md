---
layout: post
title: 校招面试中积累的前端问题
tags: [ Interview , Javascript , css ]
category: Frontend
description: 面试是一件有趣的事情，因为你的面试官很有可能就是深藏不露的前端老大，这篇文章记录的是在校招的时候遇见的一些前端问题及相应的解决方案。
---
>校招面试结束，最后拿到了三家公司的offer，同花顺、PPTV和高德地图，没有想象中的顺利，但也还算是老天眷顾，拿到了可以去做前端最难产品地图的offer。这篇文章，主要是记录我在面试中遇到的一些问题以及解决方案。

#css问题：
###ie6/7下块级元素如何模拟display:inline-block
众所周知，inline-block是一个很好用的属性。它可以将对象呈递为内联对象，但是对象的内容都作为块对象呈递。而旁边的内联对象会被呈递在同一行内，允许空格。<br>
可惜的是，在IE6/7下是不支持这个属性的，这时我们该如何办呢？<br>
这时我们可以考虑让块级元素设置为内联对象呈递（设置属性display:inline），然后触发块元素的hasLayout属性（如zoom:1）。代码如下：

    //css
    .ib { display:inline-block; *display: inline; *zoom:1; width: 60px; height: 60px; background: red;}
    //html
    <div class="ib">我是ie6/7下模拟的inline-block元素</div>
#####延伸上一个问题，实现两栏自适应布局的一个方案
只需要给左侧元素的布局浮动属性，并设置宽度，右侧的元素display:inline-block，ie6/7下使用兼容解决方案即可解决。当然两栏自适应布局的方法不止这一种，这里仅仅是做一个小小的延伸扩展。


    

