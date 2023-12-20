import {
	Home,
	Sources,
	SourceInfo,
	Courses,
	Leads,
	Companies,
	Users,
	EditCompany,
	TelegramLeads,
	Tickets,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/leads', element: <Leads /> },
	{ path: '/telegram_leads', element: <TelegramLeads /> },
	{ path: '/companies', element: <Companies /> },
	{ path: '/companies/:id', element: <EditCompany /> },
	{ path: '/tickets', element: <Tickets /> },
	{ path: '/courses', element: <Courses /> },
	{ path: '/sources', element: <Sources /> },
	{ path: '/sources/:id', element: <SourceInfo /> },
	{ path: '/users', element: <Users /> },
]
