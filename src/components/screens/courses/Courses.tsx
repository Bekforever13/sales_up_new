import React, { useState, useEffect } from 'react'
import { UiButton } from 'src/components/ui'
import { CoursesTable } from './table/CoursesTable'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { Spin } from 'antd'
import { AddCourseDrawer } from './addCourseDrawer/AddCourseDrawer'

const Courses: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(1)
	const { fetch } = useSelectors()

	const { setCourses, setCoursesTotal } = useActions()

	const showDrawer = () => setOpen(true)

	useEffect(() => {
		setLoading(true)
		axiosInstance
			.get(`/courses?page=${page}`)
			.then(res => {
				setCourses(res.data.data)
				setCoursesTotal(res.data.total)
			})
			.finally(() => setLoading(false))
	}, [fetch])

	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl flex flex-col gap-y-5'>
			<div className='w-fit'>
				<UiButton onClick={showDrawer}>Добавить</UiButton>
				<AddCourseDrawer open={open} setOpen={setOpen} />
			</div>
			<Spin spinning={loading}>
				<CoursesTable page={page} setPage={setPage} />
			</Spin>
		</div>
	)
}

export { Courses }
