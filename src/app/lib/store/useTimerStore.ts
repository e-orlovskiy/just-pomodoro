import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ISettings } from '../types'
import { soundPlayer } from '../soundPlayer'
import { notificationManager } from '../notifications'

interface TimerState {
	// 1. timer states
	timeLeft: number
	isRunning: boolean
	mode: 'pomodoro' | 'shortBreak' | 'longBreak'
	sessionsCompleted: number

	// 2. settings
	settings: ISettings

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
				autoStartPomodoros: false,
				confirmActions: true,
				notificationSound: 'bell-1',
				volume: 1,
				step: 0.1,
				browserNotifications: false
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
					isRunning:
						state.settings.autoStartPomodoros &&
						(state.mode === 'shortBreak' || state.mode === 'longBreak')
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

				let shouldAutoStart = false
				const currentMode = state.mode

				if (currentMode === 'pomodoro') {
					shouldAutoStart = state.settings.autoStartBreaks
				} else {
					shouldAutoStart = state.settings.autoStartPomodoros
				}

				// play sound
				if (state.settings.notificationSound) {
					soundPlayer.play(
						state.settings.notificationSound,
						state.settings.volume
					)
				}

				// browser notification
				if (
					state.settings.browserNotifications &&
					notificationManager.isSupported()
				) {
					console.log('🔔 Attempting to show notification for:', state.mode)
					const modeMessages = {
						pomodoro: {
							title: 'Pomodoro Completed! 🎉',
							body: shouldAutoStart
								? 'Time for a break!\nYour break session will start automatically.'
								: 'Time for a break!\nGo to browser and start your break session!'
						},
						shortBreak: {
							title: 'Break Time Over! ⏱️',
							body: shouldAutoStart
								? 'Time for a pomodoro!\nYour pomodoro session will start automatically.'
								: 'Time for a pomodoro!\nGo to browser and start your pomodoro session!'
						},
						longBreak: {
							title: 'Long Break Finished 🌟',
							body: shouldAutoStart
								? 'Hope you enjoyed your break! Time for a pomodoro!\nYour pomodoro session will start automatically.'
								: 'Hope you enjoyed your break! Time for a pomodoro!\nGo to browser and start your pomodoro session!'
						}
					}
					const message = modeMessages[currentMode]
					notificationManager.showNotification(message.title, {
						body: message.body,
						tag: 'pomodoro-timer',
						requireInteraction: true
					})
				}

				set({
					sessionsCompleted: newSessionsCompleted,
					mode: nextMode,
					timeLeft: safeTimeLeft,
					isRunning: shouldAutoStart
				})
			}
		}),
		{
			name: 'pomodoro-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
