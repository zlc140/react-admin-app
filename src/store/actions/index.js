import $service from '@service/index'

let nextTodoId = 0;
export const addTodo = text => ({
	type: 'ADD_TODO',
	id: nextTodoId++,
	text
})

export const setVisibilityFilter = filter => ({
	type: 'SET_VISIBILITY_FILTER',
	filter
})

export const toggleTodo = id => ({
	type: 'TOGGLE_TODO',
	id
})
//切换语言
export const toggleLanguages = key => ({
	type: 'TOGGLE_LANGUAGES',
	key
})

export const loginInfo = info => {
	sessionStorage.setItem('token',info)
	return (dispath) => {
		return new Promise((resolve, reject) => {
			console.log(sessionStorage.getItem('token'),'token')
			$service({
				url:'/user/users/userInfo',
				type: 'get'
			}).then(res => {
				if(res.data) {
					dispath({
						type: 'SET_USER_INFO',
						userInfo: res.data
					})
					setTimeout(() => {
						resolve(true)
					})
				}else{
					reject(res.message)
				}

			}).catch(err => {
				reject(err)
			})
		})

	}
}
export const loginOut = (val) => ({
	type: 'LOGIN_OUT',
	val
})

export const toggleCollaped = value => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch({
				type: 'TOOGLE_COLLAPED',
				value
			})
		})

	}
}

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}
