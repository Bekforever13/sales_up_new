import {
	Home,
	Sources,
	Courses,
	Leads,
	Companies,
	Users,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/leads', element: <Leads /> },
	{ path: '/companies', element: <Companies /> },
	{ path: '/courses', element: <Courses /> },
	{ path: '/sources', element: <Sources /> },
	{ path: '/users', element: <Users /> },
]
