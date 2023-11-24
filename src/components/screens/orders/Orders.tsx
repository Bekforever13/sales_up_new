import { Spin } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { useActions } from 'src/hooks/useActions'
import { useDebounce } from 'src/hooks/useDebounce'
import { axiosInstance } from 'src/services/axiosInstance'
import { OrdersTable } from './table/OrdersTable'
import { OrderFilters } from './filters/OrderFilters'
import { useSelectors } from 'src/hooks'

const Orders: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [courseId, setCourseId] = useState('')
	const [leadId, setLeadId] = useState('')
	const debouncedCourseId = useDebounce(courseId, 500)
	const debouncedLeadId = useDebounce(leadId, 500)
	const [dateFrom, setDateFrom] = useState('')
	const [dateTo, setDateTo] = useState('')
	const { setOrders, setOrdersTotal } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(
				`/orders?limit=10
				${page ? `&page=${page}` : ''}
				${debouncedCourseId ? `&course_id=${debouncedCourseId}` : ''}
				${debouncedLeadId ? `&lead_id=${debouncedLeadId}` : ''}
				${dateFrom ? `&from=${dateFrom}` : ''}
				${dateTo ? `&to=${dateTo}` : ''}`
			)
			.then((res: any) => {
				setOrders(res.data.data)
				setOrdersTotal(res.data.total)
			})
			.finally(() => setLoading(false))
	}, [page, debouncedCourseId, debouncedLeadId, dateFrom, dateTo, fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 py-1 px-5 rounded-xl flex flex-col'>
				<OrderFilters
					courseId={courseId}
					setCourseId={setCourseId}
					leadId={leadId}
					setLeadId={setLeadId}
					setDateFrom={setDateFrom}
					setDateTo={setDateTo}
				/>
				<OrdersTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Orders }
