import { Input } from './Input'
import { Select } from './Select'
import { Slider } from './Slider'
import { Switch } from './Switch'

export function SettingsGroup({
	title,
	value,
	type,
	onChange
}: {
	title: string
	value: string | number | boolean
	type: 'input' | 'select' | 'slider' | 'switch'
	onChange: (value: string | number | boolean) => void
}) {
	return (
		<div className='flex justify-between items-center'>
			<p className='text-[var(--tertiary-color)] text-lg'>{title}</p>
			{/* Для инпутов  */}
			{type === 'input' && typeof value === 'number' && (
				<Input value={value} onChange={onChange} />
			)}
			{/* Для переключателей */}
			{type === 'switch' && typeof value === 'boolean' && (
				<Switch value={value} />
			)}
			{/* Для селектов */}
			{type === 'select' && (
				<Select
					value={value as string}
					options={[
						{ value: 'ring', label: 'Ring' },
						{ value: 'bell', label: 'Bell' },
						{ value: 'chime', label: 'Chime' }
					]}
				/>
			)}
			{/* Для слайдеров */}
			{type === 'slider' && typeof value === 'number' && (
				<Slider value={value} />
			)}
		</div>
	)
}
