import  React, { Component } from 'react';
// import {  Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import $service from '@service/index'

class NomalLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {

				let prop = {
					accoutNo: values.username,
					password: values.password
				}
				$service({
					url:'/user/users/login/password',
					type: 'formdata',
					isToken: false,
					data: prop
				}).then(res => {
					console.log(res)
					//登录成功
					res.data.token && this.props.loginSubmit(res.data.token).then(res => {
						this.props.redirectPath();
					}).catch(err => {
						console.log(err)
					})
				}).catch(err => {
					console.log(err,'e')
				})




			}
		})
	}
	vallidatorMobile = (rule, value, callback) =>{
		const exp = /^1[3-9]\d{9}$/;
		if(!exp.test(value) && value != 'admin'){
			callback('请输入正确的手机号')
		}
		callback();
	}
	vallidatorPassword = (value) => {
		const form = this.props.form;
		if(!form.getFieldsValue('mobile')){
			form.setFieldsValue({'password': ''})
		}

	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form className="login-form" onSubmit={this.handleSubmit}>
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '手机号必填' },
							{validator: this.vallidatorMobile}]
						})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="手机号"
							/>
					)}

				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '密码' }
						// ,{validator: this.vallidatorPassword}
						]
					})(
						<Input prefix={<Icon type="user"  style={{ color: 'rgba(0,0,0,.25)' }} />}
						       placeholder="密码" type="password"/>
					)}

				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button" style={style.Button}>
						登录
					</Button>
				</Form.Item>
			</Form>

		)
	}
}

export const style = {
	Button : {
		background: 'rgba(0,0,0,.25)',
		width:'100%',
		color: '#a9a9a9',
		border:'none'
	}
}
const passwordForm = Form.create({ name: 'normal_login' })(NomalLoginForm);
export default passwordForm
