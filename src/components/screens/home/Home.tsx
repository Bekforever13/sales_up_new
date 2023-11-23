import React from 'react'
import { CoursesChart } from './coursesChart/CoursesChart'
import { StatusChart } from './statusChart/StatusChart'

const Home: React.FC = () => {
	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 py-3 px-5 rounded-xl flex justify-center items-center gap-20'>
			<div className='border border-black bg-slate-300 dark:bg-slate-700 p-[30px] rounded-[30px] w-[500px]'>
				<CoursesChart />
			</div>
			<div className='border border-black bg-slate-300 dark:bg-slate-700 p-[30px] rounded-[30px] w-[500px]'>
				<StatusChart />
			</div>
		</div>
	)
}

export { Home }
