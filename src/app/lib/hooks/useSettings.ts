import { useTimerStore } from '@/lib/store/useTimerStore'
import { useState } from 'react'
import { ISettings } from '../types'
import { notificationManager } from '../notifications'

export function useSettings() {
	const originalSettings = useTimerStore(state => state.settings)
	const updateSettings = useTimerStore(state => state.updateSettings)
	const resetTimer = useTimerStore(state => state.resetTimer)

	const [draftSettings, setDraftSettings] = useState<ISettings>({
		...originalSettings,
		pomodoroTime: Math.floor(originalSettings.pomodoroTime / 60),
		shortBreakTime: Math.floor(originalSettings.shortBreakTime / 60),
		longBreakTime: Math.floor(originalSettings.longBreakTime / 60)
	})

	// useEffect(() => {
	//   if (draftSettings.browserNotifications && notificationManager.isSupported()) {
	//     const permission = notificationManager.getPermissionStatus()
	//     if (permission === 'default') {
	//       // Автоматически запрашиваем разрешение при загрузке настроек
	//       notificationManager.requestPermission()
	//     }
	//   }
	// }, [draftSettings.browserNotifications])

	const updateDraftSettings = async (newSettings: Partial<ISettings>) => {
		if (newSettings.browserNotifications === true) {
			if (!notificationManager.isSupported()) {
				alert('Browser notifications are not supported in your browser')
				newSettings.browserNotifications = false
			} else {
				const granted = await notificationManager.requestPermission()

				if (!granted) {
					alert(
						'Notifications are blocked. Please enable them in browser settings.'
					)
					newSettings.browserNotifications = false
				}
			}
		}

		setDraftSettings(prev => ({ ...prev, ...newSettings }))
	}

	const saveSettings = () => {
		resetTimer()
		updateSettings({
			...draftSettings,
			pomodoroTime: draftSettings.pomodoroTime * 60,
			shortBreakTime: draftSettings.shortBreakTime * 60,
			longBreakTime: draftSettings.longBreakTime * 60
		})

		// for animation
		setTimeout(() => (document.title = 'Pomodoro Timer'), 0)
	}

	const resetSettings = () => {
		// for animation
		setTimeout(() => {
			setDraftSettings(originalSettings)
		}, 100)
	}

	return {
		draftSettings,
		updateDraftSettings,
		saveSettings,
		resetSettings
	}
}
