import React, { useState } from 'react';

const MarketplaceFilters = () => {
  const categories = ['All Items', 'Books', 'Electronics', 'Lab Equipment', 'Clothing'];
  const [activeTab, setActiveTab] = useState('All Items');

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {categories.map((category) => {
        const isActive = activeTab === category;
        return (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className="btn btn-sm px-3 py-1.5 fw-medium"
            style={{
              borderRadius: '20px',
              backgroundColor: isActive ? '#b5009b' : '#e9ecef',
              color: isActive ? '#fff' : '#495057',
              border: 'none',
              fontSize: '0.85rem'
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default MarketplaceFilters; // இந்த Default Export மிக முக்கியம்!