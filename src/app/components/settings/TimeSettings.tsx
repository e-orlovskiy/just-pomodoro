import { SettingsGroup } from '../ui/SettingsGroup'
import { SettingsSection } from '../ui/SettingsSection'

export function TimeSettings() {
	return (
		<div className='flex flex-col gap-4 mt-4'>
			<SettingsSection title={'Time'} icon={'time'}>
				<SettingsGroup title='pomodoro' value={25} type='input' />
				<SettingsGroup title='short break' value={5} type='input' />
				<SettingsGroup title='long break' value={15} type='input' />
			</SettingsSection>
		</div>
	)
}
