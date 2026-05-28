import React, { useState } from "react";

const OtpVerify = ({ email, onVerificationSuccess, onNavigate }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/verify-otp.php`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: otp }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setMessage({
          text: "OTP Verified Successfully! Account Created.",
          type: "success",
        });
        setTimeout(() => {
          onVerificationSuccess(); // லாகின் பக்கத்திற்கு அழைத்துச் செல்ல
        }, 2000);
      } else {
        setMessage({ text: data.message, type: "danger" });
      }
    } catch (err) {
      setMessage({
        text: "Connection failed. Please try again.",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex overflow-hidden bg-white text-dark align-items-center justify-content-center">
      <div
        className="w-100 p-4 p-md-5"
        style={{
          maxWidth: "450px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          borderRadius: "12px",
        }}
      >
        <div className="text-center mb-4">
          <div
            className="p-3 bg-light rounded-circle d-inline-block mb-3 text-primary"
            style={{ width: "60px", height: "60px" }}
          >
            <i
              className="bi bi-shield-lock-fill fs-3"
              style={{ color: "#0a3d80" }}
            ></i>
          </div>
          <h3 className="fw-bold" style={{ color: "#031b3d" }}>
            Enter OTP Code
          </h3>
          <p className="text-muted small">
            We have sent a 6-digit verification code to <br />
            <strong>{email}</strong>
          </p>
        </div>

        {message.text && (
          <div
            className={`alert alert-${message.type} py-2 px-3 small text-center mb-3`}
            role="alert"
            style={{ borderRadius: "8px" }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <input
              type="text"
              className="form-control bg-light border-0 py-2.5 text-center fw-bold fs-4 tracking-widest"
              maxLength="6"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-100 py-2.5 fw-semibold border-0"
            style={{ backgroundColor: "#0a3d80", borderRadius: "8px" }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                VERIFYING...
              </>
            ) : (
              "Verify & Create Account"
            )}
          </button>

          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => onNavigate("Register")}
              className="btn btn-link p-0 small text-decoration-none text-muted"
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
