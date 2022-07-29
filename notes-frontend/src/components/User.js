import React from "react";

const User = ({ users, onEdit, onDelete }) => {
  return users && users.length ? (
    users.map(({ id, first_name, last_name, email, password, role }, index) => (
      <div key={id} className="card">
        <h4 className="card-title">First Name: {first_name}</h4>
        <p className="card-desc">Last Name: {last_name}</p>
        <p className="card-desc">Email: {email}</p>
        <p className="card-desc">Password (encrypted): {password}</p>
        <p className="card-desc">Role: {role}</p>
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

export default User;