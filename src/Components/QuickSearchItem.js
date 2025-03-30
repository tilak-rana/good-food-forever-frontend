import React from "react";
import navHook from "./navHook"; // Adjust the path if needed

const QuickSearchItem = ({ data, navigate }) => {
  // Define the showFilter method
  const showFilter = () => {
    navigate(`/filter`, { replace: true });
  };

  const { name, content, image } = data;

  return (
    <div className="col-md-4 bg-light" onClick={showFilter}>
      <div className="card border-0 shadow-sm">
        <img src={`/${image}`} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-secondary">{content}</p>
        </div>
      </div>
    </div>
  );
};

// Wrap QuickSearchItem with navHook
export default navHook(QuickSearchItem);
