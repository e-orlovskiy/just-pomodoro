import { useState } from 'react'
import { AddTodoInput } from './AddTodoInput'
import { Todo } from './Todo'
import { useTodoList } from '@/lib/hooks/useTodoList'

export function TodoList() {
	const {
		todos,
		addTodoToStore,
		removeTodoFromStore,
		editTodoInStore,
		toggleStoredTodoStatus
	} = useTodoList()

	return (
		<div className='flex rounded-2xl flex-col h-[180px] w-full flex-grow-0 bg-[var(--secondary-color)] relative p-3'>
			<div className='relative flex-1 overflow-hidden'>
				<div
					className='absolute bottom-0 left-0 right-0 h-3 pointer-events-none z-50'
					style={{
						background:
							'linear-gradient(to top, var(--secondary-color) 0%, transparent 100%)',
						opacity: 0.8
					}}
				/>

				<ul className='flex flex-col gap-2 h-full overflow-y-auto scrollbar-hide'>
					{todos.map(todo => (
						<Todo
							key={todo.id}
							id={todo.id.toString()}
							text={todo.text}
							isDone={todo.isDone}
							remove={removeTodoFromStore}
							edit={editTodoInStore}
							toggle={toggleStoredTodoStatus}
						/>
					))}
				</ul>
			</div>

			<AddTodoInput addTodo={addTodoToStore} />
		</div>
	)
}
