// import  React from 'react'
import { connect } from 'react-redux'
import { toggleCollaped, loginOut, toggleLanguages } from '@store/actions'
import languages from "../store/reducers/collaped";
import headTem from './tem/headTem'

//mapStateToProps 必须是个函数，绑定state上指定的值到props上，必须返回一个纯对象
const mapStateToProps = (state) => {
	const islogin = state.userInfo ? true : false;
	return {
		collaped : state.collaped,
		languages: state.languages,
		islogin: islogin
	}
}
//mapDispatchToProps 可是function也可是object,作用是绑定action上的函数到props上
const mapDispatchToProps = (dispatch) => {
	return {
		toggleCollaped: (val) => dispatch(toggleCollaped(val)),
		toggleLanguages: (val) => dispatch(toggleLanguages(val)),
		loginOut: (val) => dispatch(loginOut(val))
	}
	
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(headTem)