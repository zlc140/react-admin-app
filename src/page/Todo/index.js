import React from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import VisibleTodoList from './components/visibleTodoList'
import TitlePopover from '@components/titlePopover'

const App = () => {

	return (
		<div>
			<TitlePopover title='我的todo' content={<span>1.UI组件和业务组件分离；<br/>2.react-redux数据管理</span>}>
				<span>TODO</span>
			</TitlePopover>

			<AddTodo />
			<VisibleTodoList />
			<TodoList/>
		</div>
	)
}

export default App
