// components/settings/SoundSettings.tsx
'use client'

import { createSoundSettings } from '@/app/lib/config/settings'
import { notificationManager } from '@/app/lib/notifications'
import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'
import { ISettings } from '@/app/lib/types'
import { useState, useEffect } from 'react'

export function SoundSettings({
	draftSettings,
	onSettingsChange
}: {
	draftSettings: ISettings
	onSettingsChange: (settings: Partial<ISettings>) => void
}) {
	const [permissionStatus, setPermissionStatus] = useState<
		'granted' | 'denied' | 'default'
	>('default')

	useEffect(() => {
		if (!notificationManager.isSupported()) return

		setPermissionStatus(notificationManager.getPermissionStatus())
	}, [draftSettings.browserNotifications])

	const getBrowserNotificationsTooltip = () => {
		const statusText =
			permissionStatus === 'granted'
				? '\n\nBrowser notifications currently [enabled], and this setting can be turned on'
				: permissionStatus === 'denied'
				? '\n\nBrowser notifications currently [blocked]'
				: '\n\nPermission not yet granted'

		const instruction =
			permissionStatus === 'denied'
				? '\n\nTo enable: \nclick the lock/info icon in address bar → Notifications → Allow → Refresh page'
				: ''

		return `Show system notifications when timer completes. ${statusText}${instruction}`
	}

	const SOUND_SETTINGS_GROUPS = createSoundSettings(
		draftSettings,
		onSettingsChange,
		getBrowserNotificationsTooltip()
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
