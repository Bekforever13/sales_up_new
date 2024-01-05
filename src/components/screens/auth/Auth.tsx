import { MaskedInput } from 'antd-mask-input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formatPhone } from 'src/utils/shared'
import { ILoginDataBody } from './Auth.types'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from 'src/services/axiosInstance'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { message } from 'antd'

const Auth: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false)
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const {
		register,
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<any>({
		mode: 'onChange',
	})

	const onSubmit = async (values: ILoginDataBody) => {
		setButtonDisabled(true)
		axiosInstance
			.post('/auth/login', {
				...values,
				phone: formatPhone('+' + values.phone),
			})
			.then(res => {
				if (res.status === 200) {
					localStorage.setItem('token', 'Bearer ' + res.data.data.access_token)
					navigate('/')
					message.success('Добро пожаловать!')
				}
			})
			.catch(e => message.error(e.response.data.message))
	}

	React.useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [token])

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
		<div className='flex items-center justify-center w-full h-screen bg-[#E0E0E0]'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex items-center justify-center flex-col w-[40%] h-[50%] bg-white gap-y-8 rounded-md shadow-lg px-[5%]'
			>
				<h1 className='text-3xl text-[#1a76d2] dark:text-[#1a76d2] font-bold select-none'>
					Sales UP
				</h1>
				<Controller
					name='phone'
					control={control}
					rules={{
						required: true,
						validate: value =>
							value.replace(/\D/g, '').length > 3 || 'Введите телефон',
					}}
					render={({ field }) => (
						<MaskedInput
							{...field}
							mask='+{998}00 000 00 00'
							className='w-full px-4 py-2 rounded-md border dark:text-black outline-none'
							placeholder='Телефон'
						/>
					)}
				/>
				<div className='w-full relative'>
					<input
						className='w-full px-4 py-[7px] rounded-md border outline-none dark:text-black'
						type={showPassword ? 'text' : 'password'}
						{...register('password', { required: true })}
						placeholder='Пароль'
					/>
					<div className='absolute top-2 right-3 dark:text-black text-black'>
						{showPassword ? (
							<FaEyeSlash
								className='dark:text-black text-black'
								onClick={() => setShowPassword(false)}
							/>
						) : (
							<FaEye
								className='dark:text-black text-black'
								onClick={() => setShowPassword(true)}
							/>
						)}
					</div>
				</div>
				<button
					className='w-full px-4 py-2 h-fit text-lg text-white font-medium select-none'
					style={{ backgroundColor: '#1976D2' }}
					type='submit'
					disabled={!isValid || isButtonDisabled}
				>
					Войти
				</button>
			</form>
		</div>
	)
}

export { Auth }
