import React, { useState, useEffect } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks'
import { TelegramLeadsTable } from './table/TelegramLeadsTable'

const TelegramLeads: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const { setTelegraphLeadsTotal, setTelegraphLeads } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(`/telegraph-chats?limit=10`)
			.then(res => {
				setTelegraphLeadsTotal(res.data.total)
				setTelegraphLeads(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [page, fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<TelegramLeadsTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { TelegramLeads }
