import React, { useState, useEffect } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks'
import { CompaniesTable } from './table/CompaniesTable'

const Companies: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const { setCompanies, setCompaniesTotal } = useActions()
	const { fetch } = useSelectors()

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get('/companies')
			.then(res => {
				setCompaniesTotal(res.data.total)
				setCompanies(res.data.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<CompaniesTable page={page} setPage={setPage} />
			</div>
		</Spin>
	)
}

export { Companies }
