export type TTelegramLeads = {
	comment: string
	id: number
	link: string | null
	first_name: string
	last_name: string
	phone: string | null
	status: string
	telegram_id: string
}

export interface ITelegramLeadsInitState {
	telegraphLeads: TTelegramLeads[]
	telegraphLeadsTotal: number
	telegramChatID: number
	telegramChatDrawer: boolean
}
