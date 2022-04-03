import TaskBoardPage from "pages/TaskBoardPage"
import TestPage from "pages/TestPage"
import EmailTokenHandlerPage from "pages/EmailTokenHandlerPage"
import SuccessfullRegistrationPage from "pages/SuccessfullRegistrationPage"
import DepartmentIdPage from "../pages/DepartmentIdPage"
import Departments from "../pages/Departments"
import LoginPage from "../pages/LoginPage"
import ProjectsPage from "../pages/ProjectsPage"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
    {path: 'departments/:departmentId', element: (<DepartmentIdPage/>), exact: true},
    {path: 'departments/:departmentId/projects', element: (<ProjectsPage/>), exact: true},
    {path: 'login', element: (<LoginPage/>), exact: true},
    {path: 'successRegistration', element: (<SuccessfullRegistrationPage/>), exact: true},
    {path: 'token/:token', element: (<EmailTokenHandlerPage/>), exact: true},
    {path: 'test', element: (<TestPage/>), exact: true},
    {path: 'project/:projectId/taskboard', element: (<TaskBoardPage/>), exact: true}
]