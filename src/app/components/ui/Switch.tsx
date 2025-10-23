export function Switch({
	value,
	onChange
}: {
	value: boolean
	onChange: (value: boolean) => void
}) {
	const handleChange = () => {
		onChange(!value)
	}

	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<input
				type='checkbox'
				className='sr-only peer'
				checked={value}
				onChange={handleChange}
				readOnly={!onChange}
			/>
			<div className='w-[55px] h-[32px] sm:w-[70px] sm:h-[36px] bg-[var(--secondary-color)] rounded-full p-1 after:content-[""] after:absolute after:top-[5px] after:left-[5px] sm:after:h-[26px] sm:after:w-[26px] after:h-[22px] after:w-[22px] after:bg-[var(--settings-bg-color)] after:rounded-full after:transition-all peer peer-checked:after:translate-x-[22px] sm:peer-checked:after:translate-x-[34px] peer-checked:after:bg-[var(--tertiary-color)]'></div>
		</label>
	)
}
