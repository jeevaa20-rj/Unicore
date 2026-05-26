import React from 'react';
import LostItemCard from '../components/Dashboard/LostItemCard';

const LostItemsDashboard = () => {
  const lostItemsData = [
    { title: "Scientific Calculator", location: "Library entrance", phones: ["0771234567", "0771234567"], image: "https://via.placeholder.com/300x160" },
    { title: "Leather Keyring", location: "Main Cafeteria", image: "https://via.placeholder.com/300x160" },
    { title: "Leather Keyring", location: "Main Cafeteria", image: "https://via.placeholder.com/300x160" },
    { title: "Leather Keyring", location: "Main Cafeteria", image: "https://via.placeholder.com/300x160" },
    { title: "Wireless Headphones", location: "Auditorium C", image: "https://via.placeholder.com/300x160" },
    { title: "Hydro-flask Bottle", location: "Chemistry Lab 4", image: "https://via.placeholder.com/300x160" },
    { title: "Reading Glasses", location: "Student Union Hall", image: "https://via.placeholder.com/300x160" },
    { title: "Compact Umbrella", location: "Lecture Complex Entrance", image: "https://via.placeholder.com/300x160", showDelete: true },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <span className="text-muted small fw-medium">UniCore</span>
          <h2 className="fw-bold m-0 mt-1" style={{ fontSize: '1.8rem' }}>Lost Items</h2>
          <p className="text-muted small m-0">Post lost items and find them faster.</p>
        </div>
        <button className="btn text-white px-3 py-2 fw-medium d-flex align-items-center gap-2" style={{ backgroundColor: '#b5009b', borderRadius: '8px', fontSize: '0.9rem' }}>
          <i className="bi bi-plus-circle"></i> Add Lost Item
        </button>
      </div>

      <div className="row g-4 mb-4">
        {lostItemsData.map((item, index) => (
          <LostItemCard key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default LostItemsDashboard;