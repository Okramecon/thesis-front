import { Box } from '@mui/material';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import GlobalAlert from './components/GlobalAlert';
import Navbar from './components/Navbar/Navbar';
import './styles/App.css';

function App() {
  const [alertState, setAlertState] = useState({alertOpen: false, message: '', severity: 'success'})
  const { alertOpen, message, severity } = alertState

  return (
    <div className='App'>
      <AppContext.Provider value={setAlertState}>
        <BrowserRouter>
          <Navbar/>
          <div className='main'>
            <Box style={{ flexGrow: 1, display: 'flex', paddingLeft: '40px', paddingRight: '40px', paddingTop: '20px', paddingBottom: '20px' }}>
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
