'use client'

import { SettingsModal } from '@/app/components/settings/SettingsModal'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function InterceptedSettingsPage() {
	const router = useRouter()

	const handleClose = () => {
		router.back()
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose()
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			className='absolute h-full w-full inset-0 flex justify-center items-center z-50 bg-black/15 backdrop-blur-sm transition-all duration-150 animate-fadeIn'
			onClick={e => {
				e.stopPropagation()
				handleClose()
			}}
		>
			<SettingsModal />
		</div>
	)
}
