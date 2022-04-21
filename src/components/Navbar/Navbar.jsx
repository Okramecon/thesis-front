import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountPopup from './AccountPopup';
import { Drawer, Link, List } from '@mui/material';
import RegisterModal from '../Register/RegisterModal';
import Sidebar from 'components/Sidebar';
import LoginModal from 'components/Login/LoginModal';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const showHideSidebar = (prevVisibleState) => {
    setSidebarVisible(!prevVisibleState);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      var expires = new Date(localStorage.getItem('expires'))
      var current = new Date()
      if(expires < current) {
        localStorage.removeItem('bearer');
        localStorage.removeItem('username');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('expires')
        clearInterval(interval)
        setLoggedIn(false)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loggedIn]);

  return (        
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => showHideSidebar()}
          >
            <MenuIcon/>
          </IconButton>
          <Link href='/' variant="body2" color='inherit' underline='none' sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Thesis
            </Typography>
          </Link>
          {
            loggedIn ? (<AccountPopup setLoggedIn={setLoggedIn}/>)
              : (
              <List>
                <LoginModal setLoggedIn={setLoggedIn}/>
                <RegisterModal/>
              </List>
              )
          }
        </Toolbar>

        <Drawer anchor='left' open={sidebarVisible} onClose={showHideSidebar}>
          <Sidebar setSidebarVisible={setSidebarVisible} loggedIn={loggedIn}/>
        </Drawer>
      </AppBar>
    </Box>
  );
}

export default Navbar;