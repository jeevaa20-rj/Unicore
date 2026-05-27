import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Register = ({ onNavigate }) => { // பக்கங்களை மாற்ற onNavigate சேர்க்கப்பட்டுள்ளது
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    enrollmentNumber: '',
    universityEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [message, setMessage] = useState({ text: '', type: '' }); // அறிவிப்புகளுக்காக
  const [isLoading, setIsLoading] = useState(false);               // லோடிங் நிலைக்காக

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // கிளையண்ட் பக்க கடவுச்சொல் சரிபார்ப்பு
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match!', type: 'danger' });
      return;
    }

    setIsLoading(true);

    try {
      
      const response = await fetch('http://localhost/UniCore/backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage({ text: data.message + " Redirecting to login...", type: 'success' });
        // 2 வினாடிகளுக்குப் பிறகு பயனர் லாகின் பக்கத்திற்கு அழைத்துச் செல்லப்படுவார்
        setTimeout(() => {
          onNavigate('Login');
        }, 2000);
      } else {
        setMessage({ text: data.message, type: 'danger' });
      }
    } catch (err) {
      setMessage({ text: 'Cannot connect to the server. Please check your connection.', type: 'danger' });
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark">
      <div className="row g-0 w-100 h-100">
        
        {/* இடது பக்க பேனல் - பிராண்டிங் */}
        <div className="col-12 col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white position-relative" 
             style={{ 
               background: 'linear-gradient(135deg, #0a3d80 0%, #031b3d 100%)',
               backgroundImage: 'linear-gradient(rgba(10, 61, 128, 0.85), rgba(3, 27, 61, 0.95)), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80")',
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div className="bg-white rounded p-1 text-center text-primary fw-bold d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-mortarboard-fill fs-5 text-primary"></i>
              </div>
              <h4 className="m-0 fw-bold tracking-wide">UniCore</h4>
            </div>
            <small className="text-white-50 d-block" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
              Smart Campus Utility Hub <br /> for Uva Wellassa University of Sri Lanka
            </small>
          </div>

          <div className="my-auto py-5" style={{ maxWidth: '450px' }}>
            <h1 className="fw-bold mb-3 display-6" style={{ lineHeight: '1.3' }}>Join our academic excellence.</h1>
            <p className="text-white-50 mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Access your courses, connect with peers, and manage your university life with our unified digital platform. Designed for the next generation of scholars.
            </p>
            <div className="d-flex gap-4 text-white-50">
              <span className="small d-flex align-items-center gap-2"><i className="bi bi-shield-check text-success"></i> Secure Login</span>
              <span className="small d-flex align-items-center gap-2"><i className="bi bi-cpu text-info"></i> Academic Portal</span>
            </div>
          </div>

          <div className="border-top border-white border-opacity-10 pt-3 text-white-50 d-flex justify-content-between align-items-center" style={{ fontSize: '0.75rem' }}>
            <span>© 2026 Uva Wellassa University. All rights reserved.</span>
            <span className="fw-bold tracking-wider opacity-25" style={{ fontSize: '1.2rem' }}>UNICORE</span>
          </div>
        </div>

        {/* வலது பக்க பேனல் - பதிவுப் படிவம் */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 overflow-auto h-100 bg-white">
          <div className="w-100" style={{ maxWidth: '520px' }}>
            
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.8rem', color: '#031b3d' }}>Create Student Account</h2>
              <p className="text-muted small">Please provide your official university details to register.</p>
            </div>

            {/* வெற்றிகரமான/பிழை அறிவிப்புப் பெட்டி */}
            {message.text && (
              <div className={`alert alert-${message.type} py-2 px-3 small d-flex align-items-center gap-2`} role="alert" style={{ borderRadius: '8px' }}>
                <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}></i>
                <div>{message.text}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              
              <div className="col-12 col-sm-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>First Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2.5 small" name="firstName" placeholder="Alex" value={formData.firstName} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>Last Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2.5 small" name="lastName" placeholder="Thompson" value={formData.lastName} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>Enrollment Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-hash"></i></span>
                  <input type="text" className="form-control bg-light border-0 py-2.5 small" name="enrollmentNumber" placeholder="UWU/CST/20/001" value={formData.enrollmentNumber} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>University Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-envelope"></i></span>
                  <input type="email" className="form-control bg-light border-0 py-2.5 small" name="universityEmail" placeholder="alex.t@uwu.ac.lk" value={formData.universityEmail} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-telephone"></i></span>
                  <input type="tel" className="form-control bg-light border-0 py-2.5 small" name="phoneNumber" placeholder="+94 7X XXX XXXX" value={formData.phoneNumber} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-lock"></i></span>
                  <input type="password" className="form-control bg-light border-0 py-2.5 small" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label text-muted fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-lock-hash"></i></span>
                  <input type="password" className="form-control bg-light border-0 py-2.5 small" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required style={{ borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>

              <div className="col-12 my-3">
                <div className="form-check d-flex align-items-start gap-2">
                  <input className="form-check-input flex-shrink-0" type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required style={{ cursor: 'pointer' }} />
                  <label className="form-check-label text-muted small" htmlFor="agreeTerms" style={{ fontSize: '0.8rem', cursor: 'pointer', userSelect: 'none' }}>
                    I agree to the <a href="#" className="text-primary text-decoration-none fw-medium">Terms of Service</a> and <a href="#" className="text-primary text-decoration-none fw-medium">Privacy Policy</a> of Uva Wellassa University.
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" disabled={isLoading} className="btn btn-primary w-100 py-2.5 fw-semibold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm" 
                        style={{ backgroundColor: '#0a3d80', borderRadius: '8px', fontSize: '0.95rem' }}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>CREATING ACCOUNT...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>

              {/* லாகின் பக்கத்திற்குத் திரும்பும் இணைப்பு */}
              <div className="col-12 text-center mt-4">
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