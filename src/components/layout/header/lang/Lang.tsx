import React from 'react'
import { UiSelect } from 'src/components/ui'

const Lang: React.FC = () => {
	const [currentLang, setCurrentLang] = React.useState(
		localStorage.getItem('lang') || 'ru'
	)
	const onSelectLang = (lang: string) => {
		localStorage.setItem('lang', lang)
		setCurrentLang(lang)
	}

	return (
		<UiSelect
			value={currentLang}
			onSelect={e => onSelectLang(e)}
			style={{ borderRadius: '200px' }}
			options={[
				{ value: 'ru', label: 'RU' },
				{ value: 'kar', label: 'KR' },
			]}
		/>
	)
}

export { Lang }
