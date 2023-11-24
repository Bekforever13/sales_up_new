import React, { useEffect, useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps, TLeadsSelect } from './LeadsTable.types'
import { TLeads } from 'src/store/leads/Leads.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { UiSelect } from 'src/components/ui'
import { Comment, Telegram } from 'src/components/shared'

const LeadsTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const [statusOptions, setStatusOptions] = useState<TLeadsSelect[]>([])
	const { leads, statuses, leadsTotal } = useSelectors()
	const handleChangeStatus = (rec: any) => {
		axiosInstance.put(`/leads/${rec.id}?status_id=${rec.status_id}`)
	}

	const handleChangePage = (event: number) => setPage(event)

	useEffect(() => {
		statuses.map((status: any) => {
			setStatusOptions(prev => [
				...prev,
				{ value: status.id, label: status.name },
			])
		})
	}, [statuses])

	const columns: ColumnsType<TLeads> = [
		{
			title: 'ФИО',
			dataIndex: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			render: (_, rec) => (
				<UiSelect
					defaultValue={statusOptions.find(item => rec.status === item.label)}
					style={{ width: '100%' }}
					onSelect={e => handleChangeStatus({ ...rec, status_id: e })}
					options={statusOptions}
				/>
			),
		},
		{
			title: 'Комментарий',
			dataIndex: 'comment',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<Comment user={rec} route='leads' />
					<Telegram user={rec} />
				</div>
			),
		},
	]

	return (
		<>
			{statusOptions.length > 2 && (
				<UiTable
					columns={columns}
					dataSource={leads}
					pagination={{
						total: leadsTotal,
						current: page,
						showSizeChanger: false,
						defaultPageSize: 10,
						onChange: handleChangePage,
					}}
					rowKey={e => e.id}
					size='small'
					bordered
				/>
			)}
		</>
	)
}

export { LeadsTable }
