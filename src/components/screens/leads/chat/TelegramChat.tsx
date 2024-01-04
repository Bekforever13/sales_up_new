import { Modal } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TMessage } from './TelegramChat.types'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import Pusher from 'pusher-js'
import { LuPaperclip } from 'react-icons/lu'

const TelegramChat: FC = () => {
	const { telegramChatID, fetch, telegramChatDrawer } = useSelectors()
	const { setTelegramChatDrawer, setFetch } = useActions()
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [messages, setMessages] = useState<TMessage[]>([])

	Pusher.logToConsole = true
	let pusher = new Pusher('720c4842f035545b5048', {
		cluster: 'eu',
	})

	const handleCancel = () => {
		setTelegramChatDrawer(false)
	}

	const handleRemoveFile = () => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement
		fileInput.value = '' // Сбросить значение input
		setSelectedFile(null) // Установить значение файла в стейте как null
	}

	const handlePaperclipClick = () => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement
		fileInput.click()
		fileInput.addEventListener('change', () => {
			if (fileInput.files && fileInput.files[0]) {
				setSelectedFile(fileInput.files[0])
			}
		})
	}

	const handleSend = (e: any) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('text', value)
		if (selectedFile) {
			formData.append('file', selectedFile)
		}
		axiosInstance
			.post(`/telegraph-chats/${telegramChatID}/messages`, formData)
			.then(() => {
				setFetch(Math.random())
				const fileInput = document.getElementById(
					'fileInput'
				) as HTMLInputElement
				fileInput.value = ''
				setSelectedFile(null)
			})
	}

	useEffect(() => {
		if (selectedFile) {
			setTimeout(() => {
				inputRef.current?.focus()
				inputRef.current?.scrollIntoView({
					behavior: 'smooth',
				})
			}, 300)
		}
	}, [selectedFile])

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
		<>
			<Modal
				title='Чат'
				open={telegramChatDrawer}
				footer={false}
				closable={true}
				onCancel={handleCancel}
				closeIcon={<IoMdCloseCircleOutline />}
			>
				<div className='h-[500px] flex flex-col overflow-y-auto p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-lg w-full'>
					<div className='w-full flex-1 mb-2 flex flex-col gap-y-2'>
						{messages?.map((el, i) =>
							el.is_answer === false ? (
								<p
									key={i}
									className='py-2 w-fit text-left bg-indigo-500 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl p-2 text-white dark:text-white'
								>
									{el.text !== null && <span>{el.text}</span>}
									{el.file_url !== '' && (
										<a
											target='_blank'
											href={el.file_url}
											className='text-blue-400 underline'
										>
											Файл
										</a>
									)}
								</p>
							) : (
								<p
									key={el.id}
									className='py-2 w-fit self-end text-right flex flex-col bg-indigo-500 rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl p-2 text-white dark:text-white'
								>
									{el.text !== null && <span>{el.text}</span>}
									{el.file_url !== '' && (
										<a
											target='_blank'
											href={el.file_url}
											className='text-blue-400 underline'
										>
											Файл
										</a>
									)}
								</p>
							)
						)}
					</div>
					{selectedFile && (
						<div className='rounded-md bg-gray-300 p-2 flex items-center justify-between'>
							<p className='text-black font-semibold'>{selectedFile.name}</p>{' '}
							<button onClick={handleRemoveFile} className='px-1'>
								Удалить файл
							</button>
						</div>
					)}
					<form className='flex items-center shadow-md rounded-md w-full bg-white'>
						<label htmlFor='newFile'>
							<input
								id='fileInput'
								type='file'
								name='newFile'
								className='hidden'
							/>
							<LuPaperclip
								onClick={handlePaperclipClick}
								className='text-black dark:text-black cursor-pointer mx-3'
								size='22'
							/>
						</label>
						<input
							ref={inputRef}
							value={value}
							onChange={e => setValue(e.target.value)}
							className='w-full border-none my-1 p-[6px] outline-none text-black dark:text-black'
						/>
						<button
							type='submit'
							onClick={e => handleSend(e)}
							className='cursor-pointer flex bg-transparent border-none items-center mx-3'
						>
							<IoSend size='22' />
						</button>
					</form>
				</div>
			</Modal>
		</>
	)
}

export { TelegramChat }
