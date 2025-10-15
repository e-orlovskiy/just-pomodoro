import { useTimerStore } from '@/lib/store/useTimerStore'
import { useState } from 'react'
import { ISettings } from '../types'

export function useSettings() {
	const originalSettings = useTimerStore(state => state.settings)
	const updateSettings = useTimerStore(state => state.updateSettings)

	const [draftSettings, setDraftSettings] = useState<ISettings>({
		...originalSettings,
		pomodoroTime: Math.floor(originalSettings.pomodoroTime / 60),
		shortBreakTime: Math.floor(originalSettings.shortBreakTime / 60),
		longBreakTime: Math.floor(originalSettings.longBreakTime / 60)
	})

	const updateDraftSettings = (newSettings: Partial<ISettings>) => {
		setDraftSettings(prev => ({ ...prev, ...newSettings }))
	}

	const saveSettings = () => {
		updateSettings({
			...draftSettings,
			pomodoroTime: draftSettings.pomodoroTime * 60,
			shortBreakTime: draftSettings.shortBreakTime * 60,
			longBreakTime: draftSettings.longBreakTime * 60
		})
	}

	const resetSettings = () => {
		setDraftSettings(originalSettings)
	}

	return {
		draftSettings,
		updateDraftSettings,
		saveSettings,
		resetSettings
	}
}
