import {
	Home,
	Sources,
	Courses,
	Leads,
	Companies,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/leads', element: <Leads /> },
	{ path: '/companies', element: <Companies /> },
	{ path: '/courses', element: <Courses /> },
	{ path: '/sources', element: <Sources /> },
]
