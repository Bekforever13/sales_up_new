import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput, UiPopover } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditSource: React.FC = () => {
	const [open, setOpen] = useState(false)
	const { setFetch } = useActions()
	const { sourceToEdit } = useSelectors()
	const [newDataSource, setNewDataSource] = useState({
		title: sourceToEdit?.title,
	})

	const onSubmit = () => {
		const obj = { id: sourceToEdit?.id, ...newDataSource }
		axiosInstance
			.put(`/sources/${sourceToEdit?.id}`, obj)
			.then(() => {
				setFetch(Math.random())
				setOpen(false)
			})
			.catch(e =>
				message.error(
					e.response.data.message === 'The title field is required.'
						? 'Заполните поле "Название"'
						: 'Произошла ошибка'
				)
			)
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<label className='flex flex-col gap-y-2'>
				Название источника
				<UiInput
					placeholder='Название'
					value={newDataSource.title}
					onChange={e =>
						setNewDataSource({ ...newDataSource, title: e.target.value })
					}
				/>
			</label>
			<UiButton onClick={onSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (sourceToEdit) {
			setNewDataSource({
				title: sourceToEdit.title,
			})
		}
	}, [sourceToEdit])

	return (
		<UiPopover
			content={content}
			trigger='click'
			open={open}
			onOpenChange={e => setOpen(e)}
		>
			<FaEdit size='22' className='cursor-pointer' />
		</UiPopover>
	)
}

export { EditSource }
