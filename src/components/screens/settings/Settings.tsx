import React, { useEffect } from 'react'
import { CreateBot } from './bot/CreateBot'
import { Bot } from './bot/Bot'
import { SettingStatus } from './statuses/SettingStatus'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const Settings: React.FC = () => {
	const { fetch } = useSelectors()
	const { setStatuses, setBots } = useActions()

	useEffect(() => {
		axiosInstance.get('/statuses').then(res => {
			setStatuses(res.data.data)
		})
	}, [fetch])

	useEffect(() => {
		axiosInstance.get('/bots').then(res => {
			setBots(res.data.data)
		})
	}, [])

	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex items-start gap-5 flex-wrap'>
			<SettingStatus />
			<Bot />
			<CreateBot />
		</div>
	)
}

export { Settings }
