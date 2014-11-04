爱模板 itpl 1.0.0 版
==========================

### ==========================

###描述
项目目的：综合市面上的模板引擎，生成自己所需要的功能的模板引擎<br>

功能特性：<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.提供预编译功能，加块模板渲染速度，速度是未编译模板输出的20倍以上。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.提供直接输出方法，且缓存是script标签提供的模板。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.提供简单模板方法，加快不需要提供js逻辑的模板渲染速度。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d.默认html(转义)，提供定义变量结尾未定义‘；’的容错处理机制。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.模板中可以使用html注释。

###文档
使用示例：

    <script src="itpl.js"></script> 
    <script id='tpl' type="text/html">
        <div><%=name%></div>
        <div><%=age%></div>
        <%for(var i=0,len=3;i<len;i++){%>
            <div><%=i%></div>
        <%}%>
    </script>
    <script>
    var str1 = '<div><%=name%></div>\
                <div><%=age%></div>\
                <%for(var i=0,len=3;i<len;i++){%>\
                    <div><%=i%></div>\
                <%}%>';
    var str2 = '<div><%=name%></div>\
                <div><%=age%></div>';
            
    var data = {
        name : 'matthewsun',
        age : 22
    }
    // 根据script id，直接输出
    var result1 = itpl('tpl',data);
    // 直接编译str输出
    var result2 = itpl(str1,data);

    //先编译，再输出
    var html3 = itpl('tpl-3',str1);
    var result3 = itpl('tpl-3',data);

    //简单模板引擎
    var result4 = itpl.render(str2,data);

    window.onload = function() {
        toHtml(result1,'test1');
        toHtml(result2,'test2');
        toHtml(result3,'test3');
        toHtml(result4,'test4');
    }

    function toHtml(str,id) {
        var el = document.getElementById(id);
        el.innerHTML = str;
    }
    </script>
       


