import React from "react";

const UserTable = () => {
  const userList = [
    {
      name: "Kasun Perera",
      id: "UWU/CST/19/024",
      role: "Student",
      status: "Active",
      badgeClass: "bg-primary-subtle text-primary",
    },
    {
      name: "Amani Mendis",
      id: "UWU/IIT/20/005",
      role: "CR",
      status: "Active",
      badgeClass: "bg-warning-subtle text-warning-dark",
    },
    {
      name: "Dilshan Raj",
      id: "UWU/CST/18/102",
      role: "Admin",
      status: "Restricted",
      badgeClass: "bg-secondary-subtle text-muted",
    },
  ];

  return (
    <div
      className="card border-0 shadow-sm p-4"
      style={{ borderRadius: "12px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>
          User Management
        </h5>
        <button
          className="btn text-white btn-sm px-3 py-1.5 fw-medium"
          style={{
            backgroundColor: "#b5009b",
            borderRadius: "6px",
            fontSize: "0.85rem",
          }}
        >
          <i className="bi bi-person-plus me-1"></i> Add User
        </button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mt-2 text-nowrap">
          <thead>
            <tr
              className="text-muted text-uppercase"
              style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
            >
              <th className="border-0 ps-0">Student Name</th>
              <th className="border-0">Current Role</th>
              <th className="border-0">Status</th>
              <th className="border-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index} className="border-light">
                <td className="ps-0 py-2.5">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold small"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="fw-bold small m-0">{user.name}</div>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {user.id}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge rounded px-2 py-1 ${user.badgeClass}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <small className="fw-semibold d-flex align-items-center gap-1">
                    <span
                      className={`p-1 rounded-circle ${user.status === "Active" ? "bg-success" : "bg-danger"}`}
                      style={{ width: "6px", height: "6px" }}
                    ></span>
                    {user.status}
                  </small>
                </td>
                <td className="text-end pe-0">
                  <button className="btn btn-sm btn-link text-dark p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-link text-danger p-1">
                    <i
                      className={
                        user.status === "Restricted"
                          ? "bi bi-lock-fill"
                          : "bi bi-dash-circle"
                      }
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
