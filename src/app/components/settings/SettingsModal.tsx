'use client'

import { useSettings } from '@/app/lib/hooks/useSettings'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { BehaviorSettings } from './BehaviorSettings'
import { SoundSettings } from './SoundSettings'
import { TimeSettings } from './TimeSettings'

interface SettingsModalProps {
	onClose?: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
	const router = useRouter()
	const settings = useSettings()

	const handleClose = () => {
		settings.resetSettings()
		router.back()
		router.push('/')
	}

	const handleSave = () => {
		settings.saveSettings()
		router.back()
		router.push('/')
	}

	return (
		<div
			className='bg-[var(--secondary-color)] rounded-2xl p-4 max-w-sm mx-4  animate-scaleIn min-w-lg text-[var(--settings-text-color)]'
			onClick={e => e.stopPropagation()}
		>
			<header className='text-3xl font-semibold text-center border-b-2 border-[var(--settings-bg-color)] pb-4'>
				Settings
			</header>
			<TimeSettings
				draftSettings={settings.draftSettings}
				onSettingsChange={settings.updateDraftSettings}
			/>
			<BehaviorSettings
				draftSettings={settings.draftSettings}
				onSettingsChange={settings.updateDraftSettings}
			/>
			<SoundSettings
				draftSettings={settings.draftSettings}
				onSettingsChange={settings.updateDraftSettings}
			/>
			<div className='flex justify-between mt-3 gap-3'>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave}>Save</Button>
			</div>
		</div>
	)
}
