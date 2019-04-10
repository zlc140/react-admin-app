import 'babel-polyfill';
import React from 'react';
import {  Switch } from 'react-router-dom';
import asyncComponent from './asyncComponent';

import PrivateRoute from './privateRoute'

const Home = asyncComponent(() => import('../page/Home'));
const Blog = asyncComponent(() => import('../page/Blog'));
const Todo = asyncComponent(() => import('../page/Todo'));
const Article = asyncComponent(() => import('../page/Article'));


export default class Router extends React.Component {
	
	render() {
		return (
			 
				<Switch>
					<PrivateRoute exact path='/home' component={Home} />
					<PrivateRoute exact path='/blog' component={Blog} />
					<PrivateRoute exact path='/todo' component={Todo} />
					<PrivateRoute exact path='/article' component={Article} />
					<PrivateRoute exact path='/' component={Home} />
				</Switch>
		 
		);
	}
}