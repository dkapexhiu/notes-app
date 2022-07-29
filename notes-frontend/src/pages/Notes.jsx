import React, { Fragment, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Notes from "../components/Notes";
import Form from "../components/Form";
import {
  createNote,
  updateNote,
  deleteNote
} from "../store/actions/notesAction";
import axios from "axios";
import Home from "../pages/Home";


function NotesApp({ items, createNote, updateNote, deleteNote }) {
  const [mode, setMode] = useState("create");
  const [formItem, setFormItem] = useState({ title: "", note: "" });
  const [stateNotes, setStateNotes] = useState(items);
  const [role, setRole] = useState(null);

  const updateNotes = useCallback(() => { 
    var config = {
      method: 'get',
      url: 'http://localhost:3001/notes-all',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      response.data.forEach(function (respItem) {
        const index = items.findIndex(object => object.id === respItem.id);
        if (index === -1) {
          items.push(respItem);
        }
      });
      setStateNotes(...items,...response.data);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    updateNotes();
    setRole(localStorage.getItem(role));
  }, [updateNotes]);


  const handleInputChange = (name, value) => {
    setFormItem({ ...formItem, [name]: value });
  };

  const handleCreate = () => {
    const { title, note, keywords } = formItem;

    const newItems = {
      //id: items.length + 1,
      title: title,
      note: note,
      keywords: keywords,
      email: "test1@email.com"
    };

    var config = {
      method: 'post',
      url: 'http://localhost:3001/create-note',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : newItems
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    createNote(newItems);

    setFormItem({ title: "", note: "", keywords: "" });
  };

  const handleUpdate = () => {
    const index = items.findIndex(item => item.id === formItem.id);
    let updateItem = [...items];
    updateItem[index] = formItem;

    setMode("create");

    var config = {
      method: 'post',
      url: 'http://localhost:3001/edit-note',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : formItem
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    updateNote(updateItem);
    setFormItem({ title: "", note: "", keywords: "" });
  };

  const handleEdit = index => {
    setMode("edit");
    setFormItem(items[index]);
  };

  const handleDelete = id => {
    var data = JSON.stringify({
      "id": id
    });

    var config = {
      method: 'delete',
      url: 'http://localhost:3001/delete-note',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    deleteNote(id);
  };

  return (
    <Fragment>
      <Home />
      <h1 className="text-center">Notes App</h1>
      
      <Form
        mode={mode}
        item={formItem}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onHandleChange={handleInputChange}
      />

      <Notes items={items} onEdit={handleEdit} onDelete={handleDelete} />

    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    items: state.noteReducer
  };
};

export default connect(mapStateToProps, { createNote, updateNote, deleteNote })(
  NotesApp
);