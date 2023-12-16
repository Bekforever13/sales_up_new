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
	usersTotal: number
	userToEdit: TUser | null
}