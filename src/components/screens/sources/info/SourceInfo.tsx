import React, { useState, useEffect } from 'react'
import { Delete, EditSourceInfo } from 'src/components/shared'
import { UiButton } from 'src/components/ui'
import { axiosInstance } from 'src/services/axiosInstance'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { TLink } from 'src/store/sources/Sources.types'
import { useActions, useSelectors } from 'src/hooks'
import { Spin } from 'antd'
import { SourceInfoDrawer } from './drawer/SourceInfoDrawer'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const SourceInfo: React.FC = () => {
	const navigate = useNavigate()
	const { setSourceInfoEdit, setSourceInfoDrawer } = useActions()
	const { fetch, sourceID } = useSelectors()
	const [total, setTotal] = useState(10)
	const [page, setPage] = useState(1)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const handleBackBtn = () => navigate('/sources')

	const columns: ColumnsType<TLink> = [
		{
			title: 'Название',
			dataIndex: 'title',
		},
		{
			title: 'Цена',
			dataIndex: 'price',
		},
		{
			title: 'QR Code',
			dataIndex: 'qr_code',
			render: (_, rec) => (
				<a href={rec.qr_code} target='_blank'>
					{rec.qr_code}
				</a>
			),
		},
		{
			title: 'Адрес',
			dataIndex: 'url',
			render: (_, rec) => (
				<a href={rec.url} target='_blank'>
					{rec.url}
				</a>
			),
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			width: 150,
			render: (_, rec) => (
				<div className='flex items-center gap-5'>
					<UiButton
						onClick={() =>
							setSourceInfoEdit({
								id: rec.id,
								title: rec.title,
								price: rec.price.toString(),
							})
						}
					>
						<EditSourceInfo />
					</UiButton>
					<UiButton>
						<Delete route='links' id={rec.id} />
					</UiButton>
				</div>
			),
		},
	]

	useEffect(() => {
		if (!sourceID) {
			navigate('/sources')
		}
	}, [sourceID])

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(`/sources/${sourceID}/links`)
			.then(res => {
				setTotal(res.data.total)
				setData(res.data.data)
			})
			.finally(() => setLoading(false))
	}, [sourceID, fetch])

	return (
		<Spin spinning={loading}>
			<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
				<div className='flex justify-between'>
					<UiButton className='flex items-center gap-2' onClick={handleBackBtn}>
						<IoMdArrowBack size='22' />
						Назад
					</UiButton>
					<UiButton onClick={() => setSourceInfoDrawer(true)}>
						Добавить
					</UiButton>
				</div>
				<UiTable
					columns={columns}
					dataSource={data}
					pagination={{
						total: total,
						current: page,
						showSizeChanger: false,
						defaultPageSize: 10,
						onChange: e => setPage(e),
					}}
					rowKey={e => e.id}
					scroll={{ x: true }}
					size='small'
					bordered
				/>
				<SourceInfoDrawer />
			</div>
		</Spin>
	)
}

export { SourceInfo }
