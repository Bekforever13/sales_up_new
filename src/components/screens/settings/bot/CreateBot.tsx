import React from 'react'
import { useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions } from 'src/hooks'
import { UiButton, UiInput } from 'src/components/ui'

const CreateBot: React.FC = () => {
	const { fetch } = useActions()
	const [newBot, setNewBot] = useState({
		token: '',
		username: '',
		contact: '',
	})

	const onSubmit = () => {
		axiosInstance
			.post('/bots', newBot)
			.then(() => fetch(Math.random()))
			.finally(() =>
				setNewBot({
					token: '',
					username: '',
					contact: '',
				})
			)
	}

	return (
		<div className='flex-1 flex flex-col bg-white dark:bg-slate-700 border border-1 rounded-md shadow-md min-h-[200px] p-5'>
			<h2 className='text-2xl border-[#adadad] border-b-[1px] mb-5'>
				Create Bot
			</h2>
			<form className='flex flex-col gap-y-5'>
				<UiInput
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Username...'
					value={newBot.username}
					onChange={e => setNewBot({ ...newBot, username: e.target.value })}
				/>
				<UiInput
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Token...'
					value={newBot.token}
					onChange={e => setNewBot({ ...newBot, token: e.target.value })}
				/>
				<UiInput
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Contact...'
					value={newBot.contact}
					onChange={e => setNewBot({ ...newBot, contact: e.target.value })}
				/>
				<UiButton onClick={onSubmit} type='primary' className='bg-[#1976D2]'>
					Создать
				</UiButton>
			</form>
		</div>
	)
}

export { CreateBot }
