
import { routeConf, hasPower } from '@/router/routeConf';

let id = 1;
/**
 *
 * @param routeConf 前端路由列表
 * @param basePath  整合路由（用来跳转的完整路由）
 * menu列表：isMenu,item.name,后端接口放回的列表是否存在
 * @returns {*}  菜单
 */
const getMenus = ( routeConf, basePath = '' ) => {

		let routerLists = routeConf.reduce((all, item) => {
	 	if(	!item.hasOwnProperty('isMenu') || item.isMenu === true) {
			let conf = Object.assign({}, item)
			conf.path = basePath + item.path;
			conf.key = id++;
			if( conf.children ) {
				conf.child = getMenus( conf.children, conf.path )
				delete conf.children;
			}
			if(conf.name && hasPower(conf)) {
				all.push( conf );
			}

		}
		return all;

	}, [])
	return routerLists;
}
export default getMenus( routeConf )

// 其实理论上可以嵌套更多层菜单的, 但是我觉得超过3层就不好看了
// 可用的图标见这里: https://ant.design/components/icon-cn/

// 定义siderbar菜单
const sidebarMenu = [
	{
		key: 'index.jsx',  // route时path中的值
		name: '基础组件',  // 在菜单中显示的名称
		icon: 'smile',  // 图标是可选的
		child: [
			{
				key: 'option1',
				name: '模拟CRUD',
				icon: 'play-circle',   // 二级三级菜单也可以带图标
			},
			{
				key: 'option2',
				name: '图片DEMO',
				icon: 'android',
			},
			{
				key: 'option3',
				name: '富文本编辑器',
				icon: 'bulb',
				path: '/article'
			},
		],
	},
	{
		key: 'alone',
		name: '我的',
		icon: 'clock-circle',
		path: '/home'
	},
	{
		key: 'alone2',
		name: '我没有图标',
	},
	{
		key: 'noiconhaha',
		name: '又一个没图标的',
		child: [
			{
				key: 'nesnesnes',
				name: '博客',
				path: '/blog'
			},
		],
	},
	{
		key: 'daohang',
		name: '复杂组件',
		icon: 'appstore',
		child: [
			{
				key: '555',
				name: '选项5',
			},
			{
				key: 'sanji',  // 最多只能到三级导航
				name: '三级导航',
				icon: 'laptop',
				child: [
					{
						key: '666',
						name: 'Todo组件',
						icon: 'check',
						path: '/todo'
					},
					{
						key: '777',
						name: '选项7',
						icon: 'close',
					},
					{
						key: '888',
						name: '选项8',
					},
					{
						key: '999',
						name: '选项9',
					},
				],
			},
		],
	},
	{
		key: 'test',
		name: '测试',
		icon: 'eye',
		child: [
			{
				key: 'aaa',
				name: '选项a',
			},
			{
				key: 'bbb',
				name: '选项b',
				icon: 'pause',
			},
			{
				key: 'ccc',
				name: '选项c',
			},
			{
				key: 'sanjiaaa',  // 最多只能到三级导航
				name: '三级导航aaa',
				child: [
					{
						key: '666aa',
						name: '选项6',
						icon: 'meh',
					},
				],
			},
			{
				key: 'sanjibbb',  // 最多只能到三级导航
				name: '三级导航bbb',
				child: [
					{
						key: '666bb',
						name: '选项6',
					},
				],
			},
		],
	},
];



// 定义header菜单, 格式和sidebar是一样的
// 特殊的地方在于, 我规定header的最右侧必须是用户相关操作的菜单, 所以定义了一个特殊的key
// 另外注意这个菜单定义的顺序是从右向左的, 因为样式是float:right
export const headerMenu = [
	{
		// 一个特殊的key, 定义用户菜单, 在这个submenu下面设置icon/name不会生效
		key: 'userMenu',
		child: [
			{
				key: 'modifyUser',
				name: '修改用户信息',
				icon: 'bulb',
				// 对于headerMenu的菜单项, 可以让它跳到外部地址, 如果设置了path属性, 就会打开一个新窗口
				// 如果不设置path属性, 行为和sidebarMenu是一样的, 激活特定的组件, 注意在index.js中配置好路由, 否则会404
				path: 'http://jxy.me',
			},
			{
				key: 'user222',
				name: '药药切克闹',
				icon: 'rocket',
			},
			{
				key: 'user333',
				name: '选项3',
				child: [
					{
						key: 'user333aaa',
						name: 'user333aaa',
						icon: 'windows',
					},
					{
						key: 'user333bbb',
						name: 'user333bbb',
						path: 'http://jxy.me',
					},
				],
			},
		],
	},
	{
		key: 'headerMenu2',
		name: 'header菜单',
		icon: 'team',
		child: [
			{
				key: 'headerMenu111',
				name: '菜单项1',
				icon: 'windows',
				path: 'http://jxy.me',
			},
			{
				key: '菜单项2',
				name: '短信表管理',
				path: 'http://jxy.me',
			},
			{
				key: '菜单项3',
				name: '选项3',
				icon: 'chrome',
				path: 'http://jxy.me',
			},
		],
	},
	{
		key: 'headerMenu3',
		name: '我没有子菜单',
		icon: 'setting',
		path: 'http://jxy.me',
	},
	{
		key: 'headerMenu4',
		name: '我也没有子菜单',
		icon: 'shopping-cart',
	},
	{
		key: 'headerMenu5',
		name: '我没有图标',
		child: [
			{
				key: 'headerMenu5000000',
				name: '二级导航无子菜单',
			},
			{
				key: 'headerMenu51111',
				name: '三级导航',
				icon: 'laptop',
				child: [
					{
						key: 'headerMenu51111aa',
						name: '选项6',
						icon: 'meh',
					},
					{
						key: 'headerMenu51111bb',
						name: '选项7',
						icon: 'inbox',
					},
				],
			},
			{
				key: 'headerMenu52222',
				name: '三级导航无图标',
				child: [
					{
						key: 'headerMenu52222aa',
						name: '选项8',
					},
					{
						key: 'headerMenu52222bb',
						name: '选项9',
					},
				],
			},
		],
	},
];
