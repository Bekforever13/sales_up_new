import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TCompaniesProps } from './CompaniesTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { ICompany } from 'src/store/companies/Companies.types'
import { UiButton } from 'src/components/ui'

const CompaniesTable: React.FC<TCompaniesProps> = ({ page, setPage }) => {
	const { companies, companiesTotal } = useSelectors()

	const handleChangePage = (event: number) => setPage(event)

	const columns: ColumnsType<ICompany> = [
		{
			title: 'Название',
			dataIndex: 'title',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
		},
		{
			title: 'Телеграм канал',
			dataIndex: 'telegram_channel',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
		},
		{
			title: 'Телеграм бот',
			dataIndex: 'telegram_bot',
			render: (_, rec) => rec.telegraph_bot?.name,
		},
		{
			title: 'Билеты',
			dataIndex: 'tickets',
			render: () => <div>билет</div>,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: () => (
				<div className='flex items-center gap-2'>
					<UiButton>
						<BsPencilSquare size='22' />
					</UiButton>
					<UiButton>
						<IoTrashOutline size='22' />
					</UiButton>
				</div>
			),
		},
	]

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={companies}
				pagination={{
					total: companiesTotal,
					current: page,
					showSizeChanger: false,
					defaultPageSize: 10,
					onChange: handleChangePage,
				}}
				scroll={{ x: true }}
				rowKey={e => e.id}
				size='small'
				bordered
			/>
		</>
	)
}

export { CompaniesTable }
