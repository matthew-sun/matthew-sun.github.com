---
layout: post
title: React漫谈
tags: [ react ]
category: Frontend
description: React漫谈
---
> 谈必及React。

#### React优势

*	快。Virtual DOM的原理是做一份DOM树的拷贝在 javascript 的内存里，当DOM需要被改变的时候,通过比较虚拟DOM得到两者的不同，根据这个不同来更新真实的DOM。 快的原因是虚拟DOM只更新了两次DOM不同的地方，深层次的原因是javascript很快，而浏览器操作DOM很慢。
*	‘learn once, write everywhere’。虽然讲ReactJs是js的产物，但是它已经基本跳出了web前端的范畴，可以是web, ios, android。重要的还有，它解决了困扰前端单页面应用的SEO问题，React在服务端可以通过renderToString方法把页面渲染出来。这样当爬虫爬到你的页面的时候，得到的将会是一个完整的页面，而不是一个需要执行的Js代码了。
*	新概念。感受新技术的魅力，Web Components, ECMA 2015, webpack, data flow等等概念都可以在React上得到体验。

#### Virtual DOM的性能瓶颈
虚拟DOM很快，但他并不是没有性能瓶颈，因为React在render之前会做虚拟DOM树的比较操作，如果数据并没有发生改变，做这个额外的比较操作无疑是会增加开销的。好在React给出了自己的解决方案，那就是shouldComponentUpdate，shouldComponentUpdate的含义是这样的，在Component接受到新的props或者state，将要渲染之前调用，如果返回 false，那么组件不会更新。这里shouldComponentUpdate传入了两个参数，nextProps和 nextState，我们可以通过拿到的参数和当前的props和state进行比较，判断如果相等，那么返回false，告知组件不去更新。你可以使用PureRenderMixin插件，来帮你重复执行这个操作。

	var PureRenderMixin = require('react').addons.PureRenderMixin;
	React.createClass({
  		mixins: [PureRenderMixin],
	
	  render: function() {
   		return <div className={this.props.className}>foo</div>;
  		}
	});

不过通过PurePenderMixin你只能进行浅层次的比较，如果想要使用深层比较的话，数据层你可以采用[immutable-js](https://github.com/facebook/immutable-js)，然后再使用上[react-immutable-render-mixin](https://github.com/jurassix/react-immutable-render-mixin)就可以进行深层次比较了。

#### 智慧组件和木偶组件
在智慧组件和木偶组件的概念中，可复用的组件是木偶组件，而起到控制展示作用的是智慧组件。
##### 木偶组件
*	不依赖任何Flux的actions和stores.
*	通常允许包含在props.children里.
*	接收数据和回调通过props.
*	独立样式，包含有自己的css文件.
*	通常自己没有state.
*	很少用其他的木偶组件.
*	比如：Page, Sidebar, Story, UserInfo, List.

##### 智能组件
*	包含木偶组件或其他的智慧组件.
*	提供木偶组件Flux stores.
*	提供木偶组件Flux actions.
*	没有自己的css样式，或仅有布局的框架样式.
*	没有自己的Dom结构，只包含木偶组件.
*	比如：UserPage, FollowersSidebar, StoryContainer, FollowedUserList.

#####这样写的好处
*	解耦，在写应用的时候更好的理解各个Component的职责。
*	重用，木偶组件可以被不同的数据状态驱动。
*	木偶组件就像是在以一种搭积木的方式构建应用，不涉及到任何的业务逻辑。
*	强迫用这样一种形式把布局组件抽离出来，可以更好的重用布局结构。

#### 路由
React经常被拿去做单页面应用，[react-router](https://github.com/rackt/react-router)是一个不错的React路由管理框架。

	var routes = (
	  <Route handler={App} path="/">
	    <DefaultRoute handler={Home} />
    	<Route name="about" handler={About} />
    	<Route name="users" handler={Users}>
      		<Route name="recent-users" path="recent" handler={RecentUsers} />
      		<Route name="user" path="/user/:userId" handler={User} />
      		<NotFoundRoute handler={UserRouteNotFound}/>
    	</Route>
    	<NotFoundRoute handler={NotFound}/>
    	<Redirect from="company" to="about" />
	  </Route>
	);

	Router.run(routes, function (Handler) {
	  React.render(<Handler/>, document.body);
	});

	// Or, if you'd like to use the HTML5 history API for cleaner URLs:

	Router.run(routes, Router.HistoryLocation, function (Handler) {
	  React.render(<Handler/>, document.body);
	});

#### 移动端tap事件
做过移动端的同学都知道，ios在处理click事件的时候有300ms的延迟。在zepto的方案下我们会有一个tap事件去解决这个问题，而在React中我们可以使用[react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)

	var React = require('react'),
	injectTapEventPlugin = require("react-tap-event-plugin");
	injectTapEventPlugin();

	var Main = React.createClass({
  	render: function() {
    	return <button onTouchTap={this._handleTouchTap}>Tap Me</button>
  	},

  	_handleTouchTap: function() {
    	alert('Tap');
  	}
	});

	React.render(<Main />, document.body);

#### 动画
React的动画库，[react-tween-state](https://github.com/chenglou/react-tween-state).

	var tweenState = require('react-tween-state');
	var React = require('react');

	var App = React.createClass({
  		mixins: [tweenState.Mixin],
  		getInitialState: function() {
    		return {left: 0};
  		},
  		handleClick: function() {
    		this.tweenState('left', {
      			easing: tweenState.easingTypes.easeInOutQuad,
      			duration: 500,
      			endValue: this.state.left === 0 ? 400 : 0
    		});
  		},
  		render: function() {
    		var style = {
      			position: 'absolute',
      			width: 50,
      			height: 50,
      			backgroundColor: 'lightblue',
      			left: this.getTweeningValue('left')
    		};
    		return <div style={style} onClick={this.handleClick} />;
  		}
	});

#### 延伸阅读
*	[awesome-react](https://github.com/enaqx/awesome-react)