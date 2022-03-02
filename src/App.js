import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false);

  const showHideSidebar = () => {
    setSidebarIsVisible(!sidebarIsVisible);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar showHideSidebar={showHideSidebar} />
        <div className='main'>
          {sidebarIsVisible && <Sidebar />}
          <AppRouter/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
