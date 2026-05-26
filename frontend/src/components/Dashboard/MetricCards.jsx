import React from 'react'

const MetricCards = () => {
  return (
    <div className="row g-3 mb-4">
      {/* Card 1: Marketplace Volume */}
      <div className="col-12 col-md-4 col-xl-3">
        <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="p-2 bg-light rounded text-purple"><i className="bi bi-graph-up"></i></span>
            <span className="badge rounded-pill bg-success-subtle text-success">+12.5%</span>
          </div>
          <span className="text-muted small">Marketplace Vol.</span>
          <h3 className="fw-bold m-0 mt-1">LKR 42.5k</h3>
          <div className="progress mt-3" style={{ height: '4px' }}>
            <div className="progress-bar bg-dark" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      {/* Card 2: Resolution Rate */}
      <div className="col-12 col-md-4 col-xl-3">
        <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="p-2 bg-light rounded"><i className="bi bi-file-earmark-check"></i></span>
            <span className="badge bg-light text-dark border rounded-pill">98.2%</span>
          </div>
          <span className="text-muted small">Resolution Rate</span>
          <h3 className="fw-bold m-0 mt-1">Lost & Found</h3>
          <div className="d-flex gap-1 mt-3">
            <div className="bg-dark rounded-pill flex-grow-1" style={{ height: '5px' }}></div>
            <div className="bg-dark rounded-pill flex-grow-1" style={{ height: '5px' }}></div>
            <div className="bg-dark rounded-pill flex-grow-1" style={{ height: '5px' }}></div>
            <div className="bg-secondary opacity-25 rounded-pill flex-grow-1" style={{ height: '5px' }}></div>
          </div>
        </div>
      </div>

      {/* Card 3: Platform Activity Bar Graphic */}
      <div className="col-12 col-md-4 col-xl-6">
        <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="m-0 fw-bold small">Platform Activity</h6>
            <select className="form-select form-select-sm border-0 bg-light w-auto py-0 px-2" style={{ fontSize: '0.75rem' }}>
              <option>Last 7 Days</option>
            </select>
          </div>
          {/* Simulated Bars */}
          <div className="d-flex align-items-end justify-content-between flex-grow-1 pt-2" style={{ minHeight: '55px' }}>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '30%', width: '11%' }}></div>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '55%', width: '11%' }}></div>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '40%', width: '11%' }}></div>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '85%', width: '11%' }}></div>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '35%', width: '11%' }}></div>
            <div className="bg-light-subtle rounded-top bg-secondary bg-opacity-25" style={{ height: '75%', width: '11%' }}></div>
            <div className="bg-dark rounded-top" style={{ height: '65%', width: '11%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetricCards