import React from 'react';

function TableComponent({ value, onDelete }) {
  const handleDelete = (id) => {
    onDelete(id); // Call the parent's delete function with the item's ID
  };

  return (
    <div className="card-container">
      {value?.map((item, i) => (
        <div key={item.id} className="card">
          <h4 className="card-title">{item?.subject}</h4>
          <p className="card-task">{item?.task}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TableComponent;
