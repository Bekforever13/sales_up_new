import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { UiButton } from 'src/components/ui'
import { SourcesTable } from './table/SourcesTable'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { AddSourceDrawer } from './addSourceDrawer/AddSourceDrawer'

const Sources: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(1)
	const { fetch } = useSelectors()

	const { setSources, setSourcesTotal } = useActions()

	const showDrawer = () => setOpen(true)

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(`/sources?page=${page}`)
			.then(res => {
				setSources(res.data.data)
				setSourcesTotal(res.data.total)
			})
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
			<div className='w-fit'>
				<UiButton onClick={showDrawer}>Добавить</UiButton>
				<AddSourceDrawer open={open} setOpen={setOpen} />
			</div>
			<Spin spinning={loading}>
				<SourcesTable page={page} setPage={setPage} />
			</Spin>
		</div>
	)
}

export { Sources }
