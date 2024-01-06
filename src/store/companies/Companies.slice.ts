import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	ICompany,
	ICompaniesInitState,
	TCompanyForm,
	TCoordinates,
} from './Companies.types'

const initialState: ICompaniesInitState = {
	companies: [],
	companiesTotal: 10,
	companiesEdit: null,
	companiesDrawer: false,
	companiesCoordinates: { lat: 42.43626, lng: 59.631899 },
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
		setCompaniesDrawer: (state, { payload }: PayloadAction<boolean>) => {
			state.companiesDrawer = payload
		},
		setCompaniesEdit: (state, { payload }: PayloadAction<TCompanyForm>) => {
			state.companiesEdit = payload
		},
		setCompaniesCoordinates: (
			state,
			{ payload }: PayloadAction<TCoordinates>
		) => {
			state.companiesCoordinates = payload
		},
	},
})

export const { reducer, actions } = CompaniesSlice
