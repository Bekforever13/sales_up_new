import { Form, message } from 'antd'
import React from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type formType = {
	title: string
	description: string
}

const AddCompanyDrawer: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch, setCompaniesDrawer } = useActions()
	const { companiesDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)

	const onClose = () => setCompaniesDrawer(false)

	const onFinish = (values: formType) => {
		setButtonDisabled(true)
		axiosInstance.post('/companies', values).then(() => {
			setCompaniesDrawer(false)
			message.success('Успешно')
			setFetch(Math.random())
			form.resetFields()
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
			title='Новая компания'
			onClose={onClose}
			open={companiesDrawer}
		>
			<Form
				form={form}
				onFinish={onFinish}
				name='basic'
				initialValues={{ remember: true }}
				autoComplete='off'
				layout='vertical'
			>
				<Form.Item
					name='title'
					label={<label className='text-black dark:text-white'>Название</label>}
					rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}
				>
					<UiInput placeholder='Название...' />
				</Form.Item>
				<Form.Item
					name='description'
					label={<label className='text-black dark:text-white'>Описание</label>}
					rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}
				>
					<UiInput placeholder='Описание...' />
				</Form.Item>
				<UiButton htmlType='submit' loading={isButtonDisabled}>
					Добавить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { AddCompanyDrawer }
