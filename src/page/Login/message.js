import  React, { Component } from 'react';
// import { connect } from 'react-redux';
import { style } from './password'
import { Form, Icon, Input, Button, Row, Col } from 'antd';
export default class Home extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	render() {
		return (
			 <Form className="login-form">
				 <Form.Item>
					 <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
				 </Form.Item>
				 <Form.Item>
					 <Row gutter={8}>
						 <Col span={12}>
						    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
						 </Col>
						 <Col span={12}>
							 <Button>获取验证码</Button>
						 </Col>
					 </Row>
				 </Form.Item>
				 <Form.Item>
					 
					 <Button type="primary" htmlType="submit" style={style.Button} className="login-form-button">
						 登录
					 </Button>
				 </Form.Item>
			 </Form>
			 
		)
	}
}