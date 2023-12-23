import React, { useEffect } from 'react'
import { Form } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TLeadsForm } from 'src/store/leads/Leads.types'

const AddNewLead: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch, setLeadsDrawer, setLeadsToEdit } = useActions()
	const { leadsDrawer, leadsToEdit } = useSelectors()
	const theme = localStorage.getItem('theme')

	const onClose = () => {
		setLeadsDrawer(false)
		form.resetFields()
		setLeadsToEdit(null)
	}

	const onFinish = (values: TLeadsForm) => {
		leadsToEdit
			? axiosInstance
					.put(`/leads/${leadsToEdit.id}`, {
						first_name: values.first_name,
						last_name: values.last_name,
						phone: `+${values.phone.replace(/\D/g, '')}`,
						comment: values.comment,
					})
					.then(() => {
						setLeadsDrawer(false)
						form.resetFields()
						setFetch(Math.random())
					})
			: axiosInstance
					.post('/leads', {
						...values,
						phone: `+${values.phone.replace(/\D/g, '')}`,
					})
					.then(() => {
						setLeadsDrawer(false)
						form.resetFields()
						setFetch(Math.random())
					})
	}

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
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					name='first_name'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Название...' />
				</Form.Item>
				<Form.Item
					name='last_name'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Описание...' />
				</Form.Item>
				<Form.Item
					name='phone'
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
					<Form.Item name='comment'>
						<UiInput placeholder='Комментарий' />
					</Form.Item>
				)}
				<Form.Item>
					<UiButton type='primary' htmlType='submit'>
						Подтвердить
					</UiButton>
				</Form.Item>
			</Form>
		</UiDrawer>
	)
}

export { AddNewLead }
