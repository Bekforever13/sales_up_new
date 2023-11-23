import React from 'react'
import { UiButton } from 'src/components/ui'
import UiTable from 'src/components/ui/table/UiTable'
// import type { ColumnsType } from 'antd/es/table'

const Courses: React.FC = () => {
	// const columns: ColumnsType<any> = [
	// 	{
	// 		title: 'Название курса',
	// 		dataIndex: 'title',
	// 	},
	// 	{
	// 		title: 'Описание',
	// 		dataIndex: 'description',
	// 	},

	// 	{
	// 		title: 'Цена',
	// 		dataIndex: 'price',
	// 	},
	// 	{
	// 		title: 'Кликнул',
	// 		dataIndex: 'clicked',
	// 	},
	// 	{
	// 		title: 'Действия',
	// 		dataIndex: 'comment',
	// 	},
	// 	{
	// 		title: 'Действия',
	// 		dataIndex: 'actions',
	// 		render: (_, ) => <div className='flex items-center gap-2'>
	// 			edit
	// 			delete
	// 		</div>,
	// 	},
	// ]
	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
			<div className='w-fit'>
				<UiButton>Добавить</UiButton>
			</div>
			<UiTable />
		</div>
	)
}

export { Courses }
