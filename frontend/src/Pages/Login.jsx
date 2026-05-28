import React, { useState } from "react";

// 🔥 UPDATED: Added onLoginSuccess to props
const Login = ({ onNavigate, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(""); // பிழைச் செய்திகளைச் சேமிக்க
  const [isLoading, setIsLoading] = useState(false); // லோடிங் அனிமேஷனுக்காக

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // உங்கள் XAMPP / WAMP சர்வரில் உள்ள login.php இன் சரியான பாதை
      const response = await fetch(
        "http://localhost/UniCore/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        },
      );

      // SAFE JSON parsing (prevents crash)
      const text = await response.text();
      const data = JSON.parse(text);

      if (data.status === "success") {
        // 🔥 UPDATED FOR ROLE-BASED NAVIGATION
        // App.jsx இல் உள்ள ஆன்-லாகின் செயல்பாட்டிற்கு மின்னஞ்சலை அனுப்புகிறோம்
        if (onLoginSuccess) {
          onLoginSuccess(credentials.email);
        } else {
          onNavigate("Dashboard");
        }
      } else {
        // சர்வரில் இருந்து வரும் பிழைச் செய்தியைக் காட்ட (எ.கா: Invalid Email or Password)
        setError(data.message);
      }
    } catch (err) {
      setError("சர்வர் உடன் இணைக்க முடியவில்லை. இணைய இணைப்பைச் சோதிக்கவும்.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark">
      <div className="row g-0 w-100 h-100">
        {/* இடது பக்க பேனல் - பிராண்டிங் (UWU Hub) */}
        <div
          className="col-12 col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white"
          style={{
            background: "linear-gradient(135deg, #5c2d53 0%, #2b1326 100%)",
          }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div
                className="bg-white rounded p-1 text-center fw-bold d-flex align-items-center justify-content-center"
                style={{ width: "35px", height: "35px" }}
              >
                <i
                  className="bi bi-mortarboard-fill fs-5"
                  style={{ color: "#5c2d53" }}
                ></i>
              </div>
              <h4 className="m-0 fw-bold">UniCore</h4>
            </div>
            <small className="text-white-50">UWU Dashboard Hub</small>
          </div>
          <div className="my-auto py-5" style={{ maxWidth: "450px" }}>
            <h1 className="fw-bold mb-3 display-6">
              Empowering Academic Excellence
            </h1>
            <p className="text-white-50">
              Join the central hub for Uva Wellassa University students.
              Collaborative learning, resource management, and campus insights
              all in one place.
            </p>
            <div className="d-flex gap-4 text-white-50 mt-4">
              <span className="small d-flex align-items-center gap-2">
                <i className="bi bi-people-fill text-warning"></i> PEER LEARNING
              </span>
              <span className="small d-flex align-items-center gap-2">
                <i className="bi bi-book-half text-info"></i> COURSE HUB
              </span>
            </div>
          </div>
          <div className="text-white-50 small">
            © 2026 Uva Wellassa University. All rights reserved.
          </div>
        </div>

        {/* வலது பக்க பேனல் - லாகின் படிவம் */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
          <div className="w-100" style={{ maxWidth: "420px" }}>
            <div className="text-center text-md-start mb-4">
              <div className="d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start">
                <div
                  className="p-1 rounded text-white d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#5c2d53",
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <i className="bi bi-layers-half small"></i>
                </div>
                <h6
                  className="m-0 fw-bold text-uppercase tracking-wider"
                  style={{ color: "#5c2d53", fontSize: "0.85rem" }}
                >
                  UniCore{" "}
                  <span className="text-muted fw-normal"> Dashboard</span>
                </h6>
              </div>
              <h2 className="fw-bold text-dark m-0">Welcome back</h2>
              <p className="text-muted small mt-1">
                Access your academic portal and stay connected.
              </p>
            </div>

            {/* Bootstrap பிழை அறிவிப்புப் பெட்டி (Error Alert Box) */}
            {error && (
              <div
                className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2"
                role="alert"
                style={{ borderRadius: "8px" }}
              >
                <i className="bi bi-exclamation-triangle-fill"></i>
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="email"
                    placeholder="alex@uwu.ac.lk"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0 8px 8px 0" }}
                  />
                </div>
              </div>
              <div>
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0 8px 8px 0" }}
                  />
                </div>
              </div>
              <div
                className="d-flex justify-content-between align-items-center my-1"
                style={{ fontSize: "0.8rem" }}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={credentials.rememberMe}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label text-muted"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "#5c2d53" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* லோடிங் நிலையைப் பொறுத்து மாறும் சப்மிட் பொத்தான் */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn text-white w-100 py-2.5 fw-semibold border-0 shadow-sm mt-2"
                style={{ backgroundColor: "#5c2d53", borderRadius: "8px" }}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    VERIFYING...
                  </>
                ) : (
                  <>
                    SIGN IN <i className="bi bi-arrow-right ms-1"></i>
                  </>
                )}
              </button>

              <div className="text-center mt-3">
                <span className="text-muted small">
                  Don't have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("Register")}
                  className="btn btn-link p-0 small fw-bold text-decoration-none ms-1"
                  style={{ color: "#5c2d53" }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
