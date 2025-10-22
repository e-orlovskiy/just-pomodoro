import { useState, useRef } from 'react'
import Image from 'next/image'
import { ITodo } from '@/app/lib/types'

export function AddTodoInput({ addTodo }: { addTodo: (todo: ITodo) => void }) {
	const [isActive, setIsActive] = useState(false)
	const [todo, setTodo] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const generateId = () => {
		if (typeof crypto !== 'undefined' && crypto.randomUUID) {
			return crypto.randomUUID()
		}
		return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
	}

	const handleContainerClick = () => {
		if (!isActive) {
			setIsActive(true)
			setTimeout(() => inputRef.current?.focus(), 0)
		}
	}

	const handleInputBlur = () => {
		setIsActive(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 150) {
			e.target.value = e.target.value.slice(0, 150)
		}
		setTodo(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			addTodo({ id: generateId(), text: todo, isDone: false })
			setTodo('')
		}
	}

	return (
		<div
			className={`flex items-center cursor-text justify-center p-0 bg-[var(--settings-bg-color)] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-xl absolute bottom-2 right-2 transition-all duration-500 z-50 ${
				isActive
					? 'w-[calc(100%-16px)] sm:w-[calc(100%-16px)]'
					: 'w-[30px] sm:w-[40px]'
			}`}
			onClick={handleContainerClick}
		>
			<div
				className={`flex items-center justify-center transition-all duration-300 ${
					isActive ? 'opacity-0 scale-10 absolute' : 'opacity-100 scale-100'
				}`}
			>
				<Image
					src='/icons/plus.svg'
					alt='Add task'
					width={24}
					height={24}
					className='scale-70 sm:scale-100'
				/>
			</div>

			<input
				ref={inputRef}
				className={`outline-none border-none placeholder:text-[var(--tertiary-color)] text-[var(--tertiary-color)] h-full w-full text-sm sm:text-md bg-transparent p-2 text-left transition-all duration-300 ${
					isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
				}`}
				type='text'
				value={todo}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={handleInputBlur}
				placeholder='new task...'
			/>
		</div>
	)
}
