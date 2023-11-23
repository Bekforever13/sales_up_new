import { Form, message } from 'antd'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiInput, UiDataPicker, UiButton, UiPopover } from 'src/components/ui'
import { FaTelegramPlane } from 'react-icons/fa'

type TProps = {
	name: any
	setName: any
	phone: any
	setPhone: any
	setDateFrom: any
	setDateTo: any
}

const LeadsFilters: React.FC<TProps> = props => {
	const { name, setName, phone, setPhone, setDateFrom, setDateTo } = props
	const [messageToAll, setMessageToAll] = useState({ text: '' })
	const [open, setOpen] = useState(false)
	const [dates, setDates] = useState<any>([])

	const send = () => {
		setOpen(false)
		axiosInstance
			.post('/sendmsgall', messageToAll)
			.then(() => message.success('Отправлен всем'))
	}

	const handleOpenChange = (newOpen: any) => setOpen(newOpen)

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				value={messageToAll.text}
				onChange={e => setMessageToAll({ text: e.target.value })}
				rows={4}
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none bg-white text-black dark:bg-slate-600 dark:-text-white'
			/>
			<UiButton onClick={send}>Send</UiButton>
		</div>
	)

	const onRangeChange = (dates: any, dateStrings: any) => {
		console.log(dates, dateStrings)

		if (dates) {
			setDateFrom(dateStrings[0])
			setDateTo(dateStrings[1])
			setDates([
				moment(dateStrings[0], 'YYYY-MM-DD'),
				moment(dateStrings[1], 'YYYY-MM-DD'),
			])
		}
	}

	const clearValues = (e: any) => {
		e.preventDefault()
		setName('')
		setPhone('')
		setDateFrom('')
		setDateTo('')
		setDates([])
	}

	return (
		<div className='leads__wrapper p-3'>
			<Form className='search flex items-center gap-5 mb-2'>
				<label>
					<UiInput
						size='large'
						placeholder='Имя'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</label>
				<label>
					<UiInput
						size='large'
						placeholder='Номер телефона'
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
				</label>
				<label>
					<UiDataPicker
						size='large'
						value={dates}
						allowClear
						onChange={onRangeChange}
					/>
				</label>
				<div className='flex items-center gap-5'>
					<UiButton size='large' onClick={clearValues}>
						Очистить
					</UiButton>
					<UiPopover
						content={content}
						title='Send message to all'
						trigger='click'
						open={open}
						onOpenChange={handleOpenChange}
					>
						<FaTelegramPlane className='cursor-pointer' size='22' />
					</UiPopover>
				</div>
			</Form>
		</div>
	)
}

export { LeadsFilters }
