import React, { useState, useEffect } from "react";

const ForgotPassword = ({ onNavigate }) => {
  // படிவத்தின் நிலையை நிர்வகிக்க: 'request' (மின்னஞ்சல் உள்ளிட), 'reset' (புதிய பாஸ்வேர்ட் மாற்ற)
  const [step, setStep] = useState("request");
  const [token, setToken] = useState("");

  // படிவத் தரவுகள்
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // கடவுச்சொல் தெரிவுநிலை
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ⚠️ பிழைகள் மற்றும் வெற்றிச் செய்திகளைப் பதிய (No Popups - Inline Error Messages)
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const themeColor = "#714267";

  // URL-இல் ஏதேனும் Reset Token உள்ளதா என்று சோதித்தல் (e.g., ?token=abc123xyz)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setStep("reset"); // டோக்கன் இருந்தால் நேரடியாக பாஸ்வேர்ட் மாற்றும் பகுதிக்குச் செல்லும்
    }
  }, []);

  // 1. மின்னஞ்சல் சமர்ப்பிக்கும் பகுதி (Request Reset Link)
  const handleRequestToken = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    const targetEmail = email.toLowerCase().trim();

    // 🎓 பல்கலைக்கழக மின்னஞ்சல் டொமைன் சரிபார்ப்பு (UWU Specific)
    if (
      !targetEmail.endsWith("@std.uwu.ac.lk") &&
      !targetEmail.endsWith("@stf.uwu.ac.lk")
    ) {
      setErrors({
        email:
          "Please enter a valid official university email (@std.uwu.ac.lk or @stf.uwu.ac.lk)",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/unicore_api/forgot_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: targetEmail }),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        setSuccessMessage(result.message);
        setEmail(""); // படிவத்தை சுத்தம் செய்ய
      } else {
        setErrors({ global: result.message });
      }
    } catch (error) {
      setErrors({
        global: "Network connection failed. Please check XAMPP server.",
      });
    } finally {
      setLoading(false);
    }
  };

  // 2. புதிய பாஸ்வேர்டை மாற்றும் பகுதி (Update Password)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    const validationErrors = {};

    // பாஸ்வேர்ட் அடிப்படை விதிகள் சரிபார்ப்பு
    const lengthCheck = password.length >= 8;
    const letterCheck = /[a-zA-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const symbolCheck = /[^a-zA-Z0-9]/.test(password);

    if (!lengthCheck || !letterCheck || !numberCheck || !symbolCheck) {
      validationErrors.password =
        "Must be at least 8 characters long and contain letters, numbers, and symbols.";
    }

    // தொடர்ச்சியான எண்கள்/எழுத்துக்கள் உள்ளதா எனச் சரிபார்த்தல் (e.g., 123, abc)
    if (!validationErrors.password) {
      for (let i = 0; i < password.length - 2; i++) {
        const char1 = password.charCodeAt(i);
        const char2 = password.charCodeAt(i + 1);
        const char3 = password.charCodeAt(i + 2);

        if (
          (char2 === char1 + 1 && char3 === char2 + 1) ||
          (char2 === char1 - 1 && char3 === char2 - 1)
        ) {
          validationErrors.password =
            "Password cannot contain sequential items (like '123' or 'abc').";
          break;
        }
      }
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/unicore_api/reset_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        setSuccessMessage(result.message);
        setTimeout(() => {
          onNavigate("Login"); // 1.5 வினாடிகளுக்குப் பின் லாகின் பக்கத்திற்குச் செல்லும்
        }, 1500);
      } else {
        setErrors({ global: result.message });
      }
    } catch (error) {
      setErrors({
        global: "Network connection failed. Unable to update password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark">
      <div className="row g-0 w-100 h-100">
        {/* 🌟 இடதுபுற பேனர் பகுதி (UniCore Theme) */}
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
              Account Security <br />
              Simplified.
            </h1>
            <p className="text-white-50" style={{ maxWidth: "480px" }}>
              Recover your account access safely using our multi-step
              verification process linked directly with your university email.
            </p>
          </div>

          <div className="text-white-50 small">
            <span>© 2026 Uva Wellassa University. All rights reserved.</span>
          </div>
        </div>

        {/* 🌟 வலதுபுற படிவப் பகுதி */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 overflow-auto h-100 bg-white">
          <div className="w-100" style={{ maxWidth: "450px" }}>
            {/* 🔴 பொதுவான பிழை அறிவிப்புப் பெட்டி */}
            {errors.global && (
              <div
                className="alert alert-danger py-2 small d-flex align-items-center mb-3"
                style={{ fontSize: "0.82rem", borderRadius: "8px" }}
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{errors.global}</div>
              </div>
            )}

            {/* 🟢 பொதுவான வெற்றி அறிவிப்புப் பெட்டி */}
            {successMessage && (
              <div
                className="alert alert-success py-2 small d-flex align-items-center mb-3"
                style={{ fontSize: "0.82rem", borderRadius: "8px" }}
              >
                <i className="bi bi-check-circle-fill me-2"></i>
                <div>{successMessage}</div>
              </div>
            )}

            {/* ---------------- STEP 1: REQUEST LINK FORM ---------------- */}
            {step === "request" && (
              <div>
                <div className="mb-4">
                  <h2 className="fw-bold text-dark mb-1">Forgot Password?</h2>
                  <p className="text-muted small">
                    Enter your university email address and we'll send you a
                    secure link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleRequestToken} className="row g-3">
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
                        className={`form-control bg-light border-0 py-2.5 small ${errors.email ? "is-invalid border border-danger" : ""}`}
                        placeholder="yourname@std.uwu.ac.lk"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors({});
                        }}
                        required
                        disabled={loading}
                        style={{ borderRadius: "0 8px 8px 0" }}
                      />
                    </div>
                    {errors.email && (
                      <div
                        className="text-danger mt-1 small fw-medium"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <i className="bi bi-exclamation-circle-fill me-1"></i>{" "}
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn text-white w-100 py-2.5 fw-semibold border-0 shadow-sm"
                      style={{
                        backgroundColor: themeColor,
                        borderRadius: "8px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}{" "}
                      <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ---------------- STEP 2: RESET PASSWORD FORM ---------------- */}
            {step === "reset" && (
              <div>
                <div className="mb-4">
                  <h2 className="fw-bold text-dark mb-1">Reset Password</h2>
                  <p className="text-muted small">
                    Please create a strong new password that you don't use
                    anywhere else.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="row g-3">
                  {/* New Password Field */}
                  <div className="col-12">
                    <label
                      className="form-label text-muted fw-bold small text-uppercase"
                      style={{ fontSize: "0.65rem" }}
                    >
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0 text-muted">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control bg-light border-0 py-2.5 small ${errors.password ? "border border-danger" : ""}`}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors({});
                        }}
                        required
                        disabled={loading}
                      />
                      <span
                        className="input-group-text bg-light border-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                        ></i>
                      </span>
                    </div>
                    {errors.password && (
                      <div
                        className="text-danger mt-1 small fw-medium"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <i className="bi bi-exclamation-circle-fill me-1"></i>{" "}
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="col-12">
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
                        className={`form-control bg-light border-0 py-2.5 small ${errors.confirmPassword ? "border border-danger" : ""}`}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setErrors({});
                        }}
                        required
                        disabled={loading}
                      />
                      <span
                        className="input-group-text bg-light border-0 text-muted"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          cursor: "pointer",
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        <i
                          className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                        ></i>
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <div
                        className="text-danger mt-1 small fw-medium"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <i className="bi bi-exclamation-circle-fill me-1"></i>{" "}
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn text-white w-100 py-2.5 fw-semibold border-0 shadow-sm"
                      style={{
                        backgroundColor: themeColor,
                        borderRadius: "8px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}{" "}
                      <i className="bi bi-shield-check ms-1"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Back to Login Links */}
            <div className="col-12 text-center mt-4">
              <button
                type="button"
                onClick={() => onNavigate("Login")}
                className="btn btn-link p-0 small fw-bold text-decoration-none ms-1 d-inline-flex align-items-center gap-1"
                style={{ color: themeColor, fontSize: "0.85rem" }}
              >
                <i className="bi bi-arrow-left"></i> Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
