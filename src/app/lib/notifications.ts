class NotificationManager {
	private permission: NotificationPermission = 'default'
	private initialized = false

	// constructor() {
	// 	this.checkPermission()
	// }

	private checkPermission() {
		if (typeof window === 'undefined') return
		if (!('Notification' in window)) {
			console.warn('this browser does not support notifications')
			return
		}
		this.permission = Notification.permission
	}

	private ensureInitialized() {
		if (!this.initialized && typeof window !== 'undefined') {
			this.checkPermission()
			this.initialized = true
		}
	}

	async requestPermission(): Promise<boolean> {
		this.ensureInitialized()
		if (typeof window === 'undefined') return false
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
		this.ensureInitialized()
		if (typeof window === 'undefined') return null
		if (!('Notification' in window) || this.permission !== 'granted') {
			console.log('❌ Notifications not available:', {
				supported: 'Notification' in window,
				permission: this.permission
			})
			return null
		}

		const notification = new Notification(title, {
			icon: '/icons/pomodoro-logo-with-bg.svg',
			badge: '/icons/pomodoro-logo-with-bg.svg',
			...options
		})

		setTimeout(() => {
			notification.close()
		}, 5000)

		return notification
	}

	getPermissionStatus(): NotificationPermission {
		this.ensureInitialized()
		return this.permission
	}

	isSupported(): boolean {
		this.ensureInitialized()
		if (typeof window === 'undefined') return false
		return 'Notification' in window
	}
}

export const notificationManager = new NotificationManager()
