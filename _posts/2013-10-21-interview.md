---
layout: post
title: 校招面试中积累的前端问题
tags: [ Interview , Javascript , css ]
category: Frontend
description: 面试是一件有趣的事情，因为你的面试官很有可能就是深藏不露的前端老大，这篇文章记录的是在校招的时候遇见的一些前端问题及相应的解决方案。
---
>校招面试结束，最后拿到了三家公司的offer，同花顺、PPTV和高德地图，没有想象中的顺利，但也还算是老天眷顾，拿到了可以去做前端最难产品地图的offer，想想自己还有点小激动。这篇文章，主要是记录我在面试中遇到的一些问题以及解决方案。

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

###css组件的命名规范
class命名一直是网页重构的一个重要的话题，而css组件的命名就更是重中之重。如何防止命名冲突，全站组件和单页面组件的命名怎么从普通class命名中间区分开来，以及全站的组件和单页面的组件之间又如何准确区分？<br>
我这里给出的答案是在class的命名规范上下文章，全站组件的命名加上mod前缀以标示，例如：mod\_xx。而单页面组件的命名加上单页的前缀和mod标示，如：xx\_mod\_xx。

###css框架
Bootstrap的流行导致了越来越多的人去研究前端css框架，而在面试的时候面试官更多的是考察你对框架源码的剖析，以及知识的广度。比如说它的栅格布局，响应式布局以及各个css组件之间的联系。还有个css框架是YUI的[pureCss](https://github.com/yui/pure/)，它可能没有bootstrap那么有名气，但恰恰是在面试的时候能够说出这个框架的名字以及你对于它的理解，相信是可以加分不少的。pure是一组轻量的响应式css模块，pure的所有模块都是在[Normalize.css](http://necolas.github.io/normalize.css/)之上建立的。和传统的reset不同，它提供的是跨浏览器保持HTML元素默认样式的一致性。有兴趣的同学可以深入研究学习一下。

#javascript问题：
###事件绑定
js事件绑定，主要有三个问题：

- 事件绑定在标准浏览器和IE浏览器下的兼容性写法
- 事件绑定在标准浏览器下函数的第三个参数的含义
- 事件绑定在ie下，回调函数的this指向会被指向window

先说一下第二个问题，其它的问题可用代码示例。

    obj.addEventListener(ev,fn,false);

这个参数的名字叫做useCapture，是一个布尔值，名为冒泡获取，false代表的含义是由里向外，true是由外向里。举个栗子：

    <div id="outDiv">
      <div id="middleDiv">
        <div id="inDiv">请在此点击鼠标。</div>
      </div>
    </div>

- 全为 false 时，触发顺序为：inDiv、middleDiv、outDiv；
- 全为 true 时，触发顺序为：outDiv、middleDiv、inDiv；
- outDiv 为 true，其他为 false 时，触发顺序为：outDiv、inDiv、middleDiv；
- middleDiv 为 true，其他为 false 时，触发顺序为：middleDiv、inDiv、outDiv；

使用匿名函数解决attachEvent回调函数的this指向问题:

    function bindEvent(elem,type,fn){
        if(elem.attachEvent){
            elem.attachEvent("on"+type,function(){
                fn.apply(elem,arguments);
            });
        }else{
            elem.addEventListener(type,fn,false);
        }
    }

###js阻止默认事件和阻止冒泡的兼容写法
1.停止事件冒泡 

    //如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation(); 
    else
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true;
    return false;

2.阻止浏览器的默认行为

    //如果提供了事件对象，则这是一个非IE浏览器 
    if ( e && e.preventDefault ) 
    //阻止默认浏览器动作(W3C) 
    e.preventDefault(); 
    else
    //IE中阻止函数器默认动作的方式 
    window.event.returnValue = false; 
    return false;

当然jquery中帮我集成了一个解决方案，那就是return false，已解决了兼容性问题。

###js获取元素的位置
这道面试题考察的是，有没有获取父元素的位置，再加上自身的offset值，代码如下：

    function getIE(e){
        var t=e.offsetTop;
        var l=e.offsetLeft;
        while(e=e.offsetParent){
        t+=e.offsetTop;
        l+=e.offsetLeft;
    }

#hr面试题
###你对加班的问题怎么看？
这个问题几乎是hr必问，但不要以为hr仅仅想听到你的答案是愿意加班哦。看看我是怎么回答的吧：<br>
我不喜欢经常加班，因为我认为经常加班是工作低效率的一种表现，但是如果公司有紧急的需求需要我去加班，我愿意奉献自己的精力去完成，不会以不加班为借口，拖延紧急项目的进度。

#####关于面试的问题还有很多很多，比如说前端的性能优化，seaJs的模块化加载，前端MVC模式的应用，nodeJs等等，感兴趣的同学可以深入研究下。这几年前端开发的变化很大，从原来的ajax兴起，到现在的各种框架出现，需要学习的东西越来越多，对于前端人员的要求也越来越高，面试的难度也越来越大。最后希望网酷小组的同学们，能够在不断变化的前端领域中找到自己的一条学习之路，不断变强。