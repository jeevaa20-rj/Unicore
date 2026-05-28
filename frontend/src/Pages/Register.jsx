import React, { useState } from "react";

const Register = ({ onNavigate, onRegisterSuccess }) => {
  // பயனர் வகையை நிர்வகிக்க (Student அல்லது Staff)
  const [role, setRole] = useState("student");

  // கடவுச்சொல் தெரிவுநிலையைக் கையாள (Password Visibility Toggle)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // படிவத் தரவுகள்
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    enrollmentNumber: "",
    staffId: "",
    universityEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // பிரத்தியேக தீம் வண்ணக் குறியீடு
  const themeColor = "#714267";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwd = formData.password;

    // 1. பாஸ்வேர்ட் அடிப்படை விதிகள் சரிபார்ப்பு (Length, Letter, Number, Symbol)
    const lengthCheck = pwd.length >= 8;
    const letterCheck = /[a-zA-Z]/.test(pwd);
    const numberCheck = /[0-9]/.test(pwd);
    const symbolCheck = /[^a-zA-Z0-9]/.test(pwd);

    if (!lengthCheck || !letterCheck || !numberCheck || !symbolCheck) {
      alert(
        "Password must be at least 8 characters long and contain letters, numbers, and symbols.",
      );
      return;
    }

    // 2. தொடர்ச்சியான எண்கள்/எழுத்துக்கள் உள்ளதா எனச் சரிபார்த்தல் (e.g., 123, abc, 789)
    for (let i = 0; i < pwd.length - 2; i++) {
      const char1 = pwd.charCodeAt(i);
      const char2 = pwd.charCodeAt(i + 1);
      const char3 = pwd.charCodeAt(i + 2);

      // வரிசையாக ஏறும் (+1) அல்லது இறங்கும் (-1) எண்கள்/எழுத்துக்களைத் தடுத்தல்
      if (
        (char2 === char1 + 1 && char3 === char2 + 1) ||
        (char2 === char1 - 1 && char3 === char2 - 1)
      ) {
        alert(
          "Password cannot contain sequential numbers or letters (like '123' or 'abc').",
        );
        return;
      }
    }

    // 3. பாஸ்வேர்ட் ஒப்பிட்டுச் சரிபார்த்தல்
    if (pwd !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 4. API-க்கு அனுப்பத் தயார் செய்யப்பட்ட தரவுகள் (Payload)
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      roleType: role,
      enrollmentNumber: role === "student" ? formData.enrollmentNumber : "",
      staffId: role === "staff" ? formData.staffId : "",
      universityEmail: formData.universityEmail,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    try {
      // உங்களின் பின்தள PHP முகவரியை (signup.php) இங்கே இணைக்கவும்
      const apiUrl = `${import.meta.env.VITE_API_URL}/signup.php`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === "success") {
        const registeredEmail = formData.universityEmail.trim().toLowerCase();
        if (onRegisterSuccess) {
          onRegisterSuccess(registeredEmail);
        } else {
          onNavigate("OtpVerification");
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark">
      <div className="row g-0 w-100 h-100">
        {/* இடதுபுற பிராண்டிங் பேனர் பகுதி */}
        <div
          className="col-12 col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white"
          style={{
            background: `linear-gradient(135deg, ${themeColor} 0%, #3a1634 100%)`,
            backgroundImage: `linear-gradient(to bottom, rgba(113, 66, 103, 0.85), rgba(58, 22, 52, 0.95)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                  style={{ color: themeColor }}
                ></i>
              </div>
              <h4 className="m-0 fw-bold">UniCore</h4>
            </div>
            <small className="text-white-50">
              Smart Campus Utility Hub for UWU
            </small>
          </div>

          <div className="my-auto py-5">
            <h1 className="fw-bold mb-3 display-5 lh-sm">
              Join our academic
              <br />
              excellence.
            </h1>
            <p className="text-white-50" style={{ maxWidth: "480px" }}>
              Access your courses, connect with peers, and manage your
              university life with our unified digital platform. Designed for
              the next generation of scholars.
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center text-white-50 small">
            <span>© 2026 Uva Wellassa University. All rights reserved.</span>
            <span className="fw-bold tracking-wider opacity-50">UNICORE</span>
          </div>
        </div>

        {/* வலதுபுற படிவப் பகுதி */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 overflow-auto h-100 bg-white">
          <div className="w-100" style={{ maxWidth: "520px" }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-1">Create Account</h2>
              <p className="text-muted small">
                Select your role and provide your official details to register.
              </p>
            </div>

            {/* இரண்டு தேர்வுக் கட்டங்கள் (Student / Staff Role Boxes) */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <div
                  className="p-3 border text-center position-relative"
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    borderColor: role === "student" ? themeColor : "#dee2e6",
                    backgroundColor: role === "student" ? "#fdf8fc" : "#ffffff",
                    boxShadow:
                      role === "student" ? `0 0 0 1px ${themeColor}` : "none",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setRole("student")}
                >
                  <i
                    className={`bi bi-mortarboard fs-3 d-block mb-1 ${role === "student" ? "text-dark fw-bold" : "text-muted"}`}
                  ></i>
                  <span
                    className={`small fw-semibold ${role === "student" ? "text-dark" : "text-muted"}`}
                  >
                    Student
                  </span>
                  {role === "student" && (
                    <i
                      className="bi bi-check-circle-fill position-absolute"
                      style={{
                        top: "8px",
                        right: "8px",
                        color: themeColor,
                        fontSize: "0.85rem",
                      }}
                    ></i>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div
                  className="p-3 border text-center position-relative"
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    borderColor: role === "staff" ? themeColor : "#dee2e6",
                    backgroundColor: role === "staff" ? "#fdf8fc" : "#ffffff",
                    boxShadow:
                      role === "staff" ? `0 0 0 1px ${themeColor}` : "none",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setRole("staff")}
                >
                  <i
                    className={`bi bi-person-workspace fs-3 d-block mb-1 ${role === "staff" ? "text-dark fw-bold" : "text-muted"}`}
                  ></i>
                  <span
                    className={`small fw-semibold ${role === "staff" ? "text-dark" : "text-muted"}`}
                  >
                    Staff Member
                  </span>
                  {role === "staff" && (
                    <i
                      className="bi bi-check-circle-fill position-absolute"
                      style={{
                        top: "8px",
                        right: "8px",
                        color: themeColor,
                        fontSize: "0.85rem",
                      }}
                    ></i>
                  )}
                </div>
              </div>
            </div>

            {/* முதன்மைப் படிவம் */}
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-6">
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  First Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="firstName"
                    placeholder="Alex"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Last Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="lastName"
                    placeholder="Thompson"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* மாறும் அடையாள உள்ளீட்டுப் புலம் (Dynamic Logic) */}
              {role === "student" ? (
                <div className="col-12">
                  <label
                    className="form-label text-muted fw-bold small text-uppercase"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Enrollment Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted">
                      <i className="bi bi-hash"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2.5 small"
                      name="enrollmentNumber"
                      placeholder="UWU/CST/20/001"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0 8px 8px 0" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <label
                    className="form-label text-muted fw-bold small text-uppercase"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Staff ID
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted">
                      <i className="bi bi-id-card"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2.5 small"
                      name="staffId"
                      placeholder="UWU/STAFF/042"
                      value={formData.staffId}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0 8px 8px 0" }}
                    />
                  </div>
                </div>
              )}

              <div className="col-12">
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  University Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="universityEmail"
                    placeholder="alex.t@uwu.ac.lk"
                    value={formData.universityEmail}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0 8px 8px 0" }}
                  />
                </div>
              </div>

              <div className="col-12">
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control bg-light border-0 py-2.5 small"
                    name="phoneNumber"
                    placeholder="+94 7X XXX XXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0 8px 8px 0" }}
                  />
                </div>
              </div>

              {/* Password Input with Visibility Toggle (கண் ஐகான்) */}
              <div className="col-6">
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
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light border-0 py-2.5 small"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text bg-light border-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer", borderRadius: "0 8px 8px 0" }}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                    ></i>
                  </span>
                </div>
              </div>

              {/* Confirm Password Input with Visibility Toggle (கண் ஐகான்) */}
              <div className="col-6">
                <label
                  className="form-label text-muted fw-bold small text-uppercase"
                  style={{ fontSize: "0.65rem" }}
                >
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control bg-light border-0 py-2.5 small"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text bg-light border-0 text-muted"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer", borderRadius: "0 8px 8px 0" }}
                  >
                    <i
                      className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                    ></i>
                  </span>
                </div>
              </div>

              <div className="col-12 my-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label
                    className="form-check-label text-muted small"
                    htmlFor="agreeTerms"
                    style={{ fontSize: "0.78rem" }}
                  >
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn text-white w-100 py-2.5 fw-semibold border-0 shadow-sm"
                  style={{
                    backgroundColor: themeColor,
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                  }}
                >
                  Create Account <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>

              <div className="col-12 text-center mt-3">
                <span className="text-muted small">
                  Already have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("Login")}
                  className="btn btn-link p-0 small fw-bold text-decoration-none ms-1"
                  style={{ color: themeColor }}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
