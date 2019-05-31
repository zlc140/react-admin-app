import axios from 'axios'
import mockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
// 收货地址列表，用户列表
import {addressList,userList} from './data/user'
import MD5 from '@utils/md5'


let _addressList = addressList


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
		// 登录
		mock.onPost('/user/users/login/password').reply(config => {
			console.log(config)
			let {accoutNo} = config.params
			return new Promise((resolve,reject) => {
				setTimeout(() => {
					let reg = /^1[3-9]\d{9}$/
					let hasUser = reg.test(accoutNo)?true:false;
					let resData = {
						token: MD5(accoutNo),
						user: {
							mobile: accoutNo,
							username: accoutNo
						}
					}
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
