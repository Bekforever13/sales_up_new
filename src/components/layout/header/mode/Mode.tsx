import React from 'react'
import './DarkMode.css'
import { ReactSVG } from 'react-svg'
import Sun from 'src/assets/images/Sun.svg'
import Moon from 'src/assets/images/Moon.svg'
import { useActions } from 'src/hooks/useActions'

const Mode: React.FC = () => {
	const { toggleColorMode } = useActions()
	const [theme, setTheme] = React.useState(
		localStorage.getItem('theme') || 'dark'
	)
	const setDarkTheme = () => {
		toggleColorMode('dark')
		setTheme('dark')
		document.querySelector('body')?.setAttribute('data-mode', 'dark')
		localStorage.setItem('theme', 'dark')
	}
	const setLightTheme = () => {
		toggleColorMode('light')
		setTheme('light')
		document.querySelector('body')?.setAttribute('data-mode', 'light')
		localStorage.setItem('theme', 'light')
	}

	const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.checked ? setDarkTheme() : setLightTheme()
	}

	React.useEffect(() => {
		if (theme === 'dark') setDarkTheme()
	}, [])
	return (
		<div className='dark_mode'>
			<input
				onChange={toggleTheme}
				className='dark_mode_input'
				type='checkbox'
				id='darkmode-toggle'
				defaultChecked={theme === 'dark'}
			/>
			<label className={`dark_mode_label`} htmlFor='darkmode-toggle'>
				<ReactSVG src={Sun} className='sun' />
				<ReactSVG src={Moon} className='moon' />
			</label>
		</div>
	)
}

export { Mode }
