import type { ISettingsGroup } from '../../lib/types'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'

export function SoundSettings() {
	const SOUND_SETTINGS_GROUPS: ISettingsGroup[] = [
		{
			title: 'notification sound',
			value: 'Ring',
			type: 'select'
		},
		{
			title: 'volume',
			value: 50,
			type: 'slider'
		},
		{
			title: 'browser notifications',
			value: true,
			type: 'switch'
		}
	]

	return (
		<div className='flex flex-col gap-4 mt-3'>
			<SettingsSection title={'Sound'} icon={'sound'}>
				{SOUND_SETTINGS_GROUPS.map(group => (
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
