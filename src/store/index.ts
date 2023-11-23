import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { reducer as auth } from './auth/Auth.slice'
import { reducer as courses } from './courses/Courses.slice'
import { reducer as home } from './home/Home.slice'
import { reducer as leads } from './leads/Leads.slice'
import { reducer as orders } from './orders/Orders.slice'
import { reducer as settings } from './settings/Settings.slice'
import { reducer as sources } from './sources/Sources.slice'
import { reducer as tools } from './tools/Tools.slice'
import { reducer as shared } from './shared/Shared.slice'

const reducers = combineReducers({
	auth,
	courses,
	home,
	leads,
	orders,
	settings,
	sources,
	tools,
	shared,
})

export const store = configureStore({
	reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
