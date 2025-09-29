export function ModeSelectorItem({
	currentMode,
	name,
	keyName,
	onClick
}: {
	currentMode: string
	name: string
	keyName: string
	onClick: () => void
}) {
	return (
		<li
			className={`
					flex-1 px-4 py-2 rounded-full text-center cursor-pointer
					${
						currentMode === keyName
							? 'bg-[var(--fourtiary-color)] text-[var(--primary-color)] font-bold'
							: ''
					}
					`}
			onClick={onClick}
		>
			{name}
		</li>
	)
}
