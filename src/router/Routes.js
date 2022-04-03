import TaskBoardPage from "pages/TaskBoardPage"
import TestPage from "pages/TestPage"
import DepartmentIdPage from "../pages/DepartmentIdPage"
import Departments from "../pages/Departments"
import LoginPage from "../pages/LoginPage"
import ProjectsPage from "../pages/ProjectsPage"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
    {path: 'departments/:id', element: (<DepartmentIdPage/>), exact: true},
    {path: 'departments/:id/projects', element: (<ProjectsPage/>), exact: true},
    {path: 'test', element: (<TestPage/>), exact: true},
    {path: 'login', element: (<LoginPage/>), exact: true},
    {path: 'project/:id/taskboard', element: (<TaskBoardPage/>), exact: true}
]