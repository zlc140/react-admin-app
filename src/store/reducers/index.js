import { combineReducers } from 'redux'
import todos from './todos'
import login from './login'
import visibilityFilter from './visibilityFilter'
import collaped from './collaped'
import languages from './languages'

export default combineReducers({
	userInfo: login,
	todos,
	collaped,
	languages,
	visibilityFilter
})
