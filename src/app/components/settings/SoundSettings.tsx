import { createSoundSettings } from '@/app/lib/config/settings'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'
import { ISettings } from '@/app/lib/types'

export function SoundSettings({
	draftSettings,
	onSettingsChange
}: {
	draftSettings: ISettings
	onSettingsChange: (settings: Partial<ISettings>) => void
}) {
	const SOUND_SETTINGS_GROUPS = createSoundSettings(
		draftSettings,
		onSettingsChange
	)

	return (
		<div className='flex flex-col gap-4 mt-3'>
			<SettingsSection title={'Sound'} icon={'sound'}>
				{SOUND_SETTINGS_GROUPS.map(group => (
					<SettingsGroup
						key={group.title}
						title={group.title}
						value={group.value}
						type={group.type}
						options={group.options}
						min={group.min}
						max={group.max}
						step={group.step}
						onChange={group.onChange}
					/>
				))}
			</SettingsSection>
		</div>
	)
}
