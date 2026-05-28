import React, { useState, useEffect } from 'react';
import LostItemCard from '../components/Dashboard/LostItemCard';

const API_BASE = import.meta.env.VITE_API_URL;

const emptyForm = {
  item_name: '',
  datetime: '',
  place: '',
  contact: '',
  image: null,
};

const LostItemsDashboard = () => {
  const [lostItemsData, setLostItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchLostItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/view_lost_items.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch lost items.');
      }
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response from server.');
      }

      setLostItemsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item permanently?')) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/delete_lost_item.php?id=${encodeURIComponent(id)}`,
        { method: 'DELETE', credentials: 'include' }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete the item.');
      }

      alert(data.message);
      fetchLostItems();
    } catch (err) {
      console.error('Error deleting item:', err);
      alert(err.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    const body = new FormData();
    body.append('item_name', form.item_name.trim());
    body.append('datetime', form.datetime);
    body.append('place', form.place.trim());
    body.append('contact', form.contact.trim());
    if (form.image) {
      body.append('image', form.image);
    }

    try {
      const response = await fetch(`${API_BASE}/add_lost_item.php`, {
        method: 'POST',
        credentials: 'include',
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add lost item.');
      }

      setShowModal(false);
      setForm(emptyForm);
      fetchLostItems();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading lost items list...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <span className="text-muted small fw-medium">UniCore</span>
          <h2 className="fw-bold m-0 mt-1" style={{ fontSize: '1.8rem' }}>
            Lost Items
          </h2>
          <p className="text-muted small m-0">Post lost items and find them faster.</p>
        </div>
        <button
          type="button"
          className="btn text-white px-3 py-2 fw-medium d-flex align-items-center gap-2"
          style={{ backgroundColor: '#b5009b', borderRadius: '8px', fontSize: '0.9rem' }}
          onClick={() => {
            setFormError('');
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle"></i> Add Lost Item
        </button>
      </div>

      <div className="row g-4 mb-4">
        {lostItemsData.length > 0 ? (
          lostItemsData.map((item) => (
            <LostItemCard
              key={item.id}
              item={item}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <p className="text-muted">No lost items have been posted yet.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => !submitting && setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Report Lost Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                />
              </div>
              <form onSubmit={handleAddItem}>
                <div className="modal-body">
                  {formError && (
                    <div className="alert alert-danger py-2 small">{formError}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Item name</label>
                    <input
                      type="text"
                      name="item_name"
                      className="form-control"
                      value={form.item_name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Last seen date & time</label>
                    <input
                      type="datetime-local"
                      name="datetime"
                      className="form-control"
                      value={form.datetime}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Last seen place</label>
                    <input
                      type="text"
                      name="place"
                      className="form-control"
                      value={form.place}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Contact number</label>
                    <input
                      type="tel"
                      name="contact"
                      className="form-control"
                      value={form.contact}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Photo (optional)</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ backgroundColor: '#b5009b' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Posting...' : 'Post Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LostItemsDashboard;
