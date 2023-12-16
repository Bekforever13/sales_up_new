import React, { useState } from 'react'
import { Popover, notification } from 'antd'
import { FaTelegramPlane } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { TLeads } from 'src/store/leads/Leads.types'
import { UiButton } from 'src/components/ui'

type TProps = {
	user: TLeads
}

const Telegram: React.FC<TProps> = ({ user }) => {
	const [open, setOpen] = useState(false)
	const [msg, setMsg] = useState({
		text: '',
		lead_id: user.id,
	})

	const send = () => {
		axiosInstance.post('/messages', msg).then(() => {
			notification.success({
				message: 'Успешно',
				placement: 'topRight',
				style: {}
			})
		})
		setOpen(false)
		setMsg({
			text: '',
			lead_id: user.id,
		})
	}

	const handleOpenChange = (newOpen: any) => setOpen(newOpen)

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				value={msg.text}
				onChange={e => setMsg({ ...msg, text: e.target.value })}
				rows={4}
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none bg-white text-black dark:bg-slate-600 dark:-text-white'
			/>
			<UiButton onClick={send}>Send</UiButton>
		</div>
	)

	return (
		<Popover
			content={content}
			title='Send message'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
			className='text-black dark:text-black cursor-pointer'
		>
			<FaTelegramPlane
				className='cursor-pointer text-black dark:text-black'
				size='22'
			/>
		</Popover>
	)
}

export { Telegram }
