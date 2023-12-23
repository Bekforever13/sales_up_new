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
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 500)
	const { setLeads, setLeadsTotal, setLeadsDrawer } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(
				`/leads?limit=10
				${page ? `&page=${page}` : ''}
				${debouncedSearch ? `&search=${debouncedSearch}` : ''}`
			)
			.then(res => {
				setLeadsTotal(res.data.total)
				setLeads(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [page, debouncedSearch, fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<div className='flex items-center justify-between'>
					<LeadsFilters search={search} setSearch={setSearch} />
					<UiButton onClick={() => setLeadsDrawer(true)}>Добавить</UiButton>
					<AddNewLead />
				</div>
				<LeadsTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Leads }
