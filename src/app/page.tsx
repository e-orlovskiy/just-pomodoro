'use client'

import { Header } from '@/components/Header'
import { TimerDisplay } from '@/components/timer/display/TimerDisplay'
import { ModeSelector } from '@/components/timer/mode/ModeSelector'
import { ModalConfirm } from './components/ModalConfirm'
import { useTimer } from './lib/hooks/useTimer'
import { useTimerTitle } from './lib/hooks/useTimerTitle'
import { TodoList } from './components/todo/TodoList'

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

	useTimerTitle()

	return (
		<div className='bg-[var(--primary-color)] h-full flex items-center p-4 flex-col w-lg justify-between grow-0'>
			<Header />
			<div className='flex flex-col gap-3 w-full items-center'>
				<TimerDisplay
					time={timeLeft}
					mode={mode}
					totalTime={totalTime}
					isRunning={isRunning}
					toggle={toggle}
					reset={reset}
					complete={complete}
				/>
			</div>
			<TodoList />
			<ModeSelector currentMode={mode} switchTimerMode={switchTimerMode} />
			<ModalConfirm />
		</div>
	)
}
