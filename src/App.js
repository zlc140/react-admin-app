import React, { Component } from 'react';
import { Switch,Route,withRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';


import asyncComponent from "./router/asyncComponent";
const Login = asyncComponent(() => import('./page/Login'));
const HomeLayout = asyncComponent(() => import('./page/Layout'));

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '首页'
		}
	}
  render() {
    return (
		<Provider store={store}>
	    <Switch>
		    <Route exact path='/login' component={Login} />
		    <Route  path='/' component={HomeLayout} />
	    </Switch>
		</Provider>
    );
  }
}

export default withRouter(App);
