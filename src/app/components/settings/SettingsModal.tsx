'use client'

import { TimeSettings } from './TimeSettings'

interface SettingsModalProps {
	onClose?: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
	return (
		<div
			className='bg-[var(--secondary-color)] rounded-2xl p-4 max-w-sm mx-4  animate-scaleIn min-w-lg text-[var(--settings-text-color)]'
			onClick={e => e.stopPropagation()}
		>
			<header className='text-3xl font-semibold text-center border-b-2 border-[var(--settings-bg-color)] pb-4'>
				Settings
			</header>
			<TimeSettings />
		</div>
	)
}
