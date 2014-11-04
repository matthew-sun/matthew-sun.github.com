---
layout: post
title: 为什么使用mouseenter而不是使用mouseover
tags: [ Javascript ]
category: Frontend
description: mouseover事件与mouseenter事件的区别
---
[Demo]: /labs/mouseenter/mouseenter.html

mouseover会触发冒泡事件，即不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
不想让这种情况发生，怎么解决？<br>
使用mouseenter/mouseleave事件。<br>
对应mouseout,只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。<br>
对应mouseleave，mouseenter子元素不会反复触发事件，否则在IE中经常有闪烁情况发生。

下面不如来看一个例子来说明这种情况：[Demo]

可是mouseenter和mouseleave这么好的东西，只有在IE下是有onmouseenter的一系列事件支持的，在非IE浏览器如Chrome、FF下就没有这类事件。如果使用的是JQuery开发，则没有问题，因为mouseenter已经被封装成了一个JQuery事件，支持所有浏览器。<br>
但是在使用原生JS时，应该如何模拟这个方法？<br><br>
以下提供一个模拟的方案：

    //ele为目标元素，type为事件类型不用'on'，func为事件响应函数
    var addEvent=function(ele,type,func){
        if(window.document.all) 
            ele.attachEvent('on'+type,func);//ie系列直接添加执行
        else{//ff
            if(type==='mouseenter')
                ele.addEventListener('mouseover',this.withoutChildFunction(func),false);
            else if(type==='mouseleave')
                ele.addEventListener('mouseout',this.withoutChildFunction(func),false);
            else
                ele.addEventListener(type,func,false);      
        }
    }
    var withoutChildFunction=function(func){
        return function(e){
            var parent=e.relatedTarget;//上一响应mouseover/mouseout事件的元素
            while(parent!=this&&parent){//假如存在这个元素并且这个元素不等于目标元素（被赋予mouseenter事件的元素）
				try{
                    parent=parent.parentNode;}//上一响应的元素开始往上寻找目标元素
                catch(e){
                    break;
                }
            }
            if(parent!=this)//以mouseenter为例，假如找不到，表明当前事件触发点不在目标元素内
            func(e);//运行目标方法，否则不运行
        }
    }