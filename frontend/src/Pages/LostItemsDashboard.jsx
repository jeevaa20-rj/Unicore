import React, { useState, useEffect } from 'react';
import LostItemCard from '../components/Dashboard/LostItemCard';

const LostItemsDashboard = () => {
  // 1. Setup state for handling live dynamic data, loading spinners, and errors
  const [lostItemsData, setLostItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Function to fetch data from your PHP API
  const fetchLostItems = () => {
    setLoading(true);
    // Replace this URL with the exact path to your XAMPP/WAMP folder structure
    fetch('http://localhost/UniCore/backend/api/view_lost_items.php', {
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from server.');
        }
        return response.json();
      })
      .then((data) => {
        setLostItemsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Run once when the component/page mounts
  useEffect(() => {
    fetchLostItems();
  }, []);

  // 3. Function to handle item deletion
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item permanently?')) {
      fetch(`http://localhost/UniCore/backend/api/delete_lost_item.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include', 
      })
        .then((response) => response.json())
        .then((data) => {

  if (data.message) {
    alert(data.message);
  }

  fetchLostItems();
})
        .catch((err) => {
          console.error('Error deleting item:', err);
          alert('Could not delete the item.');
        });
    }
  };

  // Render loading state while waiting for PHP response
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading lost items list...</p>
      </div>
    );
  }

  // Render error message if backend is unreachable
  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

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
        {lostItemsData.length > 0 ? (
          lostItemsData.map((item, index) => (
            <LostItemCard 
              key={item.id || index} 
              item={item} 
              onDelete={() => handleDeleteItem(item.id)} // Passing the delete function as a prop to the card
            />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <p className="text-muted">No lost items have been posted yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LostItemsDashboard;