import React from 'react'

const SystemHealth = () => {
  return (
  <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '12px', backgroundColor: '#f4f6f9' }}>
      <span className="text-uppercase fw-bold text-muted mb-3 d-block" style={{ fontSize: '0.7rem' }}>System Health</span>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center py-1 border-bottom border-light">
          <span className="small text-muted">Database Latency</span>
          <span className="fw-bold small">24ms</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-1 border-bottom border-light">
          <span className="small text-muted">Server Load</span>
          <span className="fw-bold small text-warning">Moderate</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span className="small text-muted">API Status</span>
          <span className="fw-bold small text-success">All Operational</span>
        </div>
      </div>
    </div>
  )
}

export default SystemHealth