import 'babel-polyfill';
import React from 'react';
import {  Switch } from 'react-router-dom';
import asyncComponent from './asyncComponent';
import routeConf from './routeConf';

import PrivateRoute from './privateRoute'


const Home = asyncComponent(() => import('..'+'/page/Home'));
const Blog = asyncComponent(() => import('..'+'/page/Blog'));
const Todo = asyncComponent(() => import('..'+'/page/Todo'));
const Article = asyncComponent(() => import('..'+'/page/Article'));
const RenderProp = asyncComponent(() => import('..'+'/page/Article/RenderProp'));




export default class Router extends React.Component {

	render() {
		return (

				<Switch>
					<PrivateRoute exact path='/home' component={asyncComponent(() => import('..'+'/page/Home'))} />
					<PrivateRoute exact path='/blog' component={asyncComponent(() => import('..'+'/page/Blog'))} />
					<PrivateRoute exact path='/todo' component={Todo} />
					<PrivateRoute exact path='/article' component={Article} />
					<PrivateRoute exact path='/article/props' component={RenderProp} />
					<PrivateRoute exact path='/' component={asyncComponent(() => import('..'+'/page/Home'))} />
					{/*{ routeConf }*/}
				</Switch>

		);
	}
}
