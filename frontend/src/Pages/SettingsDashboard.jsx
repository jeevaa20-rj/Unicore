import React, { useState } from 'react';

const SettingsDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold m-0" style={{ fontSize: '1.8rem' }}>Profile Management</h2>
        <p className="text-muted small m-0">Manage your student identity and account security settings.</p>
      </div>
      <div className="row g-4">
        <div className="col-12 col-xl-8 d-flex flex-column gap-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
            <div className="d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start">
              <div className="position-relative">
                <div className="bg-light overflow-hidden d-flex align-items-center justify-content-center" style={{ width: '130px', height: '130px', borderRadius: '12px', border: '1px solid #eee' }}>
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" alt="Profile" className="w-100 h-100 object-fit-cover" />
                </div>
                <button className="btn text-white position-absolute bottom-0 end-0 m-1 p-0 shadow-sm" style={{ backgroundColor: '#b5009b', width: '24px', height: '24px', borderRadius: '6px', border: '2px solid #fff' }}>
                  <i className="bi bi-pencil-fill" style={{ fontSize: '0.65rem' }}></i>
                </button>
              </div>
              <div className="flex-grow-1 w-100">
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Full Name</label>
                    <input type="text" className="form-control bg-light border-0 py-2" defaultValue="Alex Thompson" style={{ borderRadius: '8px' }} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small fw-bold">Index Number</label>
                    <input type="text" className="form-control bg-light border-0 py-2 text-muted" defaultValue="UWU/CST/19/042" readOnly style={{ borderRadius: '8px' }} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold">Bio</label>
                  <textarea className="form-control bg-light border-0 py-2" rows="3" style={{ borderRadius: '8px', fontSize: '0.9rem' }} defaultValue="Computer Science & Technology undergraduate at Uva Wellassa University." />
                </div>
                <div className="text-end">
                  <button className="btn text-white px-4 py-2 fw-medium" style={{ backgroundColor: '#b5009b', borderRadius: '8px' }}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Change Password</h5>
            <div className="mb-3">
              <label className="form-label text-muted small fw-semibold">Current Password</label>
              <input type="password" className="form-control bg-light border-0 py-2" defaultValue="oneseedtwo" style={{ borderRadius: '8px' }} />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted small fw-semibold">New Password</label>
              <input type="password" className="form-control bg-light border-0 py-2" defaultValue="oneseedtwo" style={{ borderRadius: '8px' }} />
            </div>
            <button className="btn btn-dark w-100 py-2 fw-medium btn-sm" style={{ borderRadius: '8px' }}>Update Security</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDashboard;