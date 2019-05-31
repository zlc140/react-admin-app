// import 'babel-polyfill';
import axios from 'axios'
import qs from 'qs'
import MD5 from '@utils/md5'
// import $service from './request';
import API from './api';
import Url from '@utils/url';

let instance = axios.create({
	// http://erp.tesm.lovego.xin/lovego
	baseURL: '',
	timeout: 2000,
	// headers: {'X-Custom-Header': 'foobar'}
	headers: {},
	withCredentials: true
})


instance.interceptors.request.use(
	config => {
		config.data = JSON.stringify(config.data);
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		if(response.data.code == 2){

		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)
const TOKEN = sessionStorage.getItem('token')

function sortBy(a, b) {
	let A = a.trim().toUpperCase();
	let B = b.trim().toUpperCase();
	if (A > B) {
		return 1;
	}
	if (A < B) {
		return -1
	}
	return 0
}

export default function request(config){
	const options = {}

	if(typeof config === 'string' && API[config]){
		options.url = API[config] ? API[config].url : config;
		options.type = API[config] ? API[config].type : 'get';
		options.data = API[config] ? API[config].data : {};
		options.header = API[config].header ? API[config].header : null
	}else if(config instanceof Object){
		options.url = config.url;
		options.type = config.type || 'get';
		options.data = config.data || {};
		options.params = config.params || {};
		options.header = config.header ? config.header : null
		options.isToken = (config.isToken||config.isToken === undefined) ? true : false;
	}else if(typeof config === 'string' && !API[config]) {
		options.url = config;
		options.type = 'get';
		options.data = {};
		options.header = null;
		options.isToken = false;
	}

	//
	let keyLists = [];
	let str = ''
	Object.keys(options.data).forEach(key => {
		if(options.data[key] === null) {
			delete options.data[key];
			return;
		}
		keyLists.push(key);
	})
	keyLists.sort(sortBy)
	keyLists.forEach(key => {
		str += (key + '=' + options.data[key] + '&');
	})
	str += 'B727A792521E373FA6D7F1F331B77EBC';
	let md5SendData = MD5(str);
	instance.defaults.headers.common['signValue'] = md5SendData;

	options.type = options.type.toUpperCase();
	//get合并data和url
	if(options.type == 'get' && options.params) {
		options.url = Url.computedUrl(options.url, options.params)
	}
	//判断token

	if((options.isToken === undefined || options.isToken === true) && !TOKEN){ //登录之后没有token或没有登录，登录失效
		 console.log('请重新登录')
		 window.location.href = window.location.origin + '/login'
	}else if(TOKEN) {
		instance.defaults.headers.common['sessionId'] = TOKEN;
	}
	let type = options.type;

	const requestData = {
		url: options.url
	}

	switch (type) {
		case 'POST':
		case 'PATCH':
			instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
			requestData.data = options.data;

			break;
		case 'FORM':
			instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
			options.type = 'POST';
			requestData.data = options.data;
			break;
		case 'FORMDATA':
			instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
			options.type = 'POST';
			requestData.params = options.data;
			//axios以formdata形式请求接口可以时params或者加transformRequest处理参数
			// requestData.transformRequest = [function (data) {
			// 	let ret = ''
			// 	for (let it in data) {
			// 		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			// 	}
			// 	return ret
			// }]
			break;
	}
	requestData.method = options.type
	console.log(requestData,'requestData')
	return new Promise((resolve,reject) => {
		instance(
			requestData
		).then(response => {
				resolve(response.data);
		},err => {
			reject(err)
		})
	})

}
