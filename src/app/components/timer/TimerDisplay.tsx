import { formatTime } from '../../lib/utils/formatTime'
import { ProgressRing } from './ProgressRing'

export function TimerDisplay({
	time,
	mode,
	onClick,
	totalTime
}: {
	time: number
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
	onClick: () => void
	totalTime: number
}) {
	const MODE_MAP = {
		pomodoro: 'pomodoro',
		shortBreak: 'short break',
		longBreak: 'long break'
	}

	const currentMode = MODE_MAP[mode]

	return (
		<div
			className='flex flex-col items-center justify-center relative w-[385px] h-[385px] rounded-full box-content bg-[var(--secondary-color)] hover:scale-105 transition-transform ease-in-out duration-450 cursor-pointer'
			style={{ boxShadow: '0 0 40px 2px #ffffff1d' }}
			onClick={onClick}
		>
			<ProgressRing timeLeft={time} totalTime={totalTime} mode={mode} />

			<p className='text-7xl font-bold text-[var(--tertiary-color)]'>
				{formatTime(time)}
			</p>

			<p className=' absolute bottom-30 text-2xl text-[var(--fourtiary-color)]'>
				{currentMode}
			</p>
		</div>
	)
}
