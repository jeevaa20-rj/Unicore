import React from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Plus } from 'lucide-react';

const categories = ['All Items', 'Books', 'Electronics', 'Lab Equipment', 'Clothing'];
const products = [ /* ... copy your product data array here ... */ ];

export default function Marketplace() {
  return (
    <>
      {/* TITLE & ADD ITEM BUTTON */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Student Marketplace</h1>
          <p className="text-muted mb-0">Buy, sell, and trade items within the Uva Wellassa community.</p>
        </div>
        <Button 
          className="d-flex align-items-center gap-2 border-0 px-4 py-2 shadow-sm"
          style={{ backgroundColor: '#a61c7d', borderRadius: '10px' }}
        >
          <Plus size={18} /> Add Item
        </Button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
        {categories.map((cat, idx) => (
          <Button 
            key={idx} 
            variant={idx === 0 ? 'primary' : 'light'} 
            className={`rounded-pill px-4 py-1.5 shadow-sm border-0 text-nowrap ${idx === 0 ? '' : 'text-secondary bg-white'}`}
            style={idx === 0 ? { backgroundColor: '#a61c7d' } : {}}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
              {/* Product Card Internal Structure */}
              <Card.Body>
                 <h6>{product.title}</h6>
                 <p>Rs. {product.price}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}