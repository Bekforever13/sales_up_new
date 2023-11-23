import { createSlice,  } from '@reduxjs/toolkit'
import { ICoursesInitState,  } from './Courses.type'

const initialState: ICoursesInitState = {
	courses: [],
}

const Courses = createSlice({
	name: 'Courses',
	initialState,
	reducers: {
		
	},
})

export const { reducer, actions } = Courses
