import Image from 'next/image'

export function Icon({
	name,
	onClick
}: {
	name: 'settings' | 'analytics'
	onClick?: () => void
}) {
	const ICONS_MAP = {
		settings: '/icons/settings.svg',
		analytics: '/icons/analytics.svg'
	}

	const iconPath = ICONS_MAP[name]

	return (
		<Image
			className='cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-100'
			src={iconPath}
			alt='header-icon'
			width={28}
			height={28}
			onClick={onClick}
		/>
	)
}
