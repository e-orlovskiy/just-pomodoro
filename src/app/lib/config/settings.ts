import { ISettings, ISettingsGroup } from '../types'
import { soundPlayer } from '../soundPlayer'
import { notificationManager } from '../notifications'
import { getTooltipContent } from '../utils/tooltipContent'

// 1. for time settings
export const createTimeSettings = (
	draftSettings: ISettings,
	onSettingsChange: (settings: Partial<ISettings>) => void
): ISettingsGroup[] => [
	{
		title: 'pomodoro (minutes)',
		value: draftSettings.pomodoroTime,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ pomodoroTime: value })
		}
	},
	{
		title: 'short break (minutes)',
		value: draftSettings.shortBreakTime,
		type: 'input',
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ shortBreakTime: value })
		}
	},
	{
		title: 'long break (minutes)',
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
		tooltip: getTooltipContent('long-break-interval', {
			currentValue: draftSettings.longBreakInterval
		}),
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'number') return
			onSettingsChange({ longBreakInterval: value })
		}
	},
	{
		title: 'auto start breaks',
		value: draftSettings.autoStartBreaks,
		type: 'switch',
		tooltip: getTooltipContent('auto-start-breaks', {
			enabled: draftSettings.autoStartBreaks
		}),
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ autoStartBreaks: value })
		}
	},
	{
		title: 'auto start pomodoros',
		value: draftSettings.autoStartPomodoros,
		type: 'switch',
		tooltip: getTooltipContent('auto-start-pomodoros', {
			enabled: draftSettings.autoStartPomodoros
		}),
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ autoStartPomodoros: value })
		}
	},
	{
		title: 'confirm actions',
		value: draftSettings.confirmActions,
		type: 'switch',
		tooltip: getTooltipContent('confirm-actions', {
			enabled: draftSettings.confirmActions
		}),
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			onSettingsChange({ confirmActions: value })
		}
	}
]

// 3. for sound settings
export const createSoundSettings = (
	draftSettings: ISettings,
	onSettingsChange: (settings: Partial<ISettings>) => void,
	permissionStatus: 'granted' | 'denied' | 'default'
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
		tooltip: getTooltipContent('browser-notifications', {
			permissionStatus,
			enabled: draftSettings.browserNotifications
		}),
		onChange: (value: number | string | boolean) => {
			if (typeof value !== 'boolean') return
			if (value && !notificationManager.isSupported()) {
				alert('Browser notifications are not supported in your browser')
				return
			}

			onSettingsChange({ browserNotifications: value })
		}
	}
]
