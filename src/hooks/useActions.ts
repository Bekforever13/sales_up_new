import { bindActionCreators } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions as auth } from 'src/store/auth/Auth.slice'
import { actions as courses } from 'src/store/courses/Courses.slice'
import { actions as leads } from 'src/store/leads/Leads.slice'
import { actions as sources } from 'src/store/sources/Sources.slice'
import { actions as shared } from 'src/store/shared/Shared.slice'
import { actions as companies } from 'src/store/companies/Companies.slice'
import { actions as users } from 'src/store/users/Users.slice'
import { actions as telegraph } from 'src/store/telegraph/Telegraph.slice'

const rootActions = {
	...auth,
	...courses,
	...sources,
	...leads,
	...shared,
	...companies,
	...users,
	...telegraph
}

export const useActions = () => {
	const dispatch = useDispatch()
	return React.useMemo(
		() => bindActionCreators(rootActions, dispatch),
		[dispatch]
	)
}
