import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICoursesInitState, TCourse } from './Courses.type'

const initialState: ICoursesInitState = {
	courses: [],
	coursesTotal: 10,
	courseToEdit: null,
}

const Courses = createSlice({
	name: 'Courses',
	initialState,
	reducers: {
		setCourses(state, { payload }: PayloadAction<TCourse[]>) {
			state.courses = payload
		},
		setCoursesTotal(state, { payload }: PayloadAction<number>) {
			state.coursesTotal = payload
		},
		setCourseToEdit(state, { payload }: PayloadAction<TCourse>) {
			state.courseToEdit = payload
		},
	},
})

export const { reducer, actions } = Courses
