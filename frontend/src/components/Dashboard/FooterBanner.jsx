import React from "react";

const FooterBanner = () => {
  return (
    <div
      className="text-white p-4"
      style={{
        background: "linear-gradient(135deg, #5c2d53 0%, #3a1c34 100%)",
        borderRadius: "14px",
      }}
    >
      <div className="w-70">
        <h5 className="fw-bold mb-1">Academic Integrity Focus</h5>
        <p className="text-white-50 m-0 small">
          Ensuring the highest standards of data verification and student
          services at Uva Wellassa University.
        </p>
      </div>
    </div>
  );
};

export default FooterBanner;
