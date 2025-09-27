export function TimerControlsItem({
	currentMode,
	name,
	keyName
}: {
	currentMode: string
	name: string
	keyName: string
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
		>
			{name}
		</li>
	)
}
