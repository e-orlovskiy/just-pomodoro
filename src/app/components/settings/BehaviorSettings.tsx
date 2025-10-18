import { createBehaviorSettings } from '@/app/lib/config/settings'
import { ISettings } from '@/app/lib/types'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'

export function BehaviorSettings({
	draftSettings,
	onSettingsChange
}: {
	draftSettings: ISettings
	onSettingsChange: (settings: Partial<ISettings>) => void
}) {
	const BEHAVIOR_SETTINGS_GROUPS = createBehaviorSettings(
		draftSettings,
		onSettingsChange
	)

	return (
		<div className='flex flex-col gap-4 mt-4'>
			<SettingsSection title={'Behavior'} icon={'behavior'}>
				{BEHAVIOR_SETTINGS_GROUPS.map(group => (
					<SettingsGroup
						key={group.title}
						title={group.title}
						value={group.value}
						type={group.type}
						tooltip={group.tooltip}
						onChange={group.onChange}
					/>
				))}
			</SettingsSection>
		</div>
	)
}
