import React, { PureComponent } from 'react';

import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import FormattedMessage from './local'

class SelectLang extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			type: ''
		}
	}
	componentDidMount(){
		this.setState({
			type: this.props.languages || 'zh-CN'
		})
	}
	changLang = ({ key }) => {
		console.log(key,this.props)
		if(key !== this.props.type) {
			this.setState({
				type: key
			})
			this.props.toggleLanguages(key)
			window.location.reload();

		}




	};

	render() {
		const { className, } = this.props;

		const langMenu = (
			<Menu className={styles.menu} selectedKeys={[this.state.type]} onClick={this.changLang}>
				<Menu.Item key="zh-CN">
					<FormattedMessage id="lang.simplified-chinese" />
				</Menu.Item>
				<Menu.Item key="zh-TW">
					<FormattedMessage id="lang.traditional-chinese" />
				</Menu.Item>
				<Menu.Item key="en-US">
					<FormattedMessage id="lang.english"/>
				</Menu.Item>
			</Menu>
		);
		return (
			<Dropdown overlay={langMenu}>
		        <span className={classNames(styles.dropDown, className)}>
		          <FormattedMessage id="navBar.lang"/> <Icon type="down" />
		        </span>
			</Dropdown>
		);
	}
}

export default  SelectLang
