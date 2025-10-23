'use client'

import { useModal } from '@/app/contexts/ModalContext'
import { useEffect } from 'react'

export function ModalConfirm() {
	const { modal, closeModal, confirmModal } = useModal()

	const MESSAGES_MAP = {
		skip: 'Are you sure you want to SKIP the stage?',
		reset: 'Are you sure you want to RESET the timer?',
		switch: 'Are you sure you want to SWITCH mode?'
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && modal.isOpen) {
				closeModal()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [modal.isOpen, closeModal])

	if (!modal.isOpen || !modal.type) return null

	return (
		<div
			className='fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-150 animate-fadeIn'
			onClick={e => {
				e.stopPropagation()
				closeModal()
			}}
		>
			<div
				className='bg-[var(--primary-color)] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl animate-scaleIn'
				onClick={e => e.stopPropagation()}
			>
				<p className='text-[var(--tertiary-color)] text-sm sm:text-lg mb-6 text-center'>
					{MESSAGES_MAP[modal.type]}
				</p>
				<div className='flex gap-3 justify-center'>
					<button
						onClick={closeModal}
						className='flex-1 px-3 py-2 rounded-full bg-[var(--secondary-color)] text-white text-sm sm:text-md hover:opacity-80 transition-all duration-100'
					>
						Cancel
					</button>
					<button
						onClick={confirmModal}
						className='flex-1 px-3 py-2 rounded-full bg-[var(--secondary-color)] text-white text-sm sm:text-md hover:opacity-80 transition-all duration-100'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	)
}
