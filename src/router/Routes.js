import DepartmentIdPage from "../pages/DepartmentIdPage"
import Departments from "../pages/Departments"
import LoginPage from "../pages/LoginPage"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
    {path: 'departments/:id', element: (<DepartmentIdPage/>), exact: true},
    {path: 'login', element: (<LoginPage/>), exact: true}
]