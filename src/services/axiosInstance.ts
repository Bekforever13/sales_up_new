import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: 'https://sales-up.uz/api',
})

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
