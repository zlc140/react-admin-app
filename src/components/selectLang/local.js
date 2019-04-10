import  React, { Component } from 'react';
import { connect } from 'react-redux'
import intl from 'react-intl-universal';
import enUs from '../../locales/en-US.js'
import zhCN from '../../locales/zh-CN.js'
import zhTW from '../../locales/zh-TW.js'
import ptBR from '../../locales/pt-BR.js'
import headTem from "../tem/headTem";
// locale data
const locales = {
	"en-US": enUs,
	"zh-CN": zhCN,
	"pt-BR" : ptBR,
	"zh-TW": zhTW
};

class FormattedMessage extends Component {
	
	state = {initDone: false}
	
	componentDidMount() {
		this.loadLocales();
	}
	loadLocales() {
		// init method will load CLDR locale data according to currentLocale
		// react-intl-universal is singleton, so you should init it only once in your app
		let initType = this.props.languages ? this.props.languages : 'en-US'
		intl.init({
				currentLocale: initType, // TODO: determine locale here
				locales,
			})
			.then(() => {
				// After loading CLDR locale data, start to render
				this.setState({initDone: true});
			});
	}
	// componentWillReceiveProps(){ //修改store之后数据总是迟一步
	// 	this.loadLocales()
	// }
	componentDidUpdate() {
		this.loadLocales()
	}
	render() {
		let id = this.props.id;
		
		return (
			this.state.initDone &&
			<span>
				{intl.get(id)}
			</span>
		);
	}
	
}

export default connect((state) => ({languages: state.languages}))(FormattedMessage)