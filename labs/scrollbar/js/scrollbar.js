/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 * jQuery mousewheel插件
 */

;(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
/**
 * @author : matthewsun
 * @mail : matthew-sun@foxmail.com
 * @date : 2014/03/12
 * @description : 自定义滚动条
 */
;(function(){
	var customScroll = {
		//初始化配置
		config : {
			mCustomScrollBox : "mCustomScrollBox" ,
			mCSB_container : "mCSB_container" ,
			mCSB_scrollTools : "mCSB_scrollTools" ,
			mCSB_dragger : "mCSB_dragger" 
		},
		//初始化函数
		init :  function(){
			//变量
			var
				$mCustomScrollBox = $('#' + this.config.mCustomScrollBox) ,
				$mCSB_container = $('#' + this.config.mCSB_container) ,
				$mCSB_scrollTools = $('#' + this.config.mCSB_scrollTools) ,
				$mCSB_dragger = $('#' + this.config.mCSB_dragger)
				speed = 15 ;//滚轮速度

            this.isShow($mCSB_container,$mCustomScrollBox,$mCSB_scrollTools);
			this.drag($mCSB_dragger,$mCSB_scrollTools);
			this.mouseWheel($mCustomScrollBox,$mCSB_dragger,$mCSB_scrollTools,speed);
			this.roll($mCSB_scrollTools,$mCSB_dragger);
		},
        // 内容超出显示滚动条
        isShow : function(mCSB_container,mCustomScrollBox,mCSB_scrollTools){
            var 
                innerHeight = mCSB_container.height(),
                outerHeight = mCustomScrollBox.height();
            if(innerHeight>outerHeight){
                mCSB_scrollTools.show();
            }else {
                mCSB_scrollTools.hide();
                this.drag = this.mouseWheel = this.roll = function(){
                    return ;
                }
            }

        },
		//鼠标滚轮拖拽事件
		drag : function(dragger,scrollTools){
			var _this = this;
			dragger.on('mousedown',function(event){
				$(document).on('mousemove',function(event){
					var t = event.pageY - scrollTools.offset().top;
					_this.setPosition(t);
				});
				$(document).on('mouseup',function(){
					$(document).unbind('mousemove');
					$(document).unbind('mouseup');
				})
				return false;
			})
		},
		//内容区域滚轮事件
		mouseWheel : function(mCustomScrollBox,mCSB_dragger,mCSB_scrollTools,speed){
			var _this = this;
			mCustomScrollBox.on('mousewheel',function(event,delta){
				if(delta>0) {
					_this.setPosition(mCSB_dragger.offset().top-mCSB_scrollTools.offset().top-speed);
				}else if(delta<0){
					_this.setPosition(mCSB_dragger.offset().top-mCSB_scrollTools.offset().top+speed);
				}
				return false;
			})
		},
		// 指哪滚哪
		roll : function(mCSB_scrollTools,mCSB_dragger){
			var _this = this;
			mCSB_scrollTools.on('click',function(event){
				if(event.pageY >mCSB_dragger.offset().top && event.pageY< (mCSB_dragger.offset().top+mCSB_dragger.height())){
					return ;
				}
				var t = event.pageY - mCSB_scrollTools.offset().top;
				_this.setPosition(t);
				return false;
			})
		},
		//设置滚动条及内容的位置
		setPosition : function(p){
			var
				$mCustomScrollBox = $('#' + this.config.mCustomScrollBox) ,
				$mCSB_container = $('#' + this.config.mCSB_container) ,
				$mCSB_scrollTools = $('#' + this.config.mCSB_scrollTools) ,
				$mCSB_dragger = $('#' + this.config.mCSB_dragger) ,
				_minHeight = $mCSB_scrollTools.height()-$mCSB_dragger.height();//鼠标滚轮可滑动的高度

			if(p<0){
				p = 0;
			}else if(p>_minHeight){
				p = _minHeight;
			}

			$mCSB_dragger.css('top',p+'px');
			var contentTop = -($mCSB_container.height() - $mCustomScrollBox.height())*p/_minHeight +'px';
			$mCSB_container.css('top',contentTop);
		}
	}
	customScroll.init();
})()