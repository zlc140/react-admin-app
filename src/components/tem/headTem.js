import  React, { Component } from 'react'
import logo from '../../logo.svg';
import { Icon } from 'antd';
import  UserInfo  from './userInfo';
import SelectLang from '../selectLang';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.toggle = () => {
			this.props.toggleCollaped(this.props.collaped)
		}
	}

	render() {

		const { collaped , userInfo, loginOut, islogin, languages, toggleLanguages,history } = this.props
		console.log('history',history)
		if(!islogin){
			window.location.href = window.location.origin + '/login'
		}

		return (
			<header className="App-header">
				<div className={'head-img-box'} style={{width: collaped ? '80px': '200px'}}>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
				<div className={'header-center'}>
					<Icon
						className="trigger"
						type={collaped ? 'menu-unfold' : 'menu-fold'}
						onClick={this.toggle}
					/>
				</div>
				<div className={'header-right'} style={{marginRight: '30px',display: 'flex',flexFlow: 'row nowrap',alignItems: 'center'}}>
					<UserInfo userInfo={userInfo} loginOut={loginOut}/>
					<SelectLang languages={languages} toggleLanguages={toggleLanguages}/>
				</div>
			</header>
		)
	}
}
