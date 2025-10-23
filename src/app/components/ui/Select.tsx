'use client'

import { useEffect, useRef, useState } from 'react'

export function Select({
	value,
	options,
	onChange
}: {
	value: string
	options: { value: string; label: string }[]
	onChange?: (value: string) => void
}) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const selectedOption = options.find(opt => opt.value === value)

	const handleOptionClick = (optionValue: string) => {
		onChange?.(optionValue)
		setIsOpen(false)
		// soundPlayer.play(optionValue, 0.7)
	}

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='
          sm:w-[140px] sm:h-[36px] w-[110px] h-[32px] bg-[var(--secondary-color)] 
          rounded-full p-1 pl-3 pr-3 text-md sm:text-lg
          flex items-center justify-between
          text-[var(--tertiary-color)] cursor-pointer
          hover:bg-[var(--secondary-color)]/80
        '
			>
				<span>{selectedOption?.label}</span>
				<svg
					className={`w-4 h-4 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path
						fillRule='evenodd'
						d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</button>

			{isOpen && (
				<div
					className='
          absolute top-full left-0 right-0 mt-1 
          bg-[var(--secondary-color)] rounded-3xl 
          border border-[var(--settings-bg-color)]
          shadow-lg z-10 overflow-hidden
        '
				>
					{options.map(option => (
						<button
							key={option.value}
							type='button'
							onClick={() => {
								handleOptionClick(option.value)
							}}
							className='
                w-full p-1 text-center text-[var(--tertiary-color)]
                hover:bg-[var(--settings-bg-color)]
                transition-colors
                first:rounded-t-xl last:rounded-b-xl
              '
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
