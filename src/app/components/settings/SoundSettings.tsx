'use client'

import { createSoundSettings } from '@/app/lib/config/settings'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'
import { ISettings } from '@/app/lib/types'
import { useNotificationPermission } from '@/app/lib/hooks/useNotificationPermission'

export function SoundSettings({
	draftSettings,
	onSettingsChange
}: {
	draftSettings: ISettings
	onSettingsChange: (settings: Partial<ISettings>) => void
}) {
	const permissionStatus = useNotificationPermission()

	const SOUND_SETTINGS_GROUPS = createSoundSettings(
		draftSettings,
		onSettingsChange,
		permissionStatus
	)

	return (
		<div className='flex flex-col gap-4 mt-3'>
			<SettingsSection title={'Notifications'} icon={'sound'}>
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
						tooltip={group.tooltip}
						onChange={group.onChange}
					/>
				))}
			</SettingsSection>
		</div>
	)
}
