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

function UsersApp({ users, createUser, updateUser, deleteUser }) {
  const [mode, setMode] = useState("create");
  const [formItem, setFormItem] = useState({ first_name: "", last_name: "", email: "", password: "", role: "" });
  const [stateUsers, setStateUsers] = useState(users);

  const handleInputChange = (name, value) => {
    setFormItem({ ...formItem, [name]: value });
  };

  const updateUsers = useCallback(() => { 
    var config = {
      method: 'get',
      url: 'http://localhost:3001/users',
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
      setStateUsers(...users, ...response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    updateUsers();
  }, [updateUsers]);


  const handleCreate = () => {
    const { first_name, last_name, email, password} = formItem;

    const newItems = {
      //id: users.length + 1,
      first_name: first_name,
      last_name: last_name,
      email: email, 
      password: password,
      role: 'normal'
    };

    var config = {
      method: 'post',
      url: 'http://localhost:3001/register',
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

    createUser(newItems);

    setFormItem({ first_name: "", last_name: "", email: "", password: "", role: "" });
  };

  const handleUpdate = () => {
    const index = users.findIndex(user => user.id === formItem.id);
    let updateItem = [...users];
    updateItem[index] = formItem;

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

    updateUser(updateItem);
    setFormItem({ first_name: "", last_name: "", email: "", password: "", role: "" });
  };

  const handleEdit = index => {
    setMode("edit");
    setFormItem(users[index]);
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
    UsersApp
);