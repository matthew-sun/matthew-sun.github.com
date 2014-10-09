---
layout: post
title: 致程序设计的五大原则
tags: [ 代码设计 ]
category: Frontend
description: OO设计的五大原则。1、单一职责原则；2、开放封闭原则；3、里氏替换原则；4、依赖倒置原则；5、接口隔离原则。因为js的对象大多是和页面中的dom元素相关的，我们有时会忽略这些设计原则，导致我们的js代码变得难以维护，不利于大型前端项目或者SPA的开发。本文着重介绍这五种设计原则，以及和前端相结合的点。
---
##单一职责原则
###概念解释：
就一个类而言，应该仅有一个引起它变化的原因，如果你能想到多于一个动机去改变一个类，那么这个类就具有多于一个类的职责。应该把多于的职责分离出去，分别再创建一些类来完成每一个职责。简而言之，一个类仅干一件事。
###前端意义：
在前端的业务层中，我们有时会使用一个单例模式，创建一个对象，耦合页面中所有的业务操作，做到对命名空间的划分，和方便统一操作。但是，在这个中间，会遇到一个问题，从职责上划分，这个对象拥有多个职责，不符合单一职责原则。有什么坏处？第一点，单个程序文件的代码超过300行，我就认为这个代码是难以维护的，这里显然很容易超过这个量级。第二点，业务层的代码之后若是要抽离成组件，代价巨大，因为类的职责不够清晰。第三点，代码难以被其他业务复用，并且业务代码也很难被定制。
###举个例子：
	
	多职责：
	var index = (function(){
		return {
			login : function() {
				...
			},
			dialog : function() {
				...
			},
			tab : function() {
				...
			},
			play : function() {
				...
			},
			...
		}
	})();

	单一职责（利用seajs）：	
	define(function(require, exports, module){
	    var $ = require("jquery");
		var login = require("./login");
		var dialog = require("./dialog");
		var tab = require("./tab");
		var play = require("./play");

		$(function(){
			login();
			dialog();
			tab();
			play();
		})
	})

##开放封闭原则
###概念解释：
一个软件实体应当对扩展开发,对修改关闭.说的是,再设计一个模块的时候,应当使这个模块可以在不被修改的前提下被扩展.换言之,应当可以在不必修改源代码的情况下改变这个模块的行为，在保持系统一定稳定性的基础上，对系统进行扩展。这是面向对象设计（OOD）的基石，也是最重要的原则。简而言之，修改类只能在外部扩展，不能在内部修改。
###前端意义：
这个场景在前端编写js类库的时候经常用到，大名鼎鼎的jquery使用的插件机制，就是符合了这一个原则，对内封闭，对外开放。对于开放封闭原则的代码实现，我们往往要用到的是自定义事件。在对象内部，派发事件，在对象外部，通过扩展订阅事件。
###自定义事件代码：

	/**
 	 * EVENT model
     */
	var func = {};
    
    ;(function(func) {

        var _cache = {};

        /**
         * 广播事件
         * 目标: 为了尽可能的减少模块之间业务逻辑的耦合度, 而开发了这个eventbus, 主要用于业务逻辑的事件传递
         * 使用规范: 每个js模块尽可能通过事件去通信, 减少模块之间的直接调用和依赖(耦合)
         */
        
        /**
         * 派发
         * @param  {[type]} type 事件类型
         * @param  {[type]} data 回调数据
         * @return {[type]}      [description]
         */
        func.fire = function(type, data) {
            var listeners = _cache[type],
                len = 0;
            if (typeof listeners !== 'undefined') {
                var args = [].slice.call(arguments, 0);
                args = args.length > 2 ? args.splice(2, args.length - 1) : [];
                args = [data].concat(args);

                len = listeners.length;
                for (var i = 0; i < len; i++) {
                    var listener = listeners[i];
                    if (listener && listener.callback) {
                        args = args.concat(listener.args);
                        listener.callback.apply(listener.scope, args);
                    }
                }
            }
            return this;
        }

        /**
         * 订阅广播事件
         * @param  {[type]}   types     事件类型，支持,分隔符
         * @param  {Function} callback 回调函数
         * @param  {[type]}   scope    回调函数上下文
         * @return {[type]}            this
         */
        
        func.on = function(types, callback, scope) {
            types = types || [];
            var args = [].slice.call(arguments);

            if (typeof types === 'string') { 
                types = types.split(',');
            }
            var len = types.length;
            if (len === 0) {
                return this;
            }
            args = args.length > 3 ? args.splice(3, args.length - 1) : [];
            for (var i = 0; i < len; i++) {
                var type = types[i];
                _cache[type] = _cache[type] || [];
                _cache[type].push({
                    callback: callback,
                    scope: scope,
                    args: args
                });
            }
            return this;
        }

        /**
         * 退订
         * @param  {[type]}   type     [description]
         * @param  {Function} callback 假如传入则移出传入的监控事件，否则移出全部
         * @return {[type]}            [description]
         */
        
        func.un = function(type, callback, scope) {
            var listeners = _cache[type];
            if (!listeners) {
                return this;
            }
            if (callback) {
                var len = listeners.length,
                    tmp = [];

                for (var i = 0; i < len; i++) {
                    var listener = listeners[i];
                    if (listener.callback == callback && listener.scope == scope) {} else {
                        tmp.push(listener);
                    }
                }
                listeners = tmp;
            } else {
                listeners.length = 0;
            }
            return this;
        }

        func.removeAll = function() {
            _cache = {};
            return this;
        }

    })(func)

##里氏替换原则
###概念解释：
子类可以扩展父类的功能，但不能改变父类原有的功能。

- 子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法。
- 子类中可以增加自己特有的方法。
- 当子类的方法重载父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
- 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。
###前端意义：
在前端中，比如弹出层，父类可以定义一些抽象方法，派发给子类去实现，多用于对子类代码的规范。

##依赖倒置原则
###概念解释：
具体依赖于抽象，抽象不依赖于具体。
###前端意义：
这个很简单了，抽象的方法不应该是依赖于具体的实现的。

##接口隔离原则
###概念解释：
- 一个类对另外一个类的依赖性应该建立在最小的接口上
- 一个接口代表一个角色,不应该把不同的角色都交给一个接口。没有关系的接口合并在一起，形成一个臃肿的大接口,这是对角色和接口的污染.
- 不应该强迫客户依赖他们不用的方法。接口属于客户，不属于他所在的类的层次结构
###前端意义：
当我们使用接口时在接口里面定义的方法要做要高类聚，作用要单一，不能把什么都放在里面，要用到多接口。在前端中，业务层代码，只需用一个像单一职责模式中的例子，很容易发展成为一个胖接口。所以，我引入了一个区域模块的概念，即一个页面的一块区域的代码接口耦合，这样也方便模块的整拿争取。
###举个例子：
	
	区域模块：
	define(function(require, exports, module){
	    var $ = require("jquery");
		var login = require("./login");
		var dialog = require("./dialog");
		
		function loginArea() {
			login();
			dialog();
		}
		return loginArea;
	})

	业务模块：	
	define(function(require, exports, module){
	    var $ = require("jquery");
		var loginArea = require("./loginArea");
		var tab = require("./tab");
		var play = require("./play");

		$(function(){
			loginArea();
			tab();
			play();
		})
	})




	