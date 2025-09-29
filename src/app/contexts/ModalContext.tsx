'use client'

import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react'

type ModalType = 'skip' | 'reset' | 'switch'

interface ModalState {
	type: ModalType | null
	isOpen: boolean
	onConfirm: (() => void) | null
}

interface ModalContextType {
	modal: ModalState
	openModal: (type: ModalType, onConfirm: () => void) => void
	closeModal: () => void
	confirmModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [modal, setModal] = useState<ModalState>({
		type: null,
		isOpen: false,
		onConfirm: null
	})

	const openModal = useCallback((type: ModalType, onConfirm: () => void) => {
		setModal({ isOpen: true, type, onConfirm })
	}, [])

	const closeModal = useCallback(() => {
		setModal(prev => ({ ...prev, isOpen: false }))
	}, [])

	const confirmModal = useCallback(() => {
		modal.onConfirm?.()
		closeModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal.onConfirm, closeModal])

	const value = useMemo(
		() => ({
			modal,
			openModal,
			closeModal,
			confirmModal
		}),
		[modal, openModal, closeModal, confirmModal]
	)

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
	const context = useContext(ModalContext)
	if (context === undefined) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}
