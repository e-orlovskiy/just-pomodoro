import { ISettingsGroup } from '@/app/lib/types'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'

export function BehaviorSettings() {
	const BEHAVIOR_SETTINGS_GROUPS: ISettingsGroup[] = [
		{
			title: 'long break interval',
			value: 25,
			type: 'input'
		},
		{
			title: 'auto start breaks',
			value: false,
			type: 'switch'
		},
		{
			title: 'auto start pomodoros',
			value: false,
			type: 'switch'
		},
		{
			title: 'confirm actions',
			value: true,
			type: 'switch'
		}
	]

	return (
		<div className='flex flex-col gap-4 mt-4'>
			<SettingsSection title={'Behavior'} icon={'behavior'}>
				{BEHAVIOR_SETTINGS_GROUPS.map(group => (
					<SettingsGroup
						key={group.title}
						title={group.title}
						value={group.value}
						type={group.type}
					/>
				))}
			</SettingsSection>
		</div>
	)
}
