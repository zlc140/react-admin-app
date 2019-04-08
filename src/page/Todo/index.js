import React from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import VisibleTodoList from './components/visibleTodoList'

const App = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
	    <TodoList/>
	</div>
)

export default App
