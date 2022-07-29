import React, {useEffect} from "react";

const UserForm = ({ mode, user, onCreate, onUpdate, onHandleChange }) => {
  const handleSubmit = e => {
    e.preventDefault();
    mode === "create" ? onCreate() : onUpdate();
  };
  
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name" />
        <input
          type="text"
          value={user.first_name}
          onChange={e => onHandleChange("first_name", e.target.value)}
          placeholder="first name"
        />

        <label htmlFor="last_name" />
        <textarea
          type="text"
          value={user.last_name}
          onChange={e => onHandleChange("last_name", e.target.value)}
          placeholder="last name"
        />

        <label htmlFor="email" />
        <textarea
          type="email"
          value={user.email}
          onChange={e => onHandleChange("email", e.target.value)}
          placeholder="email"
        />

        <label htmlFor="password" />
        <textarea
          type="password"
          value={user.password}
          onChange={e => onHandleChange("password", e.target.value)}
          placeholder="password"
        />

        <label htmlFor="role" />
        <textarea
          type="text"
          value={user.role}
          onChange={e => onHandleChange("role", e.target.value)}
          placeholder="role"
        />
        <button>{"Save"}</button>
      </form>
    </div>
  );
};

export default UserForm;
