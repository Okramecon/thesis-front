import DepartmentIdPage from "../pages/DepartmentIdPage"
import Departments from "../pages/Departments"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
    {path: 'departments/:id', element: (<DepartmentIdPage/>), exact: true}
]