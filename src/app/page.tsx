'use client'

import { Header } from '@/components/Header'
import { TimerDisplay } from '@/components/timer/display/TimerDisplay'
import { ModeSelector } from '@/components/timer/mode/ModeSelector'
import { ModalConfirm } from './components/ModalConfirm'
import { useTimer } from './lib/hooks/useTimer'
import { useTimerTitle } from './lib/hooks/useTimerTitle'

export default function Home() {
	const {
		timeLeft,
		mode,
		totalTime,
		toggle,
		reset,
		complete,
		isRunning,
		switchTimerMode
	} = useTimer()

	const isTimerCompleted = timeLeft === 0

	useTimerTitle({
		timeLeft,
		mode,
		isRunning,
		isTimerCompleted
	})

	return (
		<div className='bg-[var(--primary-color)] h-full flex items-center p-4 flex-col min-w-lg justify-between'>
			<Header />
			<TimerDisplay
				time={timeLeft}
				mode={mode}
				totalTime={totalTime}
				isRunning={isRunning}
				toggle={toggle}
				reset={reset}
				complete={complete}
			/>
			<ModeSelector currentMode={mode} switchTimerMode={switchTimerMode} />

			<ModalConfirm />
		</div>
	)
}
