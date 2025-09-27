'use client'

import { Header } from './components/Header'
import { TimerDisplay } from './components/timer/TimerDisplay'
import { TimerControls } from './components/TimerControls'
import { useTimer } from './lib/hooks/useTimer'

export default function Home() {
	const { timeLeft, mode, toggleTimer, totalTime } = useTimer()

	return (
		<div className='bg-[var(--primary-color)] h-full flex items-center p-4 flex-col min-w-lg justify-between'>
			<Header />
			<TimerDisplay
				time={timeLeft}
				mode={mode}
				onClick={toggleTimer}
				totalTime={totalTime}
			/>
			<TimerControls currentMode={mode} />
		</div>
	)
}
