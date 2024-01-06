import { Form, message } from 'antd'
import React from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type TState = {
	title: string
	price: number | null
}

const SourceInfoDrawer: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch, setSourceInfoDrawer } = useActions()
	const { sourceInfoDrawer, sourceID } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)

	const onClose = () => {
		setSourceInfoDrawer(false)
	}

	const onSubmit = (values: TState) => {
		setButtonDisabled(true)
		axiosInstance
			.post(`/sources/${sourceID}/links`, { ...values, type_id: 1 })
			.then(() => {
				setSourceInfoDrawer(false)
				setFetch(Math.random())
				form.resetFields()
				message.success('Успешно')
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
		<UiDrawer placement='right' onClose={onClose} open={sourceInfoDrawer}>
			<Form layout='vertical' form={form} onFinish={onSubmit}>
				<Form.Item
					name='title'
					label='Название'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Название' type='text' />
				</Form.Item>
				<Form.Item
					name='price'
					label='Цена'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Цена' type='text' />
				</Form.Item>
				<UiButton loading={isButtonDisabled} htmlType='submit'>
					Добавить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { SourceInfoDrawer }
