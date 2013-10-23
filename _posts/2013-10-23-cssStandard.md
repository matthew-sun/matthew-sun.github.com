---
layout: post
title: 网页重构的css规范
tags: [ Standard , css ,网页重构  ]
category: Frontend
description: 规范是前端工程师评判代码的一杆重要标尺，本文总结了一套的css规范，供各位看客取用。
---

#css代码规范：
###模块和组件
我们将具有一定公用性的DOM结构抽取成模块。包含全局模块（全站公用，比如翻页、按钮等），局部模块(部分页面用到)。
#####常规结构
- 最外层容器
- 内部容器，方便设置统一的padding值，也方便后期扩展样式。
- 模块头部
- 模块身体（可以出现多次）
- 模块尾部（可以没有）<br>
示例：

		<div class="mod_x">
			<div class="mod_x_inner">
				<div class="mod_x_hd"></div>
				<div class="mod_x_bd"></div>
				<div class="mod_x_ft"></div>
			</div>
		</div>

如果需要对该模块扩展个性化样式，可在该模块最外层新增个性化的className，针对新的className来扩展表现。
			
	比如：<div class="mod_list hotsale_list">
###命名规则
#####为什么命名很重要？
- 快速高效开发（命名费时）；
- 安全（解耦无依赖）；
- 方便维护（一目了然的命名，无耦合的模块化规范）；
- 方便复用（高度抽象、细粒度、可拼装的组件）
#####模块命名
+ 公共模块可用mod作为前缀。比如：

		.mod_btn
+ 局部模块可用{页面名缩写}_mod为前缀。比如：

		.sy_mod_btn

PS: 对模块/组件重置样式时，需要自己加入新的样式名来进行差异化表现。
#####普通命名
- 大部分情况下使用长命名（继承父级的className），安全起见，外层布局模块必须使用长命名。比如：

		.hotlist > .hotlist_hd > .hotlist_hd_extra
- 也可以考虑使用祖先命名法，即子模块只集成祖先模块的前缀。比如：

		.hotlist > .hotlist_hd > .hotlist_extra
- 内部元素根据情况(比如可判定该结构中不会再嵌套其他元素时)可使用短单词命名。<br>
  比如：tit、more。
		