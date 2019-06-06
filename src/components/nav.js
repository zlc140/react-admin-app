import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu,Icon } from 'antd';
import './nav.less'
import sidebarMenu from './tem/menu'


const { SubMenu } = Menu;
// withRouter

export default class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			menus: null
		}
	}
	transformMenuItem(obj, paths, isLevel1) {
		// const parentPath = paths.join('/')
		return (
			<Menu.Item key={obj.key}>
				{obj.icon && <Icon type={obj.icon} />}
				{isLevel1 && !obj.icon && <span className="invisible-nav-text">{obj.name[0]}</span>}
				<span className="nav-text">
					{obj.path ? <Link to={obj.path}> {obj.name}</Link> : obj.name}
				</span>
			</Menu.Item>
		)
	}

	componentDidMount() {
		const menus = sidebarMenu.map(level1 => {
			//是否有子菜单
			if(level1.child){
				const level2menu = level1.child.map(level2 => {
					if(level2.child){
						const level3menu = level2.child.map(level3 => {
							const tmp = this.transformMenuItem(level3,[])
							return tmp
						})
						return (
							<SubMenu key={level2.key}
									title={level2.icon? <span><Icon type={level2.icon} />{level2.name}</span> : level2.name}>
								{level3menu}
							</SubMenu>
						)
					}else {
						const tmp = this.transformMenuItem(level2,[])
						return tmp
					}
				})
				let level1Title;
				if(level1.icon) {
					level1Title = 	<span>
										<Icon type={level1.icon} />
										<span className="nav-text">{level1.name}</span>
					 				</span>
				}else {
					level1Title = <span>
									<span className="invisible-nav-text">{level1.name[0]}</span>
									<span className="nav-text">{level1.name}</span>
								</span>
				}
				return (
					<SubMenu key={level1.key} title={level1Title}>
						{level2menu}
					</SubMenu>
				)
			}else {
				const tmp = this.transformMenuItem(level1,[],true)
				return tmp
			}
		})
		// this.menus = menus;
		// console.log(this.menus)
		this.setState({
			menus: menus
		})
	}
	render() {
		return (
			<div className="nav-contain">
				 <Menu
					 mode='inline'
					 theme={"dark"}
					 // defaultSelectedKeys={['1']}
					 // defaultOpenKeys={['sub1']}
					 style={{lineHeight: '64px'}}
				 >
					 {this.state.menus}
				 </Menu>
			</div>
		)
	}
}
