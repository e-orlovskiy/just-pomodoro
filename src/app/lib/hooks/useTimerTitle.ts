import { useEffect } from 'react'
import { formatTime } from '../utils/formatTime'
import { useTimerStore } from '../store/useTimerStore'

export function useTimerTitle() {
	const timeLeft = useTimerStore(state => state.timeLeft)
	const mode = useTimerStore(state => state.mode)
	const isRunning = useTimerStore(state => state.isRunning)
	const isTimerCompleted = timeLeft === 0

	useEffect(() => {
		let title: string

		if (isTimerCompleted) {
			title = "Time's up!"
		} else {
			const timeString = formatTime(timeLeft)
			const modeString = {
				pomodoro: 'Pomodoro',
				shortBreak: 'Short Break',
				longBreak: 'Long Break'
			}[mode]

			const statusIcon = isRunning ? '▶' : '❚❚'
			title = `${statusIcon} ${timeString} - ${modeString}`
		}

		document.title = title
	}, [timeLeft, mode, isRunning, isTimerCompleted])
}
