export function Slider({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 0.1
}: {
	value: number
	onChange?: (value: number) => void
	min?: number
	max?: number
	step?: number
}) {
	return (
		<input
			type='range'
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={onChange ? e => onChange(Number(e.target.value)) : undefined}
			className='
				w-[140px] h-2 bg-[var(--secondary-color)] rounded-full
				appearance-none cursor-pointer
				[&::-webkit-slider-thumb]:appearance-none
				[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6
				[&::-webkit-slider-thumb]:bg-[var(--tertiary-color)] 
				[&::-webkit-slider-thumb]:rounded-full
				[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6
				[&::-moz-range-thumb]:bg-[var(--tertiary-color)] 
				[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0
			'
		/>
	)
}
