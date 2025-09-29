'use client'

interface ProgressRingProps {
	timeLeft: number
	totalTime: number
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
}

export function ProgressRing({ timeLeft, totalTime, mode }: ProgressRingProps) {
	const radius = 180
	const stroke = 12
	const normalizedRadius = radius - stroke / 2
	const circumference = 2 * Math.PI * normalizedRadius
	const progress = ((totalTime - timeLeft) / totalTime) * circumference

	const getColor = () => {
		if (mode === 'pomodoro') return 'var(--primary-color)'
		if (mode === 'shortBreak') return 'var(--primary-color)'
		if (mode === 'longBreak') return 'var(--primary-color)'
	}

	return (
		<svg
			height={radius * 2}
			width={radius * 2}
			className='transform -rotate-90 absolute z-40' // z-40 чтобы быть выше контролов
		>
			<circle
				stroke={getColor()}
				fill='transparent'
				strokeWidth={stroke}
				strokeDasharray={circumference + ' ' + circumference}
				strokeDashoffset={circumference - progress}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
				strokeLinecap='round'
				className='transition-all duration-1000 ease-linear'
			/>
		</svg>
	)
}
