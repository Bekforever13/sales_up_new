import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	statuses: [],
	courses: {},
}

export const HomeSlice = createSlice({
	name: 'HomeSlice',
	initialState,
	reducers: {
		setStatuses: (state, { payload }: PayloadAction<any>) => {
			state.statuses = payload
		},
		setCourses: (state, { payload }: PayloadAction<any>) => {
			state.courses = payload
		},
	},
})

export const { reducer, actions } = HomeSlice
