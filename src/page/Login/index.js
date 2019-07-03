import  React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import { loginInfo } from '@store/actions'
import BGParticle from '../../util/BGPartcle';
import { Card } from 'antd';
import './index.less';
import Message from './message';
import Password from './password';

const url = 'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true'

const tabList = [ {
	key: 'password',
	tab: '密码登录',
},{
	key: 'message',
	tab: '短信登录',
}];


class Login extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			loading: false,
			activeTab: 'password'
		}
	}

	componentDidMount() {
		this.initPage()
	}
	componentWillUnmount() {
		this.particle && this.particle.destory()
	}

	initPage = () => {
		console.log(this.props)
		this.setState({
			loading: true
		})
		this.redirectPath()
		this.loadImageAsync(url).then((url) => {
			this.setState({
				loading: false,
				url
			})
		}).then(() => {
			this.particle = new BGParticle('backgroundBox')
			this.particle.init()
		})

	}
	redirectPath = () => {
		const { islogin, history, location } = this.props;

		if(islogin){
			const PATH = location.state ? location.state.from.pathname : '/'
			console.log(location,'location',PATH)
			history.push('/')
		}
	}
	onTabChange = (key, type) => {
		this.setState({
			[type]: key
		})
	}
	loadImageAsync(url) {
		return new Promise((resolve,reject ) => {
			let image = new Image();
			image.onload = function () {
				resolve(url)
			}
			image.onerror = function () {
				reject('图片加载出错')
			}
			image.src = url;
		})
	}
	render() {
			return (
				<div className='login-container' id='backgroundBox' style={style.backgroundBox}>

					<Card
						className={'container'}
						style={{width: '300px'}}
						tabList={tabList}
						activeTabKey={this.state.activeTab}
						onTabChange={(key) => {this.onTabChange(key, 'activeTab')}}
					>
						{this.state.activeTab === 'message'
							? <Message {...this.props} redirectPath={this.redirectPath.bind(this)}/>
							: <Password {...this.props} redirectPath={this.redirectPath.bind(this)}/>}

					</Card>
				</div>
			)

	}
}
const style = {
	backgroundBox: {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100vw',
		height: '100vh',
		// backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
		backgroundImage: 'url(https://github.com/zlc140/zlc-blog/blob/master/docs/.vuepress/public/img/contact-bg.jpg?raw=true)',
		backgroundSize: '100% 100%',
		transition:'all .5s'
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	const islogin = state.userInfo ? true : false;
	return {
		islogin : islogin
	}
}
//mapDispatchToProps 可是function也可是object,作用是绑定action上的函数到props上
const mapDispatchToProps = (dispatch) => {
	return {
		loginSubmit: (val) => dispatch(loginInfo(val))
	}

}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
// export default Login;
