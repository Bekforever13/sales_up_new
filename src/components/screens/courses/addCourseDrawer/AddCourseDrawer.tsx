import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type TProps = {
	open: boolean
	setOpen: (e: React.SetStateAction<boolean>) => void
}

const AddCourseDrawer: React.FC<TProps> = ({ setOpen, open }) => {
	const { setFetch } = useActions()
	const [newCourse, setNewСourse] = useState({
		title: '',
		description: '',
		price: '',
	})

	const onClose = () => setOpen(false)

	const onSubmit = () => {
		axiosInstance.post('/courses', newCourse).then(() => {
			setOpen(false)
			setNewСourse({
				title: '',
				description: '',
				price: '',
			})
			setFetch(Math.random())
		})
	}

	return (
		<UiDrawer
			placement='right'
			title='Новый курс'
			onClose={onClose}
			open={open}
		>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Название...'
				type='text'
				value={newCourse.title}
				onChange={e => setNewСourse({ ...newCourse, title: e.target.value })}
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Цена...'
				type='number'
				value={newCourse.price}
				onChange={e => setNewСourse({ ...newCourse, price: e.target.value })}
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Описание...'
				type='text'
				value={newCourse.description}
				onChange={e =>
					setNewСourse({ ...newCourse, description: e.target.value })
				}
			/>
			<UiButton onClick={onSubmit}>Добавить</UiButton>
		</UiDrawer>
	)
}

export { AddCourseDrawer }
