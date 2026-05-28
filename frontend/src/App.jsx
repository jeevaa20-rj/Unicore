import React, { useState } from "react";
import Sidebar from "./components/dashboard/Sidebar";
import TopNavbar from "./components/dashboard/TopNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerify";
import AdminDashboard from "./pages/AdminDashboard";
import LostItemsDashboard from "./pages/LostItemsDashboard";
import MarketplaceDashboard from "./pages/MarketplaceDashboard";
import SettingsDashboard from "./pages/SettingsDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [currentTab, setCurrentTab] = useState("Login");

  const [userEmail, setUserEmail] = useState("alex.t@uwu.ac.lk");

  // LOGIN SCREEN
  if (currentTab === "Login") {
    return <Login onNavigate={(target) => setCurrentTab(target)} />;
  }

  // REGISTRATION SCREEN
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

  // OTP VERIFICATION SCREEN
  if (currentTab === "OtpVerification") {
    return (
      <OtpVerification
        email={userEmail} //
        //
        onVerificationSuccess={() => setCurrentTab("Login")} //
        onNavigate={(target) => setCurrentTab(target)} //
      />
    );
  }

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
      {}
      <div className="flex-shrink-0" style={{ width: "260px" }}>
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={(tab) => setCurrentTab(tab)}
        />
      </div>

      {}
      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        <TopNavbar />
        <div className="p-4 position-relative">{renderMainContent()}</div>
      </div>
    </div>
  );
}

export default App;
