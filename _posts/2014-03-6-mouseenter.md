---
layout: post
title: 为什么使用mouseenter而不是使用mouseover
tags: [ js ]
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