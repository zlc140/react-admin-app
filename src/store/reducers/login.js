const USERINFO = sessionStorage.getItem('userInfo')
const isLogin = USERINFO ? JSON.parse(USERINFO) : null

const userInfo = (state = isLogin, action) => {
	switch (action.type) {
		case 'SET_USER_INFO':
			const userInfo = Object.assign({}, action.userInfo)
			sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
			return userInfo
		case 'LOGIN_OUT':
			console.log('out',action)
			if(action.val)sessionStorage.removeItem('userInfo');
			let prop = action.val ?  null : state
			return prop;
		default:
			return state
	}
}

export default userInfo;