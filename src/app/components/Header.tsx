import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'

export function Header() {
	return (
		<header className='flex justify-between items-center w-full border-b-2 border-[var(--secondary-color)] pb-1 mb-4'>
			<h1 className='text-3xl font-bold text-[var(--tertiary-color)]'>
				Just Pomodoro
			</h1>
			<div className='flex gap-2'>
				{/* <Icon name='analytics' /> */}
				<Link href='/settings'>
					<Icon name='settings' />
				</Link>
			</div>
		</header>
	)
}
