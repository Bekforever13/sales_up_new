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
import { UiSelect } from 'src/components/ui'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StatusChart: React.FC = () => {
	const [statuses, setStatuses] = useState<any>([])
	const [selectOptions, setSelectOptions] = useState([
		{ value: 0, label: 'All' },
	])
	const [sources, setSources] = useState({ sources: [] })

	const handleSelect = (e: any) => setSources({ sources: e })

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

	useEffect(() => {
		axiosInstance.get('/sources').then(res => {
			res.data.data.map((item: any) => {
				setSelectOptions(prev => [
					...prev,
					{ value: item.id, label: item.name },
				])
			})
		})
	}, [])

	useEffect(() => {
		axiosInstance.get('/status-leads', { params: sources }).then(res => {
			setStatuses(res.data.data)
		})
	}, [sources.sources.length])

	const data = {
		labels: ['Started', 'Called', 'Registered', 'Ordered'],
		datasets: [
			{
				label: 'Количество',
				data: [
					statuses.leads_status_started,
					statuses.leads_status_called,
					statuses.leads_status_registered,
					statuses.leads_status_ordered,
				],
				backgroundColor: ['Pink', 'Purple', 'Yellow', 'Orange'],
			},
		],
	}

	return (
		<>
			<div className='flex items-center justify-between gap-5'>
				<h2 className='mb-5 text-black'>Статусы</h2>
				<UiSelect
					mode='multiple'
					className='min-w-[150px] translate-y-[-10px]'
					onChange={e => handleSelect(e)}
					options={selectOptions}
					defaultValue={0}
				/>
			</div>
			<Bar
				className='text-black dark:text-white'
				options={options}
				data={data}
			/>
		</>
	)
}

export { StatusChart }
