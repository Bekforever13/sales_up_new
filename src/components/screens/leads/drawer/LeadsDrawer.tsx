import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TLeadsForm } from 'src/store/leads/Leads.types'

const LeadsDrawer: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch, setLeadsDrawer, setLeadsToEdit } = useActions()
	const { leadsDrawer, leadsToEdit } = useSelectors()
	const theme = localStorage.getItem('theme')
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)

	const onClose = () => {
		setLeadsDrawer(false)
		form.resetFields()
		setLeadsToEdit(null)
	}

	const onFinish = (values: TLeadsForm) => {
		setButtonDisabled(true)
		leadsToEdit
			? axiosInstance
					.put(`/leads/${leadsToEdit.id}`, {
						first_name: values.first_name,
						last_name: values.last_name,
						phone: `+${values.phone.replace(/\D/g, '')}`,
						comment: values.comment,
					})
					.then(res => {
						if (res.status === 200) {
							setLeadsDrawer(false)
							form.resetFields()
							setFetch(Math.random())
							message.success('Успешно')
						}
					})
			: axiosInstance
					.post('/leads', {
						...values,
						phone: `+${values.phone.replace(/\D/g, '')}`,
					})
					.then(res => {
						if (res.status === 201) {
							setLeadsDrawer(false)
							form.resetFields()
							setFetch(Math.random())
							message.success('Успешно')
						}
					})
					.catch(() => message.error('Данный телефон уже зарегистрирован'))
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

	useEffect(() => {
		if (leadsToEdit) {
			form.setFieldsValue({
				first_name: leadsToEdit.first_name,
				last_name: leadsToEdit.last_name,
				phone: leadsToEdit.phone,
				comment: leadsToEdit.comment,
			})
		}
	}, [leadsToEdit])

	return (
		<UiDrawer
			placement='right'
			title='Новый Лид'
			onClose={onClose}
			open={leadsDrawer}
		>
			<Form layout='vertical' form={form} onFinish={onFinish}>
				<Form.Item
					name='first_name'
					label='Имя'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Имя...' />
				</Form.Item>
				<Form.Item
					name='last_name'
					label='Фамилия'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Фамилия...' />
				</Form.Item>
				<Form.Item
					name='phone'
					label='Телефон'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<MaskedInput
						style={
							theme === 'dark'
								? { color: 'white', background: '#164863' }
								: { color: '#000', background: '#F1F5F9' }
						}
						mask={'+{998}00 000 00 00'}
					/>
				</Form.Item>
				{leadsToEdit && (
					<Form.Item label='Комментарий' name='comment'>
						<UiInput placeholder='Комментарий' />
					</Form.Item>
				)}
				<UiButton type='primary' loading={isButtonDisabled} htmlType='submit'>
					Подтвердить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { LeadsDrawer }
