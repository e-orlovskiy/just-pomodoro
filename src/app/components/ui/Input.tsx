export function Input({
	value,
	onChange
}: {
	value: number
	onChange?: (value: number) => void
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value.replace(/[^\d]/g, '')
		if (+newValue <= 0) newValue = '1'
		if (+newValue > 360) newValue = '360'

		if (onChange) onChange(Number(newValue))
	}

	return (
		<>
			<input
				className='text-[var(--tertiary-color)] text-lg bg-[var(--secondary-color)] w-[70px] h-[36px] p-1 rounded-full text-center border-none outline-none'
				value={value}
				type='text'
				onChange={handleChange}
			/>
		</>
	)
}
