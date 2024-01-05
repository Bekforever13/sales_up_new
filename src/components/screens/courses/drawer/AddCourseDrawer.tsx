import { message } from 'antd'
import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const AddCourseDrawer: React.FC = () => {
	const { setFetch, setCourseDrawer, setCourseToEdit } = useActions()
	const { courseDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const [newCourse, setNewСourse] = useState({
		title: '',
		description: '',
	})

	const onClose = () => {
		setCourseToEdit(null)
		setCourseDrawer(false)
		setNewСourse({
			title: '',
			description: '',
		})
	}

	const onSubmit = () => {
		setButtonDisabled(true)
		axiosInstance.post('/courses', newCourse).then(() => {
			setCourseDrawer(false)
			message.success('Успешно')
			setNewСourse({
				title: '',
				description: '',
			})
			setFetch(Math.random())
		})
	}

	React.useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (isButtonDisabled) {
			timer = setTimeout(() => {
				setButtonDisabled(false)
			}, 2000)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [isButtonDisabled])

	return (
		<UiDrawer
			placement='right'
			title='Новый курс'
			onClose={onClose}
			open={courseDrawer}
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
				placeholder='Описание...'
				type='text'
				value={newCourse.description}
				onChange={e =>
					setNewСourse({ ...newCourse, description: e.target.value })
				}
			/>
			<UiButton loading={isButtonDisabled} onClick={onSubmit}>
				Добавить
			</UiButton>
		</UiDrawer>
	)
}

export { AddCourseDrawer }
