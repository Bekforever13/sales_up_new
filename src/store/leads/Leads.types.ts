export type TLeadTicket = {
	id: number
	name: string
	price: number
	quantity: number
	created_at: string
	updated_at: string
}

export type TLeadsTable = {
	comment: string | null
	created_at: string
	first_name: string
	id: number
	last_name: string
	phone: string
	telegraph_chat_id: number
	tickets: TLeadTicket[]
	updated_at: string
}

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
