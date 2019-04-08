import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '@store/actions'
import { Form, Button } from 'antd';

const AddTodo = ({dispatch}) => {
	let input
	return (
		<div>
			<Form onSubmit={e => {
				e.preventDefault()
				if (!input.value.trim()){
					return
				}
				dispatch(addTodo(input.value))
			}}>
				<Form.Item>
					<input style={style.inputBox} type="text" ref={node => input = node} />
					<Button type="primary" htmlType="submit">Add Todo</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

const style = {
	inputBox: {
		widht: '200px',
		height:'32px',
		borderRadius: '4px',
		border: '1px solid #d9d9d9',
		marginRight: '20px',
		outline: 'none'
	}
}

export default connect()(AddTodo)