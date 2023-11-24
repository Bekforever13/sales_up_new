import React, { useState, useEffect } from 'react'
import { UiButton } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { ToolsTable } from './table/ToolsTable'
import { AddTool } from './addTool/AddTool'

const Tools: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(1)
	const { fetch } = useSelectors()

	const { setTools, setToolsTotal } = useActions()

	const showDrawer = () => setOpen(true)

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(`/links?page=${page}`)
			.then(res => {
				setTools(res.data.data)
				setToolsTotal(res.data.total)
			})
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
			<div className='w-fit'>
				<UiButton onClick={showDrawer}>Добавить</UiButton>
				<AddTool open={open} setOpen={setOpen} />
			</div>
			<Spin spinning={loading}>
				<ToolsTable page={page} setPage={setPage} />
			</Spin>
		</div>
	)
}

export { Tools }
