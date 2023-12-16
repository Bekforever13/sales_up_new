export type TBot = {
	company_id: number
	created_at: string
	id: number
	name: string
	token: string
	updated_at: string
}
export interface ICompany {
	created_at: string
	description: string
	id: number
	is_active: boolean
	lat: number
	lng: number
	phone: string
	telegram_channel: string
	telegraph_bot: TBot
	title: string
	updated_at: string
}

export interface ICompaniesInitState {
	companies: ICompany[]
	companiesTotal: number
}