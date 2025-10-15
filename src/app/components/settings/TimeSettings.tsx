import type { ISettingsGroup } from '../../lib/types'
import { ISettings } from '../../lib/types'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'

export function TimeSettings({
	draftSettings,
	onSettingsChange
}: {
	draftSettings: ISettings
	onSettingsChange: (settings: Partial<ISettings>) => void
}) {
	const TIME_SETTINGS_GROUPS: ISettingsGroup[] = [
		{
			title: 'pomodoro',
			value: draftSettings.pomodoroTime,
			type: 'input',
			onChange: (value: number | string | boolean) => {
				if (typeof value === 'number') onSettingsChange({ pomodoroTime: value })
			}
		},
		{
			title: 'short break',
			value: draftSettings.shortBreakTime,
			type: 'input',
			onChange: (value: number | string | boolean) => {
				if (typeof value === 'number')
					onSettingsChange({ shortBreakTime: value })
			}
		},
		{
			title: 'long break',
			value: draftSettings.longBreakTime,
			type: 'input',
			onChange: (value: number | string | boolean) => {
				if (typeof value === 'number')
					onSettingsChange({ longBreakTime: value })
			}
		}
	]

	return (
		<div className='flex flex-col gap-4 mt-3'>
			<SettingsSection title={'Time'} icon={'time'}>
				{TIME_SETTINGS_GROUPS.map(group => (
					<SettingsGroup
						key={group.title}
						title={group.title}
						value={group.value}
						type={group.type}
						onChange={group.onChange}
					/>
				))}
			</SettingsSection>
		</div>
	)
}
