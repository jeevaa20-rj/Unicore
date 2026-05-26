import React, { useState } from 'react';

const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', enrollmentNumber: '', universityEmail: '', phoneNumber: '', password: '', confirmPassword: '', agreeTerms: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark">
      <div className="row g-0 w-100 h-100">
        <div className="col-12 col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white" 
             style={{ background: 'linear-gradient(135deg, #0a3d80 0%, #031b3d 100%)' }}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div className="bg-white rounded p-1 text-center text-primary fw-bold d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-mortarboard-fill fs-5 text-primary"></i>
              </div>
              <h4 className="m-0 fw-bold">UniCore</h4>
            </div>
            <small className="text-white-50">Smart Campus Utility Hub for UWU</small>
          </div>
          <div className="my-auto py-5">
            <h1 className="fw-bold mb-3 display-6">Join our academic excellence.</h1>
            <p className="text-white-50">Access your courses, connect with peers, and manage your university life with our unified digital platform.</p>
          </div>
          <div className="text-white-50 small">© 2026 Uva Wellassa University. All rights reserved.</div>
        </div>

        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 overflow-auto h-100 bg-white">
          <div className="w-100" style={{ maxWidth: '500px' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-1">Create Student Account</h2>
              <p className="text-muted small">Please provide your official university details to register.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onNavigate('Dashboard'); }} className="row g-3">
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>First Name</label>
                <div className="input-group"><span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2 small" name="firstName" placeholder="Alex" value={formData.firstName} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>Last Name</label>
                <div className="input-group"><span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2 small" name="lastName" placeholder="Thompson" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>Enrollment Number</label>
                <div className="input-group"><span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-hash"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2 small" name="enrollmentNumber" placeholder="UWU/CST/20/001" value={formData.enrollmentNumber} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>University Email</label>
                <div className="input-group"><span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-envelope"></i></span>
                  <input type="email" className="form-control bg-light border-0 py-2 small" name="universityEmail" placeholder="alex.t@uwu.ac.lk" value={formData.universityEmail} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>Phone Number</label>
                <div className="input-group"><span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-telephone"></i></span>
                  <input type="tel" className="form-control bg-light border-0 py-2 small" name="phoneNumber" placeholder="+94 7X XXX XXXX" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>Password</label>
                <input type="password" className="form-control bg-light border-0 py-2 small" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.65rem' }}>Confirm Password</label>
                <input type="password" className="form-control bg-light border-0 py-2 small" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <div className="col-12 my-2">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                  <label className="form-check-label text-muted small" htmlFor="agreeTerms">I agree to the Terms and Privacy Policy.</label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold border-0 shadow-sm" style={{ backgroundColor: '#0a3d80', borderRadius: '8px' }}>Create Account →</button>
              </div>
              <div className="col-12 text-center mt-3">
                <span className="text-muted small">Already have an account? </span>
                <button type="button" onClick={() => onNavigate('Login')} className="btn btn-link p-0 small fw-bold text-decoration-none ms-1">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;