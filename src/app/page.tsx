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

	useTimerTitle()

	return (
		<div className='bg-[var(--primary-color)] h-full flex items-center p-4 flex-col max-w-lg justify-between grow-0'>
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
				<div className='flex rounded-2xl flex-col h-[150px] w-full flex-grow-0 max-w-full bg-[var(--secondary-color)] overflow-auto p-3 gap-2'>
					<div className='text-[var(--tertiary-color)] flex items-start gap-1'>
						<div className='flex min-h-[24px] min-w-[24px] border-2 border-[var(--fourtiary-color)] rounded-md cursor-pointer'></div>
						<span className='text-md '>
							Just make this fucking redisign. Just make this fucking redisign
						</span>
					</div>
					<div className='text-[var(--tertiary-color)] flex items-start gap-1'>
						<div className='h-[24px] w-[24px] border-2 border-[var(--fourtiary-color)] rounded-md cursor-pointer'></div>
						<span className='text-md '>Go fucking sleep</span>
					</div>
				</div>
			</div>
			<ModeSelector currentMode={mode} switchTimerMode={switchTimerMode} />

			<ModalConfirm />
		</div>
	)
}
