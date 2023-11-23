import React, { useEffect, useState } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions } from 'src/hooks/useActions'
import { TCourse } from 'src/store/courses/Courses.type'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CoursesChart: React.FC = () => {
	const [counts, setCounts] = useState<any>([])
	const { setCourses } = useActions()

	useEffect(() => {
		axiosInstance.get('/courses').then(res => {
			res.data.data.forEach((item: TCourse) => {
				setCounts((prev: any) => [...prev, item.leads_count])
			})
			setCourses(res.data.data)
		})
	}, [])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
	}

	const chartData = {
		labels: ['Английский язык', 'Математика', 'Русский язык', 'Физика'],
		datasets: [
			{
				label: 'Количество',
				data: [counts[0], counts[1], counts[2], counts[3]],
				backgroundColor: ['Red', 'Green', 'Blue', 'Cyan'],
			},
		],
	}
	return (
		<>
			<h2 className='mb-5'>Курсы</h2>
			<Bar options={options} data={chartData} />
		</>
	)
}

export { CoursesChart }
