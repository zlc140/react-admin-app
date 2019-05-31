import  React from 'react';
import { useState, useContext } from 'react';
// import { connect } from 'react-redux';
import { style } from './password'
import { Form, Icon, Input, Button, Row, Col, message } from 'antd';
import {useInputValue, useMount, useInterVal} from '../../useHooks'
import $service from '@service/index'
import { isMobile } from '@utils/validate'
import SendCode from './sendCode'


const Register = () => {
	let mobile = useInputValue('')
	let code = useInputValue('')
	let [isSms, setIsSms] = useState(false)
	let [count, setCount] = useState(10)
	let [delay, setDelay] = useState(null)
	let [voiceTip, setVoiceTip] = useState('发送验证码')

	const validateSubmit = () => {
		let errText = '';
		if(!mobile.value) {
			errText = '请输入手机号码'
		} else if(isSms && !code.value) {
			errText = '请输入获取的验证码'
		} else if(!isSms){
			errText = '请获取验证码'
		} else if(!isMobile(mobile.value)) {
			errText = '手机号不合法'
		}
		if(errText) {
			message.error(errText, 3)
		}
		return !errText;
	}

	useInterVal(()=> {
		console.log('count', count)
		if(count === 0) {
			setVoiceTip('重新发送');
			setCount(59);
			setIsSms(false);
			setDelay(null)
		}else{
			setCount(count - 1)
			setVoiceTip(count + '秒后重试');
		}
	}, delay)
	//本来想通过直接将setInter赋值到hooks state上直接在销毁时clear的，但事实是打脸的，无法赋值delay一直未null
	// useEffect(() => {
	// 	console.log(delay)
	// 	return () => {
	// 		console.log(delay,'unmount')
	// 		if(delay){
	// 			clearInterval(delay)
	// 		}
	// 	}
	// },[])

	const submit = function() {
		// message.success(mobile.value,2)
		if(validateSubmit()) {
			let prop = {
				mobile: mobile.value,
				code: code.value
			}
			console.log(prop);
		}
	}

	const getCode = function(event) {
		if(!mobile.value) {
			message.error('手机号不合法', 3)
			return;
		}
		if(isSms){
			return false;
		}
		$service('user/getCode').then(res => {
			setIsSms(true);
			setDelay(1000) //开启定时器
			// handleVoiceCode()
		})
	}

	const handleVoiceCode = () => {
		let time = 59;
		let id = setInterval(function () {
			time--;
			setCount(time);
			if (time === 0) {
				clearInterval(id);
				setVoiceTip('重新发送');
				setIsSms(false);
			} else {
				setVoiceTip(time + '秒后重试');
			}
		}, 1000)

		console.log(delay,'delay')
	}

	return (
		<form className="login-form">
			<div className="form-item">
				<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
				<input className="has-icon" id={'mobile'} name={'mobile'} {...mobile} placeholder="手机号"/>
			</div>
			<div className="form-item">

				<Row gutter={8}>
					 <Col span={12}>
						 <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
						 <input className="has-icon" id={'code'} name={'code'} {...code} placeholder="验证码"/>
					 </Col>
					 <Col span={12}>
						 {/*<SendCode mobile={mobile.value}></SendCode>*/}
						 <Button style={{width: '100%'}} onClick={getCode}>{voiceTip}</Button>
					 </Col>
				 </Row>
			</div>
			<div className="form-item">
				<Button type="primary" onClick={submit} style={style.Button} className="login-form-button">
					登录
				</Button>
			</div>
		</form>
	)

}

Register.getInitialProps = () => {
	return {
		initInfo: 'test'
	}
}

export default Register;

// export default class Home extends Component {
// 	// constructor(props) {
// 	// 	super(props);
// 	// }
// 	render() {
// 		return (
// 			 <Form className="login-form">
// 				 <Form.Item>
// 					 <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
// 				 </Form.Item>
// 				 <Form.Item>
// 					 <Row gutter={8}>
// 						 <Col span={12}>
// 						    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
// 						 </Col>
// 						 <Col span={12}>
// 							 <Button>获取验证码</Button>
// 						 </Col>
// 					 </Row>
// 				 </Form.Item>
// 				 <Form.Item>
//
// 					 <Button type="primary" htmlType="submit" style={style.Button} className="login-form-button">
// 						 登录
// 					 </Button>
// 				 </Form.Item>
// 			 </Form>
//
// 		)
// 	}
// }
