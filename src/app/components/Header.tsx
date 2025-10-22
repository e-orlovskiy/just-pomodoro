import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
	return (
		<header className='flex justify-between items-center w-full rounded-full bg-[var(--secondary-color)] px-3 py-2 mb-4'>
			<div className='flex items-center gap-1'>
				<Image
					src='/icons/pomodoro-logo.svg'
					alt='pomodoro'
					width={28}
					height={28}
					className='translate-y-[-2px] scale-90 sm:scale-100'
				/>
				<h1 className='text-xl sm:text-2xl font-bold text-[var(--tertiary-color)]'>
					Just Pomodoro
				</h1>
			</div>

			<div className='flex gap-2'>
				{/* <Icon name='analytics' /> */}
				<Link href='/settings'>
					<Icon name='settings' />
				</Link>
			</div>
		</header>
	)
}
