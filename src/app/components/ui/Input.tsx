export function Input({
	value,
	type
}: {
	value: number
	type: 'input' | 'select' | 'slider' | 'toggle'
}) {
	return (
		<>
			{type === 'input' && (
				<input
					className='text-[var(--tertiary-color)] text-lg bg-[var(--secondary-color)] max-w-[100px] p-1 rounded-full text-center'
					value={value}
					type='text'
				/>
			)}
		</>
	)
}
