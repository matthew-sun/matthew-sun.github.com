---
layout: post
title: ECMA5系列介绍---Object
tags: [ javascript，ECMA, 无线前端 ]
category: Frontend
description: ECMAScript 5规范在09年正式发布了，随着智能手机的普及和浏览器厂商的支持，无线前端开发者们也终于可以放心的在项目中实际使用了。本文是ECMA5系列介绍的一篇，主要讲解的是关于Object相关的API。
---
##Object.create(prototype[, descriptors])
###描述：创建一个具有指定原型且可选择性地包含指定属性的对象。
###参数：
prototype: 必需。对象的原型链，可以为null<br>
descriptors: 可选。包含一个或多个属性描述符的 JavaScript 对象。<br>
> 属性描述一共有四个，分别是value,writable,enumerable和configurable，value是该属性的值，后面三个若未指定则默认为false，对应的中文解释分别为是否只读，是否可以被枚举(for in)，是否可以被删除。<br>
这里只需要知道即可，关于数据属性还有访问器属性将在下面的defineProperty中作详细解释。

###示例：
####创建一个普通对象模型

	var o = Object.create({
		name: 'matthewsun',
		getName: function() {
			return this.name
		}
	})
	
	console.log(o.getName())
	console.log(Object.getPrototypeOf(o)) // 获取原始对象的原型
	console.log(Object.getOwnPropertyDescriptor(o)) // 获取对象的属性描述符

	// output
	// "matthewsun"
	// [object Object]
	// undefined

####创建一个以null为对象原型，并添加一些属性描述。

	var o = Object.create(null, {
	  name: {
	     value: 'matthewsun',
	     writable: true
	  }
	})
	
	console.log(o.name)
	console.log(Object.getPrototypeOf(o)) 
	console.log(Object.getOwnPropertyDescriptor(o, 'name'))

	// output
	// "matthewsun"
	// null
	// Object {value: "matthewsun", writable: true, enumerable: false, configurable: false} 
	
##Object.defineProperty(object, propertyname, descriptor)
###描述：将属性添加到对象或修改现有属性的特性。
###参数：
object: 必需。对其添加或修改属性的对象。这可以是本机 JavaScript 对象（即用户定义的对象或内置对象）或 DOM 对象。<br>
propertyname：一个包含属性名称的字符串。<br>
descriptor：必需。属性的描述符。它可以针对数据属性或访问器属性。<br>
###示例：
####添加数据属性
	
	var obj = {};
	
	Object.defineProperty(obj, "newDataProperty", {
	    value: 101,
	    writable: true,
	    enumerable: true,
	    configurable: true
	});
	
	obj.newDataProperty = 102;
	console.log( Object.getOwnPropertyDescriptor(obj, 'newDataProperty') )
	console.log("Property value: " + obj.newDataProperty);

	// output
	// [object Object] {configurable: true,enumerable: true,value: 102,writable: true}
	// "Property value: 102"

假如修改writable值为false，则输出的value为101<br>
假如修改configurable值为false，则不能使用delete obj.newDataProperty

####修改数据属性

	Object.defineProperty(obj, "newDataProperty", { writable: false });
	
	console.log( Object.getOwnPropertyDescriptor(obj, 'newDataProperty')['writable'] )

	// output
	// false

####添加访问器属性

	var obj = {};
	
	Object.defineProperty(obj, "newAccessorProperty", {
	    set: function (x) {
	        document.write("in property set accessor" + newLine);
	        this.newaccpropvalue = x;
	    },
	    get: function () {
	        document.write("in property get accessor" + newLine);
	        return this.newaccpropvalue;
	    },
	    enumerable: true,
	    configurable: true
	});
	
	obj.newAccessorProperty = 30;
	console.log("Property value: " + obj.newAccessorProperty);

	// output
	// Property value: 30

请注意这里并没有对newAccessorProperty属性设置value值和writable属性，全靠get/set对数据属性进行了访问，假如删去了get/set，将会返回undefined。

####修改访问器属性

	Object.defineProperty(obj, "newAccessorProperty", {
	    get: function () {
			console.log('change.')
			return this.newaccpropvalue; 
		}
	});

	console.log("Property value: " + obj.newAccessorProperty);

	// output
	// change.
	// Property value: 30

####修改DOM元素上的属性

	
        var descriptor = Object.getOwnPropertyDescriptor(Element.prototype, "querySelector");
 
        descriptor.value = "query";
        descriptor.writable = false;
        Object.defineProperty(Element.prototype, "querySelector", descriptor);

        var elem = document.getElementById("div");

        elem.querySelector = "anotherQuery";
        console.log(elem.querySelector);
		// query

请注意此例子页面中必须包含id为div的元素。
##如果有任何问题都可以在下方给予我留言~

