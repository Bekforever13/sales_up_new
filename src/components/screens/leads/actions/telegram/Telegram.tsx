import { Popover } from 'antd'
import React, { useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'

const Telegram: React.FC<any> = user => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState({
		text: '',
		lead_id: user.user.id,
	})

	const send = () => {
		axiosInstance.post('/messages', message)
		setOpen(false)
		setMessage({
			text: '',
			lead_id: user.user.id,
		})
	}

	const handleOpenChange = (newOpen: any) => setOpen(newOpen)

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				value={message.text}
				onChange={e => setMessage({ ...message, text: e.target.value })}
				rows={4}
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
			/>
			<a className='text-[#1677ff]' onClick={send}>
				Send
			</a>
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
				size='20'
			/>
		</Popover>
	)
}

export { Telegram }
