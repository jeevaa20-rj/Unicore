import React from "react";

const LostItemCard = ({ item, onDelete }) => {
  const imageSrc = item.item_image || "https://via.placeholder.com/300x160";
  const contact = item.contact_number?.trim();

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3">
      <div
        className="card h-100 border-0 shadow-sm overflow-hidden"
        style={{ borderRadius: "16px", borderBottom: "3px solid #b5009b" }}
      >
        <div className="position-relative" style={{ height: "160px" }}>
          <img
            src={imageSrc}
            alt={item.item_name}
            className="w-100 h-100 object-fit-cover"
          />
          <span
            className="position-absolute top-0 start-0 m-2 badge bg-success bg-opacity-75 text-white"
            style={{ fontSize: "0.7rem" }}
          >
            Recently Reported
          </span>
        </div>

        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h6 className="fw-bold text-dark mb-2">{item.item_name}</h6>
            {item.last_seen_datetime && (
              <p className="text-muted small mb-1">
                <i className="bi bi-clock me-1.5"></i>
                {new Date(item.last_seen_datetime).toLocaleString()}
              </p>
            )}
            <div className="d-flex align-items-center text-muted small mb-3">
              <i className="bi bi-geo-alt me-1.5"></i>
              <span>{item.last_seen_place}</span>
            </div>

            {contact ? (
              <a
                href={`tel:${contact.replace(/\s/g, "")}`}
                className="btn btn-outline-primary w-100 py-2 mb-2 fw-medium btn-sm text-decoration-none"
                style={{ borderColor: "#b5009b", color: "#b5009b" }}
              >
                <i className="bi bi-telephone me-2"></i>
                {contact}
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 mb-2 fw-medium btn-sm"
                disabled
              >
                No contact listed
              </button>
            )}
          </div>
          {item.showDelete && onDelete && (
            <div className="text-start mt-2 border-top pt-2">
              <button
                type="button"
                className="btn btn-link p-0 text-dark opacity-75"
                onClick={onDelete}
                aria-label="Delete item"
              >
                <i className="bi bi-trash fs-5"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostItemCard;
