import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, EditSourceInfo } from 'src/components/shared'
import { UiButton } from 'src/components/ui'
import { axiosInstance } from 'src/services/axiosInstance'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { TLink } from 'src/store/sources/Sources.types'
import { useActions, useSelectors } from 'src/hooks'

const SourceInfo: React.FC = () => {
	const { id } = useParams()
	const { setSourceInfoEdit } = useActions()
	const { fetch } = useSelectors()
	const [total, setTotal] = useState(10)
	const [page, setPage] = useState(1)
	const [data, setData] = useState([])

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
		axiosInstance.get(`/sources/${id}/links`).then(res => {
			setTotal(res.data.total)
			setData(res.data.data)
		})
	}, [id, fetch])

	return (
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
	)
}

export { SourceInfo }
