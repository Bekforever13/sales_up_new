export type TOrder = {
	comment: string | null
	course_id: number
	course_title: string
	id: number
	lead_id: number
	lead_name: string
	lead_phone: string
}

export interface IOrdersInitState {
	orders: TOrder[]
	ordersTotal: number
}