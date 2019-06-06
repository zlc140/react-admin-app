import axios from 'axios'
import mockAdapter from 'axios-mock-adapter'
// import Mock from 'mockjs'
// 收货地址列表，用户列表
import {addressList,userList} from './data/user'
import MD5 from '@utils/md5'


let _addressList = addressList

let routerLists = {
	'admin': [
		{"name":"首页","path":"/home","icon":"home"},
		{"name":"博客页","path":"/blog","icon":"frown"},
		{"name":"富文本编辑","path":"/article","icon":"bars"},
		{"name":"TODO例子","path":"/article/todo","icon":"diff"},
		{"name":"RenderProp","path":"/article/RenderProp","icon":"filter"}
	],
	'guest': [
		{"name":"首页","path":"/home","icon":"home"},
		{"name":"博客页","path":"/blog","icon":"frown"},
		{"name":"富文本编辑","path":"/article","icon":"bars"}
	]
}

let _summary = {
	nickname:userList[0].nickname,
	photo:null,
	couponNum:4,
	noPay:3,
	couponAll:1000,
}

export default {
	bootstrap() {

		let mock = new mockAdapter(axios)
		mock.onGet('/success').reply(200, {
			msg:'success'
		})
		mock.onGet('/error').reply(500, {
			msg: 'error'
		})
		//
		mock.onGet('user/getCode').reply(200, {
			msg:'success'
		})
		//登录成功获取用户信息
		mock.onGet('/user/users/userInfo').reply(config => {
			console.log('config',config)
			let token = config.headers.sessionId;
			return new Promise((resolve,reject) => {
				// resolve([200,{code:200,msg:'请求成功',data: resData}])
				let userInfo = null;
				userList.forEach(v => {
					if(MD5(v.phone) == token){
						userInfo = v;
					}
				})
				if(routerLists[userInfo.username]) {
					userInfo.routerLists = routerLists[userInfo.username];
				}else {
					userInfo.routerLists = routerLists['guest'];
				}
				if( userInfo ) {
					delete userInfo.password;
					resolve([200,{code:200,msg:'请求成功',data: userInfo}])
				}else {
					resolve([200,{code:200,msg:'找不到用户请重新登录'}])
				}
			})
		})
		// 登录
		mock.onPost('/user/users/login/password').reply(config => {
			console.log('config', config)
			let {accoutNo,password} = config.params
			return new Promise((resolve,reject) => {
				setTimeout(() => {
					console.log(0)
					let reg = /^1[3-9]\d{9}$/
					let hasUser = reg.test(accoutNo)?true:false;

					let userInfo = {
						memberId: userList.length + 1,
						username: accoutNo,
						password: '123456',
						nickname: null,
						phone: accoutNo,
						state: new Date(),
						del: false
					}
					//
					let isExit = userList.some(v => {
						return v.phone == accoutNo
					})
					if( !isExit ){
						userList.push(userInfo);
					}
					let resData = {
						token: MD5(accoutNo)
					}
					console.log(resData,'resData')
					if(hasUser) {
						resolve([200,{code:200,msg:'请求成功',data: resData}])
					}else{
						resolve([200,{code:200,msg:'密码或账号错误'}])
					}
				},1000)
			})
		})
		// 得到用户概况
		mock.onPost('/getSummary').reply(config => {
			//let { username } = JSON.parse(config.data)
			return new Promise((resolve,reject) => {
				//let user = null
				setTimeout(() => {
					//let hasUser = username=='admin'?true:false
					//user = username
					//if(hasUser) {
					resolve([200,{code:200,msg:'请求成功',_summary}])
					//}else{
					// resolve([200,{code:200,msg:'密码或账号错误'}])
					//}
				},1000)
			})
		})


	}
}
