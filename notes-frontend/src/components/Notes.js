import React from "react";

const Notes = ({ items, onEdit, onDelete }) => {
  console.log(items.length)
  return items.length ? (
    items.map(({ id, title, note, keywords }, index) => (
      <div key={id} className="card">
        <h4 className="card-title">Title: {title}</h4>
        Note: {note}
        <p className="card-desc">Keywords: {keywords}</p>
        <div className="card-button">
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onEdit(index)}>Edit</button>
        </div>
      </div>
    ))
  ) : (
    "Nothing found"
  );
};

export default Notes;
