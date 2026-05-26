import React from 'react';

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'bi-grid-1x2' },
    { name: 'Peer Learning Session', icon: 'bi-mortarboard' },
    { name: 'Marketplace', icon: 'bi-shop' },
    { name: 'Lost Items', icon: 'bi-search' }, // Matches "Lost & Found" or "Lost Items"
    { name: 'Notes Sharing', icon: 'bi-file-earmark-text' },
    { name: 'Settings', icon: 'bi-gear-fill' },
  ];

  return (
    <div className="d-flex flex-column h-100 text-white p-3 justify-content-between" style={{ backgroundColor: '#5c2d53' }}>
      <div>
        {/* Brand Logo Header */}
        <div className="d-flex align-items-center gap-2 mb-4 py-2 border-bottom border-secondary border-opacity-25">
          <div className="bg-white rounded p-2 text-center text-dark fw-bold" style={{ width: '40px', height: '40px' }}>UC</div>
          <div>
            <h6 className="m-0 fw-bold">UniCore</h6>
            <small className="text-white-50" style={{ fontSize: '0.75rem' }}>UWU Dashboard</small>
          </div>
        </div>

        {/* Menu Navigation Items */}
        <ul className="nav nav-pills flex-column gap-1">
          {menuItems.map((item, index) => {
            const isActive = currentTab === item.name;
            return (
              <li className="nav-item" key={index}>
                <button 
                  onClick={() => setCurrentTab(item.name)}
                  className={`nav-link text-white text-start d-flex align-items-center gap-3 py-2 px-3 w-100 border-0 ${isActive ? 'active opacity-100' : 'opacity-75'}`} 
                  style={{ 
                    backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent', 
                    borderRadius: '6px' 
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Navigation footer */}
      <div>
        <a href="#" className="nav-link text-white opacity-75 d-flex align-items-center gap-3 py-2 px-3">
          <i className="bi bi-box-arrow-left"></i>
          <span>LogouT</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;