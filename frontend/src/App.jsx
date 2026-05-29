import React, { useState, useEffect } from "react";
import Sidebar from "./components/Dashboard/Sidebar";
import TopNavbar from "./components/Dashboard/TopNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerify";
import AdminDashboard from "./pages/AdminDashboard";
import LostItemsDashboard from "./pages/LostItemsDashboard";
import MarketplaceDashboard from "./pages/MarketplaceDashboard";
import SettingsDashboard from "./pages/SettingsDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [currentTab, setCurrentTab] = useState("Login");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ AUTH CHECK ON APP START
  useEffect(() => {
    fetch("http://localhost/UniCore/backend/api/auth-status.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check:", data);

        if (data.loggedIn) {
          setUserEmail(data.user?.email || "");
          setCurrentTab("Dashboard");
        } else {
          // URL-இல் reset token இருக்கிறதா என்று பார்க்கிறது
          const queryParams = new URLSearchParams(window.location.search);
          if (queryParams.get("token")) {
            setCurrentTab("ForgotPassword");
          } else {
            setCurrentTab("Login");
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Auth error:", err);
        // எரர் வந்தாலும் டோக்கன் இருந்தால் அந்தப் பக்கத்திற்கு அனுப்பும்
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get("token")) {
          setCurrentTab("ForgotPassword");
        } else {
          setCurrentTab("Login");
        }
        setLoading(false);
      });
  }, []);

  // ✅ LOADING SCREEN
  if (loading) {
    return <div className="p-5 text-center fw-bold">Loading...</div>;
  }

  // 🚪 LOGIN SCREEN
  if (currentTab === "Login") {
    return <Login onNavigate={(target) => setCurrentTab(target)} />;
  }

  // 📝 REGISTRATION SCREEN
  if (currentTab === "Register") {
    return (
      <Register
        onNavigate={(target) => setCurrentTab(target)}
        onRegisterSuccess={(email) => {
          setUserEmail(email);
          setCurrentTab("OtpVerification");
        }}
      />
    );
  }

  // 🔒 FORGOT PASSWORD SCREEN (புதிதாக சேர்க்கப்பட்டுள்ளது)
  if (currentTab === "ForgotPassword") {
    return <ForgotPassword onNavigate={(target) => setCurrentTab(target)} />;
  }

  // 🔢 OTP SCREEN
  if (currentTab === "OtpVerification") {
    return (
      <OtpVerification
        email={userEmail}
        onVerificationSuccess={() => setCurrentTab("Login")}
        onNavigate={(target) => setCurrentTab(target)}
      />
    );
  }

  // 🖥️ MAIN CONTENT (DASHBOARD AREA)
  const renderMainContent = () => {
    switch (currentTab) {
      case "Dashboard":
        return <AdminDashboard />;

      case "Marketplace":
        return <MarketplaceDashboard />;

      case "Lost Items":
        return <LostItemsDashboard />;

      case "Settings":
        return <SettingsDashboard />;

      default:
        return (
          <div className="p-5 text-center fw-bold text-muted">
            <i className="bi bi-exclamation-triangle fs-1 d-block mb-2"></i>
            Page Under Construction
          </div>
        );
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex text-dark bg-light overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0" style={{ width: "260px" }}>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      {/* Main Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <TopNavbar />
        <div className="p-4 position-relative">{renderMainContent()}</div>
      </div>
    </div>
  );
}

export default App;
