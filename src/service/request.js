import axios from 'axios'
import config from './config'

axios.defaults.timeout = config.timeout || 5000
axios.defaults.baseURL = config.baseURL || ''

axios.interceptors.request.use(
	config => {
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type':'application/x-www.form-urlencoded'
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	response => {
		if(response.data.code == 2){
		
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)

function fetch(url, params={}) {

}