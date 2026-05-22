import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./Component/DashboardLayout";
import Marketplace from "./Content/Marketplace";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" />} />
          <Route path="/marketplace" element={<Marketplace />} />
          
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;