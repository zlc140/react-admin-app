import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter } from 'react-router-dom';


import './index.css';
import "antd/dist/antd.css";

import App from './App';
// import { Skeleton } from 'antd';

import * as serviceWorker from './serviceWorker';
//
import Mock from './mock'
Mock.bootstrap()
// ReactDOM.render(<App />, document.getElementById('root'));

//ant design骨架屏如何使用
// let id = 0
// function Test () {
// 	setTimeout(() => {
// 		id = 1
// 	}, 1000)
// 	if(id === 0) {
// 		return <Skeleton active/>
// 	}else {
// 		return (
// 			<BrowserRouter>
// 				<App />
// 			</BrowserRouter>
// 		)
// 	}
// }
ReactDOM.render(
	<BrowserRouter basename='/react-admin-app/'>
		<App />
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
