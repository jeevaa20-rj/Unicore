import React, { useState } from 'react';
import axios from "axios";
import Sidebar from './components/dashboard/Sidebar';
import TopNavbar from './components/dashboard/TopNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import LostItemsDashboard from './pages/LostItemsDashboard';
import MarketplaceDashboard from './pages/MarketplaceDashboard';
import SettingsDashboard from './pages/SettingsDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  // தொடக்கத்தில் பயனருக்கு 'Login' பக்கம் காண்பிக்கப்படும்.
  const [currentTab, setCurrentTab] = useState('Login');

  // 1. அங்கீகாரப் பக்கங்களை நிர்வகித்தல் (Auth flow)
  if (currentTab === 'Login') {
    return <Login onNavigate={(target) => setCurrentTab(target)} />;
  }
  if (currentTab === 'Register') {
    return <Register onNavigate={(target) => setCurrentTab(target)} />;
  }

  // 2. உள்நுழைந்த பின் டேஷ்போர்டு பகுதிகளை நிர்வகித்தல் (Dashboard flow)
  const renderMainContent = () => {
    switch (currentTab) {
      case 'Dashboard': return <AdminDashboard />;
      case 'Marketplace': return <MarketplaceDashboard />;
      case 'Lost Items': return <LostItemsDashboard />;
      case 'Settings': return <SettingsDashboard />;
      default:
        return <div className="p-5 text-center fw-bold">Page Under Construction</div>;
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex text-dark bg-light overflow-hidden">
      {/* இடதுபுற மெனு பட்டி (Sidebar) */}
      <div className="flex-shrink-0" style={{ width: '260px' }}>
        <Sidebar 
          currentTab={currentTab === 'Dashboard' ? 'Dashboard' : currentTab} 
          setCurrentTab={(tab) => setCurrentTab(tab)} 
        />
      </div>
      
      {/* முதன்மைப் பகுதி (TopNavbar + Content) */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <TopNavbar />
        <div className="p-4 position-relative">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;