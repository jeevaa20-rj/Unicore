import React from 'react';

const MarketplaceCard = ({ product }) => {
  const getBadgeColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'like new': return { bg: '#fff3cd', color: '#856404' };
      case 'good': return { bg: '#cce5ff', color: '#004085' };
      case 'great': return { bg: '#d4edda', color: '#155724' };
      default: return { bg: '#e2e3e5', color: '#383d41' };
    }
  };

  const badgeStyle = getBadgeColor(product.condition);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3">
      <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '16px', borderBottom: '3px solid #b5009b' }}>
        <div className="position-relative" style={{ height: '150px' }}>
          <img src={product.image} alt={product.title} className="w-100 h-100 object-fit-cover" />
          <span className="position-absolute top-0 start-0 m-2 badge fw-semibold" style={{ fontSize: '0.7rem', backgroundColor: badgeStyle.bg, color: badgeStyle.color }}>
            {product.condition}
          </span>
        </div>

        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h6 className="fw-bold text-dark m-0" style={{ fontSize: '0.95rem', lineHeight: '1.3' }}>{product.title}</h6>
              <div className="text-end flex-shrink-0">
                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Rs.</small>
                <span className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{product.price}</span>
              </div>
            </div>
            <p className="text-muted m-0 text-truncate" style={{ fontSize: '0.75rem' }}>{product.description}</p>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-secondary rounded-circle text-white text-center fw-bold" style={{ width: '28px', height: '28px', fontSize: '0.7rem', lineHeight: '28px' }}>
                {product.owner.charAt(0)}
              </div>
              <span className="text-dark fw-medium" style={{ fontSize: '0.75rem' }}>{product.owner}</span>
            </div>
            <button className="btn btn-light bg-secondary bg-opacity-10 border-0 p-0 rounded d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
              <i className="bi bi-chat-left-text-fill text-secondary" style={{ fontSize: '0.75rem' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard; // இந்த Default Export மிக முக்கியம்!