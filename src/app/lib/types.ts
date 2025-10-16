export interface ISettingsGroup {
	title: string
	value: string | number | boolean
	type: 'input' | 'select' | 'slider' | 'switch'
	onChange: (newValue: string | number | boolean) => void
	options?: { value: string; label: string }[]
	min?: number
	max?: number
	step?: number
}

export interface ISettings {
	pomodoroTime: number
	shortBreakTime: number
	longBreakTime: number
	longBreakInterval: number
	autoStartBreaks: boolean
	autoStartPomodoros: boolean
	confirmActions: boolean
	notificationSound: string
	volume: number
	browserNotifications: boolean
}
