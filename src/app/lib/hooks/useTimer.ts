import { useModal } from '@/app/contexts/ModalContext'
import { useTimerStore } from '@/lib/store/useTimerStore'
import { useEffect } from 'react'

export function useTimer() {
	const {
		timeLeft,
		mode,
		isRunning,
		startTimer,
		pauseTimer,
		resetTimer,
		switchMode,
		completeSession,
		tick,
		sessionsCompleted
	} = useTimerStore()

	const { openModal } = useModal()

	useEffect(() => {
		if (!isRunning) return

		const interval = setInterval(() => {
			tick()
		}, 1000)

		return () => clearInterval(interval)
	}, [tick, isRunning])

	// toggle timer
	const toggle = () => {
		if (isRunning) pauseTimer()
		else startTimer()
	}

	// reset timer
	const reset = () => {
		openModal('reset', resetTimer)
	}

	// complete session
	const complete = () => {
		openModal('skip', completeSession)
	}

	const switchTimerMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
		openModal('switch', () => switchMode(mode))
	}

	const totalTime = useTimerStore(state => state.settings[`${mode}Time`])

	return {
		timeLeft,
		mode,
		isRunning,
		toggle,
		reset,
		complete,
		switchTimerMode,
		sessionsCompleted,
		totalTime
	}
}
