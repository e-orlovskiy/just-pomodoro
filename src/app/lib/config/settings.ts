import { ISettings, ISettingsGroup } from '../types'
import { soundPlayer } from '../soundPlayer'

// 1. for time settings
export const createTimeSettings = (
	draftSettings: ISettings,
	onSettingsChange: (settings: Partial<ISettings>) => void
): ISettingsGroup[] => [
	{
		title: 'pomodoro',
		value: draftSettings.pomodoroTime,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ pomodoroTime: value })
		}
	},
	{
		title: 'short break',
		value: draftSettings.shortBreakTime,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ shortBreakTime: value })
		}
	},
	{
		title: 'long break',
		value: draftSettings.longBreakTime,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ longBreakTime: value })
		}
	}
]

// 2. for behavior settings
export const createBehaviorSettings = (
	draftSettings: ISettings,
	onSettingsChange: (settings: Partial<ISettings>) => void
): ISettingsGroup[] => [
	{
		title: 'long break interval',
		value: draftSettings.longBreakInterval,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ longBreakInterval: value })
		}
	},
	{
		title: 'auto start breaks',
		value: draftSettings.autoStartBreaks,
		type: 'switch',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ autoStartBreaks: value })
		}
	},
	{
		title: 'auto start pomodoros',
		value: draftSettings.autoStartPomodoros,
		type: 'switch',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ autoStartPomodoros: value })
		}
	},
	{
		title: 'confirm actions',
		value: draftSettings.confirmActions,
		type: 'switch',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ confirmActions: value })
		}
	}
]

// 3. for sound settings
export const createSoundSettings = (
	draftSettings: ISettings,
	onSettingsChange: (settings: Partial<ISettings>) => void
): ISettingsGroup[] => [
	{
		title: 'notification sound',
		value: draftSettings.notificationSound,
		type: 'select',
		options: [
			{ value: 'bell-1', label: 'Bell #1' },
			{ value: 'bell-2', label: 'Bell #2' },
			{ value: 'bell-3', label: 'Bell #3' }
		],
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'string') return
			onSettingsChange({ notificationSound: value })

			soundPlayer.play(value, draftSettings.volume)
		}
	},
	{
		title: 'volume',
		value: draftSettings.volume,
		type: 'slider',
		min: 0,
		max: 1,
		step: 0.1,
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ volume: value })
		}
	},
	{
		title: 'browser notifications',
		value: draftSettings.browserNotifications,
		type: 'switch',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ browserNotifications: value })
		}
	}
]
