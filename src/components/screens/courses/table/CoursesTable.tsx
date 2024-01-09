import React from 'react'
import UiTable from 'src/components/ui/table/UiTable'
import type { ColumnsType } from 'antd/es/table'
import { useActions, useSelectors } from 'src/hooks'
import { TCourse } from 'src/store/courses/Courses.type'
import { Delete, EditCourse } from 'src/components/shared'
import { UiButton } from 'src/components/ui'

type TCoursesProps = {
	page: any
	setPage: (page: React.SetStateAction<number>) => void
}

const CoursesTable: React.FC<TCoursesProps> = ({ page, setPage }) => {
	const { courses, coursesTotal } = useSelectors()
	const { setCourseToEdit } = useActions()

	const columns: ColumnsType<TCourse> = [
		{
			title: 'Название курса',
			dataIndex: 'title',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			render: (_, rec) => (
				<p className='truncate w-[400px]'>{rec.description}</p>
			),
		},
		{
			title: 'Кликнул',
			dataIndex: 'clicked',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<div className='flex items-center gap-5'>
					<UiButton onClick={() => setCourseToEdit(rec)}>
						<EditCourse />
					</UiButton>
					<UiButton>
						<Delete route='courses' id={rec.id} />
					</UiButton>
				</div>
			),
		},
	]

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={courses}
				pagination={{
					total: coursesTotal,
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
		</>
	)
}

export { CoursesTable }
