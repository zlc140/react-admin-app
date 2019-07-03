This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm test`
e section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

### `npm run eject`

### 'npm run deploy'
添加gh-pages发布

::: tip
    React-create-app （创建项目）
    技术栈： react, react-dom, react-redux, axios, mock
:::

- markdown编辑文章（依赖包 simplemde marked highlight.js）

## react学习

### 项目结构
1. 组件应该拆分到那种程度（颗粒度），组件中的绑定的变量应该是state, props, store 应该如何选择
    a. 产品列表等 ==》 props 
    b. 搜索，是否选中 ==》 state
    c. 多个组件共有的数据 ==》 store

2. react的上下文context如何使用

### render props 是指在react组件之间使用一个值为函数的prop共享代码的简单技术

### useHooks  react > 16.0 新版本的的api  用于无状态组件中非常方便  
::: tip
    * hooks应该写在函数的最外层,不能在ifelse之中
    * 自定义hooks非常爽，比较复杂的数据流时或者可复用的功能可以考虑自定义hooks
    * hooks之间还可以传参
:::
- useState
[value, setValue] = useState(initialValue); // value获取值，setValue设置值

- useEffect  提供了类似于componentDidMount等生命周期钩子的功能
    1. react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数。而之前我们要用两个声明周期函数来分别表示首次渲染（componentDidMount），和之后的更新导致的重新渲染（componentDidUpdate
    2. useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的
    3. message.js页面利用useEffect + setInterval 做了个定时器，如果直接定时器的话组件销毁会报错
    4. useEffect(() => {}, []) 
        - a. 第一个参数是个用于处理副作用的方法
        - b. 第二个参数是个数组，如果为空数组，怎该方法只在mount 和 unmount 执行，否则还会在参数改变的时候执行
        - c. 第一个方法可以添加return 一个方法来解除一些绑定如果setInter，绑定的resize事件等
        - d. 第一个方法的return是可选的，这个机制主要是用来将添加和订阅的逻辑放在一起处理 ，
        - e. hooks 只能用在react组件函数中，或者自定义中使用 不要用在普通方法中 这里可以添加eslint（eslint-plugin-react-hooks） 

- useContext  提供了上下文（context）的功能

- useReducer 提供了类似redux的功能，有时场景合适比usestate好用

- useCallback 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
    
- useMemo 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算

- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）返回的 ref 对象在组件的整个生命周期内保持不变。

react组件中销毁修改state报错时清理异步操作等的方式
1. 阻止异步操作 
```js
componentWillUnmount() {
  this.setState = (state, callback) => {
    return
  }
}
```
2. 阻止请求
```js
constructor(props) {
	this.state=store.getState()
	this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
}
componentDidMount = () => {
	const _t = this
	const url="xxxx";
    axios.get(url, {
    	cancelToken: _t.source.token 
    })
        .then(res => {
            ...
        })
        .catch(function(thrown) {
  			if (axios.isCancel(thrown)) {
    			console.log('Request canceled', thrown.message);
  			} else {
    			console.log(thrown)
  			}
		})
}
componentWillUnMount = () => {
    //阻止请求
    this.source.cancel('组件卸载,取消请求');
}
```
3清除定时
```js
var timer;
...
componentDidMount = () => {
     timer = setTimeout(() => {
        this.setState({a:123})
    },1000)
}
componentWillUnMount = () => {
    clearTimeout(timer)
}
```
