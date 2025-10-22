'use client'

import Image from 'next/image'

interface TimerControlsPanelProps {
	toggle: () => void
	reset: () => void
	complete: () => void
	isRunning: boolean
	show: boolean
}

export function TimerControlsPanel({
	show,
	toggle,
	reset,
	complete,
	isRunning
}: TimerControlsPanelProps) {
	const CONTROLS_MAP = [
		{ name: 'skip', icon: 'skip', action: complete },
		{ name: 'toggle', icon: isRunning ? 'pause' : 'play', action: toggle },
		{ name: 'reset', icon: 'reset', action: reset }
	]

	return (
		<>
			<div className='absolute inset-0 flex items-center justify-center gap-3 z-10'>
				{CONTROLS_MAP.map((control, index) => (
					<button
						key={control.name}
						onClick={e => {
							e.stopPropagation()
							control.action()
						}}
						className={`
						group rounded-full 
						text-center
						bg-[var(--secondary-color)]
						px-2
						py-2
						flex items-center justify-center 
						transition-all duration-300 ease-out
						scale-85 sm:scale-100
						${
							(show &&
								(index === 0
									? 'delay-0 -translate-y-40 sm:-translate-y-54'
									: '')) ||
							(show &&
								(index === 1
									? 'delay-150 -translate-y-43 sm:-translate-y-56'
									: '')) ||
							(show &&
								(index === 2
									? 'delay-300 -translate-y-40 sm:-translate-y-54'
									: ''))
						}
					`}
					>
						<Image
							src={`/icons/${control.icon}.svg`}
							alt={control.name}
							width={36}
							height={36}
							className='
							rounded-full
							opacity-60 
							transition-all duration-300 
							group-hover:opacity-100 
							group-hover:scale-105
						'
						/>
					</button>
				))}
			</div>
		</>
	)
}
