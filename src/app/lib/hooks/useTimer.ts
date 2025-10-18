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
		sessionsCompleted,
		settings
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
		if (settings.confirmActions) {
			openModal('reset', resetTimer)
		} else {
			resetTimer()
		}
	}

	// complete session
	const complete = () => {
		if (settings.confirmActions) {
			openModal('skip', completeSession)
		} else {
			completeSession()
		}
	}

	const switchTimerMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
		if (settings.confirmActions) {
			openModal('switch', () => switchMode(mode))
		} else {
			switchMode(mode)
			pauseTimer()
		}
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
