import React from 'react';

const LostItemCard = ({ item }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3">
      <div 
        className="card h-100 border-0 shadow-sm overflow-hidden" 
        style={{ borderRadius: '16px', borderBottom: '3px solid #b5009b' }}
      >
        <div className="position-relative" style={{ height: '160px' }}>
          <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
          <span className="position-absolute top-0 start-0 m-2 badge bg-success bg-opacity-75 text-white" style={{ fontSize: '0.7rem' }}>
            Recently Reported
          </span>
        </div>

        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
            <div className="d-flex align-items-center text-muted small mb-3">
              <i className="bi bi-geo-alt me-1.5"></i>
              <span>{item.location}</span>
            </div>

            {item.phones ? (
              <div className="d-flex flex-column gap-1 my-2">
                {item.phones.map((phone, idx) => (
                  <div key={idx} className="small text-dark fw-medium">
                    <i className="bi bi-telephone me-2 text-muted"></i>{phone}
                  </div>
                ))}
              </div>
            ) : (
              <button className="btn btn-outline-primary w-100 py-2 mb-2 fw-medium btn-sm" style={{ borderColor: '#b5009b', color: '#b5009b' }}>
                Contact Owner
              </button>
            )}
          </div>
          {item.showDelete && (
            <div className="text-start mt-2 border-top pt-2">
              <button className="btn btn-link p-0 text-dark opacity-75"><i className="bi bi-trash fs-5"></i></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostItemCard; // இந்த Default Export மிக முக்கியம்!