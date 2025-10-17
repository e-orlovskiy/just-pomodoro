class NotificationManager {
	private permission: NotificationPermission = 'default'

	constructor() {
		this.checkPermission()
	}

	private checkPermission() {
		if (!('Notification' in window)) {
			console.warn('this browser does not support notifications')
			return
		}
		this.permission = Notification.permission
	}

	async requestPermission(): Promise<boolean> {
		if (!('Notification' in window)) return false
		try {
			const permission = await Notification.requestPermission()
			this.permission = permission
			return permission === 'granted'
		} catch (error) {
			console.error('Error requesting notification permission:', error)
			return false
		}
	}

	showNotification(title: string, options?: NotificationOptions) {
		if (!('Notification' in window) || this.permission !== 'granted') {
			console.log('❌ Notifications not available:', {
				supported: 'Notification' in window,
				permission: this.permission
			})
			return null
		}

		const notification = new Notification(title, {
			icon: '/icons/skip.svg', // ?change later & check url
			badge: '/icons/play.svg',
			...options
		})

		setTimeout(() => {
			notification.close()
		}, 5000)

		return notification
	}

	getPermissionStatus(): NotificationPermission {
		return this.permission
	}

	isSupported(): boolean {
		return 'Notification' in window
	}
}

export const notificationManager = new NotificationManager()
