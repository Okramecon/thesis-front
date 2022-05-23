import TestPage from "pages/TestPage"
import EmailTokenHandlerPage from "pages/EmailTokenHandlerPage"
import SuccessfullRegistrationPage from "pages/SuccessfullRegistrationPage"
import DepartmentIdPage from "../pages/DepartmentIdPage"
import Departments from "../pages/Departments"
import ProjectsPage from "../pages/ProjectsPage"
import ChatsPage from "../pages/ChatsPage";
import ProjectIdPage from "../pages/ProjectIdPage";
import NotFoundPage from "pages/NotFoundPage"

export const privateRoutes = [

]

export const publicRoutes = [
    {path: 'departments', element: (<Departments/>), exact: true},
    {path: 'departments/:departmentId', element: (<DepartmentIdPage/>), exact: true},
    {path: 'departments/:departmentId/Projects', element: (<ProjectsPage/>), exact: true},
    {path: 'successRegistration', element: (<SuccessfullRegistrationPage/>), exact: true},
    {path: 'token/:token', element: (<EmailTokenHandlerPage/>), exact: true},
    {path: 'test', element: (<TestPage/>), exact: true},
    {path: 'project/:projectId', element: (<ProjectIdPage/>), exact: true},
    {path: 'chats', element: (<ChatsPage/>), exact: true},
    {path: '*', element: (<NotFoundPage/>), exact: true}

]