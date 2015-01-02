---
layout: post
title: ECMA5系列介绍---Object
tags: [ javascript，ECMA, 无线前端 ]
category: Frontend
description: ECMAScript 5规范在09年正式发布了，随着智能手机的普及和浏览器厂商的支持，无线前端开发者们也终于可以放心的在项目中实际使用了。本文是ECMA5系列介绍的一篇，主要讲解的是关于Object相关的API。
---
## Object.create(prototype[, descriptors])
### 描述：
创建一个具有指定原型且可选择性地包含指定属性的对象。
### 参数：
prototype: 必需。对象的原型链，可以为null<br>
descriptors: 可选。包含一个或多个属性描述符的 JavaScript 对象。<br>
> 属性描述一共有四个，分别是value,writable,enumerable和configurable，value是该属性的值，后面三个若未指定则默认为false，对应的中文解释分别为是否只读，是否可以被枚举(for in)，是否可以被删除。<br>
这里只需要知道即可，关于数据属性还有访问器属性将在下面的defineProperty中作详细解释。

### 示例：
#### 创建一个普通对象模型

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

#### 创建一个以null为对象原型，并添加一些属性描述。

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
	
## Object.defineProperty(object, propertyname, descriptor)
### 描述：
将属性添加到对象或修改现有属性的特性。
### 参数：
object: 必需。对其添加或修改属性的对象。这可以是本机 JavaScript 对象（即用户定义的对象或内置对象）或 DOM 对象。<br>
propertyname：一个包含属性名称的字符串。<br>
descriptor：必需。属性的描述符。它可以针对数据属性或访问器属性。<br>
### 示例：
#### 添加数据属性
	
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

#### 修改数据属性

	Object.defineProperty(obj, "newDataProperty", { writable: false });
	
	console.log( Object.getOwnPropertyDescriptor(obj, 'newDataProperty')['writable'] )

	// output
	// false

#### 添加访问器属性

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

#### 修改访问器属性

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

#### 修改DOM元素上的属性

	
    var descriptor = Object.getOwnPropertyDescriptor(Element.prototype, "querySelector");

    descriptor.value = "query";
    descriptor.writable = false;
    Object.defineProperty(Element.prototype, "querySelector", descriptor);

    var elem = document.getElementById("div");

    elem.querySelector = "anotherQuery";
    console.log(elem.querySelector);
	// query

请注意此例子页面中必须包含id为div的元素。

## Object.defineProperties(object, descriptors)
### 描述：
将一个或多个属性添加到对象，并/或修改现有属性的特性。
### 参数
object: 必需。对其添加或修改属性的对象。这可以是本机 JavaScript 对象（即用户定义的对象或内置对象）或 DOM 对象。<br>
descriptors：必需。包含一个或多个描述符对象的 JavaScript 对象。 每个描述符对象描述一个数据属性或访问器属性。<br>
### 示例
#### 添加属性

	var obj = {}
	
	Object.defineProperties(obj, {
		newData: {
			value: 10,
			writable: true
		},
		newAccessor: {
			get: function() {
                console.log('get')
				return this.newAccessorValue
			},
			set: function(x) {
                console.log('set')
				this.newAccessorValue = x
			},
			enumerable: true
		}
	})
	
	obj.newData = 10
	console.log( obj.newData )
	
	// output
	// set
	// get
	// 10
#### 修改属性
	
	Object.defineProperties(obj, {
		newData: {writable: false},
		newAccessor: {enumerable: false}
	})

## Object.getPrototypeOf(object)
### 描述：
返回对象的原型
### 参数：
object：必须。引用原型的对象。
### 示例：

	function Person(name, age) {
	  this.name = name
	  this.age = age
	}
	var me = new Person('matthew', 22)
	var proto = Object.getPrototypeOf(me)
	
	proto.sex = 'male'
	console.log(me.sex)
	console.log(Person.prototype.sex)
	console.log(proto === Person.prototype)
	console.log(proto.isPrototypeOf(me))

	// output
	// male
	// male
	// true
	// true
	
#### 验证数据类型：

	var arr = []
	var result = (Object.getPrototypeOf(arr) === Array.prototype)
	console.log(result)
	// true

#### 扩展，过去验证数据类型：

	var arr = []
	var result = (Object.prototype.toString.call(arr) === '[object Array]')
	console.log(result)
	// true

## Object.keys(object)
### 描述：
返回对象的可枚举属性和方法的名称。
### 参数
object：必需。包含属性和方法的对象。这可以是您创建的对象或现有文档对象模型 (DOM) 对象。
### 示例
	
	var o = {
		name: 'matthew',
		age: 22
	}

	console.log(Object.keys(o))
	// ['name', 'age']

