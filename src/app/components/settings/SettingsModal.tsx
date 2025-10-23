'use client'

import { useSettings } from '@/app/lib/hooks/useSettings'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { BehaviorSettings } from './BehaviorSettings'
import { SoundSettings } from './SoundSettings'
import { TimeSettings } from './TimeSettings'

export function SettingsModal() {
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
		<div className='flex max-h-full w-full sm:w-auto p-3'>
			<div
				className='flex flex-col max-h-full bg-[var(--secondary-color)] rounded-2xl p-4 animate-scaleIn w-full sm:min-w-lg sm:w-auto text-[var(--settings-text-color)]'
				onClick={e => e.stopPropagation()}
			>
				<header className='sticky text-2xl sm:text-3xl font-semibold text-center border-b-2 border-[var(--settings-bg-color)] pb-4'>
					Settings
				</header>
				<div className='flex flex-col overflow-auto '>
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
				</div>

				<div className='flex justify-between mt-3 gap-3'>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</div>
			</div>
		</div>
	)
}
