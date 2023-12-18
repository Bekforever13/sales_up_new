import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILeadsInitState, TLeads, TLeadsForm } from './Leads.types'

const initialState: ILeadsInitState = {
	leads: [],
	leadsTotal: 10,
	leadsToEdit: null,
	leadsDrawer: false,
}

const LeadsSlice = createSlice({
	name: 'LeadsSlice',
	initialState,
	reducers: {
		setLeads: (state, { payload }: PayloadAction<TLeads[]>) => {
			state.leads = payload
		},
		setLeadsTotal: (state, { payload }: PayloadAction<number>) => {
			state.leadsTotal = payload
		},
		setLeadsDrawer: (state, { payload }: PayloadAction<boolean>) => {
			state.leadsDrawer = payload
		},
		setLeadsToEdit: (state, { payload }: PayloadAction<TLeadsForm>) => {
			state.leadsToEdit = payload
		},
	},
})

export const { reducer, actions } = LeadsSlice
