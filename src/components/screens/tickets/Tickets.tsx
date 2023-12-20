import React, { useState, useEffect } from 'react'
import { TicketsTable } from './table/TicketsTable'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks'
import { UiButton } from 'src/components/ui'
import { TicketDrawer } from './drawer/TicketDrawer'

const Tickets: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const { setTickets, setTicketsTotal, setTicketsDrawer } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get('/tickets')
			.then(res => {
				setTicketsTotal(res.data.total)
				setTickets(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<UiButton className='w-fit' onClick={() => setTicketsDrawer(true)}>
					Добавить
				</UiButton>
				<TicketDrawer />
				<TicketsTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Tickets }
