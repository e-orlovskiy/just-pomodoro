import { createTimeSettings } from '@/app/lib/config/settings'
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
	const TIME_SETTINGS_GROUPS = createTimeSettings(
		draftSettings,
		onSettingsChange
	)

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
