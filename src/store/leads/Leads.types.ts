export type TLeads = {
	comment: string
	id: number
	link: string | null
	first_name: string
	last_name: string
	phone: string | null
	status: string
	telegram_id: string
}

export type TLeadsForm = {
	id?: number
	first_name: string
	last_name: string
	phone: string
	comment: string
}

export interface ILeadsInitState {
	leads: TLeads[]
	leadsToEdit: TLeadsForm | null
	leadsDrawer: boolean
	leadsTotal: number
}
