import { Modal } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TMessage } from './TelegramChat.types'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { BiSend } from 'react-icons/bi'
import { UiButton } from 'src/components/ui'
import Pusher from 'pusher-js'

const TelegramChat: FC = () => {
	const { telegramChatID, fetch, telegramChatDrawer } = useSelectors()
	const { setTelegramChatDrawer, setFetch } = useActions()
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')
	const [messages, setMessages] = useState<TMessage[]>([])

	Pusher.logToConsole = true
	var pusher = new Pusher('720c4842f035545b5048', {
		cluster: 'eu',
	})

	const handleCancel = () => {
		setTelegramChatDrawer(false)
	}

	const handleSend = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()
		axiosInstance
			.post(`/telegraph-chats/${telegramChatID}/messages`, {
				text: value,
			})
			.then(() => {
				setFetch(Math.random())
			})
	}

	useEffect(() => {
		let channel = pusher.subscribe(`telegraph-chats.${telegramChatID}.messages`)
		const handleNewMessage = (newMsg: TMessage) => {
			if (!messages.some(msg => msg.id === newMsg.id)) {
				setMessages(prev => [...prev, newMsg])
				setTimeout(() => {
					inputRef.current?.focus()
					inputRef.current?.scrollIntoView({
						behavior: 'smooth',
					})
				}, 300)
			}
		}
		channel.bind('chat', handleNewMessage)
		return () => {
			channel.unbind('chat', handleNewMessage)
			channel.unsubscribe()
		}
	}, [pusher, telegramChatID, messages])

	useEffect(() => {
		if (telegramChatID !== 0) {
			axiosInstance
				.get(`/telegraph-chats/${telegramChatID}/messages`)
				.then(res => {
					setMessages(res.data.data.reverse())
					setTimeout(() => {
						inputRef.current?.focus()
						inputRef.current?.scrollIntoView({
							behavior: 'smooth',
						})
					}, 300)
					setValue('')
				})
		}
	}, [telegramChatID, fetch])

	useEffect(() => {
		if (telegramChatDrawer) {
			setTimeout(() => {
				inputRef.current?.focus()
				inputRef.current?.scrollIntoView({
					behavior: 'smooth',
				})
			}, 300)
		}
	}, [telegramChatDrawer])

	return (
		<Modal
			title='Чат'
			open={telegramChatDrawer}
			footer={false}
			closable={true}
			onCancel={handleCancel}
			closeIcon={<IoMdCloseCircleOutline />}
			cancelButtonProps={{ style: { color: '#000000 !important' } }}
		>
			<div className='h-[500px] flex flex-col overflow-y-auto p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-lg w-full'>
				<div className='flex-1'>
					{messages?.map((el, i) =>
						el.is_answer === false ? (
							<p key={i} className='py-2 w-full text-left rounded-3xl'>
								<span className='bg-indigo-500 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl p-2 text-white dark:text-white'>
									{el.text}
								</span>
							</p>
						) : (
							<p key={el.id} className='py-2 w-full text-right rounded-3xl'>
								<span className='bg-indigo-500 rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl p-2 text-white dark:text-white'>
									{el.text}
								</span>
							</p>
						)
					)}
				</div>
				<form className='flex items-center w-full'>
					<input
						ref={inputRef}
						value={value}
						onChange={e => setValue(e.target.value)}
						className='w-full my-1 p-[6px] outline-none text-black dark:text-black'
					/>
					<UiButton
						htmlType='submit'
						onClick={e => handleSend(e)}
						className='flex items-center'
					>
						<BiSend size='22' />
					</UiButton>
				</form>
			</div>
		</Modal>
	)
}

export { TelegramChat }
