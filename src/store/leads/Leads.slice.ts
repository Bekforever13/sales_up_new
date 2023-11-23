import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILeadsInitState, TLeads } from './Leads.types'

const initialState: ILeadsInitState = {
	leads: [],
	leadsTotal: 10,
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
		changeStatus: (state, { payload }: PayloadAction<any>) => {
			state.leads = payload
		},
	},
})

export const { reducer, actions } = LeadsSlice
