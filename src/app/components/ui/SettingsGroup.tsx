import { Input } from './Input'
import { Select } from './Select'
import { Slider } from './Slider'
import { Switch } from './Switch'

export function SettingsGroup({
	title,
	value,
	type,
	options,
	min,
	max,
	step,
	onChange
}: {
	title: string
	value: string | number | boolean
	type: 'input' | 'select' | 'slider' | 'switch'
	options?: { value: string; label: string }[]
	min?: number
	max?: number
	step?: number
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
				<Switch value={value} onChange={onChange} />
			)}
			{/* Для селектов */}
			{type === 'select' && typeof value === 'string' && (
				<Select value={value} options={options || []} onChange={onChange} />
			)}
			{/* Для слайдеров */}
			{type === 'slider' && typeof value === 'number' && (
				<Slider
					value={value}
					onChange={onChange}
					min={min}
					max={max}
					step={step}
				/>
			)}
		</div>
	)
}
