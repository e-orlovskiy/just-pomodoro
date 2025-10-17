import { Input } from './Input'
import { Select } from './Select'
import { Slider } from './Slider'
import { Switch } from './Switch'
import { Tooltip } from './Tooltip'

export function SettingsGroup({
	title,
	value,
	type,
	options,
	min,
	max,
	step,
	tooltip,
	onChange
}: {
	title: string
	value: string | number | boolean
	type: 'input' | 'select' | 'slider' | 'switch'
	options?: { value: string; label: string }[]
	min?: number
	max?: number
	step?: number
	tooltip?: string
	onChange: (value: string | number | boolean) => void
}) {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2'>
				<p className='text-[var(--tertiary-color)] text-lg'>{title}</p>
				{tooltip && (
					<Tooltip content={tooltip}>
						<span className='text-[var(--fourtiary-color)] cursor-help text-sm'>
							?
						</span>
					</Tooltip>
				)}
			</div>
			{/* Input  */}
			{type === 'input' && typeof value === 'number' && (
				<Input value={value} onChange={onChange} />
			)}
			{/* Switch */}
			{type === 'switch' && typeof value === 'boolean' && (
				<Switch value={value} onChange={onChange} />
			)}
			{/* Select */}
			{type === 'select' && typeof value === 'string' && (
				<Select value={value} options={options || []} onChange={onChange} />
			)}
			{/* Slider */}
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
