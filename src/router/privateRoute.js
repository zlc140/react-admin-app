import React from 'react'
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const isLogin = sessionStorage.getItem('userInfo')

const PrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={(props) => (
		!!isLogin
			? <Component {...props} />
			: <Redirect to={{
				pathname: '/login',
				state: {from: props.location}
			}}/>
	)}/>
)
const mapStateToProps = (state) => {
	const islogin = state.userInfo ? true : false;
	return {
		islogin : islogin
	}
}

export default connect(
	mapStateToProps
)(PrivateRoute)