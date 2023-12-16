import { Form } from 'antd'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { UiInput, UiDataPicker, UiButton } from 'src/components/ui'

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
	const [dates, setDates] = useState<any>([])

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
				</div>
			</Form>
		</div>
	)
}

export { LeadsFilters }
