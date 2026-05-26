import React, { useState } from 'react';
import Sidebar from './components/dashboard/Sidebar';
import TopNavbar from './components/dashboard/TopNavbar';

// Page Views
import AdminDashboard from './pages/AdminDashboard';
import LostItemsDashboard from './pages/LostItemsDashboard';
import MarketplaceDashboard from './pages/MarketplaceDashboard';
import SettingsDashboard from './pages/SettingsDashboard';
// Style Dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  // Global State tracking which page to show
  const [currentTab, setCurrentTab] = useState('Dashboard');

  // Conditional function deciding which central view to output
  const renderMainContent = () => {
    switch (currentTab) {
      case 'Dashboard':
        return <AdminDashboard />;
      case 'Lost Items':
        return <LostItemsDashboard />;
      case 'Marketplace':
        return <MarketplaceDashboard />;
      case 'Settings': 
        return <SettingsDashboard />;
      default:
        return (
          <div className="p-5 text-center text-muted">
            <h4>{currentTab} Page View</h4>
            <p>Component interface under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex text-dark bg-light overflow-hidden">
      
      {/* Fixed Left Sidebar - Controlling state globally */}
      <div className="flex-shrink-0" style={{ width: '260px' }}>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      {/* Main Container Content viewport block */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <TopNavbar />
        
        {/* Dynamic Inner page views populate here */}
        <div className="p-4 position-relative">
          {renderMainContent()}
        </div>
      </div>

    </div>
  );
}

export default App;