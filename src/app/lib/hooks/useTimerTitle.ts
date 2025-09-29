import { useEffect } from 'react'
import { formatTime } from '../utils/formatTime'

interface UseTimerTitleProps {
	timeLeft: number
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
	isRunning: boolean
	isTimerCompleted?: boolean
}

export function useTimerTitle({
	timeLeft,
	mode,
	isRunning,
	isTimerCompleted = false
}: UseTimerTitleProps) {
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

		const previousTitle = document.title
		document.title = title

		return () => {
			document.title = previousTitle
		}
	}, [timeLeft, mode, isRunning, isTimerCompleted])
}
