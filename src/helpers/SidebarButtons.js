import React from 'react';
import DepartmentsIcon from '@mui/icons-material/CardTravel';
import { Settings } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const SidebarButtons = {
  WithLogin: [
    {
      title: "Departments",
      icon: <DepartmentsIcon />,
      link: "departments"
    },
    {
      title: "Chats",
      icon: <ChatIcon />,
      link: "chats"
    },
  ],
  WithoutLogin: [
    {
      title: "Settings",
      icon: <Settings />,
      link: "settings"
    },
    {
      title: "Mail",
      icon: <InboxIcon />,
      link: "mail"
    }
  ]
}