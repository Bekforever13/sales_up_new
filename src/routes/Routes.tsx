import {
	Home,
	Sources,
	SourceInfo,
	Courses,
	Leads,
	Companies,
	Users,
	EditCompany,
	Tickets,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/leads', element: <Leads /> },
	{ path: '/companies', element: <Companies /> },
	{ path: '/companies/:id', element: <EditCompany /> },
	{ path: '/tickets', element: <Tickets /> },
	{ path: '/courses', element: <Courses /> },
	{ path: '/sources', element: <Sources /> },
	{ path: '/sources/:id', element: <SourceInfo /> },
	{ path: '/users', element: <Users /> },
]
