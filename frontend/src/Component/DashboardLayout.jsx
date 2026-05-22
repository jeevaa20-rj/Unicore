import React from 'react';
import { Container, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import { Grid, BookOpen, ShoppingBag, HelpCircle, FileText, Settings, LogOut, Search, Bell, Grid3X3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Grid size={18} /> },
  { name: 'Courses', path: '/courses', icon: <BookOpen size={18} /> },
  { name: 'Marketplace', path: '/marketplace', icon: <ShoppingBag size={18} /> },
  { name: 'Lost Items', path: '/lost-items', icon: <HelpCircle size={18} /> },
  { name: 'Notes', path: '/notes', icon: <FileText size={18} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container fluid className="p-0 min-vh-100 d-flex bg-light" style={{ overflowX: 'hidden' }}>
      
      {/* PERSISTENT SIDEBAR */}
      <div className="text-white p-3 d-flex flex-column justify-between position-fixed h-100" style={{ width: '260px', backgroundColor: '#6b3d5c', zIndex: 100 }}>
        <div>
          <div className="mb-5 ps-2">
            <h4 className="fw-bold mb-0">UniCore</h4>
            <small style={{ color: '#c5a3bc', fontSize: '12px' }}>UWU Dashboard</small>
          </div>
          
          <Nav className="flex-column gap-2">
            {sidebarItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Nav.Link 
                  key={idx} 
                  onClick={() => navigate(item.path)}
                  className={`d-flex align-items-center gap-3 text-white px-3 py-2 rounded-2 border-0 ${isActive ? 'bg-white bg-opacity-10 fw-semibold' : 'opacity-75'}`}
                  style={{ cursor: 'pointer' }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Nav.Link>
              );
            })}
          </Nav>
        </div>

        <Nav.Link onClick={() => navigate('/logout')} className="d-flex align-items-center gap-3 text-white px-3 py-2 opacity-75 mt-auto">
          <LogOut size={18} />
          <span>Logout</span>
        </Nav.Link>
      </div>

      {/* DYNAMIC CENTER CONTENT CONTAINER */}
      {/* Note: marginLeft matching sidebar width to prevent content overlap */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '260px', minHeight: '100vh' }}>
        
        {/* PERSISTENT TOP NAVBAR */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <InputGroup style={{ maxWidth: '450px' }} className="shadow-sm rounded">
            <InputGroup.Text className="bg-white border-0 text-muted">
              <Search size={18} />
            </InputGroup.Text>
            <Form.Control 
              placeholder="Search marketplace..." 
              className="border-0 ps-0"
              style={{ boxShadow: 'none' }}
            />
          </InputGroup>
          
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-dark p-1"><Bell size={20} /></Button>
            <Button variant="link" className="text-dark p-1"><Grid3X3 size={20} /></Button>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="rounded-circle border border-2 border-secondary"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* THIS IS WHERE THE DYNAMIC CENTER PAGES WILL DISPLAY */}
        {children}

      </div>
    </Container>
  );
}