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

export const loginInfo = info => ({
	type: 'SET_USER_INFO',
	userInfo: info
})
export const loginOut = (val) => ({
	type: 'LOGIN_OUT',
	val
})

export const toggleCollaped = value => ({
	type: 'TOOGLE_COLLAPED',
	value
})

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}