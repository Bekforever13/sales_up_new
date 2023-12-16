import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICompany, ICompaniesInitState } from './Companies.types'

const initialState: ICompaniesInitState = {
	companies: [],
	companiesTotal: 10,
}

const CompaniesSlice = createSlice({
	name: 'CompaniesSlice',
	initialState,
	reducers: {
		setCompanies: (state, { payload }: PayloadAction<ICompany[]>) => {
			state.companies = payload
		},
		setCompaniesTotal: (state, { payload }: PayloadAction<number>) => {
			state.companiesTotal = payload
		},
	},
})

export const { reducer, actions } = CompaniesSlice
