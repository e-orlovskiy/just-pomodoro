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
					flex-1 flex items-center justify-center text-xs px-1 py-1 sm:text-base sm:px-4 sm:py-2 rounded-full text-center cursor-pointer
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
