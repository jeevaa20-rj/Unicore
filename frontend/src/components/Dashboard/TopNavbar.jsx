import React from 'react'

const TopNavbar = () => {
  return (
   <nav className="navbar navbar-expand bg-white border-bottom px-4 py-2 sticky-top">
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        
        {/* Search Bar Input */}
        <div className="position-relative w-50" style={{ maxWidth: '400px' }}>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
          <input type="text" className="form-control border-0 bg-light ps-5 py-2" placeholder="Search administrative records..." style={{ borderRadius: '8px', fontSize: '0.9rem' }} />
        </div>

        {/* Right Admin Interface Actions */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light rounded-circle p-2"><i className="bi bi-bell"></i></button>
          <button className="btn btn-light rounded-circle p-2"><i className="bi bi-grid-3x3-gap"></i></button>
          <div className="vr text-muted opacity-25 mx-2"></div>
          
          <div className="d-flex align-items-center gap-2">
            <div className="text-end">
              <h6 className="m-0 fw-bold small">Admin User</h6>
              <span className="text-muted fw-semibold" style={{ fontSize: '0.65rem' }}>SYSTEM ADMINISTRATOR</span>
            </div>
            <div className="bg-info rounded-circle text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}><i className="bi bi-person"></i></div>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default TopNavbar;