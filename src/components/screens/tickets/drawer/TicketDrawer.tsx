import { Form } from 'antd'
import React, { useEffect } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TTicketDrawerForm } from 'src/store/tickets/Tickets.types'

const TicketDrawer: React.FC = () => {
	const { ticketsDrawer, ticketsToEdit } = useSelectors()
	const { setFetch, setTicketsDrawer } = useActions()
	const [form] = Form.useForm()

	const onClose = () => setTicketsDrawer(false)

	const onFinish = (values: TTicketDrawerForm) => {
		ticketsToEdit
			? axiosInstance.put(`/tickets/${ticketsToEdit.id}`, values).then(() => {
					setTicketsDrawer(false)
					form.resetFields()
					setFetch(Math.random())
			})
			: axiosInstance.post('/tickets', values).then(() => {
					setTicketsDrawer(false)
					form.resetFields()
					setFetch(Math.random())
			})
	}

	useEffect(() => {
		if (ticketsToEdit) {
			form.setFieldsValue({
				name: ticketsToEdit.name,
				price: ticketsToEdit.price,
			})
		}
	}, [ticketsToEdit])

	return (
		<UiDrawer
			placement='right'
			title='Пользователь'
			onClose={onClose}
			open={ticketsDrawer}
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
					name='name'
					label='Название'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Название' />
				</Form.Item>
				<Form.Item
					name='price'
					label='Цена'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Цена' />
				</Form.Item>
				<UiButton type='primary' htmlType='submit'>
					Подтвердить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { TicketDrawer }
