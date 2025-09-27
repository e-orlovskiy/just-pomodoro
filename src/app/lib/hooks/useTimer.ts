import { useEffect } from 'react'
import { useTimerStore } from '../store/useTimerStore'

export function useTimer() {
	const {
		timeLeft,
		mode,
		isRunning,
		startTimer,
		pauseTimer,
		resetTimer,
		switchMode,
		tick,
		sessionsCompleted
	} = useTimerStore()

	useEffect(() => {
		if (!isRunning) return

		const interval = setInterval(() => {
			tick()
		}, 1000)

		return () => clearInterval(interval)
	}, [tick, isRunning])

	const toggleTimer = () => {
		if (isRunning) {
			pauseTimer()
		} else {
			startTimer()
		}
	}

	const reset = () => {
		resetTimer()
	}

	const switchTimerMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
		switchMode(mode)
	}

	const totalTime = useTimerStore(state => state.settings[`${mode}Time`])

	return {
		timeLeft,
		mode,
		isRunning,
		toggleTimer,
		reset,
		switchTimerMode,
		sessionsCompleted,
		totalTime
	}
}
