import  React, { Component } from 'react';

import {ThemeContext, themes} from '@utils/themes/themes-context';
import ThemedButton from '@utils/themes/themes-button';

import './index.less';

function FormatDate(props) {
	return <span>现在是：{props.date.toLocaleTimeString()}</span>
}

function Toolbar(props) {
	return (
		<ThemedButton onClick={props.changeTheme}>
			Change Theme
		</ThemedButton>
	);
}

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: themes.light,
			pageTitle: '',
			pageDes: '',
			date: new Date()
		}
	}
	toggleTheme = () => {
		this.setState(state => ({
			theme: state.theme === themes.dark ?
				themes.light : themes.dark
		}))
	}
	componentDidMount() {
		this.setState({
			pageTitle: '博客页',
			pageDes: '这是学习react 得 博客页'
		})
		this.timerID = setInterval(() => {
			// this.tick()
		},1000)
	}
	componentWillUnmount(){
		clearInterval(this.timerID)
	}
	tick() {
		this.setState({
			date: new Date()
		})
	}
	render() {
		return (
			<div className='blog-container'>
				<h2>{this.state.pageTitle}-<FormatDate  date={this.state.date}/></h2>
				<p>{this.state.pageDes}</p>
				
				<ThemeContext.Provider value={this.state.theme}>
					<Toolbar changeTheme={this.toggleTheme} />
				</ThemeContext.Provider>
				
				{/*<ThemedButton />*/}
				
				
			</div>
		)
	}
}