import  React, { Component } from 'react';
import { Dropdown, Menu  } from 'antd';
// import { Link } from 'react-router-dom';

function ShowHello(props){
	if(props.warn === false){
		return (
			<span>React</span>
		)
	}else{
		return (
			<span>Tomorrow</span>
		)
	}
}
export default class userTem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			hello: false
		}
	}

	handleClick(){
		//点击时找不到this,1.bind； 2，handClick改成箭头函数
		this.setState(preState => ({
			hello: !preState.hello
		}))

	}
	loginOut = () => {
		this.props.loginOut(true)

	}
	render() {
		const { userInfo } = this.props
		const menu = (
			<Menu>
				<Menu.Item key='1'><span>{userInfo && userInfo.username}</span></Menu.Item>
				<Menu.Item key='2'><span onClick={this.loginOut}>退出登录</span></Menu.Item>
			</Menu>
		)
		return (
				<Dropdown
					trigger={['click']}
					overlay={menu}
					onVisibleChange={this.handleClick}
				>
					<div>
						<span>Hello </span>
						<ShowHello warn={this.state.hello}/>
					</div>
				</Dropdown>

		)
	}
}

