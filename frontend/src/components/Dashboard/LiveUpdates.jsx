import React from "react";

const LiveUpdates = () => {
  const liveUpdates = [
    {
      text: "Kasun Perera uploaded new notes.",
      sub: "CST 321-2 Advanced Web Dev",
      time: "2 mins ago",
      icon: "bi-file-earmark-arrow-up",
      bg: "bg-purple-subtle text-purple",
    },
    {
      text: "Marketplace: New item listed.",
      sub: "Scientific Calculator (used)",
      time: "15 mins ago",
      icon: "bi-tags",
      bg: "bg-warning-subtle text-warning",
    },
    {
      text: "New Registration",
      sub: "Student ID: UWU/IIT/23/044",
      time: "1 hour ago",
      icon: "bi-person-plus",
      bg: "bg-primary-subtle text-primary",
    },
    {
      text: "Resolved: Lost Wallet",
      sub: "Handed over to Security office.",
      time: "45 mins ago",
      icon: "bi-check-circle",
      bg: "bg-success-subtle text-success",
    },
  ];

  return (
    <div
      className="card border-0 shadow-sm p-4 position-relative"
      style={{ borderRadius: "12px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>
          Live Updates
        </h5>
        <span
          className="p-1 bg-danger rounded-circle position-relative"
          style={{ width: "6px", height: "6px" }}
        ></span>
      </div>

      <div className="d-flex flex-column gap-3 mb-3">
        {liveUpdates.map((log, index) => (
          <div className="d-flex gap-2.5 align-items-start" key={index}>
            <div
              className={`p-2 rounded-circle ${log.bg} d-flex align-items-center justify-content-center flex-shrink-0`}
              style={{ width: "32px", height: "32px" }}
            >
              <i
                className={`bi ${log.icon}`}
                style={{ fontSize: "0.85rem" }}
              ></i>
            </div>
            <div>
              <div
                className="fw-bold text-dark m-0"
                style={{ fontSize: "0.8rem", lineHeight: "1.3" }}
              >
                {log.text}
              </div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                {log.sub}
              </div>
              <small
                className="text-black-50 d-block mt-0.5"
                style={{ fontSize: "0.65rem" }}
              >
                {log.time}
              </small>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-outline-secondary w-100 fw-semibold py-2 text-dark border-secondary border-opacity-25"
        style={{ borderRadius: "8px", fontSize: "0.8rem" }}
      >
        View All Activity
      </button>
    </div>
  );
};

export default LiveUpdates;
