import { Form, message } from 'antd'
import React from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type formType = {
	title: string
	description: string
}

const AddCourseDrawer: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch, setCourseDrawer, setCourseToEdit } = useActions()
	const { courseDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)

	const onClose = () => {
		setCourseToEdit(null)
		setCourseDrawer(false)
	}

	const onSubmit = (values: formType) => {
		setButtonDisabled(true)
		axiosInstance.post('/courses', values).then(() => {
			setCourseDrawer(false)
			message.success('Успешно')
			form.resetFields()
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
		return () => clearTimeout(timer)
	}, [isButtonDisabled])

	return (
		<UiDrawer
			placement='right'
			title='Новый курс'
			onClose={onClose}
			open={courseDrawer}
		>
			<Form layout='vertical' form={form} onFinish={onSubmit}>
				<Form.Item
					name='title'
					label='Название курса'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Название курса' />
				</Form.Item>
				<Form.Item
					name='description'
					label='Описание'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Описание' />
				</Form.Item>
				<UiButton loading={isButtonDisabled} htmlType='submit'>
					Добавить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { AddCourseDrawer }
