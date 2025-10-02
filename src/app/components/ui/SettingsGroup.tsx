import { Input } from './Input'

export function SettingsGroup({
	title,
	value,
	type
}: {
	title: string
	value: number
	type: 'input' | 'select' | 'slider' | 'toggle'
}) {
	return (
		<div className='flex justify-between items-center'>
			<p className='text-[var(--tertiary-color)] text-lg'>{title}</p>
			<Input value={value} type={type} />
		</div>
	)
}
