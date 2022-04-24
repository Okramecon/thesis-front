import React from 'react';
import DepartmentsIcon from '@mui/icons-material/CardTravel';
import { Settings } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';

export const SidebarButtons = [
    {
        title: "Departments",
        icon: <DepartmentsIcon />,
        link: "departments"
    },
    {
        title: "Settings",
        icon: <Settings />,
        link: "settings"
    },
    {
        title: "Chats",
        icon: <ChatIcon />,
        link: "chats"
    }
]