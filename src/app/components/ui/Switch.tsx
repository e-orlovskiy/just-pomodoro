export function Switch({
	value,
	onChange
}: {
	value: boolean
	onChange?: (value: boolean) => void
}) {
	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<input
				type='checkbox'
				className='sr-only peer'
				checked={value}
				onChange={onChange ? e => onChange(e.target.checked) : undefined}
				readOnly={!onChange}
			/>
			<div className='w-[70px] h-[36px] bg-[var(--secondary-color)] rounded-full p-1 after:content-[""] after:absolute after:top-[5px] after:left-[5px] after:h-[26px] after:w-[26px] after:bg-[var(--settings-bg-color)] after:rounded-full after:transition-all peer peer-checked:after:translate-x-[34px] peer-checked:after:bg-[var(--tertiary-color)]'></div>
		</label>
	)
}
