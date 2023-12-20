export type TTicket = {
	id: number
	name: string
	price: string
	created_at: string
	updated_at: string
}

export type TTicketDrawerForm = {
	id?: number
	name: string
	price: string
}

export interface ITicketsInitState {
	tickets: TTicket[]
	ticketsDrawer: boolean
	ticketsTotal: number
	ticketsToEdit: TTicketDrawerForm | null
}
