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
+ 最外层容器
+ 内部容器，方便设置统一的padding值，也方便后期扩展样式。
+ 模块头部
+ 模块身体（可以出现多次）
+ 模块尾部（可以没有）<br>
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
+ 快速高效开发（命名费时）；
+ 安全（解耦无依赖）；
+ 方便维护（一目了然的命名，无耦合的模块化规范）；
+ 方便复用（高度抽象、细粒度、可拼装的组件）
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
#####常用命名词汇
<table class="table table-bordered table-hover">
    <thead>
        <tr>
            <th>单词</th><th>描述</th>
            <th>单词</th><th>描述</th>
            <th>单词</th><th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                header
            </td>
            <td>头部</td>
            <td>
                list
            </td>
            <td>列表</td>
            <td>
                dig
            </td>
            <td>投票 / 顶</td>
        </tr>
        <tr>
            <td>
                logo
            </td>
            <td>
                logo
            </td>
            <td>
                item
            </td>
            <td>列表项</td>
            <td>
                bury
            </td>
            <td>踩   相对于dig</td>
        </tr>
        <tr>
            <td>
                nav
            </td>
            <td>导航</td>
            <td>
                tab
            </td>
            <td>切换标签</td>
            <td>
                open
            </td>
            <td>打开</td>
        </tr>
        <tr>
            <td>
                container
            </td>
            <td>主要容器</td>
            <td>
                item
            </td>
            <td>列表项</td>
            <td>
                get
            </td>
            <td>获取</td>
        </tr>
        <tr>
            <td>
                main
            </td>
            <td>主体</td>
            <td>
                tips
            </td>
            <td>提示气泡框</td>
            <td>
                apply
            </td>
            <td>申请 / 应用</td>
        </tr>
        <tr>
            <td>
                sub
            </td>
            <td>附属</td>
            <td>
                btn
            </td>
            <td>按钮 – button的缩写</td>
            <td>
                del
            </td>
            <td>删除 – delete的缩写</td>
        </tr>
        <tr>
            <td>
                title
            </td>
            <td>标题</td>
            <td>
                ico
            </td>
            <td>图标 – icon的缩写</td>
            <td>
                close
            </td>
            <td>关闭</td>
        </tr>
        <tr>
            <td>
                copyright
            </td>
            <td>版权</td>
            <td>
                wrapper
            </td>
            <td>包裹容器</td>
            <td>
                send
            </td>
            <td>发送</td>
        </tr>
        <tr>
            <td>
                quick
            </td>
            <td>快速_xx</td>
            <td>
                guide/hint/tip
            </td>
            <td>指引，提示</td>
            <td>
                advice
            </td>
            <td>建议</td>
        </tr>
        <tr>
            <td>
                layer
            </td>
            <td>浮层，[notice]_layer</td>
            <td>
                panel
            </td>
            <td>面板</td>
            <td>
                channel

            </td>
            <td>频道</td>
        </tr>
        <tr>
            <td>
                trigger
            </td>
            <td>触发点</td>
            <td>
                gg
            </td>
            <td>广告</td>
            <td>
                major/main
            </td>
            <td>主屏/主要内容</td>
        </tr>
        <tr>
            <td>
                sidebar
            </td>
            <td>侧栏</td>
            <td>
                ext/extra
            </td>
            <td>扩展内容</td>
            <td>
                notice
            </td>
            <td>公告</td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered table-hover">
    <tbody>
        <tr>
            <th>状态</th>
            <th>描述</th>
        </tr>
        <tr>
            <td> hover </td>
            <td>划过态 – 通常只生效于使用指针交互的设备</td>
        </tr>
        <tr>
            <td> disabled </td>
            <td>不可用状态 – 用于 form 、button 等。</td>
        </tr>
        <tr>
            <td>
                active
            </td>
            <td>激活态 – 通常指 button /   link 被按下的状态</td>
        </tr>
        <tr>
            <td>
                current
            </td>
            <td>当前态 – 用于nav 、 tab、steps、flow步骤提示。强调的是页面或模块当前状态。</td>
        </tr>
        <tr>
            <td>
                selected
            </td>
            <td>选中态 – 用于 radio 、 button 等。强调的是按钮本身的状态。</td>
        </tr>
        <tr>
            <td>
                focus
            </td>
            <td>获取焦点状态 – 通常用于具有   tab-index 属性的元素。常见的如 button 、 form element</td>
        </tr>
        <tr>
            <td>
                show
            </td>
            <td>显示状态 – 控制对象显示，属于非常用词汇。</td>
        </tr>
        <tr>
            <td>
                hide
            </td>
            <td>隐藏状态 – 控制对象隐藏。</td>
        </tr>
    </tbody>
</table>