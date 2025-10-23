import { TimerControlsPanel } from '@/components/timer/controls/TimerControlsPanel'
import { ProgressRing } from '@/components/timer/display/ProgressRing'
import { formatTime } from '@/lib/utils/formatTime'
import { useState } from 'react'

interface TimerDisplayProps {
	time: number
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
	totalTime: number
	isRunning: boolean
	toggle: () => void
	reset: () => void
	complete: () => void
}

export function TimerDisplay({
	time,
	mode,
	totalTime,
	isRunning,
	toggle,
	reset,
	complete
}: TimerDisplayProps) {
	const MODE_MAP = {
		pomodoro: 'pomodoro',
		shortBreak: 'short break',
		longBreak: 'long break'
	}

	const [showControls, setShowControls] = useState(false)

	return (
		<div
			className='relative w-[285px] h-[285px] sm:w-[385px] sm:h-[385px] hover:rounded-full '
			onClick={() => setShowControls(!showControls)}
		>
			<TimerControlsPanel
				show={showControls}
				toggle={toggle}
				reset={reset}
				complete={complete}
				isRunning={isRunning}
			/>

			<div className='flex flex-col items-center justify-center w-full h-full rounded-full bg-[var(--secondary-color)] z-20 relative'>
				<ProgressRing
					timeLeft={time}
					totalTime={totalTime}
					mode={mode}
					radius={130}
					classname='block sm:hidden'
				/>
				<ProgressRing
					timeLeft={time}
					totalTime={totalTime}
					mode={mode}
					radius={180}
					classname='hidden sm:block'
				/>
				<div className='flex items-center absolute top-16 gap-2'></div>
				<p className='text-5xl sm:text-7xl font-bold text-[var(--tertiary-color)] z-30 relative'>
					{formatTime(time)}
				</p>

				<p className='absolute bottom-22 text-xl sm:text-2xl text-[var(--fourtiary-color)] z-30'>
					{MODE_MAP[mode]}
				</p>
			</div>
		</div>
	)
}