#### 回顾一下知识，过去是如何获取键值？
	
	function keys(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) keys.push(key)
        }
        return keys;
    }

## Object.seal(object)
### 描述：
阻止修改现有属性的特性，并阻止添加新属性。
### 参数：
object：必需。在其上锁定特性的对象。
### 备注：
Object.seal 函数执行以下两项操作：

+ 使对象不可扩展，这样便无法向其添加新属性。
+ 为对象的所有属性将 configurable 特性设置为 false。

### 示例：
	
	var obj = { pasta: "spaghetti", length: 10 };	
	Object.defineProperty(obj, 't', {
	  value: 't',
	  writable: true
	})
	Object.seal(obj);
	console.log(Object.isSealed(obj));
	
	obj.newProp = 50;
	console.log(obj.newProp);
	
	delete obj.length;
	console.log(obj.length);
	
	obj.t = 'not t'
	console.log(obj.t)
	
	// Output:
	// true
	// undefined
	// 10
	// not t

## Object.freeze(object)
### 描述：
阻止修改现有属性的特性和值，并阻止添加新属性。
### 参数：
object：必需。在其上锁定特性的对象。
### 备注
Object.freeze 函数执行下面的操作：

+ 使对象不可扩展，这样便无法向其添加新属性。
+ 为对象的所有属性将 configurable 特性设置为 false。在 configurable 为 false 时，无法更改属性的特性且无法删除属性。
+ 为对象的所有数据属性将 writable 特性设置为 false。当 writable 为 false 时，无法更改数据属性值。

### 示例：
	
	var obj = { pasta: "spaghetti", length: 10 };
	
	Object.defineProperty(obj, 't', {
	  value: 't',
	  writable: true
	})
	Object.freeze(obj);
	// console.log(Object.isSealed(obj));
	
	obj.newProp = 50;
	console.log(obj.newProp);
	
	delete obj.length;
	console.log(obj.length);
	
	obj.t = 'not t'
	console.log(obj.t)
	
	// Output:
	// undefined
	// 10
	// t

## Object.preventExtensions(object)
### 描述：
阻止向对象添加新属性。
### 参数：
object：必需。要成为不可扩展的对象的对象。
### 示例：

	var obj = { pasta: "spaghetti", length: 10 };
	
	Object.preventExtensions(obj);
	console.log(Object.isExtensible(obj));
	
	obj.newProp = 50;
	document.write(obj.newProp);
	
	// Output:
	// false
	// undefined

## Object.isSealed(object)
### 描述：
如果无法在对象中修改现有属性的特性，且无法向对象添加新属性，则返回 true。

## Object.isFrozen(object)
### 描述：
如果无法在对象中修改现有属性的特性和值，且无法向对象添加新属性，则返回 true。

## Object.isExtensible(object)
### 描述：
返回一个值，该值指示是否可向对象添加新属性。

## Object.getOwnPropertyDescriptor(object, propertyname)
### 描述：
获取指定对象自己的属性描述符。 自己的属性描述符是直接在对象上定义的描述符，而不是从对象的原型继承的描述符。
### 参数：
object：必需。包含该属性的对象。
propertyname：必需。属性的名称。
### 示例：

	var obj = {};
	obj.newDataProperty = "abc";
	
	var descriptor = Object.getOwnPropertyDescriptor(obj, "newDataProperty");
	console.log(descriptor)
	// output
	//[object Object] {
  	//	configurable: true,
  	//	enumerable: true,
  	//	value: "abc",
  	//	writable: true
	}

## Object.getOwnPropertyNames(object)
### 描述：
返回对象自己的属性的名称。一个对象的自己的属性是指直接对该对象定义的属性，而不是从该对象的原型继承的属性。对象的属性包括字段（对象）和函数。
### 参数
object：必需。包含自己的属性的对象。
### 返回值：
一个数组，其中包含对象自己的属性的名称。
### 示例：

	function Pasta(grain, width, shape) {
	    // Define properties.
	    this.grain = grain;
	    this.width = width;
	    this.shape = shape;
	    this.toString = function () {
	        return (this.grain + ", " + this.width + ", " + this.shape);
	    }
	}
	
	var spaghetti = new Pasta("wheat", 0.2, "circle");
	
	var arr = Object.getOwnPropertyNames(spaghetti);
	document.write (arr);
	
	// Output:
	// grain,width,shape,toString

## 关于ECMA5，object的介绍就到这么多了，下面会陆续写关于Date,Json,Function,String,Array等的介绍，还请大家感兴趣的多多关注。

## 如果有任何问题都可以在下方给予我留言~

