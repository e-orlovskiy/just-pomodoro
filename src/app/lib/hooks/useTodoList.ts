import { useTodoListStore } from '../store/useTodoListStore'
import { ITodo } from '../types'
export function useTodoList() {
	const { todos, addTodo, removeTodo, editTodo, toggleTodoStatus } =
		useTodoListStore()

	const addTodoToStore = (todo: ITodo) => {
		addTodo(todo)
	}

	const removeTodoFromStore = (id: string) => {
		removeTodo(id)
	}

	const editTodoInStore = (id: string, newText: string) => {
		editTodo(id, newText)
	}

	const toggleStoredTodoStatus = (id: string) => {
		toggleTodoStatus(id)
	}

	return {
		todos,
		addTodoToStore,
		removeTodoFromStore,
		editTodoInStore,
		toggleStoredTodoStatus
	}
}
