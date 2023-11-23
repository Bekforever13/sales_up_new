import React from 'react'
import { TOrderProps } from './OrdersTable.types'
import { useSelectors } from 'src/hooks/useSelectors'
import { TOrder } from 'src/store/orders/Orders.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { Comment, Telegram } from 'src/components/shared'

const OrdersTable: React.FC<TOrderProps> = ({ page, setPage }) => {
	const { orders, ordersTotal } = useSelectors()

	const handleChangePage = (event: number) => setPage(event)

	const columns: ColumnsType<TOrder> = [
		{
			title: 'ФИО',
			dataIndex: 'lead_name',
			key: 'lead_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'lead_phone',
			key: 'lead_phone',
		},
		{
			title: 'Комментарий',
			dataIndex: 'comment',
			key: 'comment',
		},
		{
			title: 'Название курса',
			dataIndex: 'course_title',
			key: 'course_title',
		},
		{
			title: 'Действия',
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<Comment user={rec} route='orders' />
					<Telegram user={rec} />
				</div>
			),
		},
	]

	return (
		<>
			{orders.length > 0 && (
				<UiTable
					columns={columns}
					dataSource={orders}
					pagination={{
						total: ordersTotal,
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

export { OrdersTable }
