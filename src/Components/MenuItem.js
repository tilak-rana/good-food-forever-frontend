import React from 'react';

const MenuItem = ({ item, index, onAdd, onSubtract }) => {
  return (
    <div className="menu-item d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <h5>{item.name}</h5>
        <p className="text-muted">&#8377;{item.price}</p>
        <p className="text-muted">{item.description}</p>
      </div>
      <div className="text-right">
        <img src={item.image} alt={item.name} className="img-fluid rounded mb-2" style={{ maxHeight: '100px' }} />
        {item.qty === 0 ? (
          <button className="btn btn-primary btn-sm" onClick={() => onAdd(index)}>Add</button>
        ) : (
          <div className="d-flex align-items-center justify-content-end">
            <button className="btn btn-secondary btn-sm" onClick={() => onSubtract(index)}>-</button>
            <span className="mx-2">{item.qty}</span>
            <button className="btn btn-secondary btn-sm" onClick={() => onAdd(index)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
