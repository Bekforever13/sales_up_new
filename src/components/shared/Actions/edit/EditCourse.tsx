import React, { useState, useEffect } from 'react'
import { Popover } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditCourse: React.FC = () => {
	const [open, setOpen] = useState(false)
	const { setFetch } = useActions()
	const { courseToEdit } = useSelectors()
	const [newDataCourse, setNewDataСourse] = useState({
		title: '',
		description: '',
	})

	const onEditSubmit = () => {
		const obj = { id: courseToEdit?.id, ...newDataCourse }
		axiosInstance.put(`/courses/${courseToEdit?.id}`, obj).then(() => {
			setFetch(Math.random())
			setOpen(false)
		})
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<UiInput
				placeholder='Название...'
				value={newDataCourse.title}
				onChange={e =>
					setNewDataСourse({ ...newDataCourse, title: e.target.value })
				}
				type='text'
			/>
			<UiInput
				placeholder='Описание...'
				value={newDataCourse.description}
				onChange={e =>
					setNewDataСourse({ ...newDataCourse, description: e.target.value })
				}
				type='text'
			/>
			<UiButton onClick={onEditSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (courseToEdit) {
			setNewDataСourse({
				title: courseToEdit.title,
				description: courseToEdit.description,
			})
		}
	}, [courseToEdit])

	return (
		<Popover
			content={content}
			trigger='click'
			open={open}
			onOpenChange={e => setOpen(e)}
		>
			<FaEdit size='22' className='cursor-pointer' />
		</Popover>
	)
}

export { EditCourse }
