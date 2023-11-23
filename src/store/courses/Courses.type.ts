export type TCourse = {
	clicked: number
	description: string
	id: number
	leads_count: number
	price: string
	title: string
}

export interface ICoursesInitState {
	courses: TCourse[]
}
