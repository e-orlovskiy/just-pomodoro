export function Button({
	onClick,
	children
}: {
	onClick?: () => void
	children: React.ReactNode
}) {
	return (
		<button
			className='flex-1 px-4 py-2 rounded-lg bg-[var(--settings-bg-color)] text-[var(--tertiary-color)] text-md sm:text-lg font-semibold'
			onClick={onClick}
		>
			{children}
		</button>
	)
}
