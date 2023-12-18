import { Form } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import React, { useEffect } from 'react'
import { UiButton, UiDrawer, UiInput, UiSelect } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TDrawerForm } from 'src/store/users/Users.types'

const roles = [
	{ label: 'Админ', value: 1 },
	{ label: 'Пользователь', value: 2 },
]

const AddUserDrawer: React.FC = () => {
	const { userDrawer, userToEdit } = useSelectors()
	const { setFetch, setUserDrawer } = useActions()
	const theme = localStorage.getItem('theme')
	const [form] = Form.useForm()

	const onClose = () => setUserDrawer(false)

	const onFinish = (values: TDrawerForm) => {
		userToEdit
			? axiosInstance
					.put(`/admin/users/${userToEdit.id}`, {
						name: values.name,
						phone: values.phone,
						role_id: values.role_id,
						password: values.password || undefined,
					})
					.then(() => {
						setUserDrawer(false)
						form.resetFields()
						setFetch(Math.random())
					})
			: axiosInstance
					.post('/admin/users', {
						...values,
						phone: `+${values.phone.replace(/\D/g, '')}`,
					})
					.then(() => {
						setUserDrawer(false)
						form.resetFields()
						setFetch(Math.random())
					})
	}

	useEffect(() => {
		if (userToEdit) {
			form.setFieldsValue({
				name: userToEdit.name,
				phone: userToEdit.phone,
				password: userToEdit.password,
				role_id: userToEdit.role_id,
			})
		}
	}, [userToEdit])

	return (
		<UiDrawer
			placement='right'
			title='Пользователь'
			onClose={onClose}
			open={userDrawer}
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
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Ф.И.О' />
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
				<Form.Item
					name='password'
					rules={[
						userToEdit
							? {}
							: { required: true, min: 6, message: 'Минимум 6 символов' },
					]}
				>
					<UiInput placeholder='Пароль' />
				</Form.Item>
				<Form.Item
					name='role_id'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiSelect placeholder='Выберите роль' options={roles} />
				</Form.Item>
				<UiButton type='primary' htmlType='submit'>
					Подтвердить
				</UiButton>
			</Form>
		</UiDrawer>
	)
}

export { AddUserDrawer }