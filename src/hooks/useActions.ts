import { bindActionCreators } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions as auth } from 'src/store/auth/Auth.slice'
import { actions as courses } from 'src/store/courses/Courses.slice'
import { actions as home } from 'src/store/home/Home.slice'
import { actions as leads } from 'src/store/leads/Leads.slice'
import { actions as orders } from 'src/store/orders/Orders.slice'
import { actions as settings } from 'src/store/settings/Settings.slice'
import { actions as sources } from 'src/store/sources/Sources.slice'
import { actions as tools } from 'src/store/tools/Tools.slice'
import { actions as shared } from 'src/store/shared/Shared.slice'

const rootActions = {
	...auth,
	...courses,
	...sources,
	...home,
	...leads,
	...orders,
	...settings,
	...tools,
	...shared,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return React.useMemo(
		() => bindActionCreators(rootActions, dispatch),
		[dispatch]
	)
}
