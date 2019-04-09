import React, { Component } from 'react';
import { connect } from 'react-redux'
import "antd/dist/antd.css";
import './index.less'
import { Layout, notification, Icon } from 'antd';
import HeaderCon from '../../components/header.js';
import Nav from '../../components/nav';

import ContentMain from '../../router/index'
const { Header, Content, Sider } = Layout

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'zhanglc'
		}
	}
	
	componentDidMount() {
		this.initPage();
	}
	initPage() {
		notification.open({
			message: 'Welcome',
			description: `${this.props.userInfo.username},欢迎您回来`,
			icon: <Icon type="smile" style={{ color: '#108ee9' }} />
		})
	}
	render() {
		return (
			<div id='page' style={{height: '100%'}}>
				<Layout style={{height: '100%'}}>
					<Header style={{padding: '0'}}>
						<HeaderCon userInfo={this.props.userInfo}/>
					</Header>
					<Layout>
						<Sider
							collapsible
							trigger={null}
							collapsed={this.props.collaped}
							style={{width: 300, background: '#fff'}}>
							<div className="logo" />
							<Nav />
						</Sider>
						<Content style={{margin:100,background:'#fff',borderRadius:8}}>
							<div className='view-box'>
								<ContentMain />
							</div>
						</Content>
					</Layout>
					{/*<Footer>footer</Footer>*/}
				</Layout>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		collaped: state.collaped,
		userInfo: state.userInfo
	}
}
export default connect(mapStateToProps)(App)
