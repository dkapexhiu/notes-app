import React from "react";

const Form = ({ mode, item, onCreate, onUpdate, onHandleChange }) => {
  const handleSubmit = e => {
    e.preventDefault();

    mode === "create" ? onCreate() : onUpdate();
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" />
        <input
          type="text"
          value={item.title}
          onChange={e => onHandleChange("title", e.target.value)}
          placeholder="title"
        />

        <label htmlFor="note" />
        <textarea
          type="text"
          value={item.note}
          onChange={e => onHandleChange("note", e.target.value)}
          placeholder="Enter description"
        />

        <label htmlFor="keywords" />
        <textarea
          type="text"
          value={item.keywords}
          onChange={e => onHandleChange("keywords", e.target.value)}
          placeholder="Enter keywords"
        />

        <label htmlFor="email" />
        <textarea
          type="text"
          value={item.email}
          onChange={e => onHandleChange("email", e.target.value)}
          placeholder="Enter email"
        />

        <button>{mode === "create" ? "Add" : "Save"}</button>
      </form>
    </div>
  );
};

export default Form;
