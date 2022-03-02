import React from 'react';
import DepartmentsIcon from '@mui/icons-material/CardTravel';
import { publicRoutes } from '../router/Routes';

const links = publicRoutes;

export const SidebarButtons = [
    {
        title: "Departments",
        icon: <DepartmentsIcon />,
        link: "departments"
    },
    {
        title: "Departments1",
        icon: <DepartmentsIcon />,
        link: "departments"
    },
    {
        title: "Departments2",
        icon: <DepartmentsIcon />,
        link: "departments"
    },
    {
        title: "Departments3",
        icon: <DepartmentsIcon />,
        link: "departments"
    }
]