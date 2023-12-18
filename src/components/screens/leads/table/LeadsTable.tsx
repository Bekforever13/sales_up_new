import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps } from './LeadsTable.types'
import { TLeads, TLeadsForm } from 'src/store/leads/Leads.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { UiButton } from 'src/components/ui'
import { Delete } from 'src/components/shared'
import { useActions } from 'src/hooks'

const LeadsTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const { leads, leadsTotal } = useSelectors()
	const { setLeadsDrawer, setLeadsToEdit } = useActions()

	const handleChangePage = (event: number) => setPage(event)

	const handleEdit = (rec: TLeadsForm) => {
		setLeadsDrawer(true)
		setLeadsToEdit(rec)
	}

	const columns: ColumnsType<TLeads> = [
		{
			title: 'Имя',
			dataIndex: 'first_name',
		},
		{
			title: 'Фамилия',
			dataIndex: 'last_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
		},
		{
			title: 'Билеты',
			dataIndex: 'tickets',
			render: () => <></>
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
					<UiButton
						onClick={() =>
							handleEdit({
								first_name: rec.first_name,
								last_name: rec.last_name,
								phone: rec.phone!,
								id: rec.id,
								comment: rec.comment,
							})
						}
					>
						<BsPencilSquare size='22' />
					</UiButton>
					<UiButton>
						<Delete route='leads' id={rec.id} />
					</UiButton>
				</div>
			),
		},
	]

	return (
		<>
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
				scroll={{ x: true }}
				size='small'
				bordered
			/>
		</>
	)
}

export { LeadsTable }
