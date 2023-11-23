export type TLeads = {
	comment: string
	id: number
	link: string | null
	name: string
	phone: string | null
	status: string
	telegram_id: string
}

export interface ILeadsInitState {
	leads: TLeads[]
	leadsTotal: number
}