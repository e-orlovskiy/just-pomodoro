import { TimerControlsItem } from './TimerControlsItem'

export function TimerControls({ currentMode = 'shortBreak' }) {
	const MODES_MAP: { [key: string]: string } = {
		pomodoro: 'pomodoro',
		shortBreak: 'short break',
		longBreak: 'long break'
	}

	return (
		<ul className='flex justify-between w-full p-2 bg-[var(--secondary-color)] rounded-full text-[var(--tertiary-color)]'>
			{Object.keys(MODES_MAP).map(mode => (
				<TimerControlsItem
					key={mode}
					currentMode={currentMode}
					name={MODES_MAP[mode]}
					keyName={mode}
				/>
			))}
		</ul>
	)
}
