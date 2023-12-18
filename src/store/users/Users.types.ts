export type TUser = {
	id: number
	name: string
	phone: string
	role_id: number
	role_name: string
	default_company_id: number
}

export interface IUsersInitState {
	users: TUser[]
	userDrawer: boolean
	usersTotal: number
	userToEdit: TDrawerForm | null
}

export type TDrawerForm = {
	id?: number
	name: string
	phone: string
	password: string
	role_id: number
}