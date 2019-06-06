import  React, { Component } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
// locale data
const locales = {
	"en-US": require('@/locales/en-US.js'),
	"zh-CN": require('@/locales/zh-CN.js'),
	"pt-BR" : require('@/locales/pt-BR.js'),
	"zh-TW": require('@/locales/zh-TW.js')
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
	// componentDidUpdate() { //语言这里不能通过生命周期来监听，正确的因该是直接刷新页面
	// 	this.loadLocales()
	// }
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return
		}
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
