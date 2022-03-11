import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import GlobalAlert from './components/GlobalAlert';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [alertState, setAlertState] = useState({loginAlertOpen: false, message: '', severity: 'success'})
  const { loginAlertOpen, message, severity } = alertState
  const showHideSidebar = (prevVisibleState) => {
    setSidebarVisible(!prevVisibleState);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar showHideSidebar={showHideSidebar} />

        <Drawer anchor='left' open={sidebarVisible} onClose={showHideSidebar}>
          <Sidebar setSidebarVisible={setSidebarVisible}/>
        </Drawer>

        <div className='main'>
          <Box style={{ flexGrow: 1, display: 'flex' }}>
            <AppContext.Provider value={setAlertState}>
              <AppRouter/>
            </AppContext.Provider>
            <GlobalAlert 
              loginAlertOpen={loginAlertOpen} 
              closeAlert={() => setAlertState({ ...alertState, loginAlertOpen: false})} 
              message={message} severity={severity}/>
          </Box>
        </div>
      </BrowserRouter>
    </div>
  );
}

export const AppContext = React.createContext();

export default App;
