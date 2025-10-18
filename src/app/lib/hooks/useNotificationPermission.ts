import { useState, useEffect } from 'react'
import { notificationManager } from '../notifications'

export function useNotificationPermission() {
	const [permissionStatus, setPermissionStatus] = useState<
		'granted' | 'denied' | 'default'
	>('default')

	useEffect(() => {
		if (!notificationManager.isSupported()) return
		setPermissionStatus(notificationManager.getPermissionStatus())
	}, [])

	return permissionStatus
}
