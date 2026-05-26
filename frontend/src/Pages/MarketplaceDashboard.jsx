import React from 'react';
import MarketplaceFilters from '../components/Dashboard/MarketplaceFilters';
import MarketplaceCard from '../components/Dashboard/MarketplaceCard';

const MarketplaceDashboard = () => {
  const marketplaceData = [
    { title: "Drawing Board", price: "2,500", condition: "Like New", description: "A2 sized professional drawing board with...", owner: "Arun Perera", image: "https://via.placeholder.com/300x150" },
    { title: "iPad Air 4", price: "85,000", condition: "Good", description: "64GB Space Grey. Includes Apple Pencil...", owner: "Nimasha D.", image: "https://via.placeholder.com/300x150" },
    { title: "Calculus Vol. 2", price: "1,800", condition: "Used", description: "James Stewart's Calculus. Essential for...", owner: "Sahan K.", image: "https://via.placeholder.com/300x150" },
    { title: "Digital Microscope", price: "12,000", condition: "Like New", description: "Portable USB digital microscope, 1000x...", owner: "Lakmal W.", image: "https://via.placeholder.com/300x150" },
    { title: "Dell XPS 13", price: "145,000", condition: "Great", description: "i7, 16GB RAM, 512GB SSD. Perfect...", owner: "Janith S.", image: "https://via.placeholder.com/300x150" },
    { title: "Canvas Backpack", price: "3,200", condition: "Used", description: "Weatherproof canvas material. Fits 15-inch...", owner: "Tharushi P.", image: "https://via.placeholder.com/300x150" }
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <span className="text-muted small fw-medium">UniCore</span>
          <h2 className="fw-bold m-0 mt-1" style={{ fontSize: '1.8rem' }}>Student Marketplace</h2>
          <p className="text-muted small m-0">Buy, sell, and trade items within the Uva Wellassa community.</p>
        </div>
        <button className="btn text-white px-3 py-2 fw-medium d-flex align-items-center gap-2" style={{ backgroundColor: '#b5009b', borderRadius: '8px', fontSize: '0.85rem' }}>
          <i className="bi bi-plus-lg"></i> Add Item
        </button>
      </div>

      <MarketplaceFilters />

      <div className="row g-4 mb-5">
        {marketplaceData.map((product, idx) => (
          <MarketplaceCard key={idx} product={product} />
        ))}
      </div>
    </>
  );
};

export default MarketplaceDashboard;