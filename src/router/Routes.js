import Departments from "../pages/Departments"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
]