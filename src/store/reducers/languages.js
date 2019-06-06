// TOGGLE_LANGUAGES
const initLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'zh-CN';
console.log(initLanguage,'initLanguage')
const  languages = (state = initLanguage, action) => {
switch (action.type) {
	case 'TOGGLE_LANGUAGES':
		localStorage.setItem('language',action.key); //设置
		return action.key
	default:
		return state
}
}

export default languages
