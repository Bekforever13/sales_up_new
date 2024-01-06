import React from 'react'
import { Delete } from 'src/components/shared'
import { UiButton } from 'src/components/ui'
import UiTable from 'src/components/ui/table/UiTable'
import type { ColumnsType } from 'antd/es/table'
import { TSource } from 'src/store/sources/Sources.types'
import { useActions, useSelectors } from 'src/hooks'
import { EditSource } from 'src/components/shared/Actions/edit/EditSource'
import { MdOutlineContentPasteSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

type TCoursesProps = {
	page: any
	setPage: (page: React.SetStateAction<number>) => void
}

const SourcesTable: React.FC<TCoursesProps> = ({ page, setPage }) => {
	const { sources, sourcesTotal } = useSelectors()
	const { setSourceToEdit, setSourceID } = useActions()
	const navigate = useNavigate()

	const columns: ColumnsType<TSource> = [
		{
			title: 'Название',
			dataIndex: 'title',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			width: 150,
			render: (_, rec) => (
				<div className='flex items-center gap-5'>
					<UiButton onClick={() => setSourceToEdit(rec)}>
						<EditSource />
					</UiButton>
					<UiButton
						onClick={() => {
							navigate(`/sources/${rec.title.replace(/ /g, '_')}`)
							setSourceID(rec.id)
						}}
					>
						<MdOutlineContentPasteSearch size='22' />
					</UiButton>
					<UiButton>
						<Delete route='sources' id={rec.id} />
					</UiButton>
				</div>
			),
		},
	]

	return (
		<UiTable
			columns={columns}
			dataSource={sources}
			pagination={{
				total: sourcesTotal,
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

export { SourcesTable }
