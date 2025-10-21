import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ITodo } from '../types'

interface ITodoListState {
	todos: ITodo[] | []
	addTodo: (todo: ITodo) => void
	removeTodo: (id: string) => void
	toggleTodoStatus: (id: string) => void
	editTodo: (id: string, newText: string) => void
}

export const useTodoListStore = create<ITodoListState>()(
	persist(
		set => ({
			todos: [],
			addTodo: (todo: ITodo) => {
				set(state => ({ todos: [...state.todos, todo] }))
			},
			removeTodo: (id: string) => {
				set(state => ({ todos: state.todos.filter(todo => todo.id !== id) }))
			},
			toggleTodoStatus: (id: string) => {
				set(state => ({
					todos: state.todos.map(todo =>
						todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
					)
				}))
			},
			editTodo: (id: string, newText: string) =>
				set(state => ({
					todos: state.todos.map(todo =>
						todo.id === id ? { ...todo, text: newText } : todo
					)
				}))
		}),
		{
			name: 'todo-list-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
