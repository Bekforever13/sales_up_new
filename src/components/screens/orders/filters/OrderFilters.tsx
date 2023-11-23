import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import moment from 'moment/moment'
import { axiosInstance } from 'src/services/axiosInstance'
import {
	UiInput,
	UiDataPicker,
	UiButton,
	UiPopover,
	UiSelect,
} from 'src/components/ui'
import { FaTelegramPlane } from 'react-icons/fa'

type TProps = {
	leadId: any
	courseId: any
	setLeadId: (el: any) => void
	setCourseId: (el: any) => void
	setDateFrom: any
	setDateTo: any
}

const OrderFilters: React.FC<TProps> = props => {
	const { leadId, setLeadId,courseId, setCourseId, setDateFrom, setDateTo } = props
	const [messageToAll, setMessageToAll] = useState({ text: '' })
	const [open, setOpen] = useState(false)
	const [dates, setDates] = useState<any>([])
	const [options, setOptions] = useState<{ value: any; label: any }[]>([
		{ label: 'Все', value: '' },
	])

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
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
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
		setLeadId('')
		setCourseId('')
		setDateFrom('')
		setDateTo('')
		setDates([])
	}

	const onSelectCourse = (e: any) => setCourseId(e)

	useEffect(() => {
		axiosInstance.get('/courses').then(res => {
			res.data.data.map((item: any) => {
				setOptions(prev => [...prev, { label: item.title, value: item.id }])
			})
		})
	}, [])

	return (
		<div className='p-3'>
			<Form className='flex items-center gap-5 mb-2'>
				<label>
					{options.length && (
						<UiSelect
							size='large'
							style={{ minWidth: '200px' }}
							filterOption={(input, option) =>
								(String(option?.label) ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							value={courseId}
							defaultValue={options[0]}
							onChange={onSelectCourse}
							options={options}
						/>
					)}
				</label>
				<label>
					<UiInput
						size='large'
						placeholder='Lead ID'
						value={leadId}
						onChange={e => setLeadId(e.target.value)}
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

export { OrderFilters }
