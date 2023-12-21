import { TLeadsTable } from 'src/store/leads/Leads.types'

export type LeadTicketProps = {
	lead: TLeadsTable | null
	modal: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type LeadTicketForm = {
	id: number
	quantity: number
}
