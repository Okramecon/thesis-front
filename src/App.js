import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import GlobalAlert from './components/GlobalAlert';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [alertState, setAlertState] = useState({alertOpen: false, message: '', severity: 'success'})
  const { alertOpen, message, severity } = alertState
  const showHideSidebar = (prevVisibleState) => {
    setSidebarVisible(!prevVisibleState);
  }

  return (
    <div className='App'>
      <AppContext.Provider value={setAlertState}>
        <BrowserRouter>
          <Navbar showHideSidebar={showHideSidebar} />

          <Drawer anchor='left' open={sidebarVisible} onClose={showHideSidebar}>
            <Sidebar setSidebarVisible={setSidebarVisible}/>
          </Drawer>

          <div className='main'>
            <Box style={{ flexGrow: 1, display: 'flex' }}>
              <AppRouter/>
              <GlobalAlert 
                alertOpen={alertOpen} 
                closeAlert={() => setAlertState({ ...alertState, alertOpen: false})} 
                message={message} severity={severity}/>
            </Box>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export const AppContext = React.createContext();

export default App;
