import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';

import './index.css';
import "antd/dist/antd.css";

import Router from './App';

import * as serviceWorker from './serviceWorker';
//
import Mock from './mock'
Mock.bootstrap()



const store = createStore(rootReducer)

// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Router />
		</Provider>
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
