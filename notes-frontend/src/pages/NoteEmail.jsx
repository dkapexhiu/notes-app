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

const byEmail = (email) => (note) =>
  note.email.toLowerCase().includes((email || '').toLowerCase());

function NotesApp({email, items, createNote, updateNote, deleteNote }) {
  const [mode, setMode] = useState("create");
  const [formItem, setFormItem] = useState({ title: "", note: "", keywords: "", email: localStorage.getItem('email') });

  const [emailParam, setEmailParam] = React.useState(email);
  const [stateNotes, setStateNotes] = useState();

  const updateNotes = useCallback(() => { 
    var config = {
      method: 'get',
      url: 'http://localhost:3001/notes/'+emailParam,
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
  }, [updateNotes]);


  const handleInputChange = (name, value) => {
    setFormItem({ ...formItem, [name]: value });
  };

  const handleCreate = () => {
    const { title, note, keywords, email } = formItem;

    const newItems = {
      //id: items.length + 1,
      title: title,
      note: note,
      keywords: keywords,
      email: localStorage.getItem('email')
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

    setFormItem({ title: "", note: "", keywords: "", email: "" });
  };

  const handleUpdate = (id) => {
    const index = items.findIndex(item => item.id === id);
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
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });

    updateNote(updateItem);
    setFormItem({ title: "", note: "", keywords: "", email: "" });
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