import Image from 'next/image'

export function SettingsSection({
	children,
	title,
	icon
}: {
	children: React.ReactNode
	title: string
	icon: 'time' | 'behavior' | 'sound'
}) {
	const ICONS_MAP = {
		time: '/icons/settings/time.svg',
		behavior: '/icons/settings/behavior.svg',
		sound: '/icons/settings/sound.svg'
	}

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-1 justify-center'>
				<Image
					src={ICONS_MAP[icon]}
					alt={icon}
					height={25}
					width={20}
					objectFit='cover'
				/>
				<h3 className='font-semibold text-center text-2xl'>{title}</h3>
			</div>
			<div className='flex flex-col rounded-xl bg-[var(--settings-bg-color)] p-4 gap-3'>
				{children}
			</div>
		</div>
	)
}
