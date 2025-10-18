import { notificationManager } from '../notifications'

export const getTooltipContent = (
	type:
		| 'browser-notifications'
		| 'auto-start-breaks'
		| 'auto-start-pomodoros'
		| 'confirm-actions'
		| 'long-break-interval'
		| 'general',
	options?: {
		permissionStatus?: 'granted' | 'denied' | 'default'
		enabled?: boolean
		currentValue?: unknown
	}
): string => {
	switch (type) {
		case 'browser-notifications':
			if (!notificationManager.isSupported()) {
				return 'Your browser does not support desktop notifications. Consider updating your browser or using a different one like Chrome, Firefox, or Edge.'
			}

			const statusMessages = {
				granted:
					'\n\nNotifications are enabled for this site. You can turn this setting on to receive alerts when your timer completes.',
				denied:
					'\n\nNotifications are blocked for this site.\n\nTo enable:\n1. Click the lock/info icon in your address bar\n2. Select "Site settings" or "Permissions"\n3. Find "Notifications" and change to "Allow"\n4. Refresh this page',
				default:
					'\n\nPermission has not been requested yet. When you enable this setting, your browser will ask for notification permissions.'
			}

			return `Receive desktop notifications when your timer completes.${
				statusMessages[options?.permissionStatus || 'default']
			}`

		case 'auto-start-breaks':
			return options?.enabled
				? 'Breaks will start automatically when a pomodoro session ends.\n\nThis helps maintain your workflow without manual intervention.'
				: 'Timer will pause after each pomodoro session, waiting for you to manually start breaks.\n\nUse this if you prefer to control when your breaks begin.'

		case 'auto-start-pomodoros':
			return options?.enabled
				? 'Pomodoro sessions will start automatically when breaks end.\n\nThis creates a seamless transition between work sessions and breaks.'
				: 'Timer will pause after each break, waiting for you to manually start the next pomodoro.\n\nUse this if you need flexibility in starting work sessions.'

		case 'confirm-actions':
			return options?.enabled
				? 'You will be asked to confirm actions that could reset your progress, such as: \n\n- resetting the timer, \n- skip to next session, \n- switching modes.'
				: 'All actions will be performed immediately without confirmation prompts.\n\nUse this if you prefer faster controls without interruption.'

		case 'long-break-interval':
			const interval = options?.currentValue || 4
			return `Take a long break after completing ${interval} pomodoro sessions.`

		case 'general':
		default:
			return (
				options?.currentValue?.toString() ||
				'Additional information about this setting'
			)
	}
}
