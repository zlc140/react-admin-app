import 'babel-polyfill';
import React, { Suspense } from 'react';
import {Redirect, Switch} from 'react-router-dom';
import routeConf from './routeConf';

import PrivateRoute from './privateRoute'


export default class Router extends React.Component {

	render() {
		return (

				<Switch>
					{
						routeConf.map(ele => {
							return ele.redirect ? <Redirect to={{
									pathname: ele.redirect
								}}  key={ele.path} />
								:<PrivateRoute exact path={ele.path} name={ele.name || ''} component={ele.component} key={ele.name}/>
						})
					}
					{/*<Redirect to={{pathname: '/home'}} />*/}
				</Switch>
		);
	}
}
