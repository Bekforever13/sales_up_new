import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput, UiPopover } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditSourceInfo: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [isRendered, setIsRendered] = useState(false)
	const { setFetch } = useActions()
	const { sourceInfoEdit } = useSelectors()
	const [newDataSource, setNewDataSource] = useState({
		title: sourceInfoEdit?.title,
		price: sourceInfoEdit?.price,
	})

	const onSubmit = () => {
		const obj = { id: sourceInfoEdit?.id, ...newDataSource }
		axiosInstance.put(`/links/${sourceInfoEdit?.id}`, obj).then(() => {
			setFetch(Math.random())
			setOpen(false)
		})
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<label className='flex flex-col gap-y-2'>
				Название Бота
				<UiInput
					placeholder='Название'
					value={newDataSource.title}
					onChange={e =>
						setNewDataSource({ ...newDataSource, title: e.target.value })
					}
					type='text'
				/>
			</label>
			<label className='flex flex-col gap-y-2'>
				Цена
				<UiInput
					placeholder='Цена'
					value={newDataSource.price}
					onChange={e =>
						setNewDataSource({ ...newDataSource, price: e.target.value })
					}
					type='number'
				/>
			</label>
			<UiButton onClick={onSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (sourceInfoEdit && !isRendered) {
			setIsRendered(true)
			setNewDataSource({
				title: sourceInfoEdit?.title,
				price: sourceInfoEdit?.price,
			})
		}
	}, [sourceInfoEdit])

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

export { EditSourceInfo }
