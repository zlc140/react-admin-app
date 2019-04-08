const collapeds = (state = false, action) => {
	switch (action.type) {
		case 'TOOGLE_COLLAPED':
			return !action.value
		default:
			return state
	}
}

export default collapeds