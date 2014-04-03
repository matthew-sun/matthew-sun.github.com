/**
 * @author : matthewsun
 * @mail : matthew-sun@foxmail.com
 * @date : 2014/04/01
 * @description :（Note）创建一个投票便签对象，实现allStar全明星投票便签交互动作
 * @description :（Mask）调用遮罩层，弹出交互信息
 */
;(function(){
    // 便签
    var Note = {
        init : function() {
            this.radio();
        },
        // 每行单选一个Li
        radio : function() {
            var 
                $player = $('#J_player') ,
                $aPreOption = $('#J_player .pre_option a') ,
                _this = this ,
                holder = true;

            $player.on('click',function(event){
                event.preventDefault();
                var $this = $(event.target) ; // 活动响应源

                if($this.is($aPreOption)) {

                    if($this.hasClass("on")) {
                        $this.removeClass();

                    }else {// 没有选择时，点击单选选手

                        $this.parent().parent().find('.pre_option a').removeClass();
                        $this.addClass("on");

                        var activeOption = $aPreOption.filter('.on');
                        if(activeOption.length == 5) {

                            // 检测是否是第一次投票
                            if(holder) {
                                var innerText = '';
                                activeOption.each(function() {
                                    innerText += $(this).text() + ',';
                                });
                                innerText = innerText.substring(0,innerText.length-1);
                                _this.showNote(innerText);
                                holder = false;
                            }else {
                                var msg = '每个用户只能投票一次！';
                                Mask.show(msg,2);
                            }
                        };
                    };
                };
            });
         },
         // 便签展示动画
         showNote : function(text) {
            // 插入便签的相关配置
            var 
                l = returnRandom(20,448) ,
                t = returnRandom(20,150) ,
                picNum = returnRandom(1,6) ,
                time = CurentTime() ,
                $blackboard = $('#J_blackboard') ,
                str = ' <div class="note_card" id="J_card" style="background:url(http://static.vas.pptv.com/vas/1717wan/zone/allstar/v_20140401163924/css/note'+ picNum +'.png) 0 0 no-repeat; "><p class="n_user">来自Matthew的留言</p><p class="n_players">'+ text +'</p><p class="n_say">他们才是真正的梦之队！</p><p class="n_time">'+ time +'</p></div> ';

            $blackboard.append(str);

            var $card = $('#J_card');
            $card.animate({
                left : l ,
                top : t ,
                opacity : 1
            },300);
         }
    };
    Note.init();

    // 遮罩层
    var Mask = {
        // 遮罩层显示
        show : function(msg,errCode) {

            /**
             * 参数说明
             * errCode : 1 ==>> 没有登录 ,errCode : 2 ==>> 已投票
             */
            switch(errCode) {
                case 1 : 
                    $('#J_layers .sure').text("前往登录")
                                        .removeClass('J_close')
                                        .attr("href","http://www.1717wan.cn/?c=user&a=login&forward=http%3A%2F%2Fwww.1717wan.cn%2F");
                    break ;

                case 2 :
                    $('#J_layers .sure').text("确定");
                    break ;

                default :
                    console.log('没有传入正确的参数');
                    break ;
            }

            // 背景黑层
            if($(".J_bg_layer").length == 0){
                $("body").append('<div class="J_bg_layer"></div>');
                this.el = $(".J_bg_layer");
            }

            style = {
                "position" : "absolute",
                "left"     : 0,
                "top"      : 0,
                "margin"   : 0,
                "opacity"  : 0,
                "z-index"  : 89,
                "background-color" : "#000",
                "width"    : $(document).width() ,
                "height"   : $(document).height()
            };

            this.el.css(style);
            this.el.stop().animate({
                "opacity" : .4
            },220);


            var 
                $layers = $('#J_layers') ,
                $message = $('#J_msg') ,
                l = $(window).width()/2 - $layers.width()/2,
                t = $(window).height()/2 - $layers.height()/2 + $(document).scrollTop() ,
                tDown = $(window).height() + $(document).scrollTop() ;

            $message.text(msg) ;
            $layers.css({
                "position" : "absolute",
                "display" : "block" ,
                "left" : l ,
                "z-index"  : 90,
                "top" : tDown ,
                "opacity" : 0
            });

            $layers.stop().animate({
                "opacity" : 1 ,
                "top" : t
            },220)


            this.hide(); 
        },
        // 遮罩层隐藏
        hide : function() {
            var 
                $layers = $('#J_layers') ,
                $close = $("#J_layers .J_close") ,
                $bg_layer = $(".J_bg_layer") ,
                tTop = $(document).scrollTop();

            $close.on('click' ,function() {
                
                $layers.stop().animate({
                    "opacity" : 0 ,
                    "top" : tTop
                },220,function(){
                    $(this).hide();
                });

                $bg_layer.stop().animate({
                    "opacity" : 0
                },220,function() {
                    $(this).hide().remove();
                })
            })
        }
    }

    // 返回n-m之间的随机数,并取整
    function returnRandom(n,m) {
        var num = Math.random()*(n-m)+m
        return Math.floor(num);
    }

    // 返回当前时间(如:2014/04/1 12:00)
    function CurentTime() {
        var now = new Date();

        var year = now.getFullYear(); //年
        var month = now.getMonth() + 1; //月
        var day = now.getDate(); //日

        var hh = now.getHours(); //时
        var mm = now.getMinutes(); //分

        var clock = year + '/';

        if(month < 10)
        clock += '0';

        clock += month + '/';

        if(day < 10)
        clock += '0';

        clock += day + ' ';

        if(hh < 10)
        clock += '0';

        clock += hh + ':';
        if (mm < 10) clock += '0';
        clock += mm;
        return(clock);
    }
    // 获取cookie值
    function getCookie(name) {

        var arr = document.cookie.split('; ');
        var i = 0;
        for (i = 0; i < arr.length; i++)
        {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name)
            {
                return arr2[1];
            }
        }
        return '';
    }
})()