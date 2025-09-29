import { ModeSelectorItem } from '@/components/timer/mode/ModeSelectorItem'

interface ModeSelectorProps {
	currentMode: 'pomodoro' | 'shortBreak' | 'longBreak'
	switchTimerMode: (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => void
}

export function ModeSelector({
	currentMode = 'pomodoro',
	switchTimerMode
}: ModeSelectorProps) {
	const MODES_MAP = {
		pomodoro: 'pomodoro',
		shortBreak: 'short break',
		longBreak: 'long break'
	}

	return (
		<ul className='flex justify-between w-full p-2 bg-[var(--secondary-color)] rounded-full text-[var(--tertiary-color)]'>
			{Object.keys(MODES_MAP).map(mode => (
				<ModeSelectorItem
					key={mode}
					currentMode={currentMode}
					name={MODES_MAP[mode as keyof typeof MODES_MAP]}
					keyName={mode}
					onClick={() => {
						if (mode === currentMode) return
						switchTimerMode(mode as 'pomodoro' | 'shortBreak' | 'longBreak')
					}}
				/>
			))}
		</ul>
	)
}
