import  React, { Component } from 'react';
import './index.less';
import FormattedMessage from '@components/selectLang/local'

export default class Home extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	render() {
		return (
			<div className='home-container'>
				<h2>首页</h2>
				<FormattedMessage id="layout.user.link.help" />
				<p>这是学习react 得 首页</p>
			</div>
		)
	}
}