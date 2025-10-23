'use client'

import { useState } from 'react'

interface TooltipProps {
	content: string
	children: React.ReactNode
	width?: number
}

export function Tooltip({ content, children, width = 420 }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className='relative inline-block'>
			<div
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				className='cursor-help inline-flex px-1.5 rounded-2xl text-[var(--tertiary-color)] bg-[var(--primary-color)]'
			>
				{children}
			</div>
			{isVisible && (
				<div
					className={`absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-[var(--tertiary-color)] bg-[var(--secondary-color)] whitespace-pre-line rounded-lg shadow-lg w-[175px] sm:w-[420px]`}
				>
					{content}
					<div className='absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-[var(--secondary-color)] rotate-45' />
				</div>
			)}
		</div>
	)
}
