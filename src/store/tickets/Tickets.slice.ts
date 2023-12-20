import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITicketsInitState, TTicket, TTicketDrawerForm } from './Tickets.types'

const initialState: ITicketsInitState = {
	tickets: [],
	ticketsTotal: 10,
	ticketsToEdit: null,
	ticketsDrawer: false,
}

const TicketsSlice = createSlice({
	name: 'TicketsSlice',
	initialState,
	reducers: {
		setTickets(state, { payload }: PayloadAction<TTicket[]>) {
			state.tickets = payload
		},
		setTicketsTotal(state, { payload }: PayloadAction<number>) {
			state.ticketsTotal = payload
		},
		setTicketsDrawer(state, { payload }: PayloadAction<boolean>) {
			state.ticketsDrawer = payload
		},
		setTicketToEdit(state, { payload }: PayloadAction<TTicketDrawerForm>) {
			state.ticketsToEdit = payload
		},
	},
})

export const { reducer, actions } = TicketsSlice
