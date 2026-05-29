import React from "react";
import MetricCards from "../components/dashboard/MetricCards";
import UserTable from "../components/dashboard/UserTable";
import CRAssignment from "../components/dashboard/CRAssignment";
import LiveUpdates from "../components/dashboard/LiveUpdates";
import SystemHealth from "../components/dashboard/SystemHealth";
import FooterBanner from "../components/dashboard/FooterBanner";

const AdminDashboard = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold m-0">Admin Panel</h2>
        <p className="text-muted small">
          Oversee academic operations and platform.
        </p>
      </div>

      <MetricCards />

      <div className="row g-4">
        <div className="col-12 col-xl-8 d-flex flex-column gap-4">
          <UserTable />
          <CRAssignment />
        </div>
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          <LiveUpdates />
          <SystemHealth />
        </div>
      </div>

      <div className="mt-4">
        <FooterBanner />
      </div>
    </>
  );
};

export default AdminDashboard;
