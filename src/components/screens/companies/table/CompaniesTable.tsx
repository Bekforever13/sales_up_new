import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TCompaniesProps } from './CompaniesTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { ICompany } from 'src/store/companies/Companies.types'
import { UiButton } from 'src/components/ui'
import { Delete, EditCompany } from 'src/components/shared'
import { useActions } from 'src/hooks'

const CompaniesTable: React.FC<TCompaniesProps> = ({ page, setPage }) => {
	const { companies, companiesTotal } = useSelectors()
	const { setCompaniesEdit } = useActions()

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
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			width: 150,
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<UiButton onClick={() => setCompaniesEdit(rec)}>
						<EditCompany />
					</UiButton>
					<UiButton>
						<Delete route='companies' id={rec.id} />
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
