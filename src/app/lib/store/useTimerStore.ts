import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TimerState {
	// 1. timer states
	timeLeft: number
	isRunning: boolean
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
	sessionsCompleted: number

	// 2. settings
	settings: {
		pomodoroTime: number
		shortBreakTime: number
		longBreakTime: number
		longBreakInterval: number
		autoStartBreaks: boolean
		autoStartPomodoros: boolean
	}

	// 3. actions
	startTimer: () => void
	pauseTimer: () => void
	resetTimer: () => void
	switchMode: (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => void
	updateSettings: (newSettings: Partial<TimerState['settings']>) => void
	tick: () => void
	completeSession: () => void
}

export const useTimerStore = create<TimerState>()(
	persist(
		(set, get) => ({
			timeLeft: 25 * 60,
			isRunning: false,
			mode: 'pomodoro',
			sessionsCompleted: 0,
			settings: {
				pomodoroTime: 25 * 60,
				shortBreakTime: 5 * 60,
				longBreakTime: 15 * 60,
				longBreakInterval: 4,
				autoStartBreaks: false,
				autoStartPomodoros: false
			},
			startTimer: () => set({ isRunning: true }),
			pauseTimer: () => set({ isRunning: false }),
			resetTimer: () => {
				const state = get()
				const newMode = 'pomodoro'
				const newTime = state.settings[`${newMode}Time`]
				set({
					mode: newMode,
					timeLeft: newTime,
					isRunning: false
				})
			},
			switchMode: mode => {
				const state = get()
				const newTime = state.settings[`${mode}Time`]
				set({
					mode,
					timeLeft: newTime,
					isRunning: false
				})
			},
			updateSettings: newSettings => {
				set(state => ({
					settings: { ...state.settings, ...newSettings },
					timeLeft: newSettings.pomodoroTime || state.timeLeft
				}))
			},
			tick: () => {
				const state = get()
				if (state.timeLeft > 0) {
					set({ timeLeft: state.timeLeft - 1 })
				} else {
					set({ isRunning: false })
					get().completeSession()
				}
			},
			completeSession: () => {
				const state = get()
				let newSessionsCompleted = state.sessionsCompleted
				let nextMode: 'pomodoro' | 'shortBreak' | 'longBreak' = 'pomodoro'

				if (state.mode === 'pomodoro') {
					newSessionsCompleted += 1

					const shouldTakeLongBreak =
						state.settings.longBreakInterval > 0 &&
						newSessionsCompleted % state.settings.longBreakInterval === 0

					nextMode = shouldTakeLongBreak ? 'longBreak' : 'shortBreak'
				}

				const nextModeTime = state.settings[`${nextMode}Time`]
				const safeTimeLeft = Math.max(0, nextModeTime)

				set({
					sessionsCompleted: newSessionsCompleted,
					mode: nextMode,
					timeLeft: safeTimeLeft,
					isRunning: state.settings.autoStartBreaks && state.mode === 'pomodoro'
				})
			}
		}),
		{
			name: 'pomodoro-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
