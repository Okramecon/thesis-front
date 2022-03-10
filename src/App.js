import { Drawer } from '@mui/material';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const showHideSidebar = (prevVisibleState) => {
    setSidebarVisible(!prevVisibleState);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar showHideSidebar={showHideSidebar} />
        <div className='main'>
          <Drawer
            anchor='left'
            open={sidebarVisible}
            onClose={showHideSidebar}
          >
            <Sidebar setSidebarVisible={setSidebarVisible}/>
          </Drawer>
          <AppRouter/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
