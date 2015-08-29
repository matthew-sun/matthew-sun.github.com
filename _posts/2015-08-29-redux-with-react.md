## 使用Redux管理你的React应用

> React是最好的前端库，因为其发源于世界上最好的后端语言框架。  —段子
> 
> 4.0 will likely be the last major release. Use Redux instead. It's really great.  —Flummox框架作者  acdliteAndrew Clark

#### 为什么使用React还需要使用别的框架来搭配？

React的核心是使用组件定义界面的表现，也就是说他仅仅只是一个View层的前端库，那么使用React的时候我们通常还需要一套机制去管理组件与组件之间，组件与数据模型之间的通信，已达到程序之间相互解耦的目的。

#### 为什么使用Redux？

Facebook官方提出了FLUX思想管理数据流，同时也给出了自己的[实现](https://github.com/facebook/flux)。可是当我打开[FLUX](https://github.com/facebook/flux)的文档时候，wtf，怎么会有这么繁琐的实现，如果我用这套模型来写代码的话我想我会crazy。幸好，社区中和我有类似想法的不在少数，github上也涌现了一批关于实现FLUX的框架，比较出名的有[Redux](https://github.com/rackt/redux),[Reflux](https://github.com/reflux/refluxjs),[Flummox](https://github.com/acdlite/flummox)。什么？我好像听到你说你需要一款简单好用，逼格极高，为社区所认可的框架？Redux就是！

Redux的简单和有趣的编程体验是最吸引我的地方。 

- 简单。和其它的FLUX实现不一样，Redux只有唯一的state树，不管项目变的有多复杂，我也仅仅只需要管理一个State树。听起来像是一个joke，一个state树够用？这个state树该有多大？别着急，redux自有办法，后面再讲Store的时候会讲到。
  
- 有趣。你在和我开玩笑吗？学新东西不头疼就算不错了，还有趣？等等，你下面放的图是什么鬼，右边那个调试工具是啥？整个应用的action和state都这么被轻松的管理了？行为还能被保存，回滚，重置？修改了代码，页面不刷新也能产生变化？别开玩笑了，不行，世界那么大，让我去试试！
  
  ![Redux DevTools](https://camo.githubusercontent.com/a0d66cf145fe35cbe5fb341494b04f277d5d85dd/687474703a2f2f692e696d6775722e636f6d2f4a34476557304d2e676966)
  
  注：Redux开发调试工具：[redux-devtools](https://github.com/gaearon/redux-devtools)
  
  ​       React应用无刷新保存工具：[hot-loader](http://gaearon.github.io/react-hot-loader)
  
  ##### 不明真相的群众，可能这里需要我来安利一下Flux数据流的思想，看图：
  
  ``` 
  ╔═════════╗       ╔════════╗       ╔═════════════════╗
  ║ Actions ║──────>║ Stores ║──────>║ View Components ║
  ╚═════════╝       ╚════════╝       ╚═════════════════╝
       ^                                      │
       └──────────────────────────────────────┘
  ```
  
  View层不能直接改变state，而是依赖Actions派发指令来告知Store修改状态，Store接收Actions指令后发生改变，View层同时跟着Store的变化而变化。举个例子：A组件如何使B组件发生变化？A组件先执行一个Action，告知绑定B组件的Store发生变化，绑定B组件的Store接收指令后改变，B组件的视图也就自然的发生了改变。假如C，D，E，F组件绑定了和B组件相同的Store，那么C，D，E，F也会跟着变化。
  
  ### 使用React和Redux开发一个小程序
  
  为了更好的描述怎么样使用Redux管理React应用，我做了一个Manage Items的小例子。你可以在这里找到全部的源代码：https://github.com/matthew-sun/redux-example。
  
  ![Manage Items](http://matthew-sun.github.io/images/manage-items.png)
  
  ##### 快速查看
  
   `1.git clone git@github.com:matthew-sun/redux-example.git`
  
  `2.npm install && npm start`
  
  `3.open localhost:3000`
  
  #### Index.js
  
  在入口文件中，我们需要App.js和redux建立起联系。这里用到了react-redux中的Provider，这是一个把Store和视图绑定在一起的组件，我们前面所说的唯一State树就是这么个东西。这里很轻松的就把Store和App进行了绑定，当Store发生改变App就可以收到通知。{() => <App />}仅仅需要暂时记住这个鬼，因为他将会在React 0.14版本得到简化。
  
  ``` javascript
  /* app/index.js */
  
  import React from 'react';
  import { Provider } from 'react-redux';
  import App from './containers/App';
  import configureStore from './configureStore';
  
  const store = configureStore();
  
  React.render(
      <div>
          <Provider store={store}>
              {() => <App /> }
          </Provider>
      </div>,
      document.getElementById('app'));
  ```
  
  #### Constants
  
  keyMirror这个方法非常的有用，它可以帮助我们轻松创建与键值key相等的常量。
  
  ``` javascript
  /* app/constants/actionTypes.js */
  
  import keyMirror from 'react/lib/keyMirror';
  
  export default keyMirror({
      ADD_ITEM: null,
      DELETE_ITEM: null,
      DELETE_ALL: null,
      FILTER_ITEM: null
  });
  
  // 等于
  // export const ADD_ITEM = 'ADD_ITEM';
  // export const DELETE_ITEM = 'DELETE_ITEM';
  // export const DELETE_ALL = 'DELETE_ALL';
  // export const FILTER_ITEM = 'FILTER_ITEM';
  ```
  
  #### Actions
  
  Action向store派发指令，store将会根据不同的action.type来执行不同的方法。这里的addItem函数我使用了一点小技巧，action在view层用bindActionCreators函数绑定的时候会被赋予一个参数dispatch，使用这个我们可以来向store发送异步的指令。比如说，可以在action中放入向服务端的请求，也强烈推荐这样去做。
  
  ``` javascript
  /* app/actions/index.js */
  
  import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, FILTER_ITEM } from '../constants/actionTypes';
  
  export function addItem(item) {
      return dispatch => {
          setTimeout(() => dispatch({type: ADD_ITEM}), 1000)
      }
  }
  export function deleteItem(item, e) {
      return {
          type: DELETE_ITEM,
          item
      }
  }
  export function deleteAll() {
      return {
          type: DELETE_ALL
      }
  }
  export function filterItem(e) {
      let filterItem = e.target.value;
      return {
          type: FILTER_ITEM,
          filterItem
      }
  }
  ```
  
  #### Reducers
  
  之前讲到过Redux有且只有一个State状态树，为了避免这个状态树的复杂，Redux通过 Reducers来负责管理整个应用的State树。
  
  Reduce这个词好像在哪里听过，对了，是在ES5的Array规范中有提到过这个方法。简单快速的用代码样例来回顾一下，如果想深入了解可以看我以前写的一篇文章[ECMA5系列介绍---Array](http://www.fehouse.com/index.php/archives/21/)。
  
  ``` javascript
  /* Array.prototype.reduce */
  var arr = [1,2,3,4];
  var initialValue = 5;
  var result = arr.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue
  }, initialValue)
  console.log(result)
  // 15
  // 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
  // 整个函数执行的过程大致是这样 ((((5+1)+2)+3)+4)
  ```
  
  回到Redux中来看，整个的状态就相当于从[初始状态]merge一个[action]得到一个新的状态，随着action的不断传入，不断的得到新的状态的过程，(previousState, action) => newState。注意：任何情况下都不要改变previousState，因为这样可以View层在比较State的改变时只需要简单比较即可，而避免了深度循环比较。数据结构我们可以用[immutable-js](https://github.com/facebook/immutable-js/)，这样我们在View层只需要[react-immutable-render-mixin](https://github.com/jurassix/react-immutable-render-mixin)插件就可以轻松的跳过更新那些state没有发生改变的组件子树。
  
  ``` javascript
  /* app/reducers/items.js */
  
  import Immutable from 'immutable';
  import { ADD_ITEM, DELETE_ITEM, DELETE_ALL } from '../constants/actionTypes';
  
  const initialItems = Immutable.List([1,2,3]);
  
  export default function items(state = initialItems, action) {
      switch(action.type) {
          case ADD_ITEM:
              return state.push( state.size !=0 ? state.get(-1)+1 : 1 );
          case DELETE_ITEM: 
              return state.delete( state.indexOf(action.item) );
          case DELETE_ALL:
              return state.clear();
          default:
              return state;
      }
  }
  ```
  
  ##### 连接reducers
  
  仅仅靠一个reducer来管理巨大的store明显是不太够的，Redux提供了combineReducers函数帮助我们把reducer组合在一起，这样我们就可以把Reducers拆分成一个个小的Reducer来帮助我们管理Store了。
  
  ``` javascript
  /* app/reducers/index.js */
  
  import { combineReducers } from 'redux';
  import items from './items';
  import filter from './filter';
  
  const rootReducer = combineReducers({
    items,
    filter
  });
  
  export default rootReducer;
  ```
  
  #### UI
  
  ​
  
  ​
  
  ​
  
  ​