export type TSettingStatus = {
	id: string
	name: string
}

export type TSettingBot = {
	chat_id: string
	contact: string
	date: string
	id: number
	token: string
	username: string
}

export interface ISettingInitState {
	statuses: TSettingStatus[]
	bot: TSettingBot | null
}