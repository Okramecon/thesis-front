import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { SidebarButtons } from '../helpers/SidebarButtons';

const Sidebar = ({setSidebarVisible}) => {
    const navigate = useNavigate()

    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setSidebarVisible(false)}
        onKeyDown={() => setSidebarVisible(false)}
      >
        <List>
          {SidebarButtons.map(({title, icon, link}) => (
            <ListItem button key={title} onClick={() => navigate(link)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Mail'].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
};


export default Sidebar;