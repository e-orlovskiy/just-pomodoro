import { ITodo } from '@/app/lib/types'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export function Todo({ id, text, isDone, remove, edit, toggle }: ITodo) {
	const [value, setValue] = useState(text)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}, [value])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			console.log('Save todo:', value)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length > 150) return
		const newValue = e.target.value
		const singleLineValue = newValue.replace(/\n/g, ' ')
		setValue(singleLineValue)
	}

	return (
		<li className='text-[var(--tertiary-color)] flex items-start gap-2'>
			<div
				className={`flex min-h-[20px] items-center justify-center min-w-[20px] rounded-md cursor-pointer transition-all duration-300 ${
					isDone
						? 'bg-[var(--fourtiary-color)]'
						: 'border-2 border-[var(--fourtiary-color)]'
				}`}
			>
				{isDone && (
					<Image src='/icons/cross.svg' alt='cross' width={16} height={16} />
				)}
			</div>
			<textarea
				ref={textareaRef}
				className={`text-md w-full resize-none border-none outline-none flex-1 flex-col p-0 bg-transparent overflow-hidden leading-tight ${
					isDone ? 'line-through decoration-[var(--fourtiary-color)]' : ''
				}`}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				rows={1}
				style={{ minHeight: '24px' }}
			/>
		</li>
	)
}
