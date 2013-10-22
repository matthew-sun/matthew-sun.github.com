---
layout: post
title: 网页重构的html规范
tags: [ Standard , html  ]
category: Frontend
description: 规范是前端工程师评判代码的一杆重要标尺，本文总结了一套的html规范，供各位看客取用。
---
>因为个人能力有限，本文是参照了网易[NEC](http://nec.netease.com/standard/html-structure.html)的HTML规范和自己对于html的理解整合而成。

#html代码规范：
###html基础设施
+ 如我们所知不同的Doctype声明，将会触发浏览器不同的渲染模式，主要分为遵循W3C规范的标准模式和[怪异模式](http://zh.wikipedia.org/wiki/%E6%80%AA%E5%BC%82%E6%A8%A1%E5%BC%8F)。而因为html5的流行，我们不需要去管因为遗留下原因的不同dtd，主需要统一的在文件的顶格开始声明"<!DOCTYPE html>"。
+ 必须申明文档的编码charset，且与文件本身编码保持一致，推荐使用UTF-8编码<meta charset="utf-8"/>。
+ 根据页面内容和需求填写适当的keywords和description。
+ 页面title是极为重要的不可缺少的一项。
+ 对于兼容性的处理可以考虑使用[IE注释法](http://www.veryhuo.com/a/view/50853.html)加上class锚点
<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;head&gt;
&lt;meta charset="utf-8"/&gt; 
&lt;title&gt;文章标题&lt;/title&gt; 
&lt;meta name="keywords" content=""/&gt; 
&lt;meta name="description" content=""/&gt; 
&lt;meta name="viewport" content="width=device-width"/&gt; 
&lt;link rel="stylesheet" href="css/style.css"/&gt; 
&lt;link rel="shortcut icon" href="img/favicon.ico"/&gt; 
&lt;link rel="apple-touch-icon" href="img/touchicon.png"/&gt; 
&lt;/head&gt; 
&lt;body&gt; 
 
&lt;/body&gt; 
&lt;/html&gt;
</pre>
###结构、表现、行为三者分离，避免内联
+ 使用link将css文件引入，并置于head中。
+ 使用script将js文件引入，并置于body底部。
###保持良好的简洁的树形结构
+ 每一个块级元素都另起一行，每一行都使用Tab缩进对齐（head和body的子元素不需要缩进）。删除冗余的行尾的空格。
+ 使用4个空格代替1个Tab（大多数编辑器中可设置）。
+ 你也可以在大的模块之间用空行隔开，使模块更清晰。
+ 模块首尾使用注释标示
<pre>
&lt;body&gt; 
&lt;!-- S 侧栏内容区 --&gt; 
&lt;div class="m_side"&gt; 
    &lt;div class="side"&gt; 
        &lt;div class="sidein"&gt; 
            &lt;!-- 热门标签 --&gt; 
            &lt;div class="sideblk"&gt; 
                &lt;div class="m-hd3"&gt;&lt;h3 class="tit"&gt;热门标签&lt;/h3&gt; &lt;/div&gt; 
                ... 
            &lt;/div&gt; 
 
            &lt;!-- 最热TOP5 --&gt; 
            &lt;div class="sideblk"&gt; 
                &lt;div class="m-hd3"&gt;&lt;h3 class="tit"&gt;最热TOP5&lt;/h3&gt; &lt;a href="#" class="s-fc02 f-fr"&gt;更多&raquo;&lt;/a&gt;&lt;/div&gt; 
                ... 
            &lt;/div&gt; 
        &lt;/div&gt; 
    &lt;/div&gt; 
&lt;/div&gt; 
&lt;!-- E 侧栏内容区 --&gt; 
&lt;/body&gt; 
</pre>     