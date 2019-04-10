// TOGGLE_LANGUAGES
const  languages = (state = 'zh-CN', action) => {
	console.log(action)
switch (action.type) {
	case 'TOGGLE_LANGUAGES':
		return action.key
	default:
		return state
}
}

export default languages