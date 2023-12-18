import React, { useState, useEffect } from 'react'
import { LeadsFilters } from './filters/LeadsFilters'
import { LeadsTable } from './table/LeadsTable'
import { useDebounce } from 'src/hooks/useDebounce'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks'
import { UiButton } from 'src/components/ui'
import { AddNewLead } from './drawer/AddNewLead'

const Leads: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const debouncedName = useDebounce(name, 500)
	const debouncedPhone = useDebounce(phone, 500)
	const [dateFrom, setDateFrom] = useState('')
	const [dateTo, setDateTo] = useState('')
	const { setLeads, setLeadsTotal, setLeadsDrawer } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(
				`/leads?limit=10
				${page ? `&page=${page}` : ''}
				${debouncedName ? `&name=${debouncedName}` : ''}
				${debouncedPhone ? `&phone=${debouncedPhone}` : ''}
				${dateFrom ? `&from=${dateFrom}` : ''}
				${dateTo ? `&to=${dateTo}` : ''}`
			)
			.then(res => {
				setLeadsTotal(res.data.total)
				setLeads(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [page, debouncedName, debouncedPhone, dateFrom, dateTo, fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 py-1 px-5 rounded-xl flex flex-col gap-y-5'>
				<div className='flex items-center justify-between'>
					<LeadsFilters
						name={name}
						setName={setName}
						phone={phone}
						setPhone={setPhone}
						setDateFrom={setDateFrom}
						setDateTo={setDateTo}
					/>
					<UiButton onClick={() => setLeadsDrawer(true)} size='large'>
						Добавить
					</UiButton>
					<AddNewLead />
				</div>
				<LeadsTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Leads }
