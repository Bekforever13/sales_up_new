import React, { useState, useEffect } from 'react'
import { UsersTable } from './table/UsersTable'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks'

const Users: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const { setUsers, setUsersTotal } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get('/admin/users')
			.then(res => {
				setUsersTotal(res.data.total)
				setUsers(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<UsersTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Users }
