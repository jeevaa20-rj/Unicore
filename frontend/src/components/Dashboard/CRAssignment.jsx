import React from "react";

const CRAssignment = () => {
  return (
    <div
      className="card border-0 shadow-sm p-4"
      style={{ borderRadius: "12px" }}
    >
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 bg-warning-subtle text-warning rounded px-3 fs-5">
          <i className="bi bi-person-badge"></i>
        </div>
        <div>
          <h5 className="fw-bold m-0">CR Assignment Center</h5>
          <span className="text-muted small">
            Delegate Course Representative roles for departmental notes.
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label
            className="form-label fw-bold text-muted small text-uppercase"
            style={{ fontSize: "0.7rem" }}
          >
            Select Department
          </label>
          <select
            className="form-select bg-light border-0 py-2"
            style={{ borderRadius: "8px" }}
          >
            <option>Computer Science & Technology</option>
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label
            className="form-label fw-bold text-muted small text-uppercase"
            style={{ fontSize: "0.7rem" }}
          >
            Student ID / Name
          </label>
          <input
            type="text"
            className="form-control bg-light border-0 py-2"
            placeholder="Search student..."
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div className="col-12 col-md-3">
          <button
            className="btn text-white w-100 py-2 fw-medium"
            style={{ backgroundColor: "#b5009b", borderRadius: "8px" }}
          >
            Assign Representative
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRAssignment;
