import React, { Fragment, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import User from "../components/User";
import UserForm from "../components/UserForm";
import {
  createUser,
  updateUser,
  deleteUser
} from "../store/actions/usersAction";
import axios from "axios";
import Home from "../pages/Home";

const byEmail = (email) => (user) =>
  user.email.toLowerCase().includes((email || '').toLowerCase());

function UserEmail({emailUrl, users, email, createUser, updateUser, deleteUser }) {
  const [mode, setMode] = useState("create");
  const [formItem, setFormItem] = useState({ first_name: "", last_name: "", email: localStorage.getItem('email'), password: "", role: localStorage.getItem('role') });

  const [emailParam, setEmailParam] = React.useState(emailUrl);

  const [stateUsers, setStateUsers] = useState(users);

  const handleInputChange = (name, value) => {
    setFormItem({ ...formItem, [name]: value });
  };

  const updateUsers = useCallback(() => { 
    var config = {
      method: 'get',
      url: 'http://localhost:3001/users/'+emailParam,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      response.data.forEach(function (respItem) {
        const index = users.findIndex(object => object.id === respItem.id);
        if (index === -1) {
          users.push(respItem);
        }
      });
      setStateUsers(...response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    updateUsers();
  }, [updateUsers]);

  const handleUpdate = () => {
    const id = users.findIndex(user => user.id === formItem.id);
    let updateItem = [...users];
    updateItem[id] = formItem;

    setMode("create");

    var config = {
      method: 'put',
      url: 'http://localhost:3001/update-user',
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

    console.log(formItem)

    updateUser(updateItem);
    setFormItem({ first_name: "", last_name: "", email: "", password: "", role: "" });
  };

  const handleEdit = id => {
    setMode("edit");
    setFormItem(users[id]);
  };

  const handleDelete = id => {

    var data = JSON.stringify({
      "id": id
    });

    var config = {
      method: 'delete',
      url: 'http://localhost:3001/delete-user',
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

    deleteUser(id);
  };

  const handleCreate = () => {
    
    alert("You cannot create user");

    setFormItem({ first_name: "", last_name: "", email: "", password: "", role: "" });
  };

  return (
    <Fragment>
      <Home />
      <h1 className="text-center">Users App</h1>
      <UserForm
        mode={mode}
        user={formItem}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onHandleChange={handleInputChange}
      />

      <br />

      <User users={users} onEdit={handleEdit} onDelete={handleDelete} />

    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    users: state.userReducer
  };
};

export default connect(mapStateToProps, { createUser, updateUser, deleteUser })(
    UserEmail
);