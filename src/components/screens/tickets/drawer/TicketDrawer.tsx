import { Form, message } from 'antd'
import React, { useEffect } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TTicketDrawerForm } from 'src/store/tickets/Tickets.types'

const TicketDrawer: React.FC = () => {
	const { ticketsDrawer, ticketsToEdit } = useSelectors()
	const { setFetch, setTicketsDrawer, setTicketToEdit } = useActions()
	const [form] = Form.useForm()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)

	const onClose = () => {
		setTicketsDrawer(false)
		setTicketToEdit(null)
		form.resetFields()
	}

	const onFinish = (values: TTicketDrawerForm) => {
		setButtonDisabled(true)
		ticketsToEdit?.id
			? axiosInstance.put(`/tickets/${ticketsToEdit.id}`, values).then(() => {
					setTicketsDrawer(false)
					form.resetFields()
					setFetch(Math.random())
					message.success('Успешно')
			  })
			: axiosInstance.post('/tickets', values).then(() => {
					setTicketsDrawer(false)
					form.resetFields()
					setFetch(Math.random())
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
					rules={[
						{
							required: true,
							max: 100000000,
							message: 'Пожалуйста, заполните поле.',
						},
					]}
				>
					<UiInput type='number' placeholder='Цена' />
				</Form.Item>
				<UiButton loading={isButtonDisabled} type='primary' htmlType='submit'>
					Подтвердить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { TicketDrawer }
