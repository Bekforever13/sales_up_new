import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { reducer as auth } from './auth/Auth.slice'
import { reducer as courses } from './courses/Courses.slice'
import { reducer as leads } from './leads/Leads.slice'
import { reducer as sources } from './sources/Sources.slice'
import { reducer as shared } from './shared/Shared.slice'
import { reducer as companies } from './companies/Companies.slice'
import { reducer as users } from './users/Users.slice'
import { reducer as telegraph } from './telegraph/Telegraph.slice'
import { reducer as tickets } from './tickets/Tickets.slice'

const reducers = combineReducers({
	auth,
	courses,
	leads,
	sources,
	shared,
	companies,
	users,
	telegraph,
	tickets,
})

export const store = configureStore({
	reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
